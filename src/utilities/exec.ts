const promisify = require("util.promisify");
const exec = promisify(require("child_process").exec);

export default exec;