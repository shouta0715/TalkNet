import { create } from "zustand";

type TextProps = {
  title: string;
  message?: string;
};

export type NotificationType = "success" | "error" | "info";

export type NotificationState = {
  duration?: number;
  type: NotificationType;
  isShown?: boolean;
  isPersistent?: boolean;
  timer?: NodeJS.Timeout | null;
  link?: boolean;
} & TextProps;

type NotificationActions = {
  onShow: (state: NotificationState) => void;
  onHide: () => void;
};

export type Notification = NotificationState & NotificationActions;

const defaultState: NotificationState = {
  title: "",
  message: "",
  duration: 3000,
  isShown: false,
  type: "info",
  isPersistent: false,
  timer: null,
};

export const useNotificationState = create<Notification>((set, get) => ({
  ...defaultState,
  onShow: (state) =>
    set(() => {
      const { duration, isPersistent, message } = state;

      const timer = setTimeout(() => {
        if (!isPersistent) {
          get().onHide();
        }
      }, duration ?? 3000);

      return {
        ...state,
        isShown: true,
        timer,
        message: message ?? "",
        isPersistent: isPersistent ?? false,
      };
    }),
  onHide: () =>
    set(() => {
      const { timer } = get();

      if (timer) {
        clearTimeout(timer);
      }

      return {
        ...get(),
        isShown: false,
      };
    }),
}));
