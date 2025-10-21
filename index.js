const express = require('express');
const app = express();
app.use(express.json());

app.post('/booking', async (req, res) => {
    console.log(req.body); // 可以先 log 看前端資料
    res.json({ message: "收到資料，測試成功！" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
