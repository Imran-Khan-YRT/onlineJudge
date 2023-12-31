const path = require('path');
const fs = require("fs");

const { v4: uuid } = require('uuid')

const dirCodes = path.join(__dirname, "codes");
// if codes folder doesnt exist
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}


const generateFile = async (format, content) => {
    const jobId = uuid();
    const fileName = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, fileName);
    await fs.writeFileSync(filepath, content);
    return filepath;
}

module.exports = { generateFile }