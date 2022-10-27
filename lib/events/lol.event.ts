import {
  getScreenSize,
  keyTap,
  mouseClick,
  moveMouse,
  typeString,
} from "robotjs";
import { logger } from "../utils";

const lol = (action: IActions, hero?: string) => {
  const { width, height } = getScreenSize();
  const screen = `${width}x${height}`;

  if (Screens[screen]) {
    logger(`LoL Event: ${action} ${hero ? `-> Hero: ${hero}` : ""}`);

    switch (action) {
      case "select-hero":
        moveMouse(
          Screens[screen]["select-hero-first-movement"]["x"],
          Screens[screen]["select-hero-first-movement"]["y"]
        );
        mouseClick();
        keyTap("a", "control");
        keyTap("backspace");
        typeString(hero);
        moveMouse(
          Screens[screen]["select-hero-last-movement"]["x"],
          Screens[screen]["select-hero-last-movement"]["y"]
        );
        mouseClick();
        break;
      case "choose-hero":
        moveMouse(
          Screens[screen]["choose-hero-movement"]["x"],
          Screens[screen]["choose-hero-movement"]["y"]
        );
        mouseClick();
        break;
      case "accept-match":
        moveMouse(
          Screens[screen]["accept-match-movement"]["x"],
          Screens[screen]["accept-match-movement"]["y"]
        );
        mouseClick();
        break;
      default:
        throw new Error(`LoL Event: ${action} is not supported`);
    }
  } else {
    throw new Error(`Unsupported screen size: ${screen}`);
  }
};

export { lol };

type IActions = "choose-hero" | "select-hero" | "accept-match";
type ISupportedScreens = "1920x1080" | "1536x864";
type IScreenPositions =
  | "select-hero-first-movement"
  | "select-hero-last-movement"
  | "choose-hero-movement"
  | "accept-match-movement";

const Screens: Record<
  ISupportedScreens,
  Record<
    IScreenPositions,
    {
      x: number;
      y: number;
    }
  >
> = {
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
    },
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
    },
  },
};
