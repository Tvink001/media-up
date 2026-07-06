import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';

// Render the built site in all three engines, check for layout/console issues,
// and save screenshots. Run against a running `npm run preview`.
const URL = process.env.CB_URL ?? 'http://localhost:4321/';
const OUT = process.env.CB_OUT ?? fileURLToPath(new URL('../.cbshots', import.meta.url));
fs.mkdirSync(OUT, { recursive: true });

const engines = { chromium, firefox, webkit };
const results = {};

for (const [name, type] of Object.entries(engines)) {
  const browser = await type.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));

  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(800); // let fonts + images settle

  const checks = await page.evaluate(() => {
    const clientW = document.documentElement.clientWidth;
    const scrollW = document.documentElement.scrollWidth;
    const chromeEl = document.querySelector('.chrome');
    const ccs = chromeEl ? getComputedStyle(chromeEl) : null;
    const h1cs = getComputedStyle(document.querySelector('h1'));
    const track = document.querySelector('[data-marquee]');
    return {
      clientW,
      scrollW,
      horizontalOverflow: scrollW > clientW + 1,
      h1Font: (h1cs.fontFamily || '').slice(0, 32),
      chromeClip: ccs ? ccs.backgroundClip || ccs.webkitBackgroundClip : 'n/a',
      chromeFill: ccs ? ccs.webkitTextFillColor : 'n/a',
      marqueeAnim: track ? getComputedStyle(track).animationName : 'n/a',
    };
  });

  await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });

  let menuOk = false;
  try {
    await page.click('[data-menu-open]');
    await page.waitForTimeout(250);
    menuOk = await page.evaluate(() => {
      const m = document.getElementById('mobile-menu');
      return !!m && m.hidden === false;
    });
    await page.screenshot({ path: `${OUT}/${name}-menu.png` });
  } catch (e) {
    menuOk = `error: ${e.message}`;
  }

  results[name] = { checks, menuOk, consoleErrors };
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
