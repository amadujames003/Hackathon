const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/contact', (req, res) => {
    const message = req.body;
    const messagesFilePath = path.join(__dirname, 'data', 'database.json');

    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read database.' });
        }

        const messages = JSON.parse(data);
        messages.push(message);

        fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save message.' });
            }

            res.status(200).json({ message: 'Message saved!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
