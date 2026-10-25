const { chromium } = require('playwright');
const DIR = 'file://' + require('path').resolve(process.argv[2]) + '/';
const PAGE = { guest: 'guest.html', staff: 'staff.html', kitchen: 'kitchen.html', admin: 'admin.html', saas: 'platform.html' };
const F = (h = '') => DIR + (PAGE[h.replace(/^#\/?/, '').split('/')[0]] || 'guest.html') + h, OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext(); const errs = [];
  const page = async (w, h) => { const p = await ctx.newPage(); await p.setViewportSize({ width: w, height: h }); p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); }); return p; };
  const m = await page(390, 844); const W = t => m.waitForTimeout(t || 120);
  await m.goto(F('#/guest/join')); await W(300);
  // guards
  for (const r of ['#/staff/tables', '#/kitchen/board', '#/admin/dash', '#/saas/overview']) { await m.goto(F(r)); await W(); const txt = await m.innerText('#app'); if (!/PIN|Giriş|Demo/.test(txt)) errs.push('no guard ' + r); }
  // staff login: wrong then right
  await m.goto(F('#/staff/tables')); await W(); await m.screenshot({ path: OUT + '/login-pick.png' });
  await m.click('[data-a=pickStaff][data-v=s2]'); for (const d of '1234') await m.click(`[data-a=pin][data-v="${d}"]`); await W();
  if (!(await m.innerText('#app')).includes('Yanlış PIN')) errs.push('no wrong pin msg');
  await m.screenshot({ path: OUT + '/login-pin.png' });
  await m.keyboard.type('2222'); await W(300);
  if (!(await m.evaluate(() => location.hash)).startsWith('#/staff/tables')) errs.push('staff login failed');
  if (!(await m.innerText('.rname')).includes('Luca')) errs.push('header name');
  // manual ticket on T5 with hold
  await m.goto(F('#/staff/table/T5')); await W(); await m.click('[data-go="#/staff/order/T5"]'); await W();
  await m.click('[data-a=soAdd][data-v=a1]'); await m.click('[data-a=soCat][data-v=secondi]'); await m.click('[data-a=soAdd][data-v=s2]');
  await m.click('[data-a=soCat][data-v=dolci]'); await m.click('[data-a=soAdd][data-v=d2]');
  await m.click('[data-a=soCat][data-v=vini]'); await m.click('[data-a=soAdd][data-v=v2]');
  await m.locator('[data-a=soNote]').first().click(); await W(); await m.click('[data-a=soNoteAdd]'); await m.click('[data-a=soNoteOk]'); await W();
  await m.screenshot({ path: OUT + '/s-order.png', fullPage: true });
  await m.click('[data-a=soSend]'); await W(300);
  const st = await m.evaluate(() => { const S = JSON.parse(localStorage.getItem('resto.palatino.v4')); const o = S.orders[S.orders.length - 1]; return o.items.map(i => i.dishId + ':' + i.course + ':' + i.held).join(','); });
  if (st !== 'a1:1:false,s2:2:true,d2:3:true,v2:0:false') errs.push('held logic ' + st);
  const fires = await m.locator('[data-a=fire]').count(); if (fires < 2) errs.push('fire buttons ' + fires);
  await m.screenshot({ path: OUT + '/s-table-fire.png', fullPage: true });
  // kitchen: needs chef login in another tab
  const k = await page(1280, 800); await k.goto(F('#/kitchen/board')); await k.waitForTimeout(150);
  await k.click('[data-a=pickStaff][data-v=s4]'); await k.keyboard.type('4444'); await k.waitForTimeout(300);
  const heldTk = await k.locator('.tk', { hasText: 'T5 · #42' }).count(); if (!heldTk) errs.push('no T5#42 tickets');
  await k.screenshot({ path: OUT + '/kds2.png' });
  await m.locator('[data-a=fire]').first().click(); await W();
  await k.reload(); await k.waitForTimeout(200);
  // split on D2 (all staff orders -> person disabled), D4 (guest names)
  await m.goto(F('#/staff/table/D4')); await W(); await m.locator('[data-a=folio]').first().click(); await W();
  if (await m.locator('[data-a=splitMode][data-v="D4|person"][disabled]').count()) errs.push('person split disabled on D4');
  await m.click('[data-a=splitMode][data-v="D4|equal"]'); await W(); await m.click('[data-a=splitN][data-v="D4|1"]'); await W();
  const amounts = await m.$$eval('.sheet .list .price', e => e.map(x => x.textContent));
  const sum = amounts.reduce((a, t) => a + parseFloat(t.replace('€', '').replace(',', '.')), 0);
  const total = await m.evaluate(() => { const S = JSON.parse(localStorage.getItem('resto.palatino.v4')); return null; });
  if (amounts.length !== 3) errs.push('equal parts ' + amounts.length);
  if (!(await m.locator('.sheet [data-a=paid][disabled]').count())) errs.push('close should be disabled before all paid');
  for (const btn of await m.locator('.sheet [data-a=payShare]').all()) { await btn.click(); await W(60); }
  await m.screenshot({ path: OUT + '/s-split.png' });
  if (await m.locator('.sheet [data-a=paid][disabled]').count()) errs.push('close still disabled');
  await m.click('[data-a=splitMode][data-v="D4|person"]'); await W(); await m.screenshot({ path: OUT + '/s-split-person.png' });
  const pAm = await m.$$eval('.sheet .list .price', e => e.map(x => parseFloat(x.textContent.replace('€', '').replace(',', '.'))));
  const eqSum = Math.round(sum * 100), pSum = Math.round(pAm.reduce((a, b) => a + b, 0) * 100);
  if (eqSum !== pSum) errs.push('split sums differ ' + eqSum + ' vs ' + pSum);
  await m.click('.scrim', { position: { x: 10, y: 10 } }); await W();
  // admin login wrong/right + forgot/reset
  const d = await page(1280, 800); await d.goto(F('#/admin/menu')); await d.waitForTimeout(150);
  await d.fill('#ae', 'titolare@palatino.demo'); await d.fill('#ap', 'x'); await d.click('[data-a=aLogin]'); await d.waitForTimeout(100);
  if (!(await d.innerText('#app')).includes('hatalı')) errs.push('admin wrong pw msg');
  await d.goto(F('#/admin/forgot')); await d.fill('#fe', 'titolare@palatino.demo'); await d.click('[data-a=fSend]'); await d.waitForTimeout(100);
  await d.click('[data-go="#/admin/reset"]'); await d.waitForTimeout(100); await d.fill('#r1', 'Nuova2026x'); await d.fill('#r2', 'Nuova2026x'); await d.click('[data-a=rSave]'); await d.waitForTimeout(200);
  await d.fill('#ae', 'titolare@palatino.demo'); await d.fill('#ap', 'Nuova2026x'); await d.click('[data-a=aLogin]'); await d.waitForTimeout(200);
  if (!(await d.evaluate(() => location.hash)).startsWith('#/admin/menu')) errs.push('admin login should return to requested page ' + await d.evaluate(() => location.hash));
  await d.click('.side [data-a=logout]'); await d.waitForTimeout(100); if (!(await d.evaluate(() => location.hash)).includes('login')) errs.push('logout');
  // saas 2fa
  await d.goto(F('#/saas/tenants')); await d.waitForTimeout(100); await d.click('[data-a=pFill]'); await d.click('[data-a=pLogin]'); await d.waitForTimeout(100);
  await d.fill('#p2', '111111'); await d.click('[data-a=pLogin]'); await d.waitForTimeout(100); if (!(await d.innerText('#app')).includes('hatalı')) errs.push('2fa wrong');
  await d.fill('#p2', '246810'); await d.click('[data-a=pLogin]'); await d.waitForTimeout(200);
  if (!(await d.evaluate(() => location.hash)).startsWith('#/saas/tenants')) errs.push('saas after login ' + await d.evaluate(() => location.hash));
  await d.goto(F('#/admin/login')); await d.waitForTimeout(150); await d.screenshot({ path: OUT + '/admin-login.png' });
  // guest bill split view
  await m.goto(F('#/guest/join')); await m.fill('#jname', 'Ekin'); await m.click('[data-a=join]'); await W();
  await m.goto(F('#/guest/menu')); await m.click('[data-a=quick][data-v=z1]'); await m.goto(F('#/guest/cart')); await m.click('[data-a=send]'); await W();
  await m.goto(F('#/guest/bill')); await W(); await m.click('[data-a=splitMode][data-v="D4|person"]'); await W(); await m.screenshot({ path: OUT + '/g-bill-split.png', fullPage: true });
  // lock & end shift
  await m.goto(F('#/staff/tables')); await W(); await m.click('[data-a=lock]'); await W(); if (!(await m.innerText('#app')).includes('PIN')) errs.push('lock');
  // overflow
  for (const r of ['#/staff/tables', '#/admin/login', '#/saas/overview']) { await m.goto(F(r)); await W(); const ov = await m.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (ov > 1) errs.push('overflow ' + r + ' ' + ov); }
  console.log(errs.join('\n') || 'OK'); await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
