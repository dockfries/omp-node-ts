import { playerEvent } from "@/controller/player/commonEvent";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";

playerEvent.onCommandText(["race"], (player, ...args) => {
  // subcommand command, means like /race s
  const [subcommand, ...next] = args;
  if (subcommand === "s") {
    player.sendClientMessage(
      ColorEnum.White,
      $t("command.next", [next.toString()], player.locale)
    );
    return true;
  }
  return false;
});
