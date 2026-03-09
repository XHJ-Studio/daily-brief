const Parser = require('rss-parser');
const axios = require('axios');

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'description', 'pubDate']
  },
  timeout: 10000
});

/**
 * 抓取单个 RSS 源
 * @param {string} url - RSS 源 URL
 * @param {object} options - 抓取选项
 * @returns {Promise<Array>} 文章列表
 */
async function fetchRSS(url, options = {}) {
  const { maxItems = 50, timeout = 10000 } = options;
  
  try {
    const feed = await parser.parseURL(url, { timeout });
    
    return feed.items
      .slice(0, maxItems)
      .map(item => ({
        title: item.title || '无标题',
        link: item.link || item.guid || '',
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        content: item.contentSnippet || item.description || '',
        contentEncoded: item['content:encoded'] || '',
        source: feed.title || url,
        sourceUrl: feed.link || url,
        author: item.creator || item.author || '',
        categories: item.categories || [],
        imageUrl: item.enclosure?.url || item.content?.match(/src="([^"]+)"/)?.[1] || ''
      }));
  } catch (error) {
    console.error(`Failed to fetch RSS from ${url}:`, error.message);
    return [];
  }
}

/**
 * 批量抓取多个 RSS 源
 * @param {Array} sources - RSS 源配置数组
 * @returns {Promise<Array>} 所有文章
 */
async function fetchAllSources(sources) {
  const allArticles = [];
  
  for (const source of sources) {
    if (!source.enabled) continue;
    
    console.log(`📰 Fetching: ${source.name} (${source.url})`);
    const articles = await fetchRSS(source.url, { maxItems: 20 });
    
    articles.forEach(article => {
      article.category = source.category || 'uncategorized';
      article.priority = source.priority || 99;
    });
    
    allArticles.push(...articles);
    console.log(`   ✅ Got ${articles.length} articles`);
    
    // 避免请求过快
    await sleep(500);
  }
  
  return allArticles;
}

/**
 * 延时函数
 * @param {number} ms - 毫秒数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  fetchRSS,
  fetchAllSources,
  sleep
};
