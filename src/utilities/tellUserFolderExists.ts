import chalk from 'chalk';
import fs from 'fs-extra';

export default function tellUserFolderExists(path, type = "folder", force) {
    return new Promise(resolve => {
        if (force) {
            return resolve(true);
        }
        return fs.pathExists(path, (err, exists) => {
            if (exists) {
                console.log(
                    chalk.red(
                        `This ${type} already exists. You can use --force to overwrite`
                    )
                );
                resolve(false);
                process.exit();
            }
            resolve(true);
        });
    });
}