import express  from "express";
import routes from './routes/router.js';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.options('*', cors()) 
app.use(routes)

// error handlers
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error.";
    res.status(err.statusCode).json({
        message: err.message
    });
});

// use prot or we use host ip address for hosting or serve the project over network.
app.listen(PORT, () => {
    console.log(`App Listen On : http://localhost:${PORT}`);
})