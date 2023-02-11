import { MyDialog } from "@/controller/dialog/commonStruct";
import { MyPlayer } from "@/controller/player/commonStruct";
import { ColorEnum } from "@/enums/color";
import { CharsetEnum, LanguageEnum } from "@/enums/language";
import { $t, locales, localesTitle } from "@/i18n";
import { DialogStylesEnum } from "omp-node-lib";

const chooseLangDialog = new MyDialog({
  style: DialogStylesEnum.LIST,
  caption: "Please select the interface language",
  info: "",
  button1: "ok",
});

// windows system use ansi
const charsets = Object.values(CharsetEnum);
const chooseCharsetDialog = new MyDialog({
  style: DialogStylesEnum.LIST,
  caption: "Please select your system's charset",
  info: charsets.reduce(
    (prev: string, curr: CharsetEnum, idx: number): string => {
      return `${prev}${idx + 1}.${curr}\n`;
    },
    ""
  ),
  button1: "ok",
});

export const chooseLanguage = (p: MyPlayer) => {
  return new Promise<MyPlayer>((resolve) => {
    const charset = p.charset as CharsetEnum;
    chooseLangDialog.info = Object.values(localesTitle).reduce(
      (prev, curr, idx: number): string => {
        return `${prev}${idx + 1}.${curr[charset]}\n`;
      },
      ""
    );
    chooseLangDialog.show(p).then(({ listitem: localeIdx }) => {
      chooseCharsetDialog.show(p).then(({ listitem: charsetIdx }) => {
        const locale = Object.keys(locales)[localeIdx] as LanguageEnum;
        p.locale = locale;
        p.charset = charsets[charsetIdx];
        p.sendClientMessage(
          ColorEnum.White,
          $t("dialog.lang.change", [localesTitle[locale][charset]], p.locale)
        );
        resolve(p);
      });
    });
  });
};
