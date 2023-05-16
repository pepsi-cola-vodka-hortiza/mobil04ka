import React, {useCallback, useContext, useState} from 'react';
import {NotificationContext} from './NotificationContext';
import {NotificationModel, UseShowNotificationTuple} from './types';

export const useShowNotification = (): UseShowNotificationTuple => {
  const {showNotification} = React.useContext(NotificationContext);
  const [notificationId, setNotificationId] = useState<string>('');
  const showNotificationCallback = useCallback(
    (model: NotificationModel) => {
      if (showNotification) {
        const id = showNotification(model);
        setNotificationId(id);
        return id;
      }
      return '';
    },
    [showNotification, setNotificationId],
  );
  return [showNotificationCallback, {notificationId}];
};

export const useHideNotification = (): ((id?: string) => void) => {
  const {hideNotification} = useContext(NotificationContext);
  return hideNotification!;
};
