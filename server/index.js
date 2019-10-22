const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routers/UserRouter");
const batchRouter = require("./routers/BatchRouter");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(userRouter);
app.use(batchRouter);

app.get('/', (req, res) => {
    res.send("Welcome to our server")
});

app.listen(port, () => {
    console.log(`Web server is listening on port ${port}`);
})