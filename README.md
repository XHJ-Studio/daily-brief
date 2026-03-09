# 📰 Daily Brief (小黄鸡每日简报)

> 🤖 AI 驱动的个性化新闻简报生成器，类似总统每日简报 (PDB)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-blue)](https://openclaw.ai)
[![RSS Feeds](https://img.shields.io/badge/RSS%20Feeds-145+-green)](./sources.json)

---

## 🚀 功能特性

- 📡 **145+ RSS 源** - 覆盖全球 65+ 家主流媒体
- 🌍 **全球覆盖** - 美/中/欧/亚四大地区
- 🤖 **AI 摘要** - 自动生成新闻摘要
- ⏰ **定时推送** - 每天 09:00 自动推送
- 🎯 **智能过滤** - 基于兴趣关键词过滤
- 📊 **质量评分** - 自动评估新闻质量
- 🔄 **自动去重** - 避免重复新闻
- 📱 **多平台** - 支持 Discord/Telegram/微信

---

## 📁 文件结构

```
daily-brief/
├── SKILL.md              # 技能说明
├── README.md             # 使用指南
├── config.json           # 主配置
├── sources.json          # RSS 源列表 (145+)
├── interests.json        # 用户兴趣配置
├── cron.json            # 定时任务配置
├── package.json         # 依赖配置
├── src/
│   ├── index.js         # 主入口
│   ├── fetch.js         # RSS 抓取
│   ├── filter.js        # 内容过滤
│   ├── summarize.js     # 摘要生成
│   └── send.js          # 推送发送
└── templates/
    └── briefing.md      # 简报模板
```

---

## 🌐 收录媒体

### 全球综合新闻 (30 家)
- BBC, CNN, NYTimes, Reuters, AP, Bloomberg, WSJ, FT, The Economist...

### 中国新闻媒体 (15 家)
- 财新网，36 氪，IT 之家，虎嗅，钛媒体，澎湃新闻...

### 科技媒体 (15 家)
- TechCrunch, The Verge, Wired, Ars Technica, Engadget...

### 财经新闻 (10 家)
- Bloomberg, CNBC, MarketWatch, Forbes, Fortune...

### 亚洲新闻 (7 家)
- Japan Times, NHK, SCMP, Times of India...

### 欧洲新闻 (6 家)
- Deutsche Welle, France 24, Euronews, Politico EU...

**完整列表**: [sources.json](./sources.json)

---

## ⚙️ 安装

### 1. 克隆仓库
```bash
git clone https://github.com/xhjgfstudio/daily-brief.git
cd daily-brief
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置兴趣
编辑 `interests.json`:
```json
{
  "keywords": ["人工智能", "创业", "投资", "AI"],
  "excludeKeywords": ["娱乐", "八卦"],
  "mustInclude": ["OpenAI", "Google"]
}
```

### 4. 设置定时任务
```bash
# OpenClaw cron
openclaw cron add --config cron.json

# 或系统 crontab
crontab -e
# 添加：0 9 * * * cd /path/to/daily-brief && node src/index.js
```

### 5. 测试运行
```bash
npm start
```

---

## 📋 配置说明

### config.json
```json
{
  "schedule": {
    "time": "09:00",
    "timezone": "Asia/Shanghai"
  },
  "output": {
    "channel": "discord",
    "maxNewsCount": 15
  },
  "summary": {
    "maxLength": 300,
    "language": "zh-CN"
  }
}
```

### sources.json
- 145+ RSS 源
- 10 个分类
- 已验证状态
- 优先级排序

### interests.json
- 兴趣关键词
- 排除关键词
- 必须包含关键词
- 订阅源管理

---

## 📊 简报示例

```markdown
# 📰 小黄鸡每日简报
**日期**: 2026-03-09 周一
**第 001 期**

---

## 🔥 头条新闻
1. **[科技] OpenAI 发布 GPT-5** - 新模型在...
2. **[财经] 纳斯达克创新高** - 科技股领涨...

---

## 📱 科技前沿
- **AI 新突破**: 研究人员发现...

---

## 🌍 国际动态
- **政策变化**: 欧盟通过...

---

*🤖 由 XDB 自动生成*
```

---

## 🛠️ 使用

### 命令行
```bash
# 生成简报
npm start

# 检查 RSS 源
npm run check-sources

# 测试过滤
node src/filter.js
```

### API 调用
```javascript
const briefing = require('./src/index');
await briefing.main();
```

---

## 📈 统计

| 指标 | 数值 |
|------|------|
| RSS 源总数 | 145+ |
| 新闻媒体 | 65+ 家 |
| 已验证可用 | 70+ |
| 覆盖地区 | 美/中/欧/亚 |
| 成功率 | 84% |

---

## 🔄 维护

### 定期检查
```bash
# 每周检查 RSS 源可用性
npm run check-sources
```

### 添加新源
编辑 `sources.json`:
```json
{
  "id": "new-source",
  "name": "媒体名称",
  "url": "https://example.com/rss",
  "language": "en",
  "enabled": true,
  "priority": 1
}
```

---

## ⚠️ 注意事项

1. **RSS 源稳定性**: 部分源可能失效，定期检查
2. **推送频率**: 每天最多 1 次完整简报
3. **内容过滤**: 自动过滤低质量内容
4. **隐私保护**: 不存储用户阅读历史
5. **版权**: 仅用于个人学习

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

1. Fork 仓库
2. 创建分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📝 更新日志

### v1.2.0 (2026-03-09)
- ✅ 添加 65+ 家新闻媒体
- ✅ 覆盖全球主要地区
- ✅ 70 家已验证可用
- ✅ 智能内容过滤
- ✅ 定时推送任务

### v1.1.0 (2026-03-09)
- ✅ 收集 72 个技术类 RSS 源
- ✅ 100% 可用性验证
- ✅ 10 个分类

### v1.0.0 (2026-03-09)
- ✅ 初始版本发布
- ✅ 基础功能实现

---

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE)

---

## 🙏 致谢

- [RSSHub](https://github.com/DIYgod/RSSHub) - 万物皆可 RSS
- [awesome-rsshub-routes](https://github.com/JackyST0/awesome-rsshub-routes) - RSSHub 路由集合
- [OpenClaw](https://openclaw.ai) - AI 助手框架

---

## 📞 联系方式

- **作者**: 小黄鸡工坊 (xhjgfstudio)
- **Email**: xhjgfstudio@gmail.com
- **Discord**: 小黄鸡工坊#3232

---

*Made with ❤️ by 小黄鸡工坊*
