import * as robot from "robotjs";
import * as chalk from "chalk";


const Screens: Record<ISupportedScreens, Record<IScreenPositions, {
    x: number;
    y: number;
}>> = {
    "1536x864": {
        "accept-match-movement": {
            x: 765,
            y: 613,
        },
        "choose-hero-movement": {
            x: 761,
            y: 653,
        },
        "select-hero-first-movement": {
            x: 928,
            y: 158,
        },
        "select-hero-last-movement": {
            x: 505,
            y: 221,
        }
    },
    "1920x1080": {
        "accept-match-movement": {
            x: 950,
            y: 710,
        },
        "choose-hero-movement": {
            x: 970,
            y: 770,
        },
        "select-hero-first-movement": {
            x: 1080,
            y: 258,
        },
        "select-hero-last-movement": {
            x: 710,
            y: 321,
        }
    }
}

const SupportedScreens: Array<ISupportedScreens> = ["1536x864", "1920x1080"];

export const LoL_Listener = (act: IActions, hero?: string) => {
    // check window size
    const {width, height} = robot.getScreenSize();
    const key = `${width}x${height}`;

    if (Screens[key]) {
        console.log(chalk.blueBright(`Route: LoL -> Action: ${act} ${hero ? `-> Hero: ${hero}` : ''}`))
        switch (act) {
            case "select-hero":
                robot.moveMouse(Screens[key]["select-hero-first-movement"]["x"], Screens[key]["select-hero-first-movement"]["y"]);
                robot.mouseClick();
                robot.keyTap('a', 'control');
                robot.keyTap('backspace');
                robot.typeString(hero);
                robot.moveMouse(Screens[key]["select-hero-last-movement"]["x"], Screens[key]["select-hero-last-movement"]["y"]);
                robot.mouseClick();
                break;
            case "choose-hero":
                robot.moveMouse(Screens[key]["choose-hero-movement"]["x"], Screens[key]["choose-hero-movement"]["y"]);
                robot.mouseClick();
                break;
            case "accept-match":
                robot.moveMouse(Screens[key]["accept-match-movement"]["x"], Screens[key]["accept-match-movement"]["y"]);
                robot.mouseClick();
        }
    } else {
        // TODO: do toast notification insted of console.log
        console.log(chalk.redBright(`Your screen (${key}) is not supported. Currently supporting screens: ${SupportedScreens.join(',')}`));
    }
}


type IActions = "choose-hero" | "select-hero" | "accept-match";
type ISupportedScreens = "1920x1080" | "1536x864";
type IScreenPositions =
    "select-hero-first-movement"
    | "select-hero-last-movement"
    | "choose-hero-movement"
    | "accept-match-movement";
