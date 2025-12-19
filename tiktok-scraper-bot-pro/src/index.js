const readline = require("readline");
const { launchBrowser } = require("./browser");
const { saveResult } = require("./output");
const chalk = require("chalk");
const Table = require("cli-table3");
const boxen = require("boxen");


// CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const ask = q => new Promise(r => rl.question(q, r));


// UTIL
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitForSelectorRetry(
    page,
    selector,
    { retries = 8, timeout = 5000, delay = 1200 } = {}
) {
    for (let i = 1; i <= retries; i++) {
        try {
            await page.waitForSelector(selector, { timeout });
            return;
        } catch {
            if (i === retries) {
                throw new Error(`selector tidak muncul: ${selector}`);
            }
            await sleep(delay);
        }
    }
}

function parseCountText(text = "0") {
    const clean = text.replace(/\s/g, "");
    const multiplier =
        clean.includes("M") ? 1_000_000 :
            clean.includes("K") ? 1_000 : 1;
    const num = parseFloat(clean.replace(/[^\d.]/g, ""));
    return Math.round((num || 0) * multiplier);
}


// FANCY LOGGER UTILITIES
function printAsciiArt() {
    const art = `
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ████████╗██╗██╗  ██╗████████╗ ██████╗ ██╗  ██╗         ║
║   ╚══██╔══╝██║██║ ██╔╝╚══██╔══╝██╔═══██╗██║ ██╔╝         ║
║      ██║   ██║█████╔╝    ██║   ██║   ██║█████╔╝          ║
║      ██║   ██║██╔═██╗    ██║   ██║   ██║██╔═██╗          ║
║      ██║   ██║██║  ██╗   ██║   ╚██████╔╝██║  ██╗         ║
║      ╚═╝   ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝         ║
║                                                            ║
║           🤖 SCRAPER BOT PRO v3.0 - Enhanced              ║
║             Created with ❤️  by @mfajarb                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`;
    console.log(chalk.cyan.bold(art));
}

function formatNumber(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
}

function getProgressBar(current, total, width = 30) {
    const percentage = (current / total) * 100;
    const filled = Math.round((width * current) / total);
    const empty = width - filled;
    const bar = "█".repeat(filled) + "░".repeat(empty);
    return `${bar} ${percentage.toFixed(0)}%`;
}

function colorizeJSON(obj) {
    let json = JSON.stringify(obj, null, 2);

    // Color keys
    json = json.replace(/"([^"]+)":/g, (match, key) => {
        return chalk.yellow(`"${key}"`) + chalk.white(":");
    });

    // Color string values
    json = json.replace(/: "([^"]+)"/g, (match, value) => {
        return ": " + chalk.green(`"${value}"`);
    });

    // Color numbers
    json = json.replace(/: (\d+)/g, (match, num) => {
        return ": " + chalk.cyan(num);
    });

    // Color booleans
    json = json.replace(/: (true|false)/g, (match, bool) => {
        return ": " + chalk.magenta(bool);
    });

    return json;
}

function printProfileBox(profile) {
    const table = new Table({
        head: [chalk.cyan.bold("PROFILE DATA"), chalk.cyan.bold("VALUE")],
        colWidths: [25, 45],
        style: {
            head: [],
            border: ["cyan"]
        }
    });

    table.push(
        [chalk.white("👤 Username"), chalk.green.bold(`@${profile.username}`)],
        [chalk.white("👥 Followers"), chalk.yellow(profile.follower.toLocaleString())],
        [chalk.white("➕ Following"), chalk.yellow(profile.following.toLocaleString())],
        [chalk.white("❤️  Total Likes"), chalk.red(profile.likes.toLocaleString())],
        [chalk.white("📝 Bio"), chalk.gray(profile.bio || "No bio")],
        [chalk.white("🔗 Link"), chalk.blue(profile.bioLink || "-")]
    );

    console.log("\n" + table.toString());
}

