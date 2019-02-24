import exec from './../utilities/exec';

export default function liveTrade(config: string) {
    if (config.length) {
        exec(`${config} npm run livetrade`);
        return; 
    } 

    exec(`npm run livetrade`);
}