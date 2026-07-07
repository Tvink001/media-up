import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Re-encode the raw client PNGs (1024px masters) into lean, metadata-stripped
// masters sized ~2x their on-screen dimensions; the build then emits responsive
// AVIF/WebP from these. Re-encoding through Sharp drops embedded image metadata.
//
// The two large background images (footer bar, panel texture) ship as small lossy
// WebP; everything else stays lossless PNG to keep the chrome gradients clean.

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const SRC = path.join(root, 'design-assets');
const OUT = path.join(root, 'src', 'assets', 'images');
fs.mkdirSync(OUT, { recursive: true });

// width = ~2x the largest on-screen size; withoutEnlargement keeps small icons native.
const plan = {
  'hero-graphic.png': { width: 1024 },
  'growth-reflection.png': { width: 1192 },
  'logo-lockup.png': { width: 300 },
  'check-icon.png': { width: 78 },
  'panel-bg.png': { width: 1200, format: 'webp', quality: 74 },
  'emoji-nutra.png': { width: 80 },
  'icon-education.png': { width: 120 },
  'icon-finance.png': { width: 48 },
  'icon-leadgen.png': { width: 98 },
  'icon-saas.png': { width: 102 },
};

const results = [];
for (const [file, cfg] of Object.entries(plan)) {
  const inPath = path.join(SRC, file);
  if (!fs.existsSync(inPath)) {
    results.push({ file, note: 'MISSING in design-assets/' });
    continue;
  }
  const ext = cfg.format ?? 'png';
  const outName = file.replace(/\.png$/, `.${ext}`);
  const outPath = path.join(OUT, outName);

  let pipe = sharp(inPath).resize({ width: cfg.width, withoutEnlargement: true });
  pipe =
    ext === 'webp'
      ? pipe.webp({ quality: cfg.quality ?? 70, effort: 6 })
      : pipe.png({ compressionLevel: 9, effort: 10 }); // lossless: no banding on chrome gradients
  await pipe.toFile(outPath);

  const inKb = +(fs.statSync(inPath).size / 1024).toFixed(1);
  const outKb = +(fs.statSync(outPath).size / 1024).toFixed(1);
  const meta = await sharp(outPath).metadata();
  results.push({ file: outName, out: `${meta.width}x${meta.height}`, inKb, outKb });
}

// Bake the designer's cast shadow (Mask group) under the hero head, so the crisp
// 1024 head keeps its resolution and the shadow sits exactly as in the mock.
{
  const heroPath = path.join(OUT, 'hero-graphic.png');
  const maskPath = path.join(SRC, 'mask-shadow.png');
  if (fs.existsSync(heroPath) && fs.existsSync(maskPath)) {
    const head = await sharp(heroPath).toBuffer();
    const shadow = await sharp(maskPath).resize({ width: 600 }).toBuffer();
    await sharp({
      create: { width: 1024, height: 1156, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([
        { input: shadow, top: 1012, left: 194 },
        { input: head, top: 0, left: 0 },
      ])
      .png({ compressionLevel: 9 })
      .toFile(`${heroPath}.tmp`);
    fs.renameSync(`${heroPath}.tmp`, heroPath);
    results.push({
      file: 'hero-graphic.png (+shadow)',
      out: '1024x1156',
      inKb: 0,
      outKb: +(fs.statSync(heroPath).size / 1024).toFixed(1),
    });
  }
}

console.table(results);
const totalOut = results.reduce((a, r) => a + (r.outKb || 0), 0);
console.log(`optimized masters total: ${totalOut.toFixed(0)} KB`);
