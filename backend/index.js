const express = require("express");

const app = express();

// for request body format urlencoded to work
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.send({ "helo": "world" });
});

app.post("/run", (req, res) => {
    const { language = "cpp", code } = req.body;
    // code body cant be empty
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty Code body" })
    }
    return res.json({ language, code });
})


// 5000 not working why - already in use issue but whats running on port 5000 ???
const BACKEND_PORT = 3001;
app.listen(BACKEND_PORT, () => {
    console.log(`Listening to port ${BACKEND_PORT}!`);
});