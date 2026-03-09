# 小黄鸡每日简报 (Daily Brief)

> 📰 AI 驱动的个性化新闻简报生成器 - 类似总统每日简报 (PDB)

---

## 📋 技能元数据

```json
{
  "id": "daily-brief",
  "name": "小黄鸡每日简报",
  "nameEn": "Daily Brief",
  "version": "0.0.2",
  "author": "小黄鸡工坊",
  "authorEn": "xhjgfstudio",
  "description": "AI 驱动的个性化新闻简报，聚合 145+ 全球 RSS 源，每天早上 9 点自动推送",
  "descriptionEn": "AI-driven personalized news briefing with 145+ global RSS feeds, delivered daily at 9 AM",
  "category": "news",
  "tags": [
    "新闻",
    "RSS",
    "简报",
    "AI",
    "自动化",
    "news",
    "briefing",
    "automation"
  ],
  "repository": "https://github.com/XHJ-Studio/daily-brief",
  "license": "MIT",
  "minOpenClawVersion": "2026.3.0"
}
```

---

## 🚀 功能特性

### 核心功能
- 📡 **145+ RSS 源** - 覆盖 65+ 全球主流媒体
- ⏰ **定时推送** - 每天 09:00 自动发送简报
- 🤖 **AI 摘要** - 自动生成新闻要点
- 🎯 **智能过滤** - 基于兴趣关键词筛选
- 📊 **质量评分** - 自动评估新闻可信度
- 🔄 **自动去重** - 避免重复新闻

### 斜杠命令
- `/brief` - 立即生成今日简报
- `/brief search <关键词>` - 搜索特定主题新闻
- `/brief sources` - 查看已订阅的 RSS 源
- `/brief config` - 查看/修改配置
- `/brief status` - 检查 RSS 源健康状态

### 触发关键词
当用户消息包含以下关键词时自动触发：
- "新闻"、"简报"、"资讯"、"RSS"
- "news"、"briefing"、"headline"、"update"
- "今天有什么新闻"、"看看资讯"

---

## 📁 文件结构

```
daily-brief/
├── SKILL.md                 # 技能说明（本文件）
├── README.md                # 详细文档
├── config.json              # 技能配置
├── sources.json             # RSS 源数据库
├── interests.json.example   # 兴趣配置示例
├── package.json             # 依赖管理
├── cron.json                # 定时任务配置
├── commands/                # 斜杠命令
│   ├── brief.js            # /brief 命令
│   ├── news.js             # /news 命令
│   └── search.js           # /search 命令
├── src/                     # 源代码
│   ├── index.js            # 主入口
│   ├── fetch.js            # RSS 抓取
│   ├── filter.js           # 内容过滤
│   ├── summarize.js        # 摘要生成
│   └── send.js             # 推送发送
└── templates/               # 模板
    └── briefing.md         # 简报模板
```

---

## ⚙️ 配置说明

### 技能配置 (config.json)

```json
{
  "skill": {
    "id": "daily-brief",
    "name": "小黄鸡每日简报",
    "version": "0.0.2",
    "enabled": true,
    "autoTrigger": {
      "enabled": true,
      "priority": "high",
      "keywords": ["新闻", "简报", "资讯", "RSS", "news", "briefing"],
      "excludeKeywords": ["天气", "股票", "实时"]
    },
    "slashCommands": [
      {
        "command": "brief",
        "description": "生成新闻简报",
        "usage": "/brief [search <关键词>]",
        "examples": [
          "/brief",
          "/brief search 人工智能",
          "/brief sources"
        ]
      },
      {
        "command": "news",
        "description": "快速查看最新新闻",
        "usage": "/news [类别]",
        "examples": [
          "/news",
          "/news tech",
          "/news finance"
        ]
      },
      {
        "command": "search",
        "description": "搜索特定主题新闻",
        "usage": "/search <关键词>",
        "examples": [
          "/search AI",
          "/search 特朗普"
        ]
      }
    ]
  },
  "schedule": {
    "enabled": true,
    "time": "09:00",
    "timezone": "Asia/Shanghai",
    "skipWeekends": false
  },
  "output": {
    "channel": "discord",
    "accountId": "somi",
    "format": "markdown",
    "maxNewsCount": 15,
    "includeImages": false,
    "includeLinks": true
  },
  "summary": {
    "enabled": true,
    "model": "bailian/qwen3.5-plus",
    "maxLength": 300,
    "language": "zh-CN",
    "style": "concise"
  },
  "filter": {
    "minQuality": 0.6,
    "deduplicate": true,
    "excludeKeywords": ["八卦", "娱乐", "明星"],
    "priorityKeywords": ["科技", "财经", "AI", "创业"]
  }
}
```

### RSS 源配置 (sources.json)

包含 145+ RSS 源，按类别组织：
- `news-global` - 全球综合新闻 (30 家)
- `news-china` - 中国新闻媒体 (15 家)
- `news-tech` - 科技媒体 (15 家)
- `news-finance` - 财经新闻 (10 家)
- `news-asia` - 亚洲新闻 (7 家)
- `news-europe` - 欧洲新闻 (6 家)
- `ai` - 人工智能 (13 家)
- `community` - 技术社区 (10 家)
- `frontend-design` - 前端与设计 (9 家)
- `programming` - 编程语言 (9 家)
- `tech-blogs` - 科技公司博客 (10 家)
- `newsletters` - 技术周刊 (4 家)
- `academic` - 学术期刊 (1 家)
- `rss-tools` - RSS 工具 (5 家，默认禁用)

每个源包含：
```json
{
  "id": "unique-source-id",
  "name": "媒体名称",
  "url": "https://example.com/rss",
  "language": "en",
  "country": "US",
  "enabled": true,
  "priority": 1,
  "verified": true,
  "statusCode": 200
}
```

