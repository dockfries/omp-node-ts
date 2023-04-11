import { $t } from "@/i18n";
import { logger } from "@/logger";
import { GameMode } from "@infernus/core";

export class MyGameMode extends GameMode {
  onInit(): void {
    logger.info($t("server.running"));
  }
  onExit(): void {
    logger.info($t("server.exit"));
  }
  onIncomingConnection(playerid: number, ipAddress: string, port: number) {
    logger.info($t("server.incoming", [playerid, ipAddress, port]));
    return true;
  }
  onRconCommand(cmd: string) {
    logger.info($t("server.rcon.command", [cmd]));
    return true;
  }
  onRconLoginAttempt(ip: string, password: string, success: boolean) {
    logger.info($t("server.rcon.attempt", [ip, password, success]));
    return true;
  }
}
