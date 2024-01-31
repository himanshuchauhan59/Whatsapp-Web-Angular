import { GoogleGenerativeAI } from "@google/generative-ai";

const makeConnectionWithGemin = async (req, res) => {
    try {
        let data = req;
        const API_KEY = data.api_key;
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        let result = await model.generateContent(data.question);
        console.log(result)
        // res.send();
    } catch (err) {
        console.log("ERROR WHILE CONNECTING GOOGLE AI \n", err)
        res.send(err)
    }
}

export default makeConnectionWithGemin;