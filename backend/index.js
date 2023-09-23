const express = require("express");
const { generateFile } = require('./generateFile');
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const cors = require("cors");
const mongoose = require("mongoose");


async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://localhost/compilerapp", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB database!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

connectToDatabase();
const app = express();

// for request body format urlencoded to work
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.send({ "helo": "world" });
});

app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body;
    // code body cant be empty
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty Code body" })
    }
    try {
        let output;
        const filePath = await generateFile(language, code);
        if (language === "py") {
            output = await executePy(filePath);
        }
        else {
            output = await executeCpp(filePath);
        }

        return res.json({ filePath, output });
    }
    catch (err) {
        // in case any error in the code file
        res.status(500).json({ err });
    }
})


// 5000 not working why - already in use issue but whats running on port 5000 ???
const BACKEND_PORT = 3001;
app.listen(BACKEND_PORT, () => {
    console.log(`Listening to port ${BACKEND_PORT}!`);
});