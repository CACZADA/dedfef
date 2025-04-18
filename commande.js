// commands_plus150.js

module.exports = {
  // === MODÉRATION ===
  kick: (message, args) => {
    const member = message.mentions.members.first();
    if (!member) return message.reply('Mentionne un membre à expulser.');
    if (!message.member.permissions.has('KickMembers')) return message.reply("Tu n'as pas la permission d'expulser.");
    member.kick().then(() => message.reply(`${member.user.tag} a été expulsé.`)).catch(err => message.reply('Erreur : ' + err));
  },

  ban: (message, args) => {
    const member = message.mentions.members.first();
    if (!member) return message.reply('Mentionne un membre à bannir.');
    if (!message.member.permissions.has('BanMembers')) return message.reply("Tu n'as pas la permission de bannir.");
    member.ban().then(() => message.reply(`${member.user.tag} a été banni.`)).catch(err => message.reply('Erreur : ' + err));
  },

  unban: async (message, args) => {
    if (!message.member.permissions.has('BanMembers')) return message.reply("Tu n'as pas la permission de débannir.");
    const userId = args[0];
    if (!userId) return message.reply('Fournis un ID utilisateur.');
    try {
      await message.guild.members.unban(userId);
      message.reply(`L'utilisateur ${userId} a été débanni.`);
    } catch (err) {
      message.reply('Erreur : ' + err);
    }
  },

  clear: async (message, args) => {
    if (!message.member.permissions.has('ManageMessages')) return message.reply("Tu n'as pas la permission de gérer les messages.");
    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100) return message.reply('Nombre invalide (1-100).');
    await message.channel.bulkDelete(amount, true).catch(err => message.reply('Erreur : ' + err));
    message.reply(`✅ ${amount} messages supprimés.`).then(msg => setTimeout(() => msg.delete(), 3000));
  },

  mute: async (message, args) => {
    const member = message.mentions.members.first();
    if (!member) return message.reply('Mentionne un membre à mute.');
    const role = message.guild.roles.cache.find(r => r.name === 'Muted');
    if (!role) return message.reply('Aucun rôle "Muted" trouvé.');
    await member.roles.add(role);
    message.reply(`${member.user.tag} est maintenant muet.`);
  },

  unmute: async (message, args) => {
    const member = message.mentions.members.first();
    if (!member) return message.reply('Mentionne un membre à unmute.');
    const role = message.guild.roles.cache.find(r => r.name === 'Muted');
    if (!role) return message.reply('Aucun rôle "Muted" trouvé.');
    await member.roles.remove(role);
    message.reply(`${member.user.tag} n'est plus muet.`);
  },

  slowmode: (message, args) => {
    if (!message.member.permissions.has('ManageChannels')) return message.reply("Tu n'as pas la permission.");
    const duration = parseInt(args[0]);
    if (isNaN(duration)) return message.reply('Donne un nombre de secondes.');
    message.channel.setRateLimitPerUser(duration);
    message.reply(`Le slowmode est maintenant de ${duration} seconde(s).`);
  },

  lock: async (message) => {
    if (!message.member.permissions.has('ManageChannels')) return message.reply("Tu n'as pas la permission.");
    await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: false });
    message.reply('🔒 Canal verrouillé.');
  },

  unlock: async (message) => {
    if (!message.member.permissions.has('ManageChannels')) return message.reply("Tu n'as pas la permission.");
    await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: true });
    message.reply('🔓 Canal déverrouillé.');
  },

  // === LOGS ===
  messagelog: (message) => {
    message.reply('Active les logs avec `+setlog #salon`. Tous les événements y seront envoyés.');
  },

  setlog: (message, args, client) => {
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply('Mentionne un salon pour les logs.');
    if (!client.logChannels) client.logChannels = {};
    client.logChannels[message.guild.id] = channel.id;
    message.reply(`Salon de logs défini sur ${channel}.`);
  },

  // === Ajouter un Emoji d'un autre Serveur ===
  addemoji: async (message, args) => {
    if (!args[0]) return message.reply('Fournis l\'URL de l\'emoji à ajouter.');
    const emojiUrl = args[0];
    try {
      const emoji = await message.guild.emojis.create(emojiUrl, 'nouvel-emoji');
      message.reply(`Emoji ajouté : ${emoji.toString()}`);
    } catch (err) {
      message.reply('Erreur lors de l\'ajout de l\'emoji : ' + err);
    }
  },

  // === COMMANDES EMBED ===
  addembed: (message, args) => {
    const embed = new EmbedBuilder()
      .setTitle(args.join(' '))
      .setDescription('Voici un embed personnalisé.')
      .setColor('#0099ff')
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },

  // === HELP ===
  help: (message) => {
    const cmds = Array.from(message.client.commands.keys()).map(cmd => `\`${cmd}\``).join(', ');
    const embed = new EmbedBuilder()
      .setTitle('Liste des Commandes')
      .setDescription(`Voici toutes les commandes disponibles : \n${cmds}`)
      .setColor('#0099ff')
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },

  // --- Plus de commandes ---
  ping: (message) => {
    const embed = new EmbedBuilder()
      .setTitle('Ping-Pong')
      .setDescription('Pong!')
      .setColor('#ff0000')
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
