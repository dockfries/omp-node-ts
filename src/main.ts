import "./commands";
import { GameMode } from "@infernus/core";
import { logger } from "./logger";
import { $t } from "./i18n";
import { cone } from "./controller/pickup";

const gm = new GameMode();

gm.onInit = () => {
  cone.create();
  logger.info($t("server.running"));
};

gm.onExit = () => {
  logger.info($t("server.exit"));
};

gm.onIncomingConnection = (
  playerid: number,
  ipAddress: string,
  port: number
) => {
  logger.info($t("server.incoming", [playerid, ipAddress, port]));
  return true;
};

gm.onRconCommand = (cmd: string) => {
  logger.info($t("server.rcon.command", [cmd]));
  return true;
};

gm.onRconLoginAttempt = (ip: string, password: string, success: boolean) => {
  logger.info($t("server.rcon.attempt", [ip, password, success]));
  return true;
};
