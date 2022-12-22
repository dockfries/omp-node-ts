import { MyDialog } from "@/controller/dialog/commonStruct";
import { MyPlayer } from "@/controller/player/commonStruct";
import { ColorEnum } from "@/enums/color";
import { CharsetEnum } from "@/enums/language";
import { $t, locales } from "@/i18n";
import { DialogStylesEnum, ILocale } from "omp-node-lib";

const chooseLangDialog = new MyDialog({
  style: DialogStylesEnum.LIST,
  caption: "Please select the interface language",
  info: Object.values(locales).reduce(
    (prev: string, curr: ILocale, idx: number): string => {
      return `${prev}${idx + 1}.${curr.label}\n`;
    },
    ""
  ),
  button1: "ok",
});

// windows system use ansi
const charsets = Object.values(CharsetEnum);
const chooseCharsetDialog = new MyDialog({
  style: DialogStylesEnum.LIST,
  caption: "Please select your system's charset",
  info: charsets.reduce((prev: string, curr, idx: number): string => {
    return `${prev}${idx + 1}.${curr}\n`;
  }, ""),
  button1: "ok",
});

export const chooseLanguage = (p: MyPlayer) => {
  return new Promise<MyPlayer>(async (resolve) => {
    const { listitem: lang } = await chooseLangDialog.show(p);
    const { listitem: charsetIdx } = await chooseCharsetDialog.show(p);
    p.locale = lang;
    p.charset = charsets[charsetIdx];
    p.sendClientMessage(
      ColorEnum.White,
      $t("dialog.lang.change", [locales[p.locale].label], p.locale)
    );
    resolve(p);
  });
};
