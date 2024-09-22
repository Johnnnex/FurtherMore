// types/telegram.d.ts
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

export interface TelegramWebApp {
  ready: () => void;
  initDataUnsafe?: {
    user?: TelegramUser;
  };
}

export interface Telegram {
  WebApp: TelegramWebApp;
}

declare global {
  interface Window {
    Telegram?: Telegram;
  }
}
