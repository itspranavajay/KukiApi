const express = require('express') // Import NPM Package
const app = express();
const bot = require("./kyuki.js");
const cors = require('cors')
const NodeCache = require('node-cache')
const fetch = require('node-fetch')
const { default: axios } = require('axios');
const port = process.env.PORT || 5000
const cache = new NodeCache({ stdTTL: 5 }) // time format is seconds

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// https://expressjs.com/en/starter/basic-routing.html

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});


app.get("/", (req, res) => {
    res.status(200).json({
        "Kuki": "kukiapi.xyz/api/docs",        
    

    });
});






app.get('/chatbot/message=:reply', async function(request, response) {

	const reply = request.params.reply        

        
	bot(reply).then(bot_response => {

		response.status(200)
		response.header("Content-Type",'application/json')
		response.end(JSON.stringify({reply : bot_response.replace('Gumnaam', `kuki`).replace('Sarah', `kuki`).replace('Chris', `kuki`).replace('CASTIEL', `kuki`).replace('clever', `kuki`).replace('Alex', `kuki`).replace('Edwin', `kuki`).replace('David', `kuki`).replace('Jeff', `kuki`).replace('Anh', `kuki`).replace('Adam', `kuki`).replace('deanna', `kuki`).replace('Owen', `kuki`).replace('Tanya', `kuki`).replace('My mother and Father', `MoeZilla`).replace('My mother and my father made me.', `@PranavAjay Made Me.`).replace('cleverbot.com', `github.com/moezilla`).replace('My parents.', `MoeZilla`).replace('cleverbot', `MoeZilla`).replace('Cleverbot',  `MoeZilla`)}))
 
        })           
      

})







app.get('/chatbot/:name/:owner/message=:reply', async function(request, response) {

	const reply = request.params.reply
        const owner = request.params.owner
        const name = request.params.name        

        bot(reply).then(bot_response => {

		response.status(200)
		response.header("Content-Type",'application/json')
		response.end(JSON.stringify({reply : bot_response.replace('Gumnaam', `${name}`).replace('Sarah', `${name}`).replace('Chris', `${name}`).replace('CASTIEL', `${name}`).replace('Nat', `${name}`).replace('Alex', `${name}`).replace('clever', `kuki`).replace('David', `${name}`).replace('Jeff', `${name}`).replace('Anh', `${name}`).replace('Adam', `${name}`).replace('deanna', `${name}`).replace('Owen', `${name}`).replace('Tanya', `${name}`).replace('My mother and Father', `${owner}`).replace('My mother and my father made me.', `MoeZilla`).replace('cleverbot.com', `github.com/moezilla`).replace('My parents.', `${owner}`).replace('cleverbot', `${owner}`).replace('Cleverbot',  `${owner}`).replace('my parents',  `${owner}`)}))
               
        })


})


app.get("/api/stats", (req, res) => {
    res.status(200).json({
        "success": true,
        "message": "The kuki has launched",
    });
});


app.listen( port, () => {
    console.log(`Connected to port ${port}`)
} )