function printStatsBox(videos, profile) {
    const totalViews = videos.reduce((s, v) => s + v.views, 0);
    const totalLikes = videos.reduce((s, v) => s + v.likes, 0);
    const totalComments = videos.reduce((s, v) => s + v.comments, 0);
    const totalShares = videos.reduce((s, v) => s + v.shares, 0);
    const totalSaved = videos.reduce((s, v) => s + v.saved, 0);

    const avgViews = Math.round(totalViews / videos.length);
    const avgLikes = Math.round(totalLikes / videos.length);
    const avgComments = Math.round(totalComments / videos.length);
    const avgShares = Math.round(totalShares / videos.length);

    // Calculate engagement rate
    const totalEngagement = totalLikes + totalComments + totalShares;
    const engagementRate = ((totalEngagement / totalViews) * 100).toFixed(2);

    const table = new Table({
        head: [chalk.magenta.bold("METRIC"), chalk.magenta.bold("TOTAL"), chalk.magenta.bold("AVERAGE")],
        colWidths: [20, 20, 20],
        style: {
            head: [],
            border: ["magenta"]
        }
    });

    table.push(
        [chalk.white("📹 Videos"), chalk.cyan(videos.length), chalk.gray("-")],
        [chalk.white("👁  Views"), chalk.cyan(formatNumber(totalViews)), chalk.cyan(formatNumber(avgViews))],
        [chalk.white("❤️  Likes"), chalk.red(formatNumber(totalLikes)), chalk.red(formatNumber(avgLikes))],
        [chalk.white("💬 Comments"), chalk.green(formatNumber(totalComments)), chalk.green(formatNumber(avgComments))],
        [chalk.white("🔄 Shares"), chalk.yellow(formatNumber(totalShares)), chalk.yellow(formatNumber(avgShares))],
        [chalk.white("⭐ Saved"), chalk.blue(formatNumber(totalSaved)), chalk.blue(Math.round(totalSaved / videos.length))]
    );

    console.log("\n" + table.toString());

    // Engagement rate box
    const engagementBox = boxen(
        chalk.bold.green(`ENGAGEMENT RATE: ${engagementRate}%`) + "\n" +
        chalk.gray(`${formatNumber(totalEngagement)} interactions / ${formatNumber(totalViews)} views`),
        {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            borderColor: "green",
            align: "center"
        }
    );
    console.log(engagementBox);
}

function printTopVideos(videos) {
    // Sort by views and get top 5
    const sorted = [...videos].sort((a, b) => b.views - a.views).slice(0, 5);

    const table = new Table({
        head: [
            chalk.yellow.bold("#"),
            chalk.yellow.bold("VIEWS"),
            chalk.yellow.bold("LIKES"),
            chalk.yellow.bold("COMMENTS"),
            chalk.yellow.bold("SHARES")
        ],
        colWidths: [5, 15, 15, 15, 15],
        style: {
            head: [],
            border: ["yellow"]
        }
    });

    sorted.forEach((v, idx) => {
        table.push([
            chalk.white(`${idx + 1}`),
            chalk.cyan(formatNumber(v.views)),
            chalk.red(formatNumber(v.likes)),
            chalk.green(formatNumber(v.comments)),
            chalk.yellow(formatNumber(v.shares))
        ]);
    });

    console.log(chalk.yellow.bold("\n🏆 TOP 5 PERFORMING VIDEOS:"));
    console.log(table.toString());
}


// PROFILE SCRAPER
async function scrapeProfileFromDOM(page) {
    await waitForSelectorRetry(page, '[data-e2e="followers-count"]');

    return await page.evaluate(() => {
        const get = sel =>
            document.querySelector(sel)?.innerText || "0";

        return {
            follower: get('[data-e2e="followers-count"]'),
            following: get('[data-e2e="following-count"]'),
            likes: get('[data-e2e="likes-count"]'),
            bio: document.querySelector('[data-e2e="user-bio"]')?.innerText || null,
            bioLink:
                document.querySelector('[data-e2e="user-link"] span')?.innerText || null
        };
    });
}


// VIDEO GRID SCRAPER (VIEWS)
async function scrapeVideoGrid(page, scrollTimes = 5) {
    for (let i = 0; i < scrollTimes; i++) {
        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight)
        );
        await sleep(1200);
    }

    await waitForSelectorRetry(page, 'div[data-e2e="user-post-item"]');

    return await page.evaluate(() => {
        return Array.from(
            document.querySelectorAll('div[data-e2e="user-post-item"]')
        ).map(item => ({
            video_url: item.querySelector("a")?.href || null,
            views:
                item.querySelector('[data-e2e="video-views"]')?.innerText || "0"
        }));
    });
}


