// Exploded ingredient view: menu shortcut, dish-page toggle, ingredient list, languages
const { chromium } = require('playwright');
const F = 'file://' + process.argv[2], OUT = process.argv[3];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext(); const errs = [];
  const p = await ctx.newPage(); await p.setViewportSize({ width: 390, height: 844 });
  p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('requestfailed', r => { if (!/fonts/.test(r.url())) errs.push('missing ' + r.url().split('/').slice(-2).join('/')); });
  await p.goto(F + '#/'); await p.click('[data-a=reset]'); await p.waitForTimeout(150);
  await p.goto(F + '#/guest/join'); await p.fill('#jname', 'Ekin'); await p.click('[data-a=join]'); await p.waitForTimeout(200);
  await p.goto(F + '#/guest/menu'); await p.waitForTimeout(150);
  const chips = await p.locator('[data-a=openX]').count(); if (chips !== 5) errs.push('exploded chips ' + chips);
  await p.click('[data-a=openX][data-v=s6]'); await p.waitForTimeout(500);
  if (!(await p.locator('.media img').getAttribute('src')).includes('exploded/stinco')) errs.push('openX did not open exploded');
  await p.screenshot({ path: OUT + '/x-stinco.png' });
  await p.click('[data-a=dview][data-v=p]'); await p.waitForTimeout(300);
  if (!(await p.locator('.media img').getAttribute('src')).includes('posters/stinco')) errs.push('toggle to dish');
  if ((await p.locator('.ing li').count()) !== 6) errs.push('ingredient count');
  if (!(await p.innerText('.ing')).includes('Dana incik')) errs.push('TR ingredient');
  await p.screenshot({ path: OUT + '/x-stinco-dish.png', fullPage: true });
  await p.click('[data-a=lang][data-v=it]'); await p.waitForTimeout(100); if (await p.locator('.ing small').count()) errs.push('IT should not show translation');
  for (const id of ['s4', 's5', 's7', 's8']) { await p.goto(F + '#/guest/dish/' + id); await p.waitForTimeout(150); await p.click('[data-a=dview][data-v=x]'); await p.waitForTimeout(400); const ok = await p.locator('.media img').evaluate(i => i.complete && i.naturalWidth > 0); if (!ok) errs.push('image not loaded ' + id); }
  await p.goto(F + '#/guest/dish/s7'); await p.click('[data-a=addDish]'); await p.waitForTimeout(150);
  if (!(await p.innerText('.foot')).includes('1')) errs.push('add to cart');
  console.log(errs.join('\n') || 'OK'); await b.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
