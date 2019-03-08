import fs from 'fs-extra';
import toPascalCase from 'to-pascal-case';
import replaceTextInFile from './../utilities/replaceTextInFile';
import tellUserFileExists from './../utilities/tellUserFileExists';

export default function makeStrategy(strategyName, force) {
    let folderPath = `${process.env.jesse_path}/strategies/${toPascalCase(strategyName)}`;

    tellUserFileExists(folderPath, 'strategy', force).then(valid => {
        if (valid) {
            try {
                fs.copySync(`${process.env.jesse_path}/core/templates/ExampleStrategy`, `${folderPath}/`);
                replaceTextInFile(`${folderPath}/index.ts`, 'ExampleStrategy', toPascalCase(strategyName));
                console.info(`Strategy created at: ${folderPath}`);
            } catch (err) {
                console.error(err);
            }
        }
    });
}
