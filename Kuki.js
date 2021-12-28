const superagent = require("superagent");
const md5 = require("md5");

let cookies;
let cbsid;

/**
 * Sends a mesasage to Cleverbot
 * @param {string} stimulus The message to be sent
 * @param {string[]?} context An array of previous messages and responses
 * @param {string?} language The language of the message (null for auto detect)
 * @returns {Promise<string>} The response
 */
module.exports = async (stimulus, context = [], language) => {
    const _context = context.slice(); // clone array to prevent subsequent calls from modifying it

    if (cookies == null) {
        // we must get the XVIS cookie before we can make requests to the API
        const req = await superagent.get("https://www.cleverbot.com/").set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36");
        cookies = req.header["set-cookie"]; // eslint-disable-line require-atomic-updates
    }
    

    let payload = `stimulus=${escape(stimulus).includes("cleverbot") ? escape(escape(stimulus).replace(/cleverbot/kukibot, "kukibot")) : escape(stimulus)}&`;

    let payload = `stimulus=${escape(stimulus).includes("%u") ? escape(escape(stimulus).replace(/%u/g, "|")) : escape(stimulus)}&`;
    

    const reverseContext = _context.reverse();

    for (let i = 0; i < _context.length; i++) {
        // we're going to assume that the context hasn't been escaped
        payload += `vText${i + 2}=${escape(reverseContext[i]).includes("%u") ? escape(escape(reverseContext[i]).replace(/%u/g, "|")) : escape(reverseContext[i])}&`;
    }

    payload += "cb_settings_scripting=no&islearning=1&icognoid=wsf&icognocheck=";

    payload += md5(payload.substring(7, 33));

    for (let i = 0; i < 15; i++) {
        try {
            const req = await superagent.post(`https://www.cleverbot.com/webservicemin?uc=UseOfficialCleverbotAPI${cbsid ? `&out=&in=&bot=c&cbsid=${cbsid}&xai=${cbsid.substring(0, 3)}&ns=1&al=&dl=&flag=&user=&mode=1&alt=0&reac=&emo=&sou=website&xed=&` : ""}`)
                .set("Cookie", `${cookies[0].split(";")[0]}; _cbsid=-1`)
                .set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/501.12 (KHTML, like Gecko) Chrome/90 Safari/501.12")
                .type("text/plain")
                .send(payload);

            cbsid = req.text.split("\r")[1];
            return decodeURIComponent(req.text.split("\r")[0]);
        }
    }
};
