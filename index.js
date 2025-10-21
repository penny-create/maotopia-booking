import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import line from "@line/bot-sdk";

// ---- 讀取 __dirname 在 ES Module 中用法 ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---- 環境變數 ----
const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
const CHANNEL_SECRET = process.env.CHANNEL_SECRET;
const RECEIVER_ID = process.env.RECEIVER_ID;

const client = new line.Client({
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET
});

// ---- 格式化 LINE 訊息 ----
function formatLineMessage(data) {
  let msg = "✨ 毛托邦星際登艦預約通知 ✨\n";
  msg += "===========================\n";
  msg += `🚀 任務類型：${data.missionType || "未選"}\n`;
  msg += `📅 登艦日期：${data.startDate || 'N/A'}\n`;
  msg += `🪐 返回日期：${data.endDate || 'N/A'}\n`;
  msg += `🐾 毛孩姓名：${data.petName || 'N/A'}\n`;
  msg += `⚧ 性別：${data.gender || 'N/A'}\n`;
  msg += `是否絕育：${data.neutered || 'N/A'}\n`;
  msg += `品種：${data.breed || 'N/A'}\n`;
  msg += `體重：${data.weight || 'N/A'} kg\n`;
  msg += `年齡：${data.age || 'N/A'} 歲\n`;
  msg += `健康狀況：${data.health || 'N/A'} ${data.healthDetail ? '（'+data.healthDetail+'）' : ''}\n`;
  msg += `個性檔案：${data.personality || '無'} ${data.otherPersonality || ''}\n`;
  msg += `特殊行為：${data.specialBehavior || '無'} ${data.otherBehavior || ''}\n`;
  msg += `👨‍🚀 飼主：${data.ownerName || 'N/A'}\n`;
  msg += `☎️ 聯絡電話：${data.phone || 'N/A'}\n`;
  msg += `🏠 地址：${data.address || 'N/A'}\n`;
  msg += `經驗：${data.experience || 'N/A'}\n`;
  msg += `同意星際條款：${data.agreement || 'N/A'}\n`;
  msg += `🧳 備註：${data.notes || '無'}\n`;
  return msg;
}

// ---- 接收前端表單 ----
app.post("/send-line", async (req, res) => {
  try {
    const data = req.body;
    const message = { type: "text", text: formatLineMessage(data) };
    await client.pushMessage(RECEIVER_ID, message);
    res.json({ status: "success", message: "訊息已發送到 LINE" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ---- 伺服器監聽 ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
