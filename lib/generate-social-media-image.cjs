const { readFile } = require("node:fs/promises");
const { fileExists } = require("./filters.cjs");
const sharp = require("sharp");

async function generateSocialMediaImage(data = {}) {
  const outputPath = `/assets/previews/${data.slug}.png`;
  if (await fileExists(`_site/` + outputPath)) {
    console.log("[generate-social-media-image]: skipped");
    return outputPath;
  }

  const background = await readFile("./assets/background-texture.svg");
  const logo = await readFile("./_includes/_logo.njk");
  const image = data.image
    ? await readFile(data.image.replace("../", "./"))
    : false;
  const WIDTH = 1200;
  const HEIGHT = 600;
  const TITLE = data.label ? data.label : "Communities website";
  const TITLE_HEIGHT = 180;
  const MARGIN = 50;
  const BACKGROUND = data.backgroundColor ? data.backgroundColor : "#e5ebf0";
  const TEXT_COLOR = data.color ? data.color : "#0c2340";

  const output = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">
    <style>
        .title {
            font-size: 96px;
            fill: ${TEXT_COLOR};
            font-family: sans-serif;
            font-weight: bold;
        }
        .background {
            transform: translate(-${WIDTH * 1.5}px, 100px) scale(3);
        }
        .background path {
            fill: #d1dce3;
        }
        .image {
            transform: translate(-325px, -150px) scale(1.6);
            transform-origin: center;
        }
        .logo {
            transform: translate(${MARGIN}, 28) scale(2);
        }
        .logo #logo-mark {
            fill: #e5ebf0;
        }
        .logo #logo-subtitle {
          fill: #A0DAB3;
        }
    </style>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="${BACKGROUND}" />
    ${
      image
        ? `<g class="image">
    ${String(image)}
    </g>`
        : `<g class="background">
        ${String(background)}
    </g>`
    }
    
    <rect width="${WIDTH}" height="125" fill="#0c2340" />
    <g class="logo">${String(logo)}</g>
    <rect x="${MARGIN}" y="${HEIGHT - TITLE_HEIGHT - MARGIN}" width="${
    69 * TITLE.length
  }" height="${TITLE_HEIGHT}" fill="${BACKGROUND}"/>
    <text x="${MARGIN * 2}" y="${
    HEIGHT - TITLE_HEIGHT - MARGIN + 125
  }" class="title" fill="${TEXT_COLOR}">${TITLE}</text>
  </svg>
  `);
  return new Promise((resolve, reject) => {
    sharp(output)
      .png()
      .toFile("_site/" + outputPath, (error) => {
        if (error) {
          console.log("[generate-social-media-image]: failed");
          return reject(error);
        }
        console.log("[generate-social-media-image]: success");
        resolve(outputPath);
      });
  });
}

module.exports = generateSocialMediaImage;
