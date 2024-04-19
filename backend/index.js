const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios module

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;

    try {
        const r = await axios.put(
            'https://api.chatengine.io/users/',
            { username: username, secret: username, first_name: username },
            { headers: { "private-key": "76dcccd8-b0b4-4b0d-bd23-526891bebcc3" } }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        if (e.response && e.response.status) {
            return res.status(e.response.status).json(e.response.data);
        } else {
            // Handle other types of errors
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

});

app.listen(3001);
