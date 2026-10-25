const { chromium } = require('playwright');
const DIR = 'file://' + require('path').resolve(process.argv[2]) + '/';
const PAGE = { guest: 'guest.html', staff: 'staff.html', kitchen: 'kitchen.html', admin: 'admin.html', saas: 'platform.html' };
const F = (h = '') => DIR + (PAGE[h.replace(/^#\/?/, '').split('/')[0]] || 'guest.html') + h;
const OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext();
  const errs = [];
  const mob = await (async()=>{const p=await ctx.newPage(); await p.setViewportSize({ width: 390, height: 844 }); return p})();
  mob.on('pageerror', e => errs.push('pageerror ' + e.message));
  mob.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); });
  await mob.goto(F('#/guest/join')); await mob.waitForTimeout(800);
  const routes = ['#/', '#/guest/join', '#/guest/menu', '#/guest/dish/p1', '#/guest/dish/s1', '#/guest/book', '#/staff/tables', '#/staff/table/D4', '#/staff/requests', '#/staff/ready', '#/staff/res', '#/kitchen/board', '#/admin/dash', '#/admin/menu', '#/admin/tables', '#/admin/res', '#/admin/staff', '#/admin/settings', '#/saas/overview', '#/saas/tenants', '#/saas/tenant/palatino', '#/saas/onboard', '#/saas/plans', '#/saas/health'];
  for (const r of routes) { await mob.goto(F(r)); await mob.waitForTimeout(150); const len = (await mob.innerText('#app')).length; if (len < 50) errs.push('empty ' + r); }
  // guest flow
  await mob.goto(F('#/guest/join')); await mob.fill('#jname', 'Ekin'); await mob.click('[data-a=join]'); await mob.waitForTimeout(200);
  await mob.goto(F('#/guest/dish/p1')); await mob.click('[data-a=dopt][data-v=abb]'); await mob.click('[data-a=dq][data-v="1"]'); await mob.fill('#dnote', 'senza parmigiano'); await mob.click('[data-a=addDish]'); await mob.waitForTimeout(200);
  await mob.click('[data-a=jump][data-v=pizze]'); await mob.click('[data-a=quick][data-v=z2]'); await mob.waitForTimeout(100);
  await mob.screenshot({ path: OUT + '/g-menu.png' });
  await mob.goto(F('#/guest/cart')); await mob.waitForTimeout(100); await mob.screenshot({ path: OUT + '/g-cart.png', fullPage: true });
  await mob.click('[data-a=send]'); await mob.waitForTimeout(200);
  const h = await mob.evaluate(() => location.hash); if (!h.startsWith('#/guest/sent/')) errs.push('send failed ' + h);
  await mob.screenshot({ path: OUT + '/g-sent.png' });
  // kitchen in another page (same storage)
  const k = await (async()=>{const p=await ctx.newPage(); await p.setViewportSize({ width: 1280, height: 800 }); return p})();
  k.on('pageerror', e => errs.push('k pageerror ' + e.message));
  await k.goto(F('#/kitchen/board')); await k.waitForTimeout(200); await k.click('[data-a=pickStaff][data-v=s4]'); await k.keyboard.type('4444'); await k.waitForTimeout(300);
  const tk = await k.locator('.tk').count(); if (tk < 3) errs.push('few tickets ' + tk);
  await k.screenshot({ path: OUT + '/kds.png' });
  // bump the D4 cucina new ticket to cooking then ready
  const bumpBtn = k.locator('.tk', { hasText: 'D4 · #42' }).first().locator('[data-a=bump]');
  await bumpBtn.click(); await k.waitForTimeout(100);
  await k.locator('.tk', { hasText: 'D4 · #42' }).first().locator('[data-a=bump]').click(); await k.waitForTimeout(100);
  // staff serves
  await mob.goto(F('#/staff/ready')); await mob.waitForTimeout(200); await mob.click('[data-a=pickStaff][data-v=s2]'); await mob.keyboard.type('2222'); await mob.waitForTimeout(300); await mob.goto(F('#/staff/ready')); await mob.waitForTimeout(200);
  const rd = await mob.locator('[data-a=serveAll]').count(); if (!rd) errs.push('nothing ready for staff');
  await mob.screenshot({ path: OUT + '/s-ready.png' });
  await mob.locator('[data-a=serveAll][data-v=D4]').click(); await mob.waitForTimeout(100);
  // guest status + bill
  await mob.goto(F('#/guest/status')); await mob.waitForTimeout(100); await mob.screenshot({ path: OUT + '/g-status.png', fullPage: true });
  await mob.goto(F('#/guest/bill')); await mob.click('[data-a=req][data-v=bill]'); await mob.waitForTimeout(100); await mob.screenshot({ path: OUT + '/g-bill.png', fullPage: true });
  // staff closes table
  await mob.goto(F('#/staff/requests')); await mob.waitForTimeout(100);
  await mob.locator('[data-a=folio][data-v=D4]').first().click(); await mob.waitForTimeout(100);
  await mob.screenshot({ path: OUT + '/s-folio.png' });
  await mob.click('[data-a=paid]'); await mob.waitForTimeout(100);
  await mob.goto(F('#/guest/status')); await mob.waitForTimeout(100);
  const fb = await mob.locator('[data-a=star]').count(); if (fb !== 5) errs.push('no feedback after close');
  await mob.click('[data-a=star][data-v="5"]'); await mob.click('[data-a=fbSend]'); await mob.waitForTimeout(100);
  // booking
  await mob.goto(F('#/guest/book')); await mob.waitForTimeout(100);
  await mob.click('[data-a=book]'); await mob.waitForTimeout(100);
  const errc = await mob.locator('.err-msg').count(); if (errc < 2) errs.push('booking validation missing ' + errc);
  const slot = mob.locator('[data-a=rset][data-v^="time|"]:not([disabled])').first();
  if (await slot.count()) await slot.click(); else errs.push('no free slot');
  await mob.fill('#rname', 'Ekin Ergül'); await mob.fill('#rphone', '+39 333 1234567');
  await mob.click('[data-a=book]'); await mob.waitForTimeout(200);
  const bh = await mob.evaluate(() => location.hash); if (!bh.startsWith('#/guest/booked/')) errs.push('booking failed ' + bh);
  await mob.screenshot({ path: OUT + '/g-booked.png', fullPage: true });
  await mob.goto(F('#/guest/book')); await mob.screenshot({ path: OUT + '/g-book.png' });
  // admin
  const d = await (async()=>{const p=await ctx.newPage(); await p.setViewportSize({ width: 1360, height: 860 }); return p})();
  d.on('pageerror', e => errs.push('d pageerror ' + e.message));
  await d.goto(F('#/admin/dash')); await d.waitForTimeout(200); await d.click('[data-a=aFill]'); await d.click('[data-a=aLogin]'); await d.waitForTimeout(300); await d.screenshot({ path: OUT + '/a-dash.png', fullPage: true });
  await d.goto(F('#/admin/menu')); await d.click('[data-a=editDish][data-v=a1]'); await d.fill('#ed-price', '14,5'); await d.click('[data-a=edSave]'); await d.waitForTimeout(100);
  const pr = await d.evaluate(() => JSON.parse(localStorage.getItem('resto.palatino.v7')).menu.find(x => x.id === 'a1').price); if (pr !== 14.5) errs.push('price edit ' + pr);
  await d.screenshot({ path: OUT + '/a-menu.png' });
  await d.goto(F('#/saas/overview')); await d.waitForTimeout(200); await d.click('[data-a=pFill]'); await d.click('[data-a=pLogin]'); await d.fill('#p2','246810'); await d.click('[data-a=pLogin]'); await d.waitForTimeout(300); await d.screenshot({ path: OUT + '/p-overview.png' });
  await d.goto(DIR + 'index.html'); await d.waitForTimeout(200); await d.screenshot({ path: OUT + '/hub.png', fullPage: true });
  // lang
  await mob.goto(F('#/guest/join')); await mob.click('[data-a=lang][data-v=it]'); await mob.waitForTimeout(100);
  const t = await mob.innerText('.stitle'); errs.push('INFO it title: ' + t);
  // horizontal overflow check on phone
  for (const r of ['#/', '#/guest/menu', '#/guest/book', '#/staff/tables', '#/admin/dash', '#/admin/menu', '#/kitchen/board']) { await mob.goto(F(r)); await mob.waitForTimeout(100); const ov = await mob.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (ov > 1) errs.push('overflow ' + r + ' ' + ov); }
  console.log(errs.join('\n') || 'OK');
  await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
