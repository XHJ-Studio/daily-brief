# 📰 Daily Brief

> **AI-Driven Personalized News Briefing Generator**
> 
> Your personal President's Daily Brief (PDB) — aggregating 145+ global RSS feeds, powered by AI, delivered every morning.

[![Version](https://img.shields.io/github/v/tag/XHJ-Studio/daily-brief?label=version&color=blue)](https://github.com/XHJ-Studio/daily-brief/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)
[![RSS Feeds](https://img.shields.io/badge/RSS%20Feeds-145+-green.svg)](./sources.json)
[![News Sources](https://img.shields.io/badge/News%20Sources-65+-orange.svg)](./sources.json)
[![Verified](https://img.shields.io/badge/Verified-70+-brightgreen.svg)](./sources.json)
[![Stars](https://img.shields.io/github/stars/XHJ-Studio/daily-brief.svg)](https://github.com/XHJ-Studio/daily-brief)

---

## 🌟 Why Daily Brief?

In an age of information overload, **Daily Brief** cuts through the noise:

- 📡 **145+ Premium RSS Feeds** - Curated from 65+ top-tier global media outlets
- 🤖 **AI-Powered Summaries** - Get the essence of each story in seconds
- ⏰ **Scheduled Delivery** - Your briefing arrives every morning at 9 AM
- 🎯 **Smart Filtering** - Only news that matters to *you*
- 🌍 **Global Coverage** - US, China, Europe, Asia — all in one place
- 📊 **Quality Scoring** - AI evaluates news credibility and relevance
- 🔄 **Auto-Deduplication** - No duplicate stories across sources
- 📱 **Multi-Platform** - Discord, Telegram, WeChat support

> "Like having a team of analysts working for you 24/7."

---

## 📋 Table of Contents

- [Features](#-features)
- [Slash Commands](#-slash-commands)
- [Media Sources](#-media-sources)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Statistics](#-statistics)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 📡 Massive RSS Network
- **145+ RSS feeds** from verified sources
- **65+ media outlets** across 10 categories
- **84% success rate** with auto-failover
- **Real-time health checks** every hour

### 🤖 AI Intelligence
- **Smart Summarization** - Extract key points automatically
- **Quality Scoring** - Rate news by credibility (0-1 scale)
- **Interest Matching** - Filter by your keywords
- **Auto-Categorization** - Organize by topic

### ⏰ Automation
- **Cron Scheduler** - Daily delivery at 9:00 AM
- **Timezone Support** - Works in any timezone
- **Retry Logic** - 3 attempts for failed fetches
- **Health Monitoring** - Auto-detect offline sources

### 💬 Slash Commands
- **`/brief`** - Generate daily briefing instantly
- **`/brief search <keyword>`** - Search news by topic
- **`/news`** - Quick view latest news by category
- **`/search <keyword>`** - Search across all sources

### 📊 Analytics
- **News Statistics** - Track sources, categories, trends
- **Delivery Reports** - Know what was sent when
- **Source Status** - Real-time availability checks

---

## 💬 Slash Commands

Daily Brief supports powerful slash commands for quick access:

### `/brief` - Generate Briefing

```bash
/brief                    # Generate today's briefing
/brief search AI          # Search AI-related news
/brief sources            # View subscribed sources
/brief config             # View current configuration
/brief status             # Check source health status
```

**Example Output:**
```markdown
# 📰 Daily Brief
**Date**: 2026-03-09 Monday
**Issue**: #001

## 🔥 Top Stories
1. **[Tech] OpenAI Releases GPT-5** - New model achieves...
```

### `/news` - Quick News

```bash
/news                     # View latest news
/news tech                # Technology news
/news finance             # Finance news
/news global              # International news
/news china               # China news
```

### `/search` - Search News

```bash
/search 人工智能           # Search AI news
/search Trump             # Search Trump news
/search crypto            # Search cryptocurrency news
```

### Auto-Trigger Keywords

Daily Brief also activates automatically when you mention:
- "新闻"、"简报"、"资讯"、"RSS"
- "news"、"briefing"、"headline"、"update"
- "今天有什么新闻"、"看看资讯"

---

## 🌐 Media Sources

### Global News (30 outlets)
**Tier 1 Media:**
- 🇺🇸 **CNN** (Top/World/Tech/Business)
- 🇺🇸 **New York Times** (Home/World/Tech/Business)
- 🇺🇸 **Washington Post**
- 🇺🇸 **AP News** (World/Technology)
- 🇺🇸 **Bloomberg** (Markets/Technology)
- 🇺🇸 **Wall Street Journal**
- 🇬🇧 **BBC** (World/Home/Tech/Business)
- 🇬🇧 **Reuters** (World/Business/Tech)
- 🇬🇧 **The Guardian** (World/UK/Tech)
- 🇬🇧 **Financial Times**
- 🇬🇧 **The Economist**

**More:** TIME, Newsweek, USA Today, CNBC, MarketWatch, Forbes, Fortune, Politico...

### China News (15 outlets)
- 财新网 ✅
- 36 氪 ✅
- IT 之家 ✅
- 虎嗅 ✅
- 钛媒体 ✅
- 澎湃新闻
- 中国日报

### Technology (15 outlets)
- TechCrunch ✅
- The Verge ✅
- Wired ✅
- Ars Technica ✅
- Engadget ✅
- MIT Technology Review ✅
- ZDNet, CNET, VentureBeat...

### Finance (10 outlets)
- Bloomberg Markets ✅
- CNBC ✅
- MarketWatch ✅
- Forbes ✅
- Wall Street Journal ✅

### Regional News
- **Asia (7)**: Japan Times, NHK, SCMP, Times of India...
- **Europe (6)**: Deutsche Welle, France 24, Euronews...

👉 **Full list**: [`sources.json`](./sources.json)

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn
- OpenClaw (for integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/XHJ-Studio/daily-brief.git
cd daily-brief

# Install dependencies
npm install

# Configure your interests
cp interests.json.example interests.json
# Edit interests.json with your keywords

# Test run
npm start
```

### Setup Scheduled Delivery

#### Option 1: OpenClaw Cron (Recommended)
```bash
openclaw cron add --config cron.json
```

#### Option 2: System Cron
```bash
crontab -e
# Add this line (daily at 9 AM):
0 9 * * * cd /path/to/daily-brief && node src/index.js
```

#### Option 3: Node.js Scheduler
```javascript
const cron = require('node-cron');
const briefing = require('./src/index');

cron.schedule('0 9 * * *', () => {
  briefing.main();
});
```

---

## ⚙️ Configuration

### config.json
```json
{
  "schedule": {
    "time": "09:00",
    "timezone": "Asia/Shanghai",
    "skipWeekends": false
  },
  "output": {
    "channel": "discord",
    "accountId": "somi",
    "format": "markdown",
    "maxNewsCount": 15
  },
  "summary": {
    "enabled": true,
    "model": "bailian/qwen3.5-plus",
    "maxLength": 300,
    "language": "zh-CN"
  },
  "filter": {
    "minQuality": 0.6,
    "deduplicate": true,
    "excludeKeywords": ["gossip", "celebrity"],
    "priorityKeywords": ["AI", "tech", "startup"]
  }
}
```

### interests.json
```json
{
  "keywords": [
    "artificial intelligence",
    "machine learning",
    "startup",
    "investment",
    "technology"
  ],
  "excludeKeywords": [
    "entertainment",
    "gossip",
    "celebrity"
  ],
  "mustInclude": [
    "OpenAI",
    "Google",
    "Apple",
    "Microsoft"
  ],
  "categories": {
    "enabled": ["tech", "finance", "ai"],
    "disabled": ["sports", "entertainment"]
  }
}
```

### sources.json
Manage 145+ RSS feeds with:
- Source URL
- Language & Country
- Priority (1-99)
- Enabled/Disabled status
- Verification status

---

## 📖 Usage

### Command Line

```bash
# Generate daily briefing
npm start

# Check RSS source health
npm run check-sources

# Test filtering
node src/filter.js

# View statistics
node src/index.js --stats
```

### Programmatic Usage

```javascript
const briefing = require('./src/index');

// Generate and send briefing
await briefing.main();

// Fetch RSS feeds
const fetch = require('./src/fetch');
const articles = await fetch.fetchRSS('https://example.com/rss');

// Filter articles
const filter = require('./src/filter');
const filtered = filter.filterArticles(articles, interests);

// Generate summary
const summarize = require('./src/summarize');
const summary = summarize.generateSummary(content, 200);
```

### Example Output

```markdown
# 📰 Daily Brief
**Date**: 2026-03-09 Monday
**Issue**: #001

---

## 🔥 Top Stories
1. **[Tech] OpenAI Releases GPT-5** - New model achieves...
   [Read more](https://...)

2. **[Finance] Nasdaq Hits Record High** - Tech stocks lead...
   [Read more](https://...)

---

## 📱 Technology
- **AI Breakthrough**: Researchers discover...
  [Link](https://...)

---

## 🌍 World News
- **Policy Change**: EU passes...
  [Link](https://...)

---

*🤖 Generated by Daily Brief v1.2.0*
```

---

## 📁 Project Structure

```
daily-brief/
├── 📄 README.md              # This file
├── 📄 SKILL.md               # OpenClaw skill documentation
├── 📄 LICENSE                # MIT License
├── 📄 .gitignore            # Git ignore rules
├── 📄 config.json           # Main configuration
├── 📄 sources.json          # RSS feeds database (145+)
├── 📄 interests.json        # User interests (gitignored)
├── 📄 cron.json            # Cron job configuration
├── 📄 package.json         # Node.js dependencies
├── 📁 src/
│   ├── index.js            # Main entry point
│   ├── fetch.js            # RSS feed fetching
│   ├── filter.js           # Content filtering & scoring
│   ├── summarize.js        # AI summarization
│   └── send.js             # Multi-platform delivery
└── 📁 templates/
    └── briefing.md         # Briefing template
```

---

## 📊 Statistics

| Metric | Count | Status |
|--------|-------|--------|
| **Total RSS Feeds** | 145+ | ✅ Active |
| **News Outlets** | 65+ | ✅ Verified |
| **Sources Verified** | 70+ | ✅ 84% Success |
| **Categories** | 10 | ✅ Configured |
| **Languages** | 5+ | ✅ Multi-lang |
| **Regions** | 4 | ✅ Global |

### Source Distribution

```
Global News:      ████████████████████ 30 sources (30%)
Technology:       ██████████ 15 sources (15%)
China News:       ██████████ 15 sources (15%)
Finance:          ███████ 10 sources (10%)
Asia News:        █████ 7 sources (7%)
Europe News:      ████ 6 sources (6%)
AI & ML:          █████████ 13 sources (13%)
Communities:      ███████ 10 sources (10%)
Others:           ████████ 9 sources (9%)
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
1. **Add RSS Sources** - Found a great news source? Add it to `sources.json`
2. **Improve Filters** - Better keyword matching or quality scoring
3. **New Features** - Multi-language support, custom templates
4. **Bug Reports** - Found an issue? Open an issue!
5. **Documentation** - Help improve docs and examples

### Development Workflow

```bash
# Fork the repository
git clone https://github.com/YOUR_USERNAME/daily-brief.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# ...

# Commit and push
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# Open a Pull Request
```

### Code Style
- Use ESLint: `npm run lint`
- Follow existing patterns
- Add comments for complex logic
- Write tests for new features

---

## 📝 Changelog

### v0.0.2 (2026-03-09)
**✨ Features Enhanced**
- ✅ Added slash command support (`/brief`, `/news`, `/search`)
- ✅ Optimized SKILL.md for OpenClaw specifications
- ✅ Added clawhub publishing configuration
- ✅ Improved auto-trigger keyword matching
- ✅ Added interests configuration example
- ✅ Enhanced RSS source health checks

**🐛 Bug Fixes**
- ✅ Fixed RSS parsing failures for some sources
- ✅ Fixed duplicate news issues
- ✅ Fixed timezone configuration

**📝 Documentation**
- ✅ Updated README to professional version
- ✅ Added detailed configuration guide
- ✅ Added usage examples

### v0.0.1 (2026-03-09)
**🎉 Initial Release**
- ✅ Core functionality implemented
- ✅ 145+ RSS feeds integrated
- ✅ AI summarization
- ✅ Scheduled delivery
- ✅ Smart filtering

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

**TL;DR**: Do whatever you want with this code, just don't sue us.

---

## 🙏 Acknowledgments

- **[RSSHub](https://github.com/DIYgod/RSSHub)** - Everything is RSSible
- **[awesome-rsshub-routes](https://github.com/JackyST0/awesome-rsshub-routes)** - RSSHub routes collection
- **[OpenClaw](https://openclaw.ai)** - AI assistant framework
- **[rss-parser](https://github.com/rbren/rss-parser)** - RSS parsing library

---

## 📞 Contact

- **GitHub**: [@XHJ-Studio](https://github.com/XHJ-Studio)
- **Issues**: [Report bugs & suggest features](https://github.com/XHJ-Studio/daily-brief/issues)

---

## 👥 Community

Join our community group for discussions, updates, and sharing!

### OpenClaw 中文交流群

![OpenClaw 中文社群 QR Code](./assets/community-qr.png)

**群信息**:
- 群名：OpenClaw 中文交流群
- 群号：1083444634
- 用途：OpenClaw 用户交流、技能分享、问题讨论

*扫码加入 OpenClaw 中文交流群*

---

## 🌟 Show Your Support

If Daily Brief helps you stay informed, please:

1. ⭐ **Star this repository** on GitHub
2. 📢 **Share** with friends and colleagues
3. 🐛 **Report bugs** and suggest features
4. 💝 **Contribute** code or documentation

---

> **"Stay informed, stay ahead."** 📰

*Made with ❤️ by 小黄鸡工坊 | Powered by OpenClaw*
