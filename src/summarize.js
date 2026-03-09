/**
 * 生成文章摘要
 * @param {string} content - 文章内容
 * @param {number} maxLength - 最大长度
 * @returns {string} 摘要
 */
function generateSummary(content, maxLength = 200) {
  if (!content) return '';
  
  // 简单摘要：取前 maxLength 个字符
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // 移除 HTML 标签
    .replace(/\s+/g, ' ')    // 合并空白
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  // 在句子边界截断
  const truncated = cleanContent.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('。');
  const lastDot = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  const cutOff = Math.max(lastPeriod, lastDot, lastSpace);
  
  if (cutOff > maxLength * 0.7) {
    return truncated.substring(0, cutOff) + '...';
  }
  
  return truncated + '...';
}

/**
 * 格式化简报
 * @param {object} data - 简报数据
 * @returns {string} 格式化后的简报
 */
function formatBriefing(data) {
  const { date, issue, categories, topStories } = data;
  
  let briefing = `# 📰 小黄鸡每日简报\n`;
  briefing += `**日期**: ${date}\n`;
  briefing += `**第 ${issue.toString().padStart(3, '0')} 期**\n\n`;
  briefing += `---\n\n`;
  
  // 头条新闻
  if (topStories.length > 0) {
    briefing += `## 🔥 头条新闻\n`;
    topStories.slice(0, 5).forEach((story, i) => {
      briefing += `${i + 1}. **[${story.category}] ${story.title}**\n`;
      briefing += `   ${story.summary}\n`;
      briefing += `   [阅读更多](${story.link})\n\n`;
    });
    briefing += `---\n\n`;
  }
  
  // 各类别新闻
  for (const [category, articles] of Object.entries(categories)) {
    if (articles.length === 0) continue;
    
    const categoryName = getCategoryName(category);
    const emoji = getCategoryEmoji(category);
    
    briefing += `## ${emoji} ${categoryName}\n`;
    
    articles.slice(0, 3).forEach(article => {
      briefing += `- **${article.title}**\n`;
      briefing += `  ${article.summary}\n`;
      briefing += `  [链接](${article.link})\n\n`;
    });
    
    briefing += `---\n\n`;
  }
  
  // 底部信息
  briefing += `*🤖 由 XDB 自动生成 | 订阅管理：回复 "简报设置"*\n`;
  
  return briefing;
}

/**
 * 获取类别中文名
 */
function getCategoryName(category) {
  const names = {
    'news': '国际新闻',
    'tech': '科技前沿',
    'finance': '财经资讯',
    'science': '科学探索',
    'sports': '体育动态',
    'other': '其他资讯'
  };
  return names[category] || category;
}

/**
 * 获取类别 Emoji
 */
function getCategoryEmoji(category) {
  const emojis = {
    'news': '🌍',
    'tech': '📱',
    'finance': '💰',
    'science': '🔬',
    'sports': '🏀',
    'other': '📰'
  };
  return emojis[category] || '📄';
}

module.exports = {
  generateSummary,
  formatBriefing,
  getCategoryName,
  getCategoryEmoji
};
