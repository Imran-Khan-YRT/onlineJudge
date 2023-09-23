const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputFolderName = path.join(__dirname, "outputs");

if (!fs.existsSync(outputFolderName)) {
    fs.mkdirSync(outputFolderName, { recursive: true });
}

const executeCpp = (filePath) => {
    // From   "/Users/imrankhan/Desktop/untitled_folder/onlineJudge/backend/codes/c40d72b5-eac5-45e7-aa6f-d0da7b35c11d.cpp"
    // we need basename =  "c40d72b5-eac5-45e7-aa6f-d0da7b35c11d"
    const jobId = path.basename(filePath).split(".")[0];
    const outputPath = path.join(outputFolderName, `${jobId}.out`);
    // command 
    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outputPath} && cd ${outputFolderName} && ./${jobId}.out`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr)
                resolve(stdout);
            })
    })
}

module.exports = {
    executeCpp
}