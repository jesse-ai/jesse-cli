import path from 'path';
import program from 'commander';
import commands from './commands';
import Matcher from 'did-you-mean';
import findup from 'findup-sync';

const nodeModulesPath: string = findup('node_modules');
let packageJson = null;
try {
    packageJson = require(`${nodeModulesPath}/../package.json`);
} catch (error) {}

process.env.jesse_path = process.cwd();
process.env.jesse_vendor_path = `${nodeModulesPath}/jesse`;
process.env.node_modules_path = nodeModulesPath;

if (packageJson && packageJson.jessePath) {
    process.env.jesse_path = path.join(`${nodeModulesPath}/../`, packageJson.jessePath);
}

program
    .option("--force", "Forces a command")
    .version(require("../package").version)
    .usage("<command> [options]");

program
    .command("init")
    .description("Creates a new jesse instance")
    .action(function (projectName, branch = "master") {
        commands.newProject(projectName, branch, program.force);
    });

program
    .command("make:strategy")
    .description("Creates a trading strategy folder in the strategies directory")
    .action(function (strategyName) {
        commands.makeStrategy(strategyName, program.force);
    });

program.command("*").action(function (command) {
    let matcher = new Matcher();
    matcher.setThreshold(4);
    if (command.includes("make")) {
        matcher.add(
            "make:strategy",
            "init"
        );
    }

    let matches = matcher.list(command);
    if (matches.length) {
        console.error(`Did you mean one of these?`);
        console.error("");
        matches.forEach(match => {
            console.error(match.value);
        });
        console.error("");
        return;
    }
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}