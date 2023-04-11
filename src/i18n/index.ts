import { LanguageEnum } from "@/enums/language";
import { I18n, TLocales } from "@infernus/core";
import zh_cn from "./locales/zh-CN.json";
import en_us from "./locales/en-US.json";

export const locales: TLocales = {
  [LanguageEnum.Chinese]: zh_cn,
  [LanguageEnum.English]: en_us,
};

export const localesTitle = {
  [LanguageEnum.Chinese]: {
    [LanguageEnum.Chinese]: "简体中文(中国)",
    [LanguageEnum.English]: "Simplified Chinese(China)",
  },
  [LanguageEnum.English]: {
    [LanguageEnum.Chinese]: "英文(美国)",
    [LanguageEnum.English]: "English(United States)",
  },
};
export const { $t } = new I18n(LanguageEnum.English, locales);
