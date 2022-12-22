import { playerEvent } from "@/controller/player/commonEvent";
import { chooseLanguage } from "@/dialogs/language";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";

playerEvent.onCommandText(["language", "lang"], (player) => {
  chooseLanguage(player);
  return 1;
});

playerEvent.onCommandText("device", async (player) => {
  const isAndroid = await player.isAndroid();
  player.sendClientMessage(
    ColorEnum.White,
    $t("command.device", [isAndroid ? "android" : "pc"], player.locale)
  );
  return 1;
});
