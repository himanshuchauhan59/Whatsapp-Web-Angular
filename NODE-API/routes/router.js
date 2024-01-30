import express from 'express';
// import generateQrCode from '../component/whatsapp/qrCode.js'
import { Client } from 'whatsapp-web.js';
import QRCode from 'qrcode'

const routes = express.Router();


routes.get("/generateQrCode", async (req, res) => {
    try {
        const client = new Client();
        await client.on("qr", async (qr) => {
            console.log(qr)
            const qrCodeUrl = await QRCode.toDataURL(qr)
            res.send({ data: qrCodeUrl });
        })

        client.initialize();
    } catch (err) {
        res.send(err);
    }
})

export default routes;