const path = require('path');
const fs = require("fs");

const dirCodes = path.join(__dirname, "codes");
// if codes folder doesnt exist
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}


const generateFile = async (format, code) => {

}

module.exports = { generateFile }