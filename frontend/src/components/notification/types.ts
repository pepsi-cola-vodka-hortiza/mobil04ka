import {StyleProp, ViewStyle} from 'react-native';

export interface NotificationLink {
  text: string;
  // by default notification will only be closed
  onPress?: () => void;
}

export type Severity = 'success' | 'warning' | 'error' | 'info';

export interface NotificationModel {
  id?: string;
  text?: string;
  links?: NotificationLink[];
  timeout?: number;
  title?: string;
  contentStyle?: StyleProp<ViewStyle>;
  severity?: Severity;
}

export interface NotificationParams {
  model: NotificationModel;
  onClose: (id?: string) => void;
  onNotificationWillClose?: () => void;
}

export interface NotificationContextData {
  showNotification?: (model: NotificationModel) => string;
  hideNotification?: (id?: string) => void;
}

export type UseShowNotificationTuple = [
  (model: NotificationModel) => string,
  {notificationId: string},
];
