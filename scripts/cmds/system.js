const si = require('systeminformation');
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "system",
    aliases: [],
    version: "1.0",
    author: "Ullash ッ",
    countDown: 5,
    role: 0,
    shortDescription: "System",
    longDescription: "",
    category: "goatBot",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    const { cpu, cpuTemperature, currentLoad, memLayout, diskLayout, mem, osInfo } = si;
    const timeStart = Date.now();

    try {
      var { manufacturer, brand, speed, physicalCores, cores } = await cpu();
      var { main: mainTemp } = await cpuTemperature();
      var { currentLoad: load } = await currentLoad();
      var diskInfo = await diskLayout();
      var memInfo = await memLayout();
      var { total: totalMem, available: availableMem } = await mem();
      var { platform: OSPlatform, build: OSBuild } = await osInfo();

      var time = process.uptime();
      var hours = Math.floor(time / (60 * 60));
      var minutes = Math.floor((time % (60 * 60)) / 60);
      var seconds = Math.floor(time % 60);
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      var ZiaRein = `
𝗦𝘆𝘀𝘁𝗲𝗺 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 JIM ッ
────────────────────────────────────
𝗠𝗼𝗱𝗲𝗹: ${manufacturer} ${brand}
𝗦𝗽𝗲𝗲𝗱: ${speed}GHz
𝗖𝗼𝗿𝗲𝘀: ${physicalCores}
𝗛𝗬𝗣𝗘𝗥: ${cores}
𝗧𝗲𝗺𝗽𝗲𝗿𝗮𝘁𝗿𝗲: ${mainTemp ? mainTemp : 'N/A'}°C
𝗟𝗼𝗮𝗱: ${load.toFixed(1)}%

𝗠𝗲𝗺𝗼𝗿𝘆 𝗜𝗻𝗳𝗼
────────────────────────────────────
𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝗺𝗼𝗿𝘆: ${this.byte2mb(totalMem)}
𝗠𝗲𝗺𝗼𝗿𝘆 𝗧𝘆𝗽𝗲: ${memInfo[0].type}
𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗠𝗲𝗺𝗼𝗿𝘆: ${this.byte2mb(availableMem)}

𝗗𝗶𝘀𝗸 𝗜𝗻𝗳𝗼
────────────────────────────────────
𝗗𝗶𝘀𝗸 𝗡𝗮𝗺𝗲: ${diskInfo[0].name}
𝗗𝗶𝘀𝗸 𝗦𝗶𝘇𝗲: ${this.byte2mb(diskInfo[0].size)}
𝗗𝗶𝘀𝗸 𝗧𝘆𝗽𝗲: ${diskInfo[0].type}
𝗗𝗶𝘀𝗸 𝗧𝗲𝗺𝗽𝗲𝗿𝗮𝘁𝗿𝗲: ${diskInfo[0].temperature ? diskInfo[0].temperature : 'N/A'}°C

𝗢𝗦 𝗜𝗻𝗳𝗼
────────────────────────────────────
𝗢𝗦 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: ${OSPlatform}
𝗢𝗦 𝗕𝘂𝗶𝗹𝗱: ${OSBuild}
𝗨𝗽𝘁𝗶𝗺𝗲: ${hours}:${minutes}:${seconds}
𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲: ${(Date.now() - timeStart)}ms
`;

      const link = [
        "https://i.imgur.com/YY14Wdl.jpeg",
        "https://i.imgur.com/IetbODK.jpeg",
        "https://i.imgur.com/YY14Wdl.jpeg",
        "https://i.imgur.com/H1B8VZ4.jpeg",
        "https://i.imgur.com/on9p0FK.jpg",
        "https://i.imgur.com/mriBW5m.jpg",
        "https://i.imgur.com/ZwEP7z6.jpeg",
        "https://i.imgur.com/ZwEP7z6.jpeg",
        "https://i.imgur.com/ZwEP7z6.jpeg", "https://i.imgur.com/ZwEP7z6.jpeg",
        "https://i.imgur.com/BsJ7otS.jpeg",
      ];

      var callback = () => api.sendMessage({ body: ZiaRein, attachment: fs.createReadStream(__dirname + "/cache/5.jpg") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"), event.messageID);

      request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/5.jpg")).on("close", () => callback());
    }
    catch (e) {
      console.log(e);
    }
  },

  // Method to convert bytes to megabytes (if needed for usage)
  byte2mb: function(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + 'MB';
  }
};