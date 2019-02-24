import exec from './../utilities/exec';

export default function backTest(config: string) {
    if (config.length) {
        exec(`${config} npm run backtest`);
        return; 
    } 

    exec(`npm run backtest`);
}