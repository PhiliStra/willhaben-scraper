const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const endpoints = [
  {
    title: "Mietwohnungen",
    url: "https://www.willhaben.at/iad/immobilien/mietwohnungen/oberoesterreich/linz",
  },
  {
    title: "Eigentumswohnungenwohnungen",
    url: "https://www.willhaben.at/iad/immobilien/eigentumswohnung/oberoesterreich/linz",
  },
  {
    title: "OÖ Wohnbau",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=37441909&verticalId=2",
  },
  {
    title: "WSG",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=29720423&verticalId=2",
  },
  {
    title: "GWG Linz",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=28446133&verticalId=2",
  },
  {
    title: "Lawog",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=17103067&verticalId=2",
  },
  {
    title: "EBS",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=7091459&verticalId=2",
  },
  {
    title: "GIWOG",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6912138&verticalId=2",
  },
  {
    title: "Wohnbau 200",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6912076&verticalId=2",
  },
  {
    title: "Neue Heimat",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6563419&verticalId=2",
  },
  {
    title: "Familie",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=37609411&verticalId=2",
  },
  {
    title: "Lebensräume",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6563410&verticalId=2",
  },
  {
    title: "BRW",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6556903&verticalId=2",
  },
  {
    title: "WAG",
    url: "https://www.willhaben.at/iad/searchagent/alert?searchId=90&alertId=6556872&verticalId=2",
  },
];

export default async function handler(event, context) {
  let results = {};
  let browser = null;
  console.log("spawning chrome headless");
  console.log(await chromium.executablePath());

  const options = process.env.AWS_REGION
    ? {
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      };

  try {
    console.log(chromium.executablePath());
    browser = await puppeteer.launch(options);

    Promise.allSettled(
      endpoints.map(async (endpoint) => {
        const page = await browser.newPage();
        await page.goto(endpoint.url);

        theTitle = await page.locator("#result-list-title").allInnerTexts();
        theTitle = await theTitle[0].split(" ")[0];

        results[endpoint.title] = theTitle;
      })
    ).then(async () => {
      // writeResults(results);
      console.log(JSON.stringify(results));

      if (browser !== null) {
        await browser.close();
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          results,
        }),
      };
    });
  } catch (error) {
    if (browser !== null) {
      await browser.close();
    }

    console.log("error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error,
      }),
    };
  } finally {
    // close browser
    /* if (browser !== null) {
      await browser.close();
    } */
  }
}
