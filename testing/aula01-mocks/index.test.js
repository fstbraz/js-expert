const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async() => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);

    }
    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
             "name": "Fausto",
             "id": 123,
              "profession": "Javascript Dev",
              "birthDay": 1987
            },
            {
              "name": "Node Silva",
              "id": 321,
              "profession": "Javacript Instructor",
              "birthDay": 1991
            },
            {
              "name": "Jair",
              "id": 231,
              "profession": "Java Developer",
              "birthDay": 1993
            }]
            
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})()