// VIDEO ENGAGEMENT (FINAL & ROBUST)
async function fetchVideoEngagement(page, videoUrl) {
    try {
        await page.goto(videoUrl, { waitUntil: "networkidle" });
        await sleep(1200);
        await page.evaluate(() => window.scrollBy(0, 250));
        await sleep(800);

        await waitForSelectorRetry(
            page,
            `[data-e2e="comment-count"], [data-e2e="browse-comment-count"], button[aria-label*="Like"]`
        );

        return await page.evaluate(() => {
            const parse = (text = "0") => {
                const t = text.replace(/\s/g, "");
                const m =
                    t.includes("M") ? 1_000_000 :
                        t.includes("K") ? 1_000 : 1;
                const n = parseFloat(t.replace(/[^\d.]/g, ""));
                return Math.round((n || 0) * m);
            };

            const likeFromAria =
                document
                    .querySelector('button[aria-label*="Like"]')
                    ?.getAttribute("aria-label")
                    ?.match(/([\d.,KM]+)/)?.[1];

            const likesText =
                document.querySelector('[data-e2e="browse-like-count"]')?.innerText ||
                likeFromAria || "0";
            const commentsText =
                document.querySelector('[data-e2e="comment-count"]')?.innerText ||
                document.querySelector('[data-e2e="browse-comment-count"]')?.innerText || "0";
            const sharesText =
                document.querySelector('[data-e2e="share-count"]')?.innerText || "0";
            const savedText =
                document.querySelector('[data-e2e="undefined-count"]')?.innerText || "0";

            return {
                likes: parse(likesText),
                comments: parse(commentsText),
                shares: parse(sharesText),
                saved: parse(savedText)
            };
        });
    } catch {
        return { likes: 0, comments: 0, shares: 0, saved: 0 };
    }
}


// PARALLEL 6 TAB WORKER (Biar cepet)
async function runParallelEngagement6Tabs(context, videos, username) {
    const WORKERS = 6;
    const pages = [];
    const results = Array(videos.length);
    let cursor = 0;
    let completed = 0;

    for (let i = 0; i < WORKERS; i++) {
        pages.push(await context.newPage());
    }

    console.log(chalk.gray("\n┌" + "─".repeat(68) + "┐"));
    console.log(chalk.gray("│") + chalk.white.bold(" SCRAPING PROGRESS".padEnd(68)) + chalk.gray("│"));
    console.log(chalk.gray("└" + "─".repeat(68) + "┘"));

    await Promise.all(
        pages.map(async (page, workerIdx) => {
            while (true) {
                const idx = cursor++;
                if (idx >= videos.length) break;

                const v = videos[idx];
                const e = await fetchVideoEngagement(page, v.video_url);

                results[idx] = {
                    video_url: v.video_url,
                    views: parseCountText(v.views),
                    likes: e.likes,
                    comments: e.comments,
                    shares: e.shares,
                    saved: e.saved
                };

                completed++;

                const progressBar = getProgressBar(completed, videos.length, 25);
                const videoNum = chalk.cyan(`[${completed}/${videos.length}]`);
                const metrics =
                    chalk.blue("👁 ") + chalk.white(formatNumber(results[idx].views).padEnd(7)) +
                    chalk.red("❤️ ") + chalk.white(formatNumber(results[idx].likes).padEnd(6)) +
                    chalk.green("💬 ") + chalk.white(formatNumber(results[idx].comments).padEnd(6)) +
                    chalk.yellow("🔄 ") + chalk.white(formatNumber(results[idx].shares).padEnd(6)) +
                    chalk.magenta("⭐ ") + chalk.white(formatNumber(results[idx].saved));

                console.log(
                    `  ${videoNum} ${chalk.gray(progressBar)} ${metrics}`
                );

                await sleep(800);
            }
        })
    );

    for (const p of pages) await p.close();
    return results;
}


