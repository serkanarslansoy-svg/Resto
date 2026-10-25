// Guest-first entry, self-contained build (no network), and no missing icons on any screen
const { chromium } = require('playwright');
const DIR = 'file://' + require('path').resolve(process.argv[2]) + '/';
const PAGE = { guest: 'guest.html', staff: 'staff.html', kitchen: 'kitchen.html', admin: 'admin.html', saas: 'platform.html' };
const F = (h = '') => DIR + (PAGE[h.replace(/^#\/?/, '').split('/')[0]] || 'guest.html') + h, OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext(); const errs = [], warns = new Set();
  await ctx.route(/^https?:/, r => { errs.push('network request ' + r.request().url().slice(0, 80)); r.abort(); });
  const page = async (w, h) => { const p = await ctx.newPage(); await p.setViewportSize({ width: w, height: h }); p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'warning' && /icon missing/.test(m.text())) warns.add(m.text()); if (m.type() === 'error') errs.push('console ' + m.text()); }); return p; };
  const g = await page(390, 844);
  await g.goto(F()); await g.waitForTimeout(300);
  if (!(await g.evaluate(() => location.hash)).startsWith('#/guest/join')) errs.push('default is not the guest QR screen');
  if (/Salon personeli|Mutfak|Restoran yönetimi/.test(await g.innerText('#app'))) errs.push('staff apps visible to the guest');
  await g.screenshot({ path: OUT + '/g6-join.png' });
  await g.click('[data-a=join]'); await g.waitForTimeout(400);
  if (!(await g.evaluate(() => location.hash)).startsWith('#/guest/menu')) errs.push('join does not open the menu');
  const posters = await g.locator('.posters .poster img').evaluateAll(a => a.filter(i => i.complete && i.naturalWidth > 0).length); if (posters < 8) errs.push('posters loaded ' + posters);
  if (!(await g.locator('.gh .logo img').evaluate(i => i.naturalWidth > 0))) errs.push('logo not loaded');
  const fontOk = await g.evaluate(() => document.fonts.check('16px "Plus Jakarta Sans"') && document.fonts.check('20px Newsreader')); if (!fontOk) errs.push('fonts not loaded');
  await g.screenshot({ path: OUT + '/g6-menu.png' });
  await g.click('[data-a=roles]'); await g.waitForTimeout(150); if (/Mutfak|KDS|RESTO SaaS/.test(await g.innerText('.sheet'))) errs.push('guest sheet shows staff apps'); await g.keyboard.press('Escape');
  for (const r of ['#/guest/home', '#/guest/dish/s6', '#/guest/cart', '#/guest/status', '#/guest/bill', '#/guest/book']) { await g.goto(F(r)); await g.waitForTimeout(150); }
  // each user type has its own page: no foreign screens inside, no way to route into them
  const fs = require('fs'), path = require('path'), root = path.resolve(process.argv[2]);
  const has = (f, fn) => fs.readFileSync(path.join(root, f), 'utf8').includes('function ' + fn + '(');
  for (const [f, no] of [['guest.html', ['vKitchen', 'sTables', 'aDash', 'pOverview', 'vPinLogin', 'vLauncher']], ['staff.html', ['gMenu', 'vKitchen', 'aDash', 'pOverview']], ['kitchen.html', ['gMenu', 'sTables', 'aDash', 'pOverview']], ['admin.html', ['gMenu', 'vKitchen', 'pOverview']], ['platform.html', ['gMenu', 'vKitchen', 'sTables']]]) for (const fn of no) if (has(f, fn)) errs.push(f + ' contains ' + fn);
  await g.goto(DIR + 'guest.html#/staff/tables'); await g.waitForTimeout(200); if (!(await g.evaluate(() => location.hash)).startsWith('#/guest/')) errs.push('guest page routed into staff');
  await g.goto(DIR + 'guest.html#/admin/dash'); await g.waitForTimeout(200); if (!(await g.evaluate(() => location.hash)).startsWith('#/guest/')) errs.push('guest page routed into admin');
  const hub = await page(390, 844); await hub.goto(DIR + 'index.html'); if ((await hub.locator('a.card').count()) !== 5) errs.push('hub links');
  const s = await page(1280, 860);
  await s.goto(F('#/staff/tables')); await s.click('[data-a=pickStaff][data-v=s1]'); await s.keyboard.type('1111'); await s.waitForTimeout(300);
  for (const r of ['#/staff/tables', '#/staff/table/D4', '#/staff/requests', '#/staff/ready', '#/staff/res', '#/staff/order/T5']) { await s.goto(F(r)); await s.waitForTimeout(120); }
  await s.goto(F('#/kitchen/board')); await s.waitForTimeout(150); await s.click('[data-a=kAllDay]'); await s.waitForTimeout(100);
  await s.goto(F('#/admin/dash')); await s.click('[data-a=aFill]'); await s.click('[data-a=aLogin]'); await s.waitForTimeout(250);
  for (const r of ['#/admin/menu', '#/admin/tables', '#/admin/res', '#/admin/staff', '#/admin/reports', '#/admin/settings']) { await s.goto(F(r)); await s.waitForTimeout(120); }
  await s.goto(F('#/saas/overview')); await s.click('[data-a=pFill]'); await s.click('[data-a=pLogin]'); await s.fill('#p2', '246810'); await s.click('[data-a=pLogin]'); await s.waitForTimeout(200);
  for (const r of ['#/saas/tenants', '#/saas/tenant/palatino', '#/saas/onboard', '#/saas/plans', '#/saas/health']) { await s.goto(F(r)); await s.waitForTimeout(120); }
  if (warns.size) errs.push('missing icons: ' + [...warns].join(', '));
  console.log(errs.join('\n') || 'OK'); await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
