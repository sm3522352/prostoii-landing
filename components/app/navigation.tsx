import { ComponentProps } from "react";
import clsx from "clsx";

export type IconProps = ComponentProps<"svg">;

const iconBase = "h-5 w-5";

export const HomeIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx(iconBase, className)}
    {...props}
  >
    <path d="M4 10.5 12 4l8 6.5" />
    <path d="M6.5 9.8V20h11V9.8" />
  </svg>
);

export const RecipesIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx(iconBase, className)}
    {...props}
  >
    <path d="M5 4.8h8.6a2.4 2.4 0 0 1 2.4 2.4v12H7.4A2.4 2.4 0 0 1 5 16.8V4.8Z" />
    <path d="M7.4 4.8V4a2 2 0 0 1 2-2H19v14.8a2 2 0 0 1-2 2h-1.6" />
    <path d="M9.6 9.4h3.2M9.6 12.6h3.2" />
  </svg>
);

export const ChatIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx(iconBase, className)}
    {...props}
  >
    <path d="M6.5 5.2h11a2.3 2.3 0 0 1 2.3 2.3v7.2a2.3 2.3 0 0 1-2.3 2.3H9.8L6 20.5V7.5A2.3 2.3 0 0 1 8.3 5.2Z" />
    <path d="M9.2 10.1h6.6M9.2 13.1h4.1" />
  </svg>
);

export const FilesIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx(iconBase, className)}
    {...props}
  >
    <path d="M6.2 4.6a2 2 0 0 1 2-2h4l3.6 3.6v11.2a2 2 0 0 1-2 2H8.2a2 2 0 0 1-2-2v-12Z" />
    <path d="M12 2.6v3.6h3.8" />
    <path d="M9.8 11.2h4.4M9.8 14.4h4.4" />
  </svg>
);

export const TeamIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx(iconBase, className)}
    {...props}
  >
    <circle cx={8.5} cy={9} r={3} />
    <circle cx={16.5} cy={10.6} r={2.4} />
    <path d="M4.8 18.2a4 4 0 0 1 3.7-2.4h0.8a4 4 0 0 1 3.7 2.4" />
    <path d="M13 18.8a3.4 3.4 0 0 1 3.2-2h0.7a3.4 3.4 0 0 1 3.1 1.9" />
  </svg>
);

export const SettingsIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx(iconBase, className)}
    {...props}
  >
    <path d="m4.5 9.6 1.4-2.4 2.6.5a2.6 2.6 0 0 1 4.3-1.6l2-1.5 1.9 1.9-1.5 2a2.6 2.6 0 0 1 1.6 4.3l.5 2.6-2.4 1.4-1.7-1.9a2.6 2.6 0 0 1-4.5-1.2l-2.6-.5-.7-2.8Z" />
    <circle cx={12} cy={12} r={2} />
  </svg>
);

export type AppNavItem = {
  label: string;
  href: string;
  icon: typeof HomeIcon;
};

export const navigationItems: AppNavItem[] = [
  { label: "Главная", href: "/app", icon: HomeIcon },
  { label: "Рецепты", href: "/app/recipes", icon: RecipesIcon },
  { label: "Чат", href: "/app/chat", icon: ChatIcon },
  { label: "Файлы", href: "/app/files", icon: FilesIcon },
  { label: "Команда", href: "/app/team", icon: TeamIcon },
  { label: "Настройки", href: "/app/settings", icon: SettingsIcon },
];