// REPOST VIDEO SCRAPER (NEW FEATURE)
async function scrapeRepostGrid(page, scrollTimes = 5) {
    console.log(chalk.gray("⏳ Mencari tab Reposts..."));

    // Click on Repost tab
    try {
        await waitForSelectorRetry(page, '[data-e2e="repost-tab"]', { timeout: 5000 });
        await page.click('[data-e2e="repost-tab"]');
        await sleep(2000);
        console.log(chalk.green("✓ Tab Reposts ditemukan.."));
    } catch (err) {
        console.log(chalk.yellow("⚠️  Tab Reposts tidak ditemukan atau user tidak punya repost"));
        return [];
    }

    // Scroll to load more repost videos
    for (let i = 0; i < scrollTimes; i++) {
        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight)
        );
        await sleep(1200);
    }

    // Wait for repost items
    try {
        await waitForSelectorRetry(page, 'div[data-e2e="user-repost-item"]', { timeout: 5000 });
    } catch (err) {
        console.log(chalk.yellow("⚠️  Tidak ada video repost yg ditemukan.."));
        return [];
    }

    return await page.evaluate(() => {
        return Array.from(
            document.querySelectorAll('div[data-e2e="user-repost-item"]')
        ).map(item => ({
            video_url: item.querySelector("a")?.href || null,
            views: item.querySelector('[data-e2e="video-views"]')?.innerText || "0"
        }));
    });
}

async function runRepostScraping(context, username, page) {
    const headerBox = boxen(
        chalk.bold.magenta(`SCRAPING REPOST VIDEO TIKTOK`) + "\n" +
        chalk.white.bold(`@${username}`),
        {
            padding: 1,
            margin: { top: 1, bottom: 1, left: 0, right: 0 },
            borderStyle: "double",
            borderColor: "magenta",
            align: "center"
        }
    );
    console.log(headerBox);

    console.log(chalk.gray(`⏳ Memuat profil @${username}...`));

    await page.goto(`https://www.tiktok.com/@${username}`, {
        waitUntil: "domcontentloaded"
    });
    await sleep(2000);

    const raw = await scrapeProfileFromDOM(page);
    const profile = {
        username,
        follower: parseCountText(raw.follower),
        following: parseCountText(raw.following),
        likes: parseCountText(raw.likes),
        bio: raw.bio,
        bioLink: raw.bioLink
    };

    printProfileBox(profile);

    console.log(chalk.gray("\n⏳ Mengumpulkan daftar video repost..."));
    const repostGrid = await scrapeRepostGrid(page, 5);

    if (repostGrid.length === 0) {
        console.log(chalk.yellow("\n⚠️  Tidak ada video repost untuk di-scrape"));
        return null;
    }

    console.log(chalk.green(`✓ Ditemukan ${repostGrid.length} video repost`));

    // Convert grid data to final format (no engagement scraping needed)
    const repostVideos = repostGrid.map(item => ({
        video_url: item.video_url,
        views: parseCountText(item.views)
    }));

    // Print repost videos table
    console.log(chalk.magenta.bold("\n📹 REPOST VIDEOS LIST:"));
    const table = new Table({
        head: [
            chalk.magenta.bold("#"),
            chalk.magenta.bold("VIEWS"),
            chalk.magenta.bold("VIDEO URL")
        ],
        colWidths: [5, 15, 60],
        style: {
            head: [],
            border: ["magenta"]
        }
    });

    repostVideos.forEach((v, idx) => {
        table.push([
            chalk.white(`${idx + 1}`),
            chalk.cyan(formatNumber(v.views)),
            chalk.gray(v.video_url.substring(0, 55) + "...")
        ]);
    });

    console.log(table.toString());

    // Calculate total views
    const totalViews = repostVideos.reduce((s, v) => s + v.views, 0);
    const avgViews = Math.round(totalViews / repostVideos.length);

    // Print simple statistics
    const statsTable = new Table({
        head: [chalk.yellow.bold("METRIC"), chalk.yellow.bold("VALUE")],
        colWidths: [25, 25],
        style: {
            head: [],
            border: ["yellow"]
        }
    });

    statsTable.push(
        [chalk.white("📹 Total Repost Videos"), chalk.cyan(repostVideos.length)],
        [chalk.white("👁  Total Views"), chalk.cyan(formatNumber(totalViews))],
        [chalk.white("📊 Average Views"), chalk.cyan(formatNumber(avgViews))]
    );

    console.log("\n" + statsTable.toString());

    // Save result with repost prefix
    const resultData = {
        scrapedAt: new Date().toISOString(),
        type: "repost",
        profile: {
            ...profile,
            repostCountLoaded: repostVideos.length
        },
        repostVideos: repostVideos,
        statistics: {
            totalVideos: repostVideos.length,
            totalViews: totalViews,
            averageViews: avgViews
        }
    };

    const filePath = saveResult(`${username}_reposts`, resultData);

    // Print JSON Preview
    console.log(chalk.magenta.bold("\n💾 SAVED JSON OUTPUT:"));
    const jsonPreview = {
        scrapedAt: resultData.scrapedAt,
        type: resultData.type,
        profile: resultData.profile,
        repostVideos: repostVideos.slice(0, 3).map(v => ({
            ...v,
            video_url: v.video_url.substring(0, 50) + "..."
        })),
        "...": `and ${Math.max(0, repostVideos.length - 3)} more videos`,
        statistics: resultData.statistics
    };

    const jsonBox = boxen(
        colorizeJSON(jsonPreview),
        {
            padding: 1,
            margin: { top: 0, bottom: 1, left: 0, right: 0 },
            borderStyle: "round",
            borderColor: "magenta"
        }
    );
    console.log(jsonBox);

    const successBox = boxen(
        chalk.green.bold("✅ SCRAPING REPOST BERHASIL!") + "\n\n" +
        chalk.white(`Username: `) + chalk.cyan(`@${username}`) + "\n" +
        chalk.white(`File: `) + chalk.yellow(filePath) + "\n" +
        chalk.white(`Repost Videos: `) + chalk.blue(repostVideos.length) + "\n" +
        chalk.white(`Total Views: `) + chalk.magenta(formatNumber(totalViews)) + "\n" +
        chalk.white(`Avg Views: `) + chalk.magenta(formatNumber(avgViews)),
        {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            borderColor: "green",
            align: "center"
        }
    );
    console.log(successBox);

    return resultData;
}

