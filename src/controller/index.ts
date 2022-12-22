import { $t } from "@/i18n";
import { BaseGameMode, logger } from "omp-node-lib";

export class MyGameMode extends BaseGameMode {
  protected onInit(): void {
    logger.info($t("server.running"));
  }
  protected onExit(): void {
    logger.info($t("server.exit"));
  }
  protected onIncomingConnection(
    playerid: number,
    ipAddress: string,
    port: number
  ): number {
    logger.info($t("server.incoming", [playerid, ipAddress, port]));
    return 1;
  }
  protected onRconCommand(cmd: string): number {
    logger.info($t("server.rcon.command", [cmd]));
    return 1;
  }
  protected onRconLoginAttempt(
    ip: string,
    password: string,
    success: boolean
  ): number {
    logger.info($t("server.rcon.attempt", [ip, password, success]));
    return 1;
  }
}
