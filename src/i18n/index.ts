import { CharsetEnum, LanguageEnum } from "@/enums/language";
import { I18n, TLocales } from "omp-node-lib";
import zh_cn from "./locales/zh-CN.json";
import en_us from "./locales/en-US.json";

export const locales: TLocales = {
  [LanguageEnum.Chinese]: zh_cn,
  [LanguageEnum.English]: en_us,
};

export const localesTitle = {
  [LanguageEnum.Chinese]: {
    [CharsetEnum.Chinese]: "简体中文",
    [CharsetEnum.English]: "Chinese",
  },
  [LanguageEnum.English]: {
    [CharsetEnum.Chinese]: "英文",
    [CharsetEnum.English]: "English",
  },
};

export const { $t } = new I18n(LanguageEnum.English, locales);
