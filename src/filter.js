const crypto = require('crypto');

/**
 * 过滤文章内容
 * @param {Array} articles - 文章列表
 * @param {object} interests - 用户兴趣配置
 * @returns {Array} 过滤后的文章
 */
function filterArticles(articles, interests) {
  const { keywords, excludeKeywords, mustInclude } = interests;
  
  return articles.filter(article => {
    const text = `${article.title} ${article.content}`.toLowerCase();
    
    // 排除关键词
    if (excludeKeywords.some(k => text.includes(k.toLowerCase()))) {
      return false;
    }
    
    // 包含兴趣关键词或必须关键词
    const hasInterestKeyword = keywords.some(k => 
      text.includes(k.toLowerCase()) || 
      text.includes(k.toLowerCase())
    );
    
    const hasMustInclude = mustInclude.some(k => 
      text.includes(k.toLowerCase())
    );
    
    return hasInterestKeyword || hasMustInclude;
  });
}

/**
 * 去重文章
 * @param {Array} articles - 文章列表
 * @returns {Array} 去重后的文章
 */
function deduplicateArticles(articles) {
  const seen = new Set();
  
  return articles.filter(article => {
    // 使用标题 + 链接生成唯一标识
    const hash = crypto
      .createHash('md5')
      .update(article.title + article.link)
      .digest('hex');
    
    if (seen.has(hash)) {
      return false;
    }
    
    seen.add(hash);
    return true;
  });
}

/**
 * 计算文章质量分数
 * @param {object} article - 文章对象
 * @returns {number} 质量分数 (0-1)
 */
function calculateQualityScore(article) {
  let score = 0.5; // 基础分
  
  // 标题长度适中
  if (article.title.length > 10 && article.title.length < 100) {
    score += 0.1;
  }
  
  // 内容有长度
  if (article.content.length > 50) {
    score += 0.1;
  }
  
  // 有作者
  if (article.author) {
    score += 0.1;
  }
  
  // 有图片
  if (article.imageUrl) {
    score += 0.1;
  }
  
  // 来源可靠
  const reliableSources = ['bbc', 'reuters', 'ap', 'nytimes', 'techcrunch'];
  if (reliableSources.some(s => article.source.toLowerCase().includes(s))) {
    score += 0.1;
  }
  
  return Math.min(score, 1.0);
}

/**
 * 按质量过滤文章
 * @param {Array} articles - 文章列表
 * @param {number} minScore - 最低分数
 * @returns {Array} 高质量文章
 */
function filterByQuality(articles, minScore = 0.6) {
  return articles
    .map(article => ({
      ...article,
      qualityScore: calculateQualityScore(article)
    }))
    .filter(article => article.qualityScore >= minScore)
    .sort((a, b) => b.qualityScore - a.qualityScore);
}

/**
 * 按类别分组文章
 * @param {Array} articles - 文章列表
 * @returns {object} 按类别分组的文章
 */
function groupByCategory(articles) {
  return articles.reduce((groups, article) => {
    const category = article.category || 'other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(article);
    return groups;
  }, {});
}

module.exports = {
  filterArticles,
  deduplicateArticles,
  calculateQualityScore,
  filterByQuality,
  groupByCategory
};
