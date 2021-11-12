import {Server} from "socket.io";
import * as chalk from "chalk";
import * as robot from "robotjs";
import {LoL_Listener} from "./listeners/LoL";
import * as os from "os";


const PORT = Number(process.env.PORT) || 9292;
const io = new Server(PORT, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

const IPv4 = JSON.stringify(os.networkInterfaces()['Wi-Fi']).match(/192.168.\d+.\d+/g)[0];

console.log(`Server started on http://${IPv4}:${PORT}`);


io.on('connection', (socket) => {
    console.log(chalk.greenBright(`User Connected: ${socket.id}`));

    socket.on('action_keypress', (key: string, modifs?: string[] | string) => {
        try{
            var _modifs = modifs as string[];
            // SPAGHETTI

            if(modifs === "[]"){
                _modifs = []
            }
            if (modifs === "[shift]") {
                _modifs = ["shift"]
            }

            const console_message = `Key Pressed: ${key} ${_modifs ? _modifs?.join('+') : ''}`;
            console.log(chalk.blueBright(console_message));
            io.emit('logger', console_message);
            robot.keyTap(key, _modifs || []);
        }catch(e){
            console.log(`ERROR: ${e.message}`)
        }

    });

    socket.on('action', (act: string, value: string) => {
        console.log(chalk.blueBright(`Action: ${act} --> ${value}`));
    })

    socket.on('lol', LoL_Listener);

    socket.on('disconnect', (s) => {
        console.log(chalk.redBright(`User Disconnected: ${socket.id}`));
    })
})

