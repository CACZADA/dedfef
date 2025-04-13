const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let botClient = null;
let botToken = '';
let commands = [];

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint pour connecter le bot
app.post('/connect', (req, res) => {
    botToken = req.body.token;

    if (!botToken) {
        return res.json({ success: false });
    }

    botClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    botClient.login(botToken)
        .then(() => {
            res.json({ success: true });
        })
        .catch(() => {
            res.json({ success: false });
        });

    botClient.on('ready', () => {
        console.log('Bot connecté !');
    });

    // Maintenir le bot actif 24/7
    botClient.on('messageCreate', message => {
        if (message.content.startsWith('!')) {
            const command = message.content.slice(1).toLowerCase();
            if (commands.includes(command)) {
                message.channel.send(`Commande exécutée: ${command}`);
            }
        }
    });
});

// Endpoint pour ajouter des commandes dynamiques
app.post('/add-command', (req, res) => {
    const { command } = req.body;

    if (!command || commands.includes(command)) {
        return res.json({ success: false });
    }

    commands.push(command);
    res.json({ success: true });

    console.log(`Commande ajoutée: ${command}`);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
