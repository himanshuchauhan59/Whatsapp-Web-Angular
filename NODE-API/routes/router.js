import express from 'express';
// import generateQrCode from '../component/whatsapp/qrCode.js'
import { Client } from 'whatsapp-web.js';
import QRCode from 'qrcode'
import { GoogleGenerativeAI } from "@google/generative-ai";

const routes = express.Router();
let client, genAI, model;

routes.get("/generateQrCode", async (req, res) => {
    try {
        client = new Client();
        client.on("qr", async (qr) => {
            console.log(qr)
            const qrCodeUrl = await QRCode.toDataURL(qr)
            res.send({ data: qrCodeUrl });
        })

        client.on('ready', () => {
            console.log('Client is ready!');
        });
        client.on('message', async (message) => {
            console.log(message.body);
            // let result = await model.generateContent(message.body);
        });
        client.initialize();
    } catch (err) {
        res.send(err);
    }
})

routes.post("/connectAi", async (req, res) => {
    try {
        let data = req;
        const API_KEY = data.body.api_key;
        genAI = new GoogleGenerativeAI(API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // let result = await model.generateContent(data.body.question);
        // console.log(result.response.candidates[0].content.parts[0].text)
        // res.send();
    } catch (err) {
        console.log("ERROR WHILE CONNECTING GOOGLE AI \n", err)
        res.send(err)
    }
});



export default routes;