### 兴趣配置 (interests.json.example)

```json
{
  "version": "0.0.2",
  "user": {
    "id": "somi",
    "timezone": "Asia/Shanghai",
    "language": "zh-CN"
  },
  "interests": {
    "keywords": [
      "人工智能",
      "机器学习",
      "深度学习",
      "AI",
      "OpenAI",
      "Google",
      "科技",
      "创业",
      "投资",
      "财经"
    ],
    "excludeKeywords": [
      "娱乐",
      "八卦",
      "明星",
      "体育"
    ],
    "mustInclude": [
      "OpenAI",
      "Google",
      "Apple",
      "Microsoft",
      "Tesla"
    ],
    "categories": {
      "enabled": ["tech", "finance", "ai", "news-global"],
      "disabled": ["sports", "entertainment"]
    }
  },
  "preferences": {
    "briefingTime": "09:00",
    "maxNewsCount": 15,
    "minNewsCount": 5,
    "includeSummary": true,
    "includeLinks": true,
    "includeImages": false,
    "weekendDigest": true,
    "breakingNews": true
  },
  "sources": {
    "subscribed": [
      "hackernews",
      "techcrunch",
      "36kr",
      "bbc-world",
      "ap-news",
      "hstreetcn"
    ],
    "blocked": []
  }
}
```

---

## 🛠️ 安装与使用

### 快速安装

```bash
# 通过 clawhub 安装（推荐）
clawhub install daily-brief

# 或手动安装
git clone https://github.com/XHJ-Studio/daily-brief.git
cd daily-brief
npm install
```

### 配置

```bash
# 复制兴趣配置示例
cp interests.json.example interests.json

# 编辑兴趣关键词
nano interests.json
```

### 启用技能

在 `~/.openclaw/openclaw.json` 中添加：
```json
{
  "skills": {
    "entries": {
      "daily-brief": {
        "enabled": true
      }
    }
  }
}
```

### 设置定时任务

```bash
# 使用 OpenClaw cron
openclaw cron add --config cron.json

# 或系统 crontab
crontab -e
# 添加：0 9 * * * cd /path/to/daily-brief && node src/index.js
```

### 测试运行

```bash
# 生成简报
npm start

# 检查 RSS 源
npm run check-sources

# 测试过滤
node src/filter.js
```

---

## 📱 斜杠命令使用

### /brief - 生成简报

```
/brief                    # 生成今日简报
/brief search AI          # 搜索 AI 相关新闻
/brief sources            # 查看已订阅源
/brief config             # 查看配置
/brief status             # 检查源健康状态
```

### /news - 快速新闻

```
/news                     # 查看最新新闻
/news tech                # 科技新闻
/news finance             # 财经新闻
/news global              # 国际新闻
```

### /search - 搜索新闻

```
/search 人工智能           # 搜索人工智能新闻
/search Trump             # 搜索特朗普新闻
/search crypto            # 搜索加密货币新闻
```

---

## 📊 统计数据

| 指标 | 数值 | 状态 |
|------|------|------|
| **总 RSS 源** | 145+ | ✅ 活跃 |
| **新闻媒体** | 65+ | ✅ 已验证 |
| **已验证源** | 70+ | ✅ 84% 成功率 |
| **分类数量** | 14 | ✅ 已配置 |
| **支持语言** | 5+ | ✅ 多语言 |
| **覆盖地区** | 4 | ✅ 全球 |

---

## 🔄 更新日志

### v0.0.2 (2026-03-09)
**✨ 功能增强**
- ✅ 添加斜杠命令支持 (`/brief`, `/news`, `/search`)
- ✅ 优化 SKILL.md 符合 OpenClaw 官方规范
- ✅ 添加 clawhub 发布配置
- ✅ 改进自动触发关键词匹配
- ✅ 添加兴趣配置示例文件
- ✅ 优化 RSS 源健康检查

**🐛 Bug 修复**
- ✅ 修复部分 RSS 源解析失败问题
- ✅ 修复重复新闻问题
- ✅ 修复时区配置问题

**📝 文档**
- ✅ 更新 README 为专业版本
- ✅ 添加详细配置说明
- ✅ 添加使用示例

### v0.0.1 (2026-03-09)
**🎉 初始版本**
- ✅ 核心功能实现
- ✅ 145+ RSS 源集成
- ✅ AI 摘要生成
- ✅ 定时推送
- ✅ 智能过滤

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献方式
1. **添加 RSS 源** - 发现好源添加到 `sources.json`
2. **改进过滤** - 优化关键词匹配或质量评分
3. **新功能** - 多语言支持、自定义模板等
4. **Bug 报告** - 发现问题提交 Issue
5. **文档改进** - 帮助完善文档和示例

### 开发流程
```bash
# Fork 仓库
git clone https://github.com/YOUR_USERNAME/daily-brief.git

# 创建分支
git checkout -b feature/amazing-feature

# 提交更改
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# 开启 Pull Request
```

---

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE)

---

## 🙏 致谢

- [RSSHub](https://github.com/DIYgod/RSSHub) - 万物皆可 RSS
- [awesome-rsshub-routes](https://github.com/JackyST0/awesome-rsshub-routes) - RSSHub 路由集合
- [OpenClaw](https://openclaw.ai) - AI 助手框架
- [rss-parser](https://github.com/rbren/rss-parser) - RSS 解析库

---

## 📞 联系方式

- **GitHub**: https://github.com/XHJ-Studio
- **Issues**: https://github.com/XHJ-Studio/daily-brief/issues

---

## 👥 社群

欢迎加入社群交流讨论、分享经验！

![社群二维码](./assets/community-qr.png)

*扫码加入社群*

---

*Made with ❤️ by 小黄鸡工坊 | Powered by OpenClaw*
