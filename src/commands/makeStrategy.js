const fs = require("fs-extra");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeStrategy(strategyName, force) {
    let path = `${process.env.jesse_path}/strategies/${strategyName}/${strategyName}.ts`;
    tellUserFileExists(path, "strategy", force).then(valid => {
        if (valid) {
            try {
                fs.copySync(`${process.env.jesse_vendor_path}/templates/ExampleStrategy.ts`, path);
                console.info(`Strategy created: ${path}`);
            } catch (err) {
                console.error(err);
            }
        }
    });
};