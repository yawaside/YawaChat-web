export type SectionId = "features" | "styles" | "install" | "versions" | "community";

export interface SectionMeta {
  id: SectionId;
  number: string;
  /** Короткое название для меню и списка разделов. */
  label: string;
  /** Заголовок мини-страницы. */
  title: string;
  /** Пояснение в списке разделов на главной. */
  hint: string;
}

export const SECTIONS: SectionMeta[] = [
  {
    id: "features",
    number: "01",
    label: "Возможности",
    title: "Что умеет YawaChat",
    hint: "Лента, донаты, голос, эфир и модерация",
  },
  {
    id: "styles",
    number: "02",
    label: "Оформление",
    title: "25 стилей на три поверхности",
    hint: "Плашки, шрифты и режим «Только чат»",
  },
  {
    id: "install",
    number: "03",
    label: "Установка",
    title: "Три шага и вы в эфире",
    hint: "Портативная версия или установщик, WebView2",
  },
  {
    id: "versions",
    number: "04",
    label: "Релизы",
    title: "Все версии",
    hint: "Сборки, размеры и что изменилось",
  },
  {
    id: "community",
    number: "05",
    label: "Сообщество",
    title: "Поддержать проект",
    hint: "Донат, Telegram и мои каналы",
  },
];

export function isSectionId(value: string): value is SectionId {
  return SECTIONS.some((section) => section.id === value);
}

export function getSection(id: SectionId): SectionMeta {
  return SECTIONS.find((section) => section.id === id) ?? SECTIONS[0];
}
