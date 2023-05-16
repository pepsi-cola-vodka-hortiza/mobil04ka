import React, {PropsWithChildren, useState} from 'react';
import {NotificationModel} from './types';
import {NotificationContext} from './NotificationContext';
import {NotificationController} from './NotificationController';

export const NotificationProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [notificationModels, setNotificationModels] = useState<
    Array<NotificationModel>
  >([]);

  const showNotification = React.useCallback(
    (model: NotificationModel) => {
      const id = model.id || Math.random().toString(36).substr(2, 9);
      setNotificationModels(notifications => [
        {
          id,
          ...model,
        },
        ...notifications,
      ]);
      return id;
    },
    [setNotificationModels],
  );

  const hideNotification = React.useCallback(
    (id?: string) => {
      setNotificationModels(notifications =>
        notifications.filter(notification => notification.id !== id),
      );
    },
    [setNotificationModels],
  );

  const contextData = React.useMemo(
    () => ({
      showNotification,
      hideNotification,
    }),
    [showNotification, hideNotification],
  );

  return (
    <NotificationContext.Provider value={contextData}>
      <NotificationController notificationModels={notificationModels} />
      {children}
    </NotificationContext.Provider>
  );
};
