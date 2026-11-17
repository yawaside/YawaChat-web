export const LINKS = {
  telegram: "https://t.me/+pk1zIbjQle01NWEy",
  donate: "https://www.donationalerts.com/r/yawaside",
  twitch: "https://www.twitch.tv/yawaside_",
  youtube: "https://www.youtube.com/@YAWASIDE",
  vk: "https://live.vkvideo.ru/yawaside",
} as const;

export interface Platform {
  id: string;
  name: string;
  /** Двухбуквенный знак для тёмного окна приложения. */
  short: string;
  /** Цвет площадки — только для тёмных поверхностей. */
  color: string;
  /** Затемнённый вариант того же цвета — для светлого фона. */
  paper: string;
  /** Тёмный текст на плашке площадки (для светлых фирменных цветов). */
  darkBadge?: boolean;
  handle?: string;
}

export const PLATFORMS: Platform[] = [
  { id: "twitch", name: "Twitch", short: "Tw", color: "#9146ff", paper: "#6b3fd4", handle: "yawaside_" },
  { id: "youtube", name: "YouTube Live", short: "YT", color: "#ff3355", paper: "#cc1f3d", handle: "@YAWASIDE", darkBadge: true },
  { id: "vk", name: "VK Видео Live", short: "VK", color: "#2d8cff", paper: "#1367d8", handle: "yawaside", darkBadge: true },
  { id: "kick", name: "Kick", short: "Ki", color: "#53fc18", paper: "#2b8b12", darkBadge: true },
  { id: "tiktok", name: "TikTok Live", short: "Tt", color: "#25f4ee", paper: "#00918f", darkBadge: true },
  { id: "rutube", name: "Rutube", short: "Ru", color: "#e5e7eb", paper: "#544e63", darkBadge: true },
  { id: "boosty", name: "Boosty", short: "Bo", color: "#f98a3d", paper: "#bf5f14", darkBadge: true },
];

export const DONATION_SERVICES = ["DonationAlerts", "DonatePay"] as const;

export type FeatureIcon =
  | "layers"
  | "sparkles"
  | "coins"
  | "bell"
  | "gift"
  | "plus"
  | "mic"
  | "shield"
  | "tv"
  | "life"
  | "gamepad"
  | "obs"
  | "keyboard";

export interface Feature {
  icon: FeatureIcon;
  title: string;
  text: string;
}

export interface FeatureGroup {
  id: string;
  title: string;
  features: Feature[];
}

/** Десять возможностей в основном списке; ещё три — в тёмном блоке «Эфир». */
export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "feed",
    title: "Лента",
    features: [
      {
        icon: "layers",
        title: "Семь площадок в одной ленте",
        text: "Сообщения идут одним потоком: с иконкой площадки, цветом ника, значками модератора и подписчика, смайлами и стикерами, включая анимированные смайлы 7TV. Есть поиск по ленте, фильтр по площадкам и скрытие служебных событий.",
      },
      {
        icon: "sparkles",
        title: "События канала",
        text: "Подписки, рейды, подарки, биты и награды за баллы — с автором и отдельной подсветкой в ленте.",
      },
    ],
  },
  {
    id: "money",
    title: "Донаты и баллы",
    features: [
      {
        icon: "coins",
        title: "Донаты с двух сервисов",
        text: "DonationAlerts и DonatePay в едином формате: площадка, имя (или «Аноним»), сумма и сообщение. В оверлее суммы обоих сервисов складываются в один счётчик.",
      },
      {
        icon: "bell",
        title: "Отдельные настройки донатов",
        text: "Свой звук для каждой площадки — колокольчик, монетки, фанфары, звонок, аркада или пузырёк. Озвучка донатов независима от озвучки чата и включается с выбранной суммы.",
      },
      {
        icon: "gift",
        title: "Звуки для наград за баллы",
        text: "У каждой награды канала свой звук и своя громкость. Звук слышен и на трансляции — для этого есть отдельный виджет OBS. После входа в Twitch все награды подтягиваются сами.",
      },
      {
        icon: "plus",
        title: "Награды создаются в приложении",
        text: "Название, цена, описание и требование сообщения — и награда появляется на Twitch, VK Видео Live или сразу на обеих площадках. Если площадка отказала, причина написана словами.",
      },
    ],
  },
  {
    id: "voice",
    title: "Голос",
    features: [
      {
        icon: "mic",
        title: "Озвучка сообщений",
        text: "Нейросетевые голоса Edge TTS и системные голоса Windows. Скорость, громкость, состав фразы, голос для конкретного зрителя, фильтры ссылок и команд, чёрный и белый списки авторов.",
      },
    ],
  },
  {
    id: "care",
    title: "Модерация и помощь",
    features: [
      {
        icon: "shield",
        title: "Чат-бот и модерация",
        text: "Автоответы на команды, режимы чата Twitch (медленный, только подписчики, только фолловеры), удаление сообщений, таймауты и баны прямо из ленты.",
      },
      {
        icon: "tv",
        title: "VK Видео Live с входом в аккаунт",
        text: "Публичный чат читается без входа. После входа бот отвечает в чате VK Видео Live, подтягивает награды за баллы и включает режимы чата.",
      },
      {
        icon: "life",
        title: "Помощь при неполадках",
        text: "Диагностический пакет со сведениями о сбоях и состоянии площадок. Имена каналов, сообщения и данные входа в архив не попадают.",
      },
    ],
  },
];

