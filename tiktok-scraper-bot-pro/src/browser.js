const { chromium } = require("playwright");

async function launchBrowser() {
    const browser = await chromium.launch({
        channel: "chrome",
        headless: false
    });

    const context = await browser.newContext({
        viewport: null
    });

    const page = await context.newPage();
    return { browser, context, page };
}

module.exports = { launchBrowser };
