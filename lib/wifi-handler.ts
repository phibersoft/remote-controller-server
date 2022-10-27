import { networkInterfaces } from "os";
import { connect, init } from "node-wifi";
import { logger, sleeper } from "./utils";

const { WIFI_SSID, WIFI_PASSWORD, PORT } = process.env;

const wifiHandler = async (firstCall: boolean = true): Promise<boolean> => {
  return new Promise<boolean>(async (resolve) => {
    let IPv4: string;

    // Get IPv4 address for connection
    const IPList = JSON.stringify(networkInterfaces()["Wi-Fi"] || "").match(
      /192.168.\d+.\d+/g
    );

    if (IPList) IPv4 = IPList[0];

    if (IPv4) {
      logger(`Server started on http://${IPv4}:${PORT}`);
      resolve(true);
    } else {
      if (firstCall === false)
        throw new Error(`No IPv4 address found! Please check your connection!`);

      // We will try to force reconnect
      logger("No IPv4 address found, trying to reconnect...", "warn");

      init({
        iface: null, // network interface, choose a random wifi interface if set to null
      });

      connect({ ssid: WIFI_SSID, password: WIFI_PASSWORD }, async () => {
        logger(
          `Connected to ${process.env.WIFI_SSID}! Checking for IPv4 address...`
        );
        await sleeper(1500);

        // On windows: the callback is called even if the connection failed, so we are checking again
        return wifiHandler(false);
      });
    }
  });
};

export { wifiHandler };