/** Три возможности, которые показывает тёмный блок «Эфир». */
export const AIR_FEATURES: Feature[] = [
  {
    icon: "gamepad",
    title: "Игровой оверлей",
    text: "Полупрозрачное окно поверх игры с последними сообщениями и событиями. Не перехватывает мышь, свободно перемещается и меняет размер, показывает статистику эфира. Для TikTok — счётчики зрителей и лайков.",
  },
  {
    icon: "obs",
    title: "Виджет для OBS",
    text: "Отдельный источник для трансляции с собственным оформлением — чат на экране зрителей выглядит так, как вы настроите.",
  },
  {
    icon: "keyboard",
    title: "Горячие клавиши",
    text: "Озвучка, пауза и пропуск очереди, режим «Только чат», показ оверлея — работают, даже когда вы в игре.",
  },
];

export const STYLE_NAMES = [
  "Rust",
  "World of Tanks",
  "Tarkov",
  "Стекло",
  "Неон",
  "Терминал",
  "Милая розовая",
  "Ретровейв",
  "Комикс",
  "Пиксель",
  "Видеокассета",
  "Вне закона",
  "Вылазка",
  "Звёздочёт",
  "Кибер",
  "Охотник",
  "Плашки",
  "Приколото",
  "Скетчбук",
] as const;

export interface DemoMessage {
  /** Индекс площадки в PLATFORMS. */
  platform: number;
  user: string;
  color: string;
  text: string;
  time: string;
  mod?: boolean;
  /** Служебная строка: подписка, рейд, награда. */
  event?: string;
  donate?: { amount: string; service: string };
}

export const DEMO_MESSAGES: DemoMessage[] = [
  { platform: 0, user: "nightowl_k", color: "#c4b5fd", text: "Привет из Twitch! Звук огонь 🔥", time: "21:04" },
  { platform: 1, user: "Марина В.", color: "#fda4af", text: "А когда следующий стрим?", time: "21:04" },
  { platform: 2, user: "ВанёкGames", color: "#93c5fd", text: "Вижу чат из ВК, всё работает", time: "21:05" },
  { platform: 3, user: "kickfan_77", color: "#bef264", text: "Kick в деле, лента единая", time: "21:05" },
  { platform: 4, user: "tiktok_sasha", color: "#67e8f9", text: "Лайки летят 💜", time: "21:05" },
  { platform: 6, user: "Аноним", color: "#fdba74", text: "На новый микрофон!", time: "21:06", donate: { amount: "300 ₽", service: "DonationAlerts" } },
  { platform: 0, user: "moder_dasha", color: "#86efac", text: "Не забываем про правила чата", time: "21:06", mod: true },
  { platform: 5, user: "rutube_lover", color: "#e5e7eb", text: "Рутуб тоже здесь, красота", time: "21:07" },
  { platform: 0, user: "nightowl_k", color: "#c4b5fd", text: "оформил подписку на 3 месяца", time: "21:07", event: "Подписка" },
  { platform: 1, user: "StreamFan", color: "#f9a8d4", text: "Смайлы 7TV анимированные 😍", time: "21:08" },
];
