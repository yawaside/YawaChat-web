export const LINKS = {
  telegram: "https://t.me/+pk1zIbjQle01NWEy",
  donate: "https://www.donationalerts.com/r/yawaside",
  twitch: "https://www.twitch.tv/yawaside_",
  youtube: "https://www.youtube.com/@YAWASIDE",
  vk: "https://live.vkvideo.ru/yawaside",
};

export const PLATFORMS = [
  { name: "Twitch", color: "#9146ff", short: "Tw" },
  { name: "YouTube Live", color: "#ff3355", short: "YT" },
  { name: "VK Видео Live", color: "#2d8cff", short: "VK" },
  { name: "Kick", color: "#53fc18", short: "Ki" },
  { name: "TikTok Live", color: "#25f4ee", short: "Tt" },
  { name: "Rutube", color: "#e5e7eb", short: "Ru" },
  { name: "Boosty", color: "#f98a3d", short: "Bo" },
];

export const DONATION_SERVICES = ["DonationAlerts", "DonatePay"];

export type FeatureIcon =
  | "layers"
  | "coins"
  | "bell"
  | "gift"
  | "plus"
  | "mic"
  | "gamepad"
  | "obs"
  | "shield"
  | "vk"
  | "spark"
  | "keyboard"
  | "life";

export interface Feature {
  icon: FeatureIcon;
  title: string;
  text: string;
  accent: string;
  big?: boolean;
}

export const FEATURES: Feature[] = [
  {
    icon: "layers",
    title: "Семь площадок в одной ленте",
    text: "Сообщения идут одним потоком: с иконкой площадки, цветом ника, значками модератора и подписчика, смайлами и стикерами, включая анимированные смайлы 7TV. Поиск по ленте, фильтр по площадкам и скрытие служебных событий.",
    accent: "#8b5cf6",
    big: true,
  },
  {
    icon: "coins",
    title: "Донаты с двух сервисов",
    text: "DonationAlerts и DonatePay в едином формате: площадка, имя (или «Аноним»), сумма и сообщение. В оверлее суммы обоих сервисов складываются в один счётчик.",
    accent: "#f59e0b",
  },
  {
    icon: "bell",
    title: "Отдельные настройки донатов",
    text: "Свой звук для каждой площадки — колокольчик, монетки, фанфары, звонок, аркада или пузырёк. Озвучка донатов независима от озвучки чата и включается с выбранной суммы.",
    accent: "#38d6ff",
  },
  {
    icon: "gift",
    title: "Звуки для наград за баллы",
    text: "У каждой награды канала свой звук и своя громкость. Звук слышен и на трансляции — для этого есть отдельный виджет OBS. После входа в Twitch все награды подтягиваются сами.",
    accent: "#e879f9",
  },
  {
    icon: "plus",
    title: "Награды создаются в приложении",
    text: "Название, цена, описание и требование сообщения — и награда появляется на Twitch, VK Видео Live или сразу на обеих площадках. Если площадка отказала, причина написана словами.",
    accent: "#34d399",
  },
  {
    icon: "mic",
    title: "Озвучка сообщений",
    text: "Нейросетевые голоса Edge TTS и системные голоса Windows. Скорость, громкость, состав фразы, голос для конкретного зрителя, фильтры ссылок и команд, чёрный и белый списки авторов.",
    accent: "#60a5fa",
    big: true,
  },
  {
    icon: "gamepad",
    title: "Игровой оверлей",
    text: "Полупрозрачное окно поверх игры с последними сообщениями и событиями. Не перехватывает мышь, свободно перемещается и меняет размер, показывает статистику эфира. Для TikTok — счётчики зрителей и лайков.",
    accent: "#a78bfa",
  },
  {
    icon: "obs",
    title: "Виджет для OBS",
    text: "Отдельный источник для трансляции с собственным оформлением — чат на экране зрителей выглядит так, как вы настроите.",
    accent: "#f472b6",
  },
  {
    icon: "shield",
    title: "Чат-бот и модерация",
    text: "Автоответы на команды, режимы чата Twitch (медленный, только подписчики, только фолловеры), удаление сообщений, таймауты и баны прямо из ленты.",
    accent: "#fb7185",
  },
  {
    icon: "vk",
    title: "VK Видео Live с входом в аккаунт",
    text: "Публичный чат читается без входа. После входа бот отвечает в чате VK Видео Live, подтягивает награды за баллы и включает режимы чата.",
    accent: "#2d8cff",
  },
  {
    icon: "spark",
    title: "События канала",
    text: "Подписки, рейды, подарки, биты и награды за баллы — с автором и отдельной подсветкой в ленте.",
    accent: "#fbbf24",
  },
  {
    icon: "keyboard",
    title: "Горячие клавиши",
    text: "Озвучка, пауза и пропуск очереди, режим «Только чат», показ оверлея — работают, даже когда вы в игре.",
    accent: "#2dd4bf",
  },
  {
    icon: "life",
    title: "Помощь при неполадках",
    text: "Диагностический пакет со сведениями о сбоях и состоянии площадок. Имена каналов, сообщения и данные входа в архив не попадают.",
    accent: "#94a3b8",
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
];

export const DEMO_MESSAGES = [
  { p: 0, user: "nightowl_k", color: "#c4b5fd", text: "Привет из Twitch! Звук огонь 🔥", mod: false },
  { p: 1, user: "Марина В.", color: "#fda4af", text: "А когда следующий стрим?", mod: false },
  { p: 2, user: "ВанёкGames", color: "#93c5fd", text: "Вижу чат из ВК, всё работает", mod: false },
  { p: 3, user: "kickfan_77", color: "#bef264", text: "Kick в деле, лента единая", mod: false },
  { p: 4, user: "tiktok_sasha", color: "#67e8f9", text: "Лайки летят 💜", mod: false },
  { p: 6, user: "Аноним", color: "#fdba74", text: "Донат 300 ₽ — на новый микрофон!", mod: false, donate: true },
  { p: 0, user: "moder_dasha", color: "#86efac", text: "Не забываем про правила чата", mod: true },
  { p: 5, user: "rutube_lover", color: "#e5e7eb", text: "Рутуб тоже здесь, красота", mod: false },
  { p: 1, user: "StreamFan", color: "#f9a8d4", text: "Смайлы 7TV анимированные 😍", mod: false },
];
