import Client from 'whatsapp-web.js';
import QRCode from 'qrcode'; 

const generateQrCode = async (req, res) => {
    try {
        const client = new Client();
        await client.on("qr", async (qr) => {
            console.log(qr)
            const qrCodeUrl = await QRCode.toDataURL(qr)
            res.send(qr);
        })

        client.initialize();
    } catch (err) {
        res.send(err);
    }
}

export default generateQrCode;