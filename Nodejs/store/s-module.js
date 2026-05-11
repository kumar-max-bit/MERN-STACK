const fs=require('fs');

const writeToFile = (filename, data) => {
    fs.writeFileSync(filename, data, 'utf8');
    console.log(`Data written to ${filename}`);
};

const readFromFile = (filename) => {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        console.log(`Data read from ${filename}:`, data);
        return data;
    } catch (err) {
        console.log(`Error reading file ${filename}:`, err.message);
        return null;
    }
};

const appendToFile = (filename, data) => {
    fs.appendFileSync(filename, data, 'utf8');
    console.log(`Data appended to ${filename}`);
};

const deleteFile = (filename) => {
    try {
        fs.unlinkSync(filename);
        console.log(`File ${filename} deleted.`);
    } catch (err) {
        console.log(`Error deleting file ${filename}:`, err.message);
    }
};

module.exports = { writeToFile, readFromFile, appendToFile, deleteFile };
'fs'
