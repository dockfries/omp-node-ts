import { playerEvent } from "@/controller/player";
import { chooseLanguage } from "@/dialogs/language";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";

playerEvent.onCommandText(["language", "lang"], (player) => {
  chooseLanguage(player);
  return true;
});

playerEvent.onCommandText("isOfficial", (player) => {
  const isOfficial = player.isUsingOfficialClient();
  player.sendClientMessage(
    ColorEnum.White,
    $t(
      isOfficial ? "command.official.yes" : "command.official.no",
      null,
      player.locale
    )
  );
  return true;
});
