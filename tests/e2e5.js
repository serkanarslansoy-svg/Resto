// Exploded ingredient view: menu shortcut, dish-page toggle, ingredient list, languages
const { chromium } = require('playwright');
const DIR = 'file://' + require('path').resolve(process.argv[2]) + '/';
const PAGE = { guest: 'guest.html', staff: 'staff.html', kitchen: 'kitchen.html', admin: 'admin.html', saas: 'platform.html' };
const F = (h = '') => DIR + (PAGE[h.replace(/^#\/?/, '').split('/')[0]] || 'guest.html') + h, OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext(); const errs = [];
  const p = await ctx.newPage(); await p.setViewportSize({ width: 390, height: 844 });
  p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('requestfailed', r => { if (!/fonts/.test(r.url())) errs.push('missing ' + r.url().split('/').slice(-2).join('/')); });
  await p.goto(F('#/guest/join')); await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.goto(F('#/guest/join')); await p.waitForTimeout(150);
  await p.goto(F('#/guest/join')); await p.fill('#jname', 'Ekin'); await p.click('[data-a=join]'); await p.waitForTimeout(200);
  await p.goto(F('#/guest/menu')); await p.waitForTimeout(150);
  if (await p.locator('.posters').count()) errs.push('chef picks still shown');
  if (await p.locator('.acc.open').count()) errs.push('sections should start closed');
  await p.click('[data-a=cat][data-v=secondi]'); await p.waitForTimeout(200);
  if ((await p.locator('#cat-secondi .dish').count()) !== 8) errs.push('secondi rows');
  await p.click('[data-a=zoom][data-v=s6]'); await p.waitForTimeout(300);
  const sh = await p.innerText('.sheet'); if (!/kcal/.test(sh) || !/Dana incik/.test(sh)) errs.push('zoom sheet: ' + sh.slice(0, 120));
  await p.click('.sheet [data-a=zoomX]:not(.on)'); await p.waitForTimeout(200); if (!/exploded|data:image/.test(await p.locator('.sheet img').getAttribute('src'))) errs.push('zoom exploded');
  await p.click('[data-a=zoom][data-v=p5]').catch(() => {}); await p.keyboard.press('Escape'); await p.click('[data-a=cat][data-v=primi]'); await p.waitForTimeout(150); await p.click('[data-a=zoom][data-v=p5]'); await p.waitForTimeout(200);
  if (!/Polenta/.test(await p.innerText('.sheet .ing'))) errs.push('fallback ingredients'); await p.keyboard.press('Escape');
  await p.goto(F('#/guest/dish/s6')); await p.waitForTimeout(300); await p.click('[data-a=dview][data-v=x]'); await p.waitForTimeout(400);
  if (!/içindekiler/.test(await p.locator('.media img').getAttribute('alt'))) errs.push('openX did not open exploded');
  await p.screenshot({ path: OUT + '/x-stinco.png' });
  await p.click('[data-a=dview][data-v=p]'); await p.waitForTimeout(300);
  if (/içindekiler/.test(await p.locator('.media img').getAttribute('alt'))) errs.push('toggle to dish');
  if ((await p.locator('.ing li').count()) !== 6) errs.push('ingredient count');
  if (!(await p.innerText('.ing')).includes('Dana incik')) errs.push('TR ingredient');
  await p.screenshot({ path: OUT + '/x-stinco-dish.png', fullPage: true });
  await p.click('[data-a=lang][data-v=it]'); await p.waitForTimeout(100); if (await p.locator('.ing small').count()) errs.push('IT should not show translation');
  for (const id of ['s4', 's5', 's7', 's8']) { await p.goto(F('#/guest/dish/' + id)); await p.waitForTimeout(150); await p.click('[data-a=dview][data-v=x]'); await p.waitForTimeout(400); const ok = await p.locator('.media img').evaluate(i => i.complete && i.naturalWidth > 0); if (!ok) errs.push('image not loaded ' + id); }
  await p.goto(F('#/guest/dish/s7')); await p.click('[data-a=addDish]'); await p.waitForTimeout(150);
  if (!(await p.innerText('.foot')).includes('1')) errs.push('add to cart');
  console.log(errs.join('\n') || 'OK'); await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
