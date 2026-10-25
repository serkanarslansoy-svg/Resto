const { chromium } = require('playwright');
const F = 'file://' + process.argv[2], OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ acceptDownloads: true }); const errs = [];
  const page = async (w, h) => { const p = await ctx.newPage(); await p.setViewportSize({ width: w, height: h }); p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); }); return p; };
  const k = await page(1280, 800);
  await k.goto(F + '#/apps'); await k.click('[data-a=reset]'); await k.waitForTimeout(200);
  await k.goto(F + '#/kitchen/board'); await k.waitForTimeout(150); await k.click('[data-a=pickStaff][data-v=s4]'); await k.keyboard.type('4444'); await k.waitForTimeout(300);
  await k.evaluate(() => { window.__beeps = 0; const ob = window.beep; });
  await k.click('[data-a=kSound]'); await k.waitForTimeout(100);
  if (!(await k.innerText('.kbar')).match(/Ses açık/)) errs.push('sound toggle');
  // sibling chips: T5 #41 has cucina + pizzeria + bar
  if (!(await k.locator('.tk .sib').count())) errs.push('no sibling chips');
  // start & ready a ticket to create prep stats
  const t = k.locator('.tk', { hasText: 'T5 · #41' }).first();
  await t.locator('[data-a=bump]').click(); await k.waitForTimeout(80);
  await k.locator('.tk', { hasText: 'T5 · #41' }).filter({ hasText: 'Agnolotti' }).locator('[data-a=bump]').click(); await k.waitForTimeout(80);
  // all-day sheet
  await k.click('[data-a=kAllDay]'); await k.waitForTimeout(100); const rows = await k.locator('.sheet .list .row').count(); if (rows < 2) errs.push('allday rows ' + rows);
  await k.screenshot({ path: OUT + '/kds-allday.png' }); await k.keyboard.press('Escape');
  // new ticket from guest in other tab -> fresh highlight in kitchen
  const g = await page(390, 844); await g.goto(F + '#/guest/join'); await g.fill('#jname', 'Ekin'); await g.click('[data-a=join]'); await g.waitForTimeout(100);
  await g.goto(F + '#/guest/menu'); await g.click('[data-a=quick][data-v=z2]'); await g.click('[data-a=quick][data-v=a1]'); await g.goto(F + '#/guest/cart'); await g.click('[data-a=send]'); await g.waitForTimeout(400);
  const fresh = await k.locator('.tk.fresh').count(); if (fresh < 1) errs.push('no fresh highlight ' + fresh);
  await k.screenshot({ path: OUT + '/kds-fresh.png' });
  // staff acks a request -> response time
  const s = await page(390, 844); await s.goto(F + '#/staff/requests'); await s.waitForTimeout(100); await s.click('[data-a=pickStaff][data-v=s2]'); await s.keyboard.type('2222'); await s.waitForTimeout(300);
  await s.goto(F + '#/staff/requests'); await s.waitForTimeout(100); await s.locator('[data-a=reqAck]').first().click(); await s.waitForTimeout(100);
  // reports
  const d = await page(1360, 900); await d.goto(F + '#/admin/reports'); await d.waitForTimeout(150); await d.click('[data-a=aFill]'); await d.click('[data-a=aLogin]'); await d.waitForTimeout(300);
  if (!(await d.evaluate(() => location.hash)).includes('reports')) errs.push('reports route');
  const txt = await d.innerText('#app'); if (!/En çok satanlar/.test(txt)) errs.push('no best sellers'); if (/Çağrıya yanıt süresi\s*\n\s*—/.test(txt)) errs.push('response time empty');
  if (!(await d.locator('.hbar').count())) errs.push('no bars');
  await d.screenshot({ path: OUT + '/reports.png', fullPage: true });
  const [dl] = await Promise.all([d.waitForEvent('download'), d.click('[data-a=csv]')]); const pth = await dl.path(); const csv = require('fs').readFileSync(pth, 'utf8'); if (csv.split('\n').length < 10) errs.push('csv short');
  await d.click('[data-a=rep][data-v="30"]'); await d.waitForTimeout(100); await d.screenshot({ path: OUT + '/reports30.png' });
  for (const r of ['#/admin/reports']) { const m = await page(390, 844); await m.goto(F + r); await m.waitForTimeout(150); const ov = await m.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (ov > 1) errs.push('overflow ' + r + ' ' + ov); }
  console.log(errs.join('\n') || 'OK'); await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
