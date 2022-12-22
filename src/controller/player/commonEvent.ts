import { chooseLanguage } from "@/dialogs/language";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";
import {
  BasePlayerEvent,
  BodyPartsEnum,
  ICmdErr,
  InvalidEnum,
  KeysEnum,
  logger,
  PlayerStateEnum,
  TCommonCallback,
  WeaponEnum,
} from "omp-node-lib";
import { MyPlayer } from "./commonStruct";

export class CommonPlayerEvent extends BasePlayerEvent<MyPlayer> {
  constructor() {
    super();
  }
  protected newPlayer(playerid: number): MyPlayer {
    return new MyPlayer(playerid);
  }
  protected async onConnect(player: MyPlayer): Promise<number> {
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
    return 1;
  }
  protected onDisconnect(player: MyPlayer, reason: number): number {
    this.getPlayersArr().forEach((p) => {
      p.sendClientMessage(
        ColorEnum.White,
        $t("player.disconnect", [player.getName(), reason], player.locale)
      );
    });
    return 1;
  }
  protected onText(player: MyPlayer, text: string): number {
    return 1;
  }
  protected onCommandReceived(
    player: MyPlayer,
    command: string
  ): TCommonCallback {
    return 1;
  }
  protected onCommandPerformed(
    player: MyPlayer,
    command: string
  ): TCommonCallback {
    return 1;
  }
  protected onCommandError(
    player: MyPlayer,
    command: string,
    err: ICmdErr
  ): number {
    player.sendClientMessage(
      ColorEnum.Danger,
      $t("command.error", [command, err.code, err.msg], player.locale)
    );
    return 1;
  }
  protected onEnterExitModShop(
    player: MyPlayer,
    enterexit: number,
    interiorid: number
  ): number {
    return 1;
  }
  protected onClickMap(
    player: MyPlayer,
    fX: number,
    fY: number,
    fZ: number
  ): number {
    return 1;
  }
  protected onClickPlayer(
    player: MyPlayer,
    clickedPlayer: MyPlayer,
    source: number
  ): number {
    return 1;
  }
  protected onDeath(
    player: MyPlayer,
    killer: MyPlayer | InvalidEnum.PLAYER_ID,
    reason: number
  ): number {
    return 1;
  }
  protected onGiveDamage(
    player: MyPlayer,
    damage: MyPlayer,
    amount: number,
    weaponid: WeaponEnum,
    bodypart: BodyPartsEnum
  ): number {
    return 1;
  }
  protected onKeyStateChange(
    player: MyPlayer,
    newkeys: KeysEnum,
    oldkeys: KeysEnum
  ): number {
    player.sendClientMessage(
      ColorEnum.White,
      $t(
        "player.keyStateChange",
        [player.getName(), Date.now(), newkeys, oldkeys],
        player.locale
      )
    );
    return 1;
  }
  protected onRequestClass(player: MyPlayer, classid: number): number {
    return 1;
  }
  protected onRequestSpawn(player: MyPlayer): number {
    return 1;
  }
  protected onSpawn(player: MyPlayer): number {
    return 1;
  }
  protected onStateChange(
    player: MyPlayer,
    newstate: PlayerStateEnum,
    oldstate: PlayerStateEnum
  ): number {
    return 1;
  }
  protected onStreamIn(player: MyPlayer, forPlayer: MyPlayer): number {
    return 1;
  }
  protected onStreamOut(player: MyPlayer, forPlayer: MyPlayer): number {
    return 1;
  }
  protected onTakeDamage(
    player: MyPlayer,
    damage: MyPlayer | InvalidEnum.PLAYER_ID,
    amount: number,
    weaponid: WeaponEnum,
    bodypart: BodyPartsEnum
  ): number {
    return 1;
  }
  protected onUpdate(player: MyPlayer): number {
    return 1;
  }
  protected onInteriorChange(
    player: MyPlayer,
    newinteriorid: number,
    oldinteriorid: number
  ): number {
    return 1;
  }
  protected onPause(player: MyPlayer, timestamp: number): number {
    logger.info(
      $t("player.pause", [player.getName(), timestamp], player.locale)
    );
    return 1;
  }
  protected onResume(player: MyPlayer, pauseMs: number): number {
    const msg = $t("player.resume", [player.getName(), pauseMs], player.locale);
    logger.info(msg);
    player.sendClientMessage(ColorEnum.White, msg);
    return 1;
  }
  protected onRequestDownload(
    player: MyPlayer,
    type: number,
    crc: number
  ): number {
    return 1;
  }
  protected onFinishedDownloading(
    player: MyPlayer,
    virtualworld: number
  ): number {
    return 1;
  }
}

export const playerEvent = new CommonPlayerEvent();