async function runEngagementScraping(context, username, page) {
    const headerBox = boxen(
        chalk.bold.cyan(`SCRAPING VIDEO ENGAGEMENT`) + "\n" +
        chalk.white.bold(`@${username}`),
        {
            padding: 1,
            margin: { top: 1, bottom: 1, left: 0, right: 0 },
            borderStyle: "double",
            borderColor: "cyan",
            align: "center"
        }
    );
    console.log(headerBox);

    console.log(chalk.gray(`⏳ Memuat profil @${username}...`));

    await page.goto(`https://www.tiktok.com/@${username}`, {
        waitUntil: "domcontentloaded"
    });
    await sleep(2000);

    const raw = await scrapeProfileFromDOM(page);
    const profile = {
        username,
        follower: parseCountText(raw.follower),
        following: parseCountText(raw.following),
        likes: parseCountText(raw.likes),
        bio: raw.bio,
        bioLink: raw.bioLink
    };

    printProfileBox(profile);

    console.log(chalk.gray("\n⏳ Mengumpulkan daftar video..."));
    const grid = await scrapeVideoGrid(page, 5);
    const MAX_VIDEOS = 15;
    const targetVideos = grid.slice(0, MAX_VIDEOS);

    console.log(chalk.green(`✓ Ditemukan ${targetVideos.length} video`));

    const WORKERS = 6;
    console.log(chalk.cyan(`⚡ Mulai scraping engagement (${WORKERS} parallel workers - FAST MODE)...`));

    const videos = await runParallelEngagement6Tabs(
        context,
        targetVideos,
        username
    );

    // Print statistics
    printStatsBox(videos, profile);

    // Print top videos
    printTopVideos(videos);

    // Save result
    const resultData = {
        scrapedAt: new Date().toISOString(),
        type: "engagement",
        profile: {
            ...profile,
            videoCountLoaded: videos.length
        },
        videos
    };

    const filePath = saveResult(username, resultData);

    // Print JSON Preview
    console.log(chalk.magenta.bold("\n💾 SAVED JSON OUTPUT:"));
    const jsonBox = boxen(
        colorizeJSON(resultData),
        {
            padding: 1,
            margin: { top: 0, bottom: 1, left: 0, right: 0 },
            borderStyle: "round",
            borderColor: "magenta"
        }
    );
    console.log(jsonBox);

    const successBox = boxen(
        chalk.green.bold("✅ SCRAPING ENGAGEMENT BERHASIL!") + "\n\n" +
        chalk.white(`Username: `) + chalk.cyan(`@${username}`) + "\n" +
        chalk.white(`File: `) + chalk.yellow(filePath) + "\n" +
        chalk.white(`Videos: `) + chalk.blue(videos.length) + "\n" +
        chalk.white(`Total Views: `) + chalk.magenta(formatNumber(videos.reduce((s, v) => s + v.views, 0))),
        {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            borderColor: "green",
            align: "center"
        }
    );
    console.log(successBox);

    return resultData;
}


