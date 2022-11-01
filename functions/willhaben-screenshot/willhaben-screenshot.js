const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const defaults = require("lodash.defaults");
const qs = require("qs");
const regexMerge = require("regex-merge");

const pattern = regexMerge(
  /^(?:\/\.netlify\/functions)?/,
  /(?:\/willhaben-screenshot)?/,
  /(?:\/(?<width>[0-9]+)x(?<height>[0-9]+))?/,
  /(?<path>\/.*?)/,
  /(?:\.png)?$/
);

const options = {
  base: process.env.BASE_URL,
  width: 1200,
  height: 630,
  maxage: 60 * 60 * 24 * 7,
};

exports.handler = async (event, context) => {
  console.log(event);
  const prefix = event.rawUrl.split("/screenshot")[0];
  const params = event.queryStringParameters;

  const { base, path, width, height, maxage } = (() => {
    const settings = defaults(event.path.match(pattern).groups, options);

    settings.width = parseInt(settings.width);
    settings.height = parseInt(settings.height);

    return settings;
  })();

  const url = `${prefix}/chart/${qs.stringify(event.queryStringParameters, {
    addQueryPrefix: true,
  })}`;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath:
      process.env.EXCECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  const page = await browser.newPage();

  await page.setViewport({ width, height });

  console.log(url);

  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitForTimeout(5000);

  const screenshot = await page.screenshot();

  await browser.close();

  return {
    statusCode: 200,
    headers: {
      "Cache-Control": `public, max-age=${maxage}`,
      "Content-Type": "image/png",
      Expires: new Date(Date.now() + maxage * 1000).toUTCString(),
    },
    body: screenshot.toString("base64"),
    isBase64Encoded: true,
  };
};
