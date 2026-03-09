/**
 * /brief 斜杠命令
 * 生成新闻简报
 * 
 * 用法:
 * /brief                    - 生成今日简报
 * /brief search <关键词>    - 搜索特定主题新闻
 * /brief sources            - 查看已订阅源
 * /brief config             - 查看配置
 * /brief status             - 检查源健康状态
 */

const fs = require('fs');
const path = require('path');
const fetch = require('../src/fetch');
const filter = require('../src/filter');
const summarize = require('../src/summarize');
const send = require('../src/send');

const config = require('../config.json');
const sources = require('../sources.json');
const interests = require('../interests.json');

/**
 * 处理 /brief 命令
 */
async function handleBriefCommand(args, context) {
  const subCommand = args[0] || 'generate';
  
  switch (subCommand) {
    case 'search':
      return await handleSearch(args.slice(1).join(' '));
    case 'sources':
      return await handleSources();
    case 'config':
      return await handleConfig();
    case 'status':
      return await handleStatus();
    case 'generate':
    default:
      return await generateBriefing();
  }
}

/**
 * 生成简报
 */
async function generateBriefing() {
  try {
    const enabledSources = getAllEnabledSources();
    const allArticles = await fetch.fetchAllSources(enabledSources);
    const filtered = filter.filterArticles(allArticles, interests.interests);
    const deduplicated = filter.deduplicateArticles(filtered);
    const highQuality = filter.filterByQuality(deduplicated, 0.6);
    
    const withSummary = highQuality.map(article => ({
      ...article,
      summary: summarize.generateSummary(article.content, 150)
    }));
    
    const grouped = filter.groupByCategory(withSummary);
    const topStories = getTopStories(withSummary, 5);
    
    const briefing = {
      date: getFormattedDate(),
      issue: getIssueNumber(),
      categories: grouped,
      topStories: topStories
    };
    
    return summarize.formatBriefing(briefing);
  } catch (error) {
    return `❌ 生成简报失败：${error.message}`;
  }
}

/**
 * 搜索新闻
 */
async function handleSearch(query) {
  if (!query) {
    return '❌ 请提供搜索关键词，例如：`/brief search AI`';
  }
  
  try {
    const enabledSources = getAllEnabledSources();
    const allArticles = await fetch.fetchAllSources(enabledSources);
    
    const searchTerms = query.toLowerCase().split(' ');
    const filtered = allArticles.filter(article => {
      const text = `${article.title} ${article.content}`.toLowerCase();
      return searchTerms.some(term => text.includes(term));
    });
    
    if (filtered.length === 0) {
      return `🔍 未找到关于 "${query}" 的新闻`;
    }
    
    const topResults = filtered.slice(0, 10).map(article => {
      const summary = summarize.generateSummary(article.content, 100);
      return `- **${article.title}**\n  ${summary}\n  [链接](${article.link})`;
    });
    
    return `🔍 找到 ${filtered.length} 条关于 "${query}" 的新闻：\n\n${topResults.join('\n\n')}`;
  } catch (error) {
    return `❌ 搜索失败：${error.message}`;
  }
}

/**
 * 查看已订阅源
 */
async function handleSources() {
  const subscribed = interests.sources.subscribed || [];
  const categories = sources.categories;
  
  let output = '📡 **已订阅的 RSS 源**\n\n';
  
  for (const [catKey, category] of Object.entries(categories)) {
    const catSources = category.sources.filter(s => subscribed.includes(s.id));
    if (catSources.length > 0) {
      output += `**${category.name}** (${catSources.length})\n`;
      catSources.forEach(s => {
        output += `- ${s.name} ${s.verified ? '✅' : '⚠️'}\n`;
      });
      output += '\n';
    }
  }
  
  output += `\n总计：${subscribed.length} 个源`;
  return output;
}

/**
 * 查看配置
 */
async function handleConfig() {
  const keywords = interests.interests.keywords || [];
  const exclude = interests.interests.excludeKeywords || [];
  const mustInclude = interests.interests.mustInclude || [];
  
  return `⚙️ **当前配置**\n\n` +
    `**兴趣关键词** (${keywords.length})\n` +
    `${keywords.slice(0, 10).join(', ')}${keywords.length > 10 ? '...' : ''}\n\n` +
    `**排除关键词** (${exclude.length})\n` +
    `${exclude.join(', ')}\n\n` +
    `**必须包含** (${mustInclude.length})\n` +
    `${mustInclude.join(', ')}\n\n` +
    `**推送时间**: ${config.schedule.time}\n` +
    `**最大新闻数**: ${config.output.maxNewsCount}\n` +
    `**摘要长度**: ${config.summary.maxLength} 字`;
}

/**
 * 检查源健康状态
 */
async function handleStatus() {
  const subscribed = interests.sources.subscribed || [];
  const allSources = getAllSources();
  const subscribedSources = allSources.filter(s => subscribed.includes(s.id));
  
  const verified = subscribedSources.filter(s => s.verified).length;
  const unverified = subscribedSources.length - verified;
  
  return `🏥 **RSS 源健康状态**\n\n` +
    `总订阅数：${subscribedSources.length}\n` +
    `✅ 已验证：${verified}\n` +
    `⚠️ 待验证：${unverified}\n` +
    `成功率：${((verified / subscribedSources.length) * 100).toFixed(1)}%\n\n` +
    `最后检查：${sources.checkTime || '未知'}`;
}

// 辅助函数
function getAllEnabledSources() {
  const enabled = [];
  const subscribed = interests.sources.subscribed || [];
  
  for (const category of Object.values(sources.categories)) {
    for (const source of category.sources) {
      if (source.enabled && subscribed.includes(source.id)) {
        enabled.push({ ...source, category: category.nameEn });
      }
    }
  }
  
  return enabled;
}

function getAllSources() {
  const all = [];
  for (const category of Object.values(sources.categories)) {
    all.push(...category.sources);
  }
  return all;
}

function getTopStories(articles, count = 5) {
  return articles
    .sort((a, b) => {
      const scoreA = (a.priority || 99) * 100 + (a.qualityScore || 0.5) * 100;
      const scoreB = (b.priority || 99) * 100 + (b.qualityScore || 0.5) * 100;
      return scoreA - scoreB;
    })
    .slice(0, count);
}

function getFormattedDate() {
  const now = new Date();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} 周${weekdays[now.getDay()]}`;
}

function getIssueNumber() {
  const startDate = new Date('2026-03-09');
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

module.exports = {
  handleBriefCommand,
  generateBriefing,
  handleSearch,
  handleSources,
  handleConfig,
  handleStatus
};
