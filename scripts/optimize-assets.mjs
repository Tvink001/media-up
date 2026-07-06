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
  'footer-bg.png': { width: 1024, format: 'webp', quality: 58 },
  'row-texture.png': { width: 480, format: 'webp', quality: 52 },
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

console.table(results);
const totalOut = results.reduce((a, r) => a + (r.outKb || 0), 0);
console.log(`optimized masters total: ${totalOut.toFixed(0)} KB`);
