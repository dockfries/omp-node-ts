import { MyDialog } from "@/controller/dialog/commonStruct";
import { playerEvent } from "@/controller/player/commonEvent";
import { $t } from "@/i18n";
import { logger } from "@/logger";
import { DialogStylesEnum } from "omp-node-lib";

const helpDialog = new MyDialog({
  style: DialogStylesEnum.MSGBOX,
});

playerEvent.onCommandText("help", async (player) => {
  helpDialog.caption = $t("dialog.help.caption", null, player.locale);
  helpDialog.info = $t("dialog.help.info", null, player.locale);
  helpDialog.button1 = $t("dialog.help.button1", null, player.locale);
  const res = await helpDialog.show(player);
  logger.info(res);
  return 1;
});
