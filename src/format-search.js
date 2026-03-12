/**
 * 格式化搜索结果 - 第一部分：新闻链接列表（先发送）
 * @param {Array} articles - 文章列表
 * @returns {string} 链接列表
 */
function formatNewsLinks(articles) {
  let content = `## 🔗 相关新闻来源\n\n`;
  
  articles.slice(0, 10).forEach((article, i) => {
    content += `${i + 1}. [${article.title}](${article.link})\n`;
    content += `   来源：${article.source} · ${formatDate(article.pubDate)}\n\n`;
  });
  
  if (articles.length > 10) {
    content += `\n*... 还有 ${articles.length - 10} 篇相关新闻*\n`;
  }
  
  return content;
}

/**
 * 格式化简报 - 第二部分：秘书式汇报（后发送）
 * @param {Array} articles - 文章列表
 * @param {string} keyword - 搜索关键词
 * @param {string} date - 日期
 * @returns {string} 拟人化简报
 */
function formatSecretaryBriefing(articles, keyword, date) {
  let briefing = `# 📋 关于"${keyword}"的新闻简报\n\n`;
  briefing += `**汇报时间**: ${date}\n`;
  briefing += `**搜集范围**: ${articles.length} 篇相关新闻\n\n`;
  briefing += `---\n\n`;
  
  // 开场白
  briefing += `**👋 您好！我已经为您搜集并整理了关于"${keyword}"的最新资讯。**\n\n`;
  
  // 核心要点（拟人化转述）
  briefing += `## 💡 核心要点\n\n`;
  
  const keyPoints = extractKeyPoints(articles);
  briefing += keyPoints;
  
  briefing += `\n---\n\n`;
  
  // 详细分析
  briefing += `## 📊 详细分析\n\n`;
  
  briefing += `**整体趋势**\n`;
  briefing += getOverallTrend(articles);
  briefing += `\n\n`;
  
  briefing += `**关注重点**\n`;
  briefing += getFocusPoints(articles);
  briefing += `\n\n`;
  
  // 建议
  briefing += `## 💼 建议\n\n`;
  briefing += getRecommendations(articles);
  
  briefing += `\n\n---\n`;
  briefing += `*🤖 您的私人新闻秘书已为您整理完毕 | 需要深入了解某条新闻请告诉我*\n`;
  
  return briefing;
}

/**
 * 提取核心要点
 */
function extractKeyPoints(articles) {
  if (articles.length === 0) return '暂无相关信息';
  
  let points = '';
  
  // 分析文章主题
  const topics = {};
  articles.forEach(article => {
    const text = (article.title + ' ' + article.summary).toLowerCase();
    
    if (text.includes('oil') || text.includes('油价') || text.includes('petroleum') || text.includes('energy')) {
      topics['oil'] = (topics['oil'] || 0) + 1;
    }
    if (text.includes('war') || text.includes('冲突') || text.includes('战争') || text.includes('military')) {
      topics['conflict'] = (topics['conflict'] || 0) + 1;
    }
    if (text.includes('sanction') || text.includes('制裁')) {
      topics['sanction'] = (topics['sanction'] || 0) + 1;
    }
    if (text.includes('economy') || text.includes('经济') || text.includes('market') || text.includes('价格')) {
      topics['economy'] = (topics['economy'] || 0) + 1;
    }
    if (text.includes('ship') || text.includes('船') || text.includes('tanker') || text.includes('fleet')) {
      topics['shipping'] = (topics['shipping'] || 0) + 1;
    }
  });
  
  // 生成要点
  const sortedTopics = Object.entries(topics).sort((a, b) => b[1] - a[1]);
  
  sortedTopics.slice(0, 4).forEach(([topic, count]) => {
    const topicNames = {
      'oil': '🛢️ 石油/能源',
      'conflict': '⚔️ 军事冲突',
      'sanction': '📜 国际制裁',
      'economy': '💰 经济影响',
      'shipping': '🚢 航运/船队'
    };
    points += `• ${topicNames[topic] || topic} - 相关报道 ${count} 篇\n`;
  });
  
  return points || '• 暂无明确主题分类\n';
}

/**
 * 获取整体趋势
 */
function getOverallTrend(articles) {
  const recentCount = articles.filter(a => {
    const pubDate = new Date(a.pubDate);
    const now = new Date();
    const diffHours = Math.abs(now - pubDate) / (1000 * 60 * 60);
    return diffHours < 24;
  }).length;
  
  return `根据最新搜集的 ${articles.length} 篇报道，其中 ${recentCount} 篇来自过去 24 小时。` +
         `相关信息更新频率${recentCount > 5 ? '较高' : '正常'}，建议${recentCount > 5 ? '密切关注' : '保持关注'}事态发展。`;
}

/**
 * 获取关注重点
 */
function getFocusPoints(articles) {
  let focus = '';
  
  // 提取最重要的 3 条新闻
  articles.slice(0, 3).forEach((article, i) => {
    focus += `${i + 1}. **${article.title}**\n`;
    focus += `   ${article.summary}\n\n`;
  });
  
  return focus || '暂无重点关注内容';
}

/**
 * 获取建议
 */
function getRecommendations(articles) {
  return `• 如需了解某条新闻的详细内容，请点击上方链接查看原文\n` +
         `• 如需持续追踪此话题，建议设置关键词提醒\n` +
         `• 重要信息已为您标注，建议优先阅读前 3 条报道`;
}

/**
 * 格式化日期
 */
function formatDate(dateStr) {
  if (!dateStr) return '未知时间';
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  
  if (diffHours < 1) {
    return '刚刚';
  } else if (diffHours < 24) {
    return `${diffHours} 小时前`;
  } else if (diffHours < 48) {
    return '昨天';
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}

module.exports = {
  formatNewsLinks,
  formatSecretaryBriefing,
  formatDate
};
