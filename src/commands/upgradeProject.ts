import ora from 'ora'
import exec from './../utilities/exec'
import downloadGitRepo from 'download-git-repo'

const loadNvm = 'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" && nvm use '

export default function upgradeProject() {
    let projectDirectory = `${process.env.jesse_path}`
    let branch = 'master'

    let hasNvm = ''
    const spinner = ora()
    spinner.start(`Upgrading Jesse`)

    let startDownload = () => {
        downloadGitRepo(`jesse-ai/jesse${typeof branch === 'string' ? `#${branch}` : ''}`, projectDirectory, function(
            err
        ) {
            if (err) {
                spinner.fail('Failed to download jesse : ' + err.message.trim())
            } else {
                spinner.succeed(`Downloaded latest version of Jesse`)
                spinner.start('Running npm install.')

                exec(`cd ${projectDirectory} && ${hasNvm ? `${loadNvm} &&` : ''} npm install`).then(
                    () => {
                        spinner.succeed(`NPM modules installed (ic case there was any new package needed).`)
                        spinner.succeed(
                            'Your instance of Jesse is ready. Enjoy all the new goodies added with this upgrade ;)'
                        )
                    },
                    err => {
                        spinner.fail(err)
                    }
                )
            }
        })
    }

    exec(`${loadNvm} command -v nvm`)
        .then(result => {
            if (result.trim() === 'nvm') {
                hasNvm = `${loadNvm}`
            }
            startDownload()
        })
        .catch(function(e) {
            startDownload()
        })
}
