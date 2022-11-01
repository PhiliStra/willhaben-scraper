const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const qs = require("qs");

const params = {
  width: 1200,
  height: 630,
  maxage: 60 * 60 * 24,
};

exports.handler = async (event, context) => {
  const prefix = event.rawUrl.split("/screenshot")[0];

  if (event.queryStringParameters.width && event.queryStringParameters.height) {
    const queryParams = event.queryStringParameters;
    params.width = parseInt(queryParams.width);
    params.height = parseInt(queryParams.height);

    console.log(params);
  }

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

  await page.setViewport(params);

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForTimeout(3500);

  const screenshot = await page.screenshot();

  await browser.close();

  return {
    statusCode: 200,
    headers: {
      "Cache-Control": `public, max-age=${params.maxage}`,
      "Content-Type": "image/png",
      Expires: new Date(Date.now() + params.maxage * 1000).toUTCString(),
    },
    body: screenshot.toString("base64"),
    isBase64Encoded: true,
  };
};
