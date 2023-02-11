import { chooseLanguage } from "@/dialogs/language";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";
import { logger } from "@/logger";
import {
  BasePlayerEvent,
  ICmdErr,
  KeysEnum,
  TCommonCallback,
} from "omp-node-lib";
import { MyPlayer } from "./commonStruct";

export class CommonPlayerEvent extends BasePlayerEvent<MyPlayer> {
  async onConnect(player: MyPlayer) {
    await chooseLanguage(player);
    player.sendClientMessage(
      ColorEnum.PrimaryBlue,
      $t("player.hello", [player.getName()], player.locale)
    );
    player.sendClientMessage(
      ColorEnum.Warn,
      $t("player.version", [player.getVersion()], player.locale)
    );
    player.sendClientMessage(
      ColorEnum.White,
      $t("player.ip", [player.getIp()], player.locale)
    );
    player.sendClientMessage(
      ColorEnum.White,
      $t("player.ping", [player.getPing()], player.locale)
    );
    player.sendClientMessage(
      ColorEnum.White,
      $t("player.rawIp", [player.getRawIp()], player.locale)
    );
    return true;
  }
  onDisconnect(player: MyPlayer, reason: number) {
    this.getPlayersArr().forEach((p) => {
      p.sendClientMessage(
        ColorEnum.White,
        $t("player.disconnect", [player.getName(), reason], player.locale)
      );
    });
    return true;
  }
  onCommandError(player: MyPlayer, command: string, err: ICmdErr) {
    player.sendClientMessage(
      ColorEnum.Danger,
      $t("command.error", [command, err.code, err.msg], player.locale)
    );
    return true;
  }
  onKeyStateChange(player: MyPlayer, newkeys: KeysEnum, oldkeys: KeysEnum) {
    player.sendClientMessage(
      ColorEnum.White,
      $t(
        "player.keyStateChange",
        [player.getName(), Date.now(), newkeys, oldkeys],
        player.locale
      )
    );
    return true;
  }
  onPause(player: MyPlayer, timestamp: number) {
    logger.info(
      $t("player.pause", [player.getName(), timestamp], player.locale)
    );
    return true;
  }
  onResume(player: MyPlayer, pauseMs: number) {
    const msg = $t("player.resume", [player.getName(), pauseMs], player.locale);
    logger.info(msg);
    player.sendClientMessage(ColorEnum.White, msg);
    return true;
  }
  onText() {
    return true;
  }
}

export const playerEvent = new CommonPlayerEvent((id) => new MyPlayer(id));
