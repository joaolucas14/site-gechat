/* Gera a imagem Open Graph (public/og.png, 1200×630) a partir do logo
   oficial: fundo claro da marca com glow roxo e barra inferior.
   Rodar com: node tools/gen-og.mjs */
import sharp from 'sharp';

const W = 1200;
const H = 630;
const LOGO_WIDTH = 680;

const background = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="44%" r="62%">
      <stop offset="0%" stop-color="#F1E8FF"/>
      <stop offset="55%" stop-color="#FBFAFF"/>
      <stop offset="100%" stop-color="#F3F0FF"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4A1A9E"/>
      <stop offset="50%" stop-color="#8B44FF"/>
      <stop offset="100%" stop-color="#B98BFF"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="${H - 14}" width="${W}" height="14" fill="url(#bar)"/>
</svg>`;

const logo = await sharp('src/assets/logo-h-light.svg', { density: 300 })
  .resize({ width: LOGO_WIDTH })
  .png()
  .toBuffer();
const { height: logoHeight } = await sharp(logo).metadata();

await sharp(Buffer.from(background))
  .composite([
    {
      input: logo,
      left: Math.round((W - LOGO_WIDTH) / 2),
      top: Math.round((H - logoHeight) / 2) - 12,
    },
  ])
  .png()
  .toFile('public/og.png');

console.log('public/og.png gerado (1200×630)');
