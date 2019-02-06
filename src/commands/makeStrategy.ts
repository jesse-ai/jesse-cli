import fs from 'fs-extra';
import tellUserFileExists from './../utilities/tellUserFileExists';

export default function makeStrategy(strategyName, force) {
    let path = `${process.env.jesse_path}/strategies/${strategyName}/${strategyName}.ts`;
    tellUserFileExists(path, 'strategy', force).then(valid => {
        if (valid) {
            try {
                fs.copySync(`${process.env.jesse_vendor_path}/templates/ExampleStrategy.ts`, path);
                console.info(`Strategy created: ${path}`);
            } catch (err) {
                console.error(err);
            }
        }
    });
}
