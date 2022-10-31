const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

exports.handler = async function (req, res) {
  let result = {};

  const url = "https://willhaben.netlify.app/chart";

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath:
      process.env.EXCECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  // open new page in browser
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  try {
    // navigate to the targetURL
    await page.goto(url, {
      timeout: 10 * 1000,
      waitUntil: "domcontentloaded",
    });

    await page.waitForTimeout(5000);

    await page.screenshot({
      fullPage: true,
      path: `./dist/img/og-image.png`,
    });

    // close the browser
    await browser.close();

    return {
      statusCode: 200,
      body: JSON.stringify("DONE"),
    };
  } catch (error) {
    await browser.close();
    return {
      statusCode: 400,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
