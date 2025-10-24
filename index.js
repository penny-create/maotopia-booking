// 安裝套件：npm install express @line/bot-sdk
const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

app.use(express.json());

// --- 從環境變數讀取 LINE 憑證 ---
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const RECEIVER_ID = process.env.RECEIVER_ID; // LINE User ID 或群組 ID

const client = new line.Client(config);

// --- 接收前端表單 POST ---
app.post('/booking', async (req, res) => {
    try {
        const data = req.body;
        console.log('收到資料:', data);

        // 整理訊息
        const message = {
            type: 'text',
            text: formatLineMessage(data)
        };

        // 發送到 LINE
        await client.pushMessage(RECEIVER_ID, message);

        res.json({ message: '收到資料，已推送到 LINE！' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '後端或 LINE API 發生錯誤', error: err.message });
    }
});

// --- 格式化 LINE 訊息 ---
function formatLineMessage(data) {
    let msg = "✨ 星際登艦預約通知 ✨\n";
    msg += "========================\n";
    msg += `🚀 任務類型：${data.missionType || '未選'}\n`;
    msg += `📅 登艦日期：${data.startDate || 'N/A'}\n`;
    msg += `🪐 返回日期：${data.endDate || 'N/A'}\n`;
    msg += `👩‍🚀 毛孩姓名：${data.petName || 'N/A'}\n`;
    msg += `⚧ 性別：${data.gender || 'N/A'}\n`;
    msg += `🐕 品種：${data.breed || 'N/A'}\n`;
    msg += `⚖️ 體重：${data.weight || 'N/A'}\n`;
    msg += `🎂 年齡：${data.age || 'N/A'}\n`;
    msg += `👨‍🚀 飼主：${data.ownerName || 'N/A'}\n`;
    msg += `☎️ 電話：${data.phone || 'N/A'}\n`;
    msg += `🧳 備註：${data.notes || '無'}\n`;
    return msg;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
liff.init({ liffId: '2008333754-ODxKZRr9' })

