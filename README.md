# 🎬 TikTok Scraper Bot Pro

<div align="center">

![Version](https://img.shields.io/badge/version-3.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-production-success.svg)

**Professional TikTok Profile & Video Analytics Scraper**

*Scrape TikTok profiles, video statistics, reposts, and engagement metrics with beautiful console output*

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Documentation](#-documentation) • [FAQ](#-faq)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Examples](#-usage-examples)
- [Output Format](#-output-format)
- [Configuration](#-configuration)
- [Technical Details](#-technical-details)
- [Troubleshooting](#-troubleshooting)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)

---

## 🌟 Overview

TikTok Scraper Bot Pro adalah tool profesional untuk scraping data profil dan video TikTok dengan:
- ✨ **Beautiful Console UI** - ASCII art, colors, tables, dan progress bars
- 🚀 **Parallel Processing** - 6 concurrent workers untuk scraping SUPER cepat
- 📊 **Comprehensive Analytics** - Engagement rate, top videos, dan aggregate statistics
- � **Repost Scraper** - Scrape video yang di-repost oleh user (FITUR BARU!)
- 🎯 **Dual Mode** - Pilih antara engagement scraping atau repost scraping
- �💾 **Structured Output** - JSON format yang clean dan well-formatted
- 🎨 **Enhanced UX** - Real-time progress tracking dengan visualisasi yang menarik

> **Note:** Tool ini dibuat untuk educational purposes dan research. Pastikan untuk mematuhi TikTok's Terms of Service.

---

## ✨ Features

### 🎨 Visual Features
- **ASCII Art Banner** - Eye-catching startup logo
- **Colorful Console** - Color-coded output dengan chalk
- **CLI Tables** - Beautiful structured data display
- **Boxen Sections** - Visual boxes untuk setiap section
- **Progress Bars** - Animated real-time progress tracking
- **JSON Syntax Highlighting** - Colorized JSON preview
- **Interactive Mode Selection** - Pilih mode scraping yang diinginkan

### 📊 Data Features
- **Profile Scraping** - Followers, following, likes, bio, links
- **Video Metrics** - Views, likes, comments, shares, saved
- **Engagement Analytics** - Auto-calculate engagement rate
- **Top Videos Ranking** - Identify best performing content
- **Aggregate Statistics** - Total and average metrics
- **Repost Video Scraper** - Scrape semua video yang di-repost user (NEW!)
- **Dual Output Modes** - Engagement atau Repost data format

### ⚡ Performance Features
- **Parallel Processing** - 6 concurrent workers (FAST MODE)
- **Smart Retry Logic** - Automatic retry on failures
- **Network Optimization** - Efficient page loading
- **Resource Management** - Proper cleanup and error handling

---

## 📸 Screenshots

### 🎭 Startup Banner
```
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
```

### 📊 Profile Data Table
```
┌─────────────────────────┬─────────────────────────────────┐
│ PROFILE DATA            │ VALUE                           │
├─────────────────────────┼─────────────────────────────────┤
│ 👤 Username             │ @mydentsdentalcare              │
│ 👥 Followers            │ 11,700                          │
│ ➕ Following            │ 4                               │
│ ❤️  Total Likes         │ 307,100                         │
│ 📝 Bio                  │ 🦷 Lokasi Tangsel...            │
│ 🔗 Link                 │ linktr.ee/mydentsdentalcare     │
└─────────────────────────┴─────────────────────────────────┘
```

### ⚡ Real-time Progress
```
┌──────────────────────────────────────────────────────────┐
│ SCRAPING PROGRESS                                        │
└──────────────────────────────────────────────────────────┘
  [1/15] ████████░░░░░░░░░░░░ 7%  👁 2.50M ❤️ 50.2K 💬 2.1K
  [2/15] ████████████████░░░░ 13% 👁 433.7K ❤️ 21.2K 💬 610
```

### 💯 Engagement Rate
```
╔═══════════════════════════════════╗
║   ENGAGEMENT RATE: 1.78%          ║
║   142.8K interactions / 7.98M ... ║
╚═══════════════════════════════════╝
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** >= 14.0.0
- **npm** >= 6.0.0
- **Chrome/Chromium** browser installed

### Steps

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/tiktok-scraper-bot.git
cd tiktok-scraper-bot
```

2. **Install Dependencies**
```bash
npm install
```

3. **Install Playwright Browsers** (if needed)
```bash
npx playwright install chrome
```

4. **Verify Installation**
```bash
npm start
```

---

## ⚡ Quick Start

### Basic Usage

```bash
npm start
```

Kemudian:
1. **Pilih Mode**: Pilih mode scraping yang diinginkan
```
📋 PILIH MODE SCRAPING:
  1. Scrape Video Analytics (likes, comments, shares, views)
  2. Scrape Video Repost (reposted videos dari user)

🎯 Pilih mode (1/2): 1
```

2. **Input Username**: Masukkan username TikTok (tanpa @)
```
📝 Masukkan username TikTok: mydentsdentalcare
```

3. **Confirm**: Ketik `y` untuk melanjutkan
```
❓ Lanjutkan scraping? (y/n): y
```

4. **Watch the Magic!** 🎉

### Multiple Accounts

Scrape multiple accounts sekaligus (pisahkan dengan koma):
```
📝 Masukkan username TikTok: account1,account2,account3
```

---

## 💻 Usage Examples

### Example 1: Engagement Mode (Video Analytics)
```bash
$ npm start

� PILIH MODE SCRAPING:
  1. Scrape Video Analytics (likes, comments, shares, views)
  2. Scrape Video Repost (reposted videos dari user)

🎯 Pilih mode (1/2): 1
�📝 Masukkan username TikTok: mydentsdentalcare
❓ Lanjutkan scraping? (y/n): y

# Output: Beautiful console display + JSON file saved as mydentsdentalcare.json
```

### Example 2: Repost Mode (Video Reposts) - NEW!
```bash
$ npm start

📋 PILIH MODE SCRAPING:
  1. Scrape Video Analytics (likes, comments, shares, views)
  2. Scrape Video Repost (reposted videos dari user)

🎯 Pilih mode (1/2): 2
📝 Masukkan username TikTok: mydentsdentalcare
❓ Lanjutkan scraping? (y/n): y

# Output: Repost videos list + JSON file saved as mydentsdentalcare_reposts.json
```

### Example 3: Multiple Accounts
```bash
$ npm start

🎯 Pilih mode (1/2): 1
📝 Masukkan username TikTok: user1,user2,user3
❓ Lanjutkan scraping? (y/n): y

# Scrapes 3 accounts sequentially
# Saves: results/user1.json, results/user2.json, results/user3.json
```

### Example 4: Programmatic Usage
```javascript
const { launchBrowser } = require('./src/browser');
const { scrapeProfileFromDOM } = require('./src/index');

(async () => {
    const { browser, page } = await launchBrowser();
    await page.goto('https://www.tiktok.com/@username');
    const profile = await scrapeProfileFromDOM(page);
    console.log(profile);
    await browser.close();
})();
```

---

## 📁 Output Format

### File Structure
```
results/
├── username1.json                  (engagement mode)
├── username2_reposts.json          (repost mode)
└── username3.json                  (engagement mode)
```

### JSON Schema - Engagement Mode
```json
{
  "scrapedAt": "2025-12-20T00:05:32.252Z",
  "type": "engagement",
  "profile": {
    "username": "mydentsdentalcare",
    "follower": 11700,
    "following": 4,
    "likes": 307100,
    "bio": "🦷 Lokasi Tangsel, Jaksel & Bekasi 🦷",
    "bioLink": "linktr.ee/mydentsdentalcare",
    "videoCountLoaded": 15
  },
  "videos": [
    {
      "video_url": "https://www.tiktok.com/@mydentsdentalcare/video/7477879270786796808",
      "views": 2500000,
      "likes": 50200,
      "comments": 2108,
      "shares": 1249,
      "saved": 2678
    }
    // ... more videos
  ]
}
```

### JSON Schema - Repost Mode (NEW!)
```json
{
  "scrapedAt": "2025-12-20T00:05:32.252Z",
  "type": "repost",
  "profile": {
    "username": "mydentsdentalcare",
    "follower": 11700,
    "following": 4,
    "likes": 307100,
    "bio": "🦷 Lokasi Tangsel, Jaksel & Bekasi 🦷",
    "bioLink": "linktr.ee/mydentsdentalcare",
    "repostCountLoaded": 10
  },
  "repostVideos": [
    {
      "video_url": "https://www.tiktok.com/@otheruser/video/7477879270786796808",
      "views": 1250000
    }
    // ... more repost videos
  ],
  "statistics": {
    "totalVideos": 10,
    "totalViews": 5000000,
    "averageViews": 500000
  }
}
```

### Data Types
| Field | Type | Description |
|-------|------|-------------|
| `type` | String | "engagement" or "repost" |
| `scrapedAt` | ISO String | Timestamp when scraped |
| `username` | String | TikTok username |
| `follower` | Number | Follower count |
| `following` | Number | Following count |
| `likes` | Number | Total profile likes |
| `bio` | String/null | Profile bio text |
| `bioLink` | String/null | Bio link URL |
| `videoCountLoaded` | Number | Videos scraped (engagement mode) |
| `repostCountLoaded` | Number | Reposts scraped (repost mode) |
| `views` | Number | Video view count |
| `likes` | Number | Video like count (engagement only) |
| `comments` | Number | Comment count (engagement only) |
| `shares` | Number | Share count (engagement only) |
| `saved` | Number | Bookmark/saved count (engagement only) |

---

## ⚙️ Configuration

### Adjust Video Limit
Edit `src/index.js`:
```javascript
const MAX_VIDEOS = 15; // Change to desired number
```

### Adjust Worker Threads
```javascript
const WORKERS = 6; // Current: 6 (FAST MODE), Range: 1-10
```

### Adjust Retry Logic
```javascript
async function waitForSelectorRetry(
    page,
    selector,
    { retries = 8, timeout = 5000, delay = 1200 } = {}
)
```

### Adjust Scroll Depth
```javascript
// Untuk engagement mode (video asli)
const grid = await scrapeVideoGrid(page, 5); // Number of scrolls

// Untuk repost mode
const repostGrid = await scrapeRepostGrid(page, 5); // Number of scrolls
```

> **Note**: Repost mode scroll depth mempengaruhi berapa banyak repost yang akan di-load dari halaman profil.

---

## 🔧 Technical Details

### Architecture
```
src/
├── index.js      # Main entry point + enhanced logging
├── browser.js    # Browser automation setup
├── output.js     # File saving utilities
├── video.js      # Video scraping utilities
├── profile.js    # Profile scraping utilities
└── network.js    # Network utilities
```

### Technology Stack
- **Runtime**: Node.js
- **Browser Automation**: Playwright (Chromium)
- **Console UI**: 
  - `chalk` - Terminal colors
  - `cli-table3` - ASCII tables
  - `boxen` - Bordered boxes

### Key Algorithms

#### Parallel Processing
```javascript
// 6 concurrent workers process videos simultaneously (FAST MODE)
Promise.all([worker1, worker2, worker3, worker4, worker5, worker6])
```

#### Engagement Rate Calculation
```javascript
engagementRate = ((likes + comments + shares) / views) × 100
```

#### Smart Number Formatting
```javascript
1000 → "1.0K"
1000000 → "1.00M"
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: `boxen is not a function`
**Solution**: Ensure boxen version 5.1.2 is installed
```bash
npm install boxen@5.1.2
```

#### Issue: Colors not showing
**Solution**: 
- Use terminal that supports ANSI colors
- Windows: Use Windows Terminal or update CMD
- Mac/Linux: Most terminals work by default

#### Issue: Browser doesn't open
**Solution**:
```bash
# Reinstall Playwright browsers
npx playwright install chrome
```

#### Issue: Selector timeout
**Solution**:
- Check internet connection
- Verify TikTok username is valid
- Increase retry timeout in `waitForSelectorRetry()`

#### Issue: Rate limiting
**Solution**:
- Reduce `MAX_VIDEOS`
- Increase `sleep()` delays
- Use fewer `WORKERS`

#### Issue: Repost tab not found (NEW!)
**Solution**:
- User mungkin belum pernah repost video
- Pastikan menggunakan mode yang benar (mode 2)
- Coba dengan username lain yang memiliki reposts
- Tab repost hanya muncul jika user sudah pernah repost

#### Issue: No repost videos found
**Solution**:
- Ini adalah kondisi normal jika user tidak memiliki repost
- Tool akan menampilkan pesan "Tidak ada video repost"
- Coba dengan username lain atau gunakan engagement mode

### Debug Mode
Set environment variable:
```bash
# Windows
set DEBUG=true
npm start

# Mac/Linux
DEBUG=true npm start
```

---

## 📚 Best Practices

### Do's ✅
- ✅ Respect TikTok's rate limits
- ✅ Use reasonable `MAX_VIDEOS` (≤ 20)
- ✅ Add delays between requests
- ✅ Handle errors gracefully
- ✅ Backup scraped data

### Don'ts ❌
- ❌ Don't scrape too frequently (wait 1-2 minutes between runs)
- ❌ Don't use too many workers (6 is optimized, max 10)
- ❌ Don't ignore error messages
- ❌ Don't distribute scraped data without permission
- ❌ Don't assume all users have repost videos

### Recommendations
1. **Rate Limiting**: Wait at least 1 minute between scraping same account
2. **Data Storage**: Use database for large-scale operations
3. **Error Handling**: Always check if files exist before processing
4. **Legal Compliance**: Review TikTok's ToS and local laws
5. **Mode Selection**: Use engagement mode for detailed metrics, repost mode for tracking content sharing
6. **Repost Scraping**: Check if user has reposts before expecting data (graceful failure handling)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Coding Standards
- Use `const` and `let` (no `var`)
- Follow existing code style
- Add comments for complex logic
- Update documentation for new features

### Testing
- Test on multiple TikTok accounts
- Verify JSON output format
- Check console output formatting
- Test error scenarios

---

## 📊 Performance Metrics

### Benchmarks

#### Engagement Mode (Mode 1)
- **Profile scraping**: ~2-3 seconds
- **Per video**: ~2-3 seconds with retry
- **15 videos (6 workers)**: ~40-60 seconds ⚡ (FAST!)
- **Memory usage**: ~250-350MB
- **CPU usage**: Moderate (browser rendering)

#### Repost Mode (Mode 2) - NEW!
- **Profile scraping**: ~2-3 seconds
- **Repost grid loading**: ~5-10 seconds
- **Total time (10 reposts)**: ~10-20 seconds ⚡⚡ (SUPER FAST!)
- **Memory usage**: ~200-250MB (lighter than engagement mode)
- **CPU usage**: Low-Moderate

### Optimization Tips
1. Use `headless: true` for production (faster)
2. Reduce `MAX_VIDEOS` for quicker results
3. Workers already optimized at 6 (decrease if rate-limited)
4. Disable images/CSS loading (advanced)

---

## ❓ FAQ

### General Questions

**Q: Apa perbedaan antara Engagement Mode dan Repost Mode?**
A: 
- **Engagement Mode (Mode 1)**: Scrape video asli user dengan metrics lengkap (views, likes, comments, shares, saved)
- **Repost Mode (Mode 2)**: Scrape video yang di-repost oleh user (hanya views, tidak ada engagement metrics)

**Q: Kenapa saya harus memilih mode?**
A: Mode selection memungkinkan Anda fokus pada data yang Anda butuhkan:
- Gunakan Mode 1 untuk analisis performa video user
- Gunakan Mode 2 untuk tracking konten yang user share/repost

**Q: Apakah saya bisa scrape engagement dan repost sekaligus?**
A: Tidak dalam satu run. Jalankan scraper dua kali dengan mode berbeda untuk mendapatkan kedua jenis data.

### Repost Scraper Questions

**Q: Kenapa repost scraper mengatakan "Tab Reposts tidak ditemukan"?**
A: Tab repost hanya muncul jika user pernah repost video. Jika user tidak pernah repost, tab ini tidak ada di profil TikTok mereka.

**Q: Mengapa repost video tidak memiliki data likes/comments/shares?**
A: Repost scraper hanya mengambil data views dari grid view. Untuk mendapatkan engagement metrics untuk video repost, gunakan engagement mode dengan URL video tersebut.

**Q: Apakah semua user memiliki fitur repost?**
A: Ya, tetapi tidak semua user menggunakan fitur ini. Banyak user yang tidak pernah repost video.

### Technical Questions

**Q: Berapa lama waktu scraping untuk satu akun?**
A: 
- **Engagement Mode**: ~40-60 detik untuk 15 video
- **Repost Mode**: ~10-20 detik (tergantung jumlah repost)

**Q: Apakah bisa di-customize jumlah video yang di-scrape?**
A: Ya, edit `MAX_VIDEOS` di `src/index.js` untuk engagement mode. Repost mode akan scrape semua yang tersedia.

**Q: Kenapa output file berbeda untuk repost?**
A: File repost memiliki suffix `_reposts.json` untuk membedakan dengan file engagement. Ini memudahkan identifikasi tipe data.

---

## 📝 Changelog

### v3.0 (Current) - Repost Scraper & Mode Selection 🆕
- ✨ **NEW FEATURE**: Repost Video Scraper - Scrape video yang di-repost oleh user
- ✨ **NEW FEATURE**: Interactive Mode Selection - Pilih antara Engagement atau Repost mode
- ✨ Dual output format with `type` field ("engagement" vs "repost")
- ✨ Repost statistics (totalVideos, totalViews, averageViews)
- ✨ Separate file naming for reposts (`username_reposts.json`)
- ✨ Beautiful repost-specific console tables and boxes
- ✨ Automatic repost tab detection and handling
- 🐛 Fixed selector handling for repost items
- 📚 Updated documentation for new features

### v2.0 - Enhanced Console Logging
- ✨ Added ASCII art banner
- ✨ Implemented colorful console with chalk
- ✨ Created beautiful tables with cli-table3
- ✨ Added boxen for visual sections
- ✨ Real-time progress bars
- ✨ Colorized JSON preview
- ✨ Engagement rate calculation
- ✨ Top 5 videos ranking
- ✨ Professional success boxes

### v1.0 - Initial Release
- Basic profile scraping
- Video metrics collection
- Simple console output
- JSON file export

---

## ⚖️ Legal & Ethics

### Disclaimer
This tool is for **educational and research purposes only**. Users are responsible for:
- Complying with TikTok's Terms of Service
- Respecting privacy and data protection laws
- Not using scraped data for malicious purposes
- Obtaining necessary permissions

### Ethical Guidelines
1. **Respect Privacy**: Don't scrape private accounts
2. **Rate Limiting**: Don't overload TikTok servers
3. **Data Usage**: Use data responsibly
4. **Attribution**: Give credit to content creators
5. **Compliance**: Follow all applicable laws

---

## 📞 Support

### Get Help
- 📖 **Documentation**: Read this README thoroughly
- 🐛 **Bug Reports**: [Open an issue](https://github.com/xdreizein666/tiktok-scraper/issues)
- 💬 **Questions**: [Discussions](https://github.com/xdreizein666/tiktok-scraper/discussions)
- 📧 **Email**: xdreizein@gmail.com

### Community
- ⭐ Star this repo if you find it useful
- 🔄 Share with others who might benefit
- 🤝 Contribute improvements

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 @mfajarb & @xdreizein666

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👏 Credits

### Author
**@mfajarb**
- 🌐 GitHub: [@mfajarb](https://github.com/xdreizein666)
- 📧 Email: xdreizein@gmail.com

### Technologies Used
- [Playwright](https://playwright.dev/) - Browser automation
- [Chalk](https://github.com/chalk/chalk) - Terminal styling
- [cli-table3](https://github.com/cli-table/cli-table3) - ASCII tables
- [Boxen](https://github.com/sindresorhus/boxen) - Boxes in terminal
- [Node.js](https://nodejs.org/) - JavaScript runtime

### Inspiration
- Modern CLI tools (Vercel, Next.js)
- Professional scraping frameworks
- Beautiful terminal UIs

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/tiktok-scraper&type=Date)](https://star-history.com/#yourusername/tiktok-scraper&Date)

---

## 📈 Statistics

![GitHub stars](https://img.shields.io/github/stars/yourusername/tiktok-scraper?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/tiktok-scraper?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/tiktok-scraper?style=social)

---

<div align="center">

**Made with ❤️ by @mfajarb**

*Happy Scraping! 🚀*

[⬆ Back to Top](#-tiktok-scraper-bot-pro)

</div>
