const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const targets = [
  { slug: 'spendlens', url: 'https://credex-audit-eight.vercel.app/' },
  { slug: 'cliniva', url: 'https://neuralflow-cliniva-preview.vercel.app/' },
  { slug: 'socio-bar', url: 'https://cafe-bar-self.vercel.app/' },
  { slug: 'personal-portfolio', url: 'https://anubhav-portfolio-wine.vercel.app' }
];

async function run() {
  const outputDir = path.resolve(__dirname, '../public/projects');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  for (const target of targets) {
    try {
      console.log(`Capturing ${target.slug} from ${target.url}...`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 });
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // Give page styles & fonts 3s to render
      await new Promise(r => setTimeout(r, 3000));

      const dest = path.join(outputDir, `${target.slug}.webp`);
      await page.screenshot({
        path: dest,
        type: 'webp',
        quality: 82
      });

      const stats = fs.statSync(dest);
      console.log(`Saved ${target.slug}.webp (${Math.round(stats.size / 1024)} KB)`);
      await page.close();
    } catch (err) {
      console.error(`Failed to capture ${target.slug}:`, err.message);
    }
  }

  await browser.close();
  console.log('Finished capturing real screenshots.');
}

run();
