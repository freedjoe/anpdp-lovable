
export type Language = 'en' | 'fr' | 'ar';

export interface TranslationKey {
  [key: string]: string | TranslationKey;
}

export interface Translations {
  [key: string]: TranslationKey;
}

export interface StatisticItem {
  id: number;
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ActivityItem {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
