// Pages opened like a phone file viewer does: sandboxed srcdoc iframe, no storage, URL cannot change
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const DIR = path.resolve(process.argv[2]), OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const errs = [];
  const open = async (file, w = 390, h = 844) => {
    const p = await b.newPage(); await p.setViewportSize({ width: w, height: h });
    p.on('pageerror', e => errs.push(file + ': ' + e.message));
    await p.setContent(`<iframe id="f" sandbox="allow-scripts" style="border:0;width:${w}px;height:${h}px"></iframe>`);
    await p.$eval('#f', (f, html) => { f.srcdoc = html; }, fs.readFileSync(path.join(DIR, file), 'utf8'));
    await p.waitForTimeout(1200); return { p, f: p.frames()[1] };
  };
  const g = await open('guest.html'); const f = g.f;
  if (!(await f.locator('[data-a=join]').count())) errs.push('guest: no QR screen');
  await f.click('[data-a=join]'); await f.waitForTimeout(300);
  if (!(await f.locator('.acc-h').count())) errs.push('guest: menu did not open');
  await f.click('[data-a=jump][data-v=anti]'); await f.click('[data-a=quick][data-v=a1]'); await f.waitForTimeout(100);
  await f.click('[data-a=zoom][data-v=a1]'); await f.waitForTimeout(200); await f.click('.sheet [data-go="#/guest/dish/a1"]'); await f.waitForTimeout(300);
  if (!(await f.locator('.media img').count())) errs.push('guest: dish page did not open');
  await f.click('[data-a=addDish]'); await f.waitForTimeout(200);
  await f.click('.tabbar button:nth-child(2)'); await f.waitForTimeout(200);
  await f.click('[data-a=send]'); await f.waitForTimeout(300);
  if (!/Sipariş alındı|Comanda ricevuta|Order received/.test(await f.innerText('body'))) errs.push('guest: order not sent');
  await f.click('.tabbar button:nth-child(4)'); await f.waitForTimeout(200); if (!(await f.locator('[data-a=book]').count())) errs.push('guest: booking tab');
  await g.p.screenshot({ path: OUT + '/viewer-guest.png' });
  const a = await open('admin.html', 1280, 860); const af = a.f;
  await af.click('[data-a=aFill]'); await af.click('[data-a=aLogin]'); await af.waitForTimeout(300);
  await af.click('.side a[href="#/admin/menu"]'); await af.waitForTimeout(200); if (!(await af.locator('[data-a=editDish]').count())) errs.push('admin: sidebar link');
  const s = await open('staff.html'); await s.f.click('[data-a=pickStaff][data-v=s2]'); for (const d of '2222') await s.f.click(`[data-a=pin][data-v="${d}"]`); await s.f.waitForTimeout(300);
  if (!(await s.f.locator('.tbln').count())) errs.push('staff: tables after PIN');
  if (/depolama|storage full|Memoria/i.test(await f.innerText('body'))) errs.push('guest: storage warning shown');
  console.log(errs.join('\n') || 'OK'); await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
