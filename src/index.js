const fs = require('fs');
const path = require('path');
const fetch = require('./fetch');
const filter = require('./filter');
const summarize = require('./summarize');
const message = require('./send');

// 加载配置
const config = require('../config.json');
const sources = require('../sources.json');
const interests = require('../interests.json');

/**
 * 主函数：生成并发送每日简报
 */
async function main() {
  console.log('📰 开始生成每日简报...');
  console.log(`⏰ 时间：${new Date().toISOString()}`);
  
  try {
    // 1. 收集所有启用的 RSS 源
    const enabledSources = getAllEnabledSources();
    console.log(`📡 已启用 ${enabledSources.length} 个 RSS 源`);
    
    // 2. 抓取所有文章
    const allArticles = await fetch.fetchAllSources(enabledSources);
    console.log(`📚 抓取到 ${allArticles.length} 篇文章`);
    
    // 3. 过滤和去重
    const filtered = filter.filterArticles(allArticles, interests.interests);
    console.log(`🔍 过滤后剩余 ${filtered.length} 篇文章`);
    
    const deduplicated = filter.deduplicateArticles(filtered);
    console.log(`✨ 去重后剩余 ${deduplicated.length} 篇文章`);
    
    // 4. 质量过滤
    const highQuality = filter.filterByQuality(deduplicated, 0.6);
    console.log(`💎 高质量文章 ${highQuality.length} 篇`);
    
    // 5. 生成摘要
    const withSummary = highQuality.map(article => ({
      ...article,
      summary: summarize.generateSummary(article.content, 150)
    }));
    
    // 6. 分组和排序
    const grouped = filter.groupByCategory(withSummary);
    const topStories = getTopStories(withSummary, 5);
    
    // 7. 生成简报
    const briefing = {
      date: getFormattedDate(),
      issue: getIssueNumber(),
      categories: grouped,
      topStories: topStories
    };
    
    const formattedBriefing = summarize.formatBriefing(briefing);
    
    // 8. 发送简报
    await message.sendBriefing(formattedBriefing, config);
    
    console.log('✅ 简报发送完成！');
    
  } catch (error) {
    console.error('❌ 生成简报失败:', error);
    throw error;
  }
}

/**
 * 获取所有启用的源
 */
function getAllEnabledSources() {
  const enabled = [];
  const subscribed = interests.sources.subscribed || [];
  
  for (const category of Object.values(sources.categories)) {
    for (const source of category.sources) {
      if (source.enabled && subscribed.includes(source.id)) {
        enabled.push({
          ...source,
          category: category.nameEn
        });
      }
    }
  }
  
  return enabled;
}

/**
 * 获取头条新闻
 */
function getTopStories(articles, count = 5) {
  return articles
    .sort((a, b) => {
      // 按优先级和质量排序
      const scoreA = (a.priority || 99) * 100 + (a.qualityScore || 0.5) * 100;
      const scoreB = (b.priority || 99) * 100 + (b.qualityScore || 0.5) * 100;
      return scoreA - scoreB;
    })
    .slice(0, count);
}

/**
 * 获取格式化日期
 */
function getFormattedDate() {
  const now = new Date();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} 周${weekdays[now.getDay()]}`;
}

/**
 * 获取期号（从某个基准日期开始计算）
 */
function getIssueNumber() {
  const startDate = new Date('2026-03-09');
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

// 运行主函数
if (require.main === module) {
  main()
    .then(() => {
      console.log('🎉 任务完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 任务失败:', error);
      process.exit(1);
    });
}

module.exports = {
  main
};
