const mentionedUsers = new Map(); // মেনশন করা ব্যক্তিদের ট্র্যাক রাখার জন্য

module.exports = {
    config: {
        name: "mentionReply",
        aliases: ["mr"],
        version: "1.0",
        author: "Ullash ッ ☆𝐀𝐁𝐇𝐑𝐀𝐍𝐈𝐋☆",
        role: 2,
        category: "fun",
        shortDescription: "মেনশন করা ইউজারদের রিপ্লাই দেয়",
        longDescription: "যখন তুমি কাউকে মেনশন করবে, বট কিছুক্ষণের জন্য তাদের মেসেজে রিপ্লাই দেবে।",
        guide: {
            en: "{p}mentionReply @user"
        }
    },

    onStart: async function ({ api, event }) {
        let mention = Object.keys(event.mentions)[0];
        if (!mention) return api.sendMessage("অনুগ্রহ করে একজনকে মেনশন করুন!", event.threadID, event.messageID);

        let name = event.mentions[mention]; // মেনশন করা ইউজারের নাম নেওয়া
        mentionedUsers.set(mention, { name, time: Date.now() });

        api.sendMessage(`হ্যালো ${name}, তুমি এখন বটের বিশেষ তালিকায় আছো!`, event.threadID, event.messageID);

        // ৫ মিনিট পর ইউজারকে তালিকা থেকে সরিয়ে ফেলবে
        setTimeout(() => {
            mentionedUsers.delete(mention);
        }, 5 * 60 * 1000);
    },

    onChat: async function ({ api, event }) {
        let userId = event.senderID;

        if (mentionedUsers.has(userId)) {
            let replies = [
                "😊",
                "ভারচুয়াল জগতের গাধা❎",
                ".",
                " 👒",
                "💦",
            ];
            
            let randomReply = replies[Math.floor(Math.random() * replies.length)];
            api.sendMessage(randomReply, event.threadID, event.messageID);
        }
    }
};