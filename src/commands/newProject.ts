import ora from 'ora';
import exec from './../utilities/exec';
import downloadGitRepo from 'download-git-repo';
import tellUserFolderExists from './../utilities/tellUserFolderExists';

const loadNvm = 'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" && nvm use ';

export default function makeProject(projectName, branch, force = false) {
    let projectDirectory = `${process.env.jesse_path}/${projectName}`;

    tellUserFolderExists(projectDirectory, 'project folder', force).then(() => {
        let hasNvm = '';
        const spinner = ora();
        spinner.start(`Creating ${projectName}`);

        let startDownload = () => {
            downloadGitRepo(
                `jesse-ai/jesse${typeof branch === 'string' ? `#${branch}` : ''}`,
                projectDirectory,
                function(err) {
                    if (err) {
                        spinner.fail('Failed to download jesse : ' + err.message.trim());
                    } else {
                        exec(`cd ${projectDirectory} && cp .env.example .env`);

                        spinner.succeed(`Created ${projectName}`);
                        spinner.start('Running npm install.');

                        exec(`cd ${projectDirectory} && ${hasNvm ? `${loadNvm} &&` : ''} npm install`).then(
                            () => {
                                spinner.succeed(`NPM modules installed.`);
                                spinner.succeed('Your instance of Jesse is ready. Happy trading!');
                            },
                            err => {
                                spinner.fail(err);
                            }
                        );
                    }
                }
            );
        };

        exec(`${loadNvm} command -v nvm`)
            .then(result => {
                if (result.trim() === 'nvm') {
                    hasNvm = `${loadNvm}`;
                }
                startDownload();
            })
            .catch(function(e) {
                startDownload();
            });
    });
}