# 小黄鸡每日简报 (Xiaohuangji Daily Briefing)

**技能名称**: 小黄鸡每日简报  
**英文简称**: `XDB` (Xiaohuangji Daily Briefing)  
**版本**: 1.0.0  
**作者**: 小黄鸡工坊  
**描述**: 类似总统每日简报 (PDB) 的个性化新闻推送服务

---

## 📚 功能定位

每天早晨 9 点自动推送用户感兴趣的新闻摘要，包括：
- 🌍 国际新闻
- 💰 财经资讯
- 🔬 科技前沿
- 🏀 体育动态
- 📊 市场数据
- 💡 今日关注

---

## 🌐 收录 RSS 源

### 新闻类
| 来源 | RSS 地址 | 类别 |
|------|---------|------|
| BBC News | https://feeds.bbci.co.uk/news/rss.xml | 国际 |
| AP News | https://feedx.net/rss/ap.xml | 国际 |
| Reuters | https://www.reutersagency.com/feed/ | 国际 |
| 36 氪 | https://36kr.com/feed | 科技/财经 |
| Hacker News | https://news.ycombinator.com/rss | 科技 |

### 科技类
| 来源 | RSS 地址 | 类别 |
|------|---------|------|
| TechCrunch | https://techcrunch.com/feed/ | 科技 |
| The Verge | https://www.theverge.com/rss/index.xml | 科技 |
| 少数派 | https://sspai.com/feed | 科技 |

### 财经类
| 来源 | RSS 地址 | 类别 |
|------|---------|------|
| 华尔街见闻 | https://wallstreetcn.com/feed/global | 财经 |
| Bloomberg | https://www.bloomberg.com/feed/podcast/etf.xml | 财经 |

### 其他
- GitHub Trending
- Product Hunt
- 知乎日报
- 豆瓣读书

---

## ⏰ 定时任务

**默认时间**: 每天 09:00 (Asia/Shanghai)  
**跳过周末**: 可选配置  
**紧急插播**: 重大新闻实时推送

---

## 📝 简报模板

```markdown
# 📰 小黄鸡每日简报
**日期**: YYYY-MM-DD 周 X
**第 XXX 期**

---

## 🔥 头条新闻
1. **[类别] 新闻标题** - 摘要内容...
2. **[类别] 新闻标题** - 摘要内容...

---

## 📱 科技前沿
- **标题**: 摘要...

---

## 🌍 国际动态
- **标题**: 摘要...

---

## 📊 市场数据
| 指数 | 收盘价 | 涨跌 |
|------|--------|------|
| 纳斯达克 | - | - |

---

## 💡 今日关注
- 时间 事件

---

*🤖 由 XDB 自动生成 | 订阅管理：回复 "简报设置"*
```

---

## 🛠️ 使用方法

### 配置兴趣关键词
```json
{
  "keywords": ["人工智能", "创业", "投资"],
  "excludeKeywords": ["娱乐", "八卦"],
  "mustInclude": ["OpenAI", "Google"]
}
```

### 管理订阅
- 回复 "简报订阅" 查看已订阅源
- 回复 "简报添加 [URL]" 添加新源
- 回复 "简报删除 [ID]" 删除订阅
- 回复 "简报设置" 修改推送时间

---

## 📦 文件结构

```
xhj-daily-briefing/
├── SKILL.md
├── config.json
├── sources.json
├── interests.json
├── src/
│   ├── index.js
│   ├── fetch.js
│   ├── filter.js
│   ├── summarize.js
│   └── send.js
├── templates/
│   └── briefing.md
└── cron.json
```

---

## ⚠️ 注意事项

1. **RSS 源稳定性**: 部分源可能失效，定期检查
2. **推送频率**: 避免过于频繁打扰用户
3. **内容过滤**: 自动过滤低质量内容
4. **隐私保护**: 不存储用户阅读历史

---

## 📝 更新日志

### v1.0.0 (2026-03-09)
- ✅ 初始版本发布
- ✅ 支持多 RSS 源聚合
- ✅ 智能内容过滤
- ✅ 定时推送任务
- ✅ 个性化兴趣配置

---

*Made with ❤️ by 小黄鸡工坊*
