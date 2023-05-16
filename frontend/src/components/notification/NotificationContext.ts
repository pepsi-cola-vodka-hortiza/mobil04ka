import React from 'react';
import {NotificationContextData} from './types';

export const NotificationContext = React.createContext<NotificationContextData>(
  {},
);
