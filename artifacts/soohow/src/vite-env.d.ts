/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_BOT_TOKEN?: string;
  readonly VITE_TELEGRAM_CHAT_ID?: string;
  /** Public Telegram channel/username for product links, e.g. soohowasia */
  readonly VITE_TELEGRAM_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
