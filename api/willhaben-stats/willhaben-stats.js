const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export default async function handler(event, context) {
  let results = {};
  // parse body of POSY request to valid object and
  // use object destructuring to obtain target url
  const endpoint = JSON.parse(event.body);

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath:
      process.env.EXCECUTABLE_PATH || (await chromium.executablePath),
    headless: chromium.headless,
  });

  // open new page in browser
  const page = await browser.newPage();

  try {
    // navigate to the targetURL
    await page.goto(endpoint.url);

    // get the title from the newly loaded page
    const element = await page.waitForSelector("#result-list-title");
    const value = await element.evaluate((el) => el.textContent);
    let title = value[0].split(" ")[0];

    results[endpoint.title] = theTitle;

    // close the browser
    await browser.close();

    // send the page details
    return {
      statusCode: 200,
      body: JSON.stringify({
        results,
      }),
    };
  } catch (error) {
    // if any error occurs, close the browser instance
    // and send an error code
    await browser.close();
    return {
      statusCode: 400,
      body: JSON.stringify({
        error,
      }),
    };
  }
}
