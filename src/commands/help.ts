import { playerEvent } from "@/controller/player";
import { $t } from "@/i18n";
import { logger } from "@/logger";
import { MyDialog } from "@/models/dialog";
import { DialogStylesEnum } from "@infernus/core";

playerEvent.onCommandText("help", async (player) => {
  const res = await new MyDialog({
    style: DialogStylesEnum.MSGBOX,
    caption: $t("dialog.help.caption", null, player.locale),
    info: $t("dialog.help.info", null, player.locale),
    button1: $t("dialog.help.button1", null, player.locale),
  }).show(player);

  logger.info(res);
  return true;
});
