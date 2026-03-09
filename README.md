# 📰 Daily Brief (小黄鸡每日简报)

> **AI 驱动的个性化新闻简报生成器**
> 
> 你的私人总统每日简报 (PDB) — 聚合 145+ 全球 RSS 源，AI 驱动，每天早晨送达
> 
> **AI-Driven Personalized News Briefing Generator**
> 
> Your personal President's Daily Brief (PDB) — aggregating 145+ global RSS feeds, powered by AI, delivered every morning

[![Version](https://img.shields.io/github/v/tag/XHJ-Studio/daily-brief?label=version&color=blue)](https://github.com/XHJ-Studio/daily-brief/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)
[![RSS Feeds](https://img.shields.io/badge/RSS%20Feeds-145+-green.svg)](./sources.json)
[![News Sources](https://img.shields.io/badge/News%20Sources-65+-orange.svg)](./sources.json)
[![Verified](https://img.shields.io/badge/Verified-70+-brightgreen.svg)](./sources.json)

---

## 📋 目录 / Table of Contents

- [功能特性 / Features](#-功能特性--features)
- [斜杠命令 / Slash Commands](#-斜杠命令--slash-commands)
- [媒体来源 / Media Sources](#-媒体来源--media-sources)
- [快速开始 / Quick Start](#-快速开始--quick-start)
- [配置说明 / Configuration](#-配置说明--configuration)
- [使用示例 / Usage Examples](#-使用示例--usage-examples)
- [项目结构 / Project Structure](#-项目结构--project-structure)
- [统计数据 / Statistics](#-统计数据--statistics)
- [贡献指南 / Contributing](#-贡献指南--contributing)
- [许可证 / License](#-许可证--license)
- [社群 / Community](#-社群--community)

---

## ✨ 功能特性 / Features

### 🇨🇳 中文

**📡 庞大的 RSS 网络**
- 145+ RSS 源来自已验证的媒体
- 65+ 媒体机构覆盖 10 个类别
- 84% 成功率，自动故障转移
- 每小时实时健康检查

**🤖 AI 智能**
- 智能摘要 - 自动提取关键点
- 质量评分 - 按可信度评分 (0-1)
- 兴趣匹配 - 根据你的关键词过滤
- 自动分类 - 按主题组织

**⏰ 自动化**
- Cron 调度 - 每天早上 9:00 送达
- 时区支持 - 适用于任何时区
- 重试逻辑 - 失败尝试 3 次
- 健康监控 - 自动检测离线源

**💬 斜杠命令**
- `/brief` - 立即生成每日简报
- `/brief search <关键词>` - 按主题搜索新闻
- `/news` - 按类别快速查看最新新闻
- `/search <关键词>` - 在所有源中搜索

### 🇺🇸 English

**📡 Massive RSS Network**
- 145+ RSS feeds from verified sources
- 65+ media outlets across 10 categories
- 84% success rate with auto-failover
- Real-time health checks every hour

**🤖 AI Intelligence**
- Smart Summarization - Extract key points automatically
- Quality Scoring - Rate news by credibility (0-1 scale)
- Interest Matching - Filter by your keywords
- Auto-Categorization - Organize by topic

**⏰ Automation**
- Cron Scheduler - Daily delivery at 9:00 AM
- Timezone Support - Works in any timezone
- Retry Logic - 3 attempts for failed fetches
- Health Monitoring - Auto-detect offline sources

**💬 Slash Commands**
- `/brief` - Generate daily briefing instantly
- `/brief search <keyword>` - Search news by topic
- `/news` - Quick view latest news by category
- `/search <keyword>` - Search across all sources

---

## 💬 斜杠命令 / Slash Commands

### 🇨🇳 中文

Daily Brief 支持强大的斜杠命令，快速访问：

**`/brief` - 生成简报**
```
/brief                    # 生成今日简报
/brief search AI          # 搜索 AI 相关新闻
/brief sources            # 查看已订阅源
/brief config             # 查看配置
/brief status             # 检查源健康状态
```

**`/news` - 快速新闻**
```
/news                     # 查看最新新闻
/news tech                # 科技新闻
/news finance             # 财经新闻
/news global              # 国际新闻
/news china               # 中国新闻
```

**`/search` - 搜索新闻**
```
/search 人工智能           # 搜索 AI 新闻
/search Trump             # 搜索特朗普新闻
/search crypto            # 搜索加密货币新闻
```

**自动触发关键词**:
- "新闻"、"简报"、"资讯"、"RSS"
- "news"、"briefing"、"headline"、"update"
- "今天有什么新闻"、"看看资讯"

### 🇺🇸 English

Daily Brief supports powerful slash commands for quick access:

**`/brief` - Generate Briefing**
```
/brief                    # Generate today's briefing
/brief search AI          # Search AI-related news
/brief sources            # View subscribed sources
/brief config             # View current configuration
/brief status             # Check source health status
```

**`/news` - Quick News**
```
/news                     # View latest news
/news tech                # Technology news
/news finance             # Finance news
/news global              # International news
/news china               # China news
```

**`/search` - Search News**
```
/search AI                # Search AI news
/search Trump             # Search Trump news
/search crypto            # Search cryptocurrency news
```

**Auto-Trigger Keywords**:
- "新闻", "简报", "资讯", "RSS"
- "news", "briefing", "headline", "update"
- "今天有什么新闻", "看看资讯"

---

## 🌐 媒体来源 / Media Sources

### 🇨🇳 中文

**全球综合新闻 (30 家)**

**顶级媒体**:
- 🇺🇸 CNN (头条/国际/科技/财经)
- 🇺🇸 纽约时报 (首页/国际/科技/财经)
- 🇺🇸 华盛顿邮报
- 🇺🇸 美联社 (国际/科技)
- 🇺🇸 彭博社 (市场/科技)
- 🇺🇸 华尔街日报
- 🇬🇧 BBC (国际/首页/科技/财经)
- 🇬🇧 路透社 (国际/财经/科技)
- 🇬🇧 卫报 (国际/英国/科技)
- 🇬🇧 金融时报
- 🇬🇧 经济学人

**更多**: 时代周刊，新闻周刊，今日美国，CNBC, MarketWatch, 福布斯，财富，Politico...

**中国新闻媒体 (15 家)**
- 财新网 ✅
- 36 氪 ✅
- IT 之家 ✅
- 虎嗅 ✅
- 钛媒体 ✅
- 澎湃新闻
- 中国日报

**科技媒体 (15 家)**
- TechCrunch ✅
- The Verge ✅
- Wired ✅
- Ars Technica ✅
- MIT Technology Review ✅

**财经新闻 (10 家)**
- Bloomberg Markets ✅
- CNBC ✅
- MarketWatch ✅
- Forbes ✅
- Wall Street Journal ✅

**地区新闻**
- **亚洲 (7)**: Japan Times, NHK, SCMP, Times of India...
- **欧洲 (6)**: Deutsche Welle, France 24, Euronews...

👉 **完整列表**: [`sources.json`](./sources.json)

### 🇺🇸 English

**Global News (30 outlets)**

**Tier 1 Media**:
- 🇺🇸 CNN (Top/World/Tech/Business)
- 🇺🇸 New York Times (Home/World/Tech/Business)
- 🇺🇸 Washington Post
- 🇺🇸 AP News (World/Technology)
- 🇺🇸 Bloomberg (Markets/Technology)
- 🇺🇸 Wall Street Journal
- 🇬🇧 BBC (World/Home/Tech/Business)
- 🇬🇧 Reuters (World/Business/Tech)
- 🇬🇧 The Guardian (World/UK/Tech)
- 🇬🇧 Financial Times
- 🇬🇧 The Economist

**More**: TIME, Newsweek, USA Today, CNBC, MarketWatch, Forbes, Fortune, Politico...

**China News (15 outlets)**
- 财新网 ✅
- 36 氪 ✅
- IT 之家 ✅
- 虎嗅 ✅
- 钛媒体 ✅

**Technology (15 outlets)**
- TechCrunch ✅
- The Verge ✅
- Wired ✅
- Ars Technica ✅
- MIT Technology Review ✅

**Finance (10 outlets)**
- Bloomberg Markets ✅
- CNBC ✅
- MarketWatch ✅
- Forbes ✅
- Wall Street Journal ✅

**Regional News**
- **Asia (7)**: Japan Times, NHK, SCMP, Times of India...
- **Europe (6)**: Deutsche Welle, France 24, Euronews...

👉 **Full list**: [`sources.json`](./sources.json)

---

## 🚀 快速开始 / Quick Start

### 🇨🇳 中文

**前置要求**:
- Node.js >= 16.0.0
- npm 或 yarn
- OpenClaw (用于集成)

**安装**:
```bash
# 克隆仓库
git clone https://github.com/XHJ-Studio/daily-brief.git
cd daily-brief

# 安装依赖
npm install

# 配置兴趣
cp interests.json.example interests.json
# 编辑 interests.json 添加你的关键词

# 测试运行
npm start
```

**设置定时推送**:

**方式 1: OpenClaw Cron (推荐)**
```bash
openclaw cron add --config cron.json
```

**方式 2: 系统 Cron**
```bash
crontab -e
# 添加：0 9 * * * cd /path/to/daily-brief && node src/index.js
```

### 🇺🇸 English

**Prerequisites**:
- Node.js >= 16.0.0
- npm or yarn
- OpenClaw (for integration)

**Installation**:
```bash
# Clone repository
git clone https://github.com/XHJ-Studio/daily-brief.git
cd daily-brief

# Install dependencies
npm install

# Configure interests
cp interests.json.example interests.json
# Edit interests.json with your keywords

# Test run
npm start
```

**Setup Scheduled Delivery**:

**Option 1: OpenClaw Cron (Recommended)**
```bash
openclaw cron add --config cron.json
```

**Option 2: System Cron**
```bash
crontab -e
# Add: 0 9 * * * cd /path/to/daily-brief && node src/index.js
```

---

## 📊 统计数据 / Statistics

### 🇨🇳 中文

| 指标 | 数值 | 状态 |
|------|------|------|
| **总 RSS 源** | 145+ | ✅ 活跃 |
| **新闻媒体** | 65+ | ✅ 已验证 |
| **已验证源** | 70+ | ✅ 84% 成功率 |
| **分类数量** | 10 | ✅ 已配置 |
| **支持语言** | 5+ | ✅ 多语言 |
| **覆盖地区** | 4 | ✅ 全球 |

### 🇺🇸 English

| Metric | Count | Status |
|--------|-------|--------|
| **Total RSS Feeds** | 145+ | ✅ Active |
| **News Outlets** | 65+ | ✅ Verified |
| **Sources Verified** | 70+ | ✅ 84% Success |
| **Categories** | 10 | ✅ Configured |
| **Languages** | 5+ | ✅ Multi-lang |
| **Regions** | 4 | ✅ Global |

---

## 👥 社群 / Community

### 🇨🇳 中文

欢迎加入 OpenClaw 中文交流群！

![OpenClaw 中文社群](./assets/community-qr.png)

**群信息**:
- 群名：OpenClaw 中文交流群
- 群号：1083444634
- 用途：OpenClaw 用户交流、技能分享、问题讨论

*扫码加入 OpenClaw 中文交流群*

### 🇺🇸 English

Welcome to join OpenClaw Chinese Community!

![OpenClaw Community QR Code](./assets/community-qr.png)

**Group Info**:
- Group Name: OpenClaw Chinese Community
- Group ID: 1083444634
- Purpose: OpenClaw user communication, skill sharing, Q&A

*Scan QR code to join the community*

---

## 📞 联系 / Contact

### 🇨🇳 中文
- **GitHub**: [@XHJ-Studio](https://github.com/XHJ-Studio)
- **Issues**: [问题反馈](https://github.com/XHJ-Studio/daily-brief/issues)

### 🇺🇸 English
- **GitHub**: [@XHJ-Studio](https://github.com/XHJ-Studio)
- **Issues**: [Report Issues](https://github.com/XHJ-Studio/daily-brief/issues)

---

## 📄 许可证 / License

### 🇨🇳 中文
MIT License - 详见 [LICENSE](./LICENSE) 文件

### 🇺🇸 English
MIT License - See [LICENSE](./LICENSE) file for details

---

> **"知天下事，做明白人"** 📰
> 
> *"Stay informed, stay ahead"*

*Made with ❤️ by 小黄鸡工坊 | Powered by OpenClaw*
