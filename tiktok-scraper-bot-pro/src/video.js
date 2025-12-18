async function collectVideoUrls(page, maxScroll = 5) {
    const urls = new Set();

    for (let i = 0; i < maxScroll; i++) {
        const found = await page.$$eval(
            'a[href*="/video/"]',
            els => els.map(e => e.href)
        );

        found.forEach(u => urls.add(u));

        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForTimeout(2000);
    }

    return [...urls];
}

async function scrapeVideo(page, url, timeout = 15000) {
    try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout });
        await page.waitForTimeout(2000);

        const stats = await page.evaluate(() => {
            const get = (label) => {
                const el = [...document.querySelectorAll("strong")]
                    .find(e => e.innerText.includes(label));
                return el ? el.innerText : null;
            };

            return {
                views: get("views"),
                likes: get("likes"),
                comments: get("comments"),
                shares: get("shares")
            };
        });

        return {
            video_url: url,
            stats
        };
    } catch {
        return null;
    }
}

module.exports = {
    collectVideoUrls,
    scrapeVideo
};