// MAIN (otaknya)
(async () => {
    console.clear();
    printAsciiArt();

    const titleBox = boxen(
        chalk.bold.white("TikTok Profile & Video Analytics Scraper") + "\n" +
        chalk.gray("Scrape profile data, video stats, engagement metrics, and reposts"),
        {
            padding: 1,
            margin: 1,
            borderStyle: "round",
            borderColor: "cyan",
            align: "center"
        }
    );
    console.log(titleBox);

    // Menu Pilihan
    console.log(chalk.bold.white("\n📋 PILIH MODE SCRAPING:\n"));
    console.log(chalk.cyan("  1.") + chalk.white(" Scrape Video Analytics") + chalk.gray(" (likes, comments, shares, views)"));
    console.log(chalk.magenta("  2.") + chalk.white(" Scrape Video Repost") + chalk.gray(" (reposted videos dari user)"));
    console.log("");

    const modeInput = await ask(chalk.yellow("🎯 Pilih mode (1/2): "));
    const mode = modeInput.trim();

    if (mode !== "1" && mode !== "2") {
        console.log(chalk.red("❌ Pilihan tidak valid. Harus 1 atau 2"));
        rl.close();
        process.exit(1);
    }

    const modeText = mode === "1" ? "Video Engagement" : "Video Repost";
    console.log(chalk.green(`✓ Mode dipilih: ${modeText}\n`));

    const input = await ask(chalk.yellow("📝 Masukkan username TikTok: "));
    const usernames = input
        .split(",")
        .map(u => u.trim().replace("@", ""))
        .filter(Boolean);

    if (!usernames.length) {
        console.log(chalk.red("❌ Tidak ada username yang valid"));
        rl.close();
        process.exit(1);
    }

    const ok = await ask(chalk.yellow("\n❓ Lanjutkan scraping? (y/n): "));
    rl.close();
    if (ok.toLowerCase() !== "y") {
        console.log(chalk.gray("👋 Dibatalkan."));
        process.exit(0);
    }

    console.log(chalk.cyan("\n🌐 Meluncurkan browser chrome..."));
    const { browser, context, page } = await launchBrowser();
    console.log(chalk.green("✓ Browser chrome siap digunakan!\n"));

    for (let i = 0; i < usernames.length; i++) {
        const username = usernames[i];

        try {
            if (mode === "1") {
                await runEngagementScraping(context, username, page);
            } else {
                await runRepostScraping(context, username, page);
            }
        } catch (error) {
            console.log(chalk.red(`\n❌ Error scraping @${username}: ${error.message}`));
        }

        // Jeda antar user
        if (i < usernames.length - 1) {
            console.log(chalk.gray("\n⏳ Menunggu 3 detik sebelum scraping akun berikutnya...\n"));
            await sleep(3000);
        }
    }

    await browser.close();

    const finalBox = boxen(
        chalk.green.bold("🎉 SEMUA SCRAPING SELESAI!") + "\n\n" +
        chalk.white(`Mode: `) + chalk.cyan(modeText) + "\n" +
        chalk.white(`Total Akun: `) + chalk.cyan(usernames.length) + "\n" +
        chalk.white(`Hasil disimpan di: `) + chalk.yellow("results/"),
        {
            padding: 2,
            margin: 1,
            borderStyle: "double",
            borderColor: "green",
            align: "center"
        }
    );
    console.log(finalBox);
})();
