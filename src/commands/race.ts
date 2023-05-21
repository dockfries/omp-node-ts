import { playerEvent } from "@/controller/player";
import { ColorEnum } from "@/enums/color";
import { $t } from "@/i18n";

playerEvent.onCommandText("race", (player, subcommand, ...args) => {
  // subcommand command, means like /race s
  if (subcommand === "s") {
    player.sendClientMessage(
      ColorEnum.White,
      $t("command.next", [args.toString()], player.locale)
    );
    return true;
  }
  return false;
});
