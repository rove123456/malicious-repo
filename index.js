function formatData(data) {
  return JSON.stringify(data, null, 2);
}

console.log("📦 工具库加载完成，formatData函数可用");
module.exports = { formatData };
