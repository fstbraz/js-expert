const { readFile } = require('fs/promises');
const { error } = require('./constants');
const User = require('./user');

const DEFAULT_OPTION = {
    MAX_LINES: 3,
    fields: ['id', 'name', 'profession', 'age']
};


class File {
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath);
        const validation = File.isValid(content);

        if(!validation.valid) throw new Error(validation.error);
        const users = File.parseCSVtoJSON(content);
        return users
    }

    static async getFileContent(filePath){
        return (await readFile(filePath)).toString('utf8')
    }

    static isValid(csvString, options = DEFAULT_OPTION){
        const [header, ...fileWithoutHeader] = csvString.split('\n');
        const isHeaderValid = header === options.fields.join(',');
        if(!isHeaderValid){
            return {
                error: error.FILE_FILEDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthAccepted = (
            fileWithoutHeader.length > 0 &&
            fileWithoutHeader.length <= options.MAX_LINES
        )

        if(!isContentLengthAccepted){
             return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
             }
        }

        return { valid: true }
    }

    static parseCSVtoJSON(csvString){
        const lines = csvString.split('\n');
        //removes the first item and returns it
        const firstLine = lines.shift();
        const header = firstLine.split(',');
        const users = lines.map(line => {
            const columns = line.split(',');
            let user = {};
            for(const index in columns){
                user[header[index]] = columns[index];
            }
            return new User(user);
        })
        return users;
    }
}


(async () => {
    //const result = await File.csvToJson('./../mocks/threeItems-valid.csv')
    //const result = await File.csvToJson('./../mocks/fourItems-invalid.csv')
    //const result = await File.csvToJson('./../mocks/invalid-header.csv')
    //console.log('result', result)
})();

module.exports = File;