const { chromium } = require('playwright');
const DIR = 'file://' + require('path').resolve(process.argv[2]) + '/';
const PAGE = { guest: 'guest.html', staff: 'staff.html', kitchen: 'kitchen.html', admin: 'admin.html', saas: 'platform.html' };
const F = (h = '') => DIR + (PAGE[h.replace(/^#\/?/, '').split('/')[0]] || 'guest.html') + h, OUT = process.argv[3], IMG = process.argv[4];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext(); const errs = [];
  const page = async (w, h) => { const p = await ctx.newPage(); await p.setViewportSize({ width: w, height: h }); p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); }); return p; };
  const d = await page(1360, 900);
  await d.goto(F('#/guest/join')); await d.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await d.goto(F('#/guest/join')); await d.waitForTimeout(150);
  await d.goto(F('#/admin/menu')); await d.click('[data-a=aFill]'); await d.click('[data-a=aLogin]'); await d.waitForTimeout(250);
  // dish photo
  await d.click('[data-a=editDish][data-v=p2]'); await d.waitForTimeout(100);
  await d.setInputFiles('.sheet input[data-ch=edImg]', IMG + '/dish.png'); await d.waitForTimeout(500);
  if (!(await d.locator('.sheet img').count())) errs.push('no preview');
  await d.click('[data-a=edSave]'); await d.waitForTimeout(150);
  const img = await d.evaluate(() => { const S = JSON.parse(localStorage.getItem('resto.palatino.v6')); const i = S.menu.find(x => x.id === 'p2').img; return i ? i.length : 0; });
  if (img < 1000 || img > 200000) errs.push('img size ' + img);
  // brand
  await d.goto(F('#/admin/settings')); await d.waitForTimeout(150);
  await d.setInputFiles('input[data-ch=brandLogo]', IMG + '/logo.png'); await d.waitForTimeout(500);
  await d.click('[data-a=brandColor][data-v="#1F3A5F"]'); await d.waitForTimeout(100);
  await d.fill('#btag', 'Pizzeria e cucina piemontese dal centro di Torino');
  const prim = await d.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bosco').trim()); if (prim !== '#1F3A5F') errs.push('primary ' + prim);
  await d.screenshot({ path: OUT + '/brand.png' });
  // plan editor drag
  await d.goto(F('#/admin/tables')); await d.waitForTimeout(200);
  const n = d.locator('#pn-T1'); const bb = await n.boundingBox(); const plan = await d.locator('.plan[data-area=sala]').boundingBox();
  await d.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await d.mouse.down(); await d.mouse.move(plan.x + plan.width * .5, plan.y + plan.height * .5, { steps: 6 }); await d.mouse.up(); await d.waitForTimeout(150);
  const pos = await d.evaluate(() => { const S = JSON.parse(localStorage.getItem('resto.palatino.v6')); const t = S.tables.find(x => x.id === 'T1'); return [t.x, t.y]; });
  if (Math.abs(pos[0] - 50) > 3 || Math.abs(pos[1] - 50) > 3) errs.push('drag pos ' + pos);
  await d.click('[data-a=shape][data-v="T1|long"]'); await d.waitForTimeout(100);
  await d.focus('#pn-T1'); await d.keyboard.press('ArrowRight'); await d.waitForTimeout(100);
  const pos2 = await d.evaluate(() => JSON.parse(localStorage.getItem('resto.palatino.v6')).tables.find(x => x.id === 'T1').x); if (pos2 !== pos[0] + 2) errs.push('nudge ' + pos2);
  await d.screenshot({ path: OUT + '/plan-editor.png', fullPage: true });
  // tablet staff
  const t = await page(1180, 820); await t.goto(F('#/staff/tables')); await t.waitForTimeout(150); await t.click('[data-a=pickStaff][data-v=s1]'); await t.keyboard.type('1111'); await t.waitForTimeout(300);
  if (!(await t.locator('.tab2 aside').count())) errs.push('no tablet layout');
  await t.click('.pnode[data-v=T3]'); await t.waitForTimeout(100);
  if (!(await t.innerText('.tab2 aside')).includes('T3')) errs.push('panel not T3');
  if (!(await t.locator('.pnode.long[data-v=T1]').count())) errs.push('shape not reflected');
  await t.screenshot({ path: OUT + '/tablet.png' });
  await t.goto(F('#/staff/table/D4')); await t.waitForTimeout(150); if (!(await t.innerText('.tab2 aside')).includes('D4')) errs.push('deep link panel');
  // guest sees photo + logo + tagline
  const g = await page(390, 844); await g.goto(F('#/guest/join')); await g.fill('#jname', 'Ekin'); await g.click('[data-a=join]'); await g.waitForTimeout(200);
  if (!(await g.locator('.gh .logo img').count())) errs.push('guest logo');
  await g.goto(F('#/guest/home')); await g.waitForTimeout(200);
  if (!(await g.locator('.hero .label').textContent()).toLowerCase().includes('cucina piemontese')) errs.push('tagline');
  await g.screenshot({ path: OUT + '/g-home-brand.png' });
  await g.goto(F('#/guest/menu')); await g.click('[data-a=jump][data-v=primi]'); await g.waitForTimeout(400); if (!(await g.locator('.thumb img').count())) errs.push('menu photo');
  await g.screenshot({ path: OUT + '/g-menu-photo.png' });
  // phone staff still grid
  const ph = await page(390, 844); await ph.goto(F('#/staff/tables')); await ph.waitForTimeout(150); if (await ph.locator('.tab2').count()) errs.push('phone shows tablet'); 
  for (const r of ['#/admin/tables', '#/admin/settings']) { await ph.goto(F(r)); await ph.waitForTimeout(120); const ov = await ph.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (ov > 1) errs.push('overflow ' + r + ' ' + ov); }
  console.log(errs.join('\n') || 'OK'); await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
