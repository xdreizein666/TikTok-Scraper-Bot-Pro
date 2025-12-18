const fs = require("fs");
const path = require("path");

function saveResult(username, data) {
    const dir = "results";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const file = path.join(dir, `${username}.json`);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    return file;
}

module.exports = { saveResult };
