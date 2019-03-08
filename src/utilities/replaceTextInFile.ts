import fs from 'fs';

export default function replaceTextInFile(filePath, stringToBeReplaced, replacement) {
    let data = fs.readFileSync(filePath, 'utf8');

    let result = data.replace(new RegExp(stringToBeReplaced, 'g'), replacement);
    
    fs.writeFileSync(filePath, result, { encoding: 'utf8' });
}
