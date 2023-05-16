import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Notification from './Notification';
import {NotificationContext} from './NotificationContext';
import {NotificationModel} from './types';
import {Portal} from 'react-native-paper';
import {TRANSPARENT_COLOR} from '../../constants/colors';

type NotificationControllerType = {
  notificationModels: Array<NotificationModel>;
};

export const NotificationController = memo(
  ({notificationModels}: NotificationControllerType): JSX.Element => {
    const {hideNotification} = React.useContext(NotificationContext);
    const scrollViewRef = useRef<ScrollView>();
    const [height, setHeight] = useState(0);
    const shouldCloseOnScrollEndRef = useRef(false);
    const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('auto');

    const onLayoutHandler = useCallback(
      (event: LayoutChangeEvent) => {
        const {height: newHeight} = event.nativeEvent.layout;
        setHeight(newHeight);
      },
      [setHeight],
    );

    const closeNotifications = useCallback(() => {
      notificationModels?.forEach(notification => {
        hideNotification?.(notification.id);
      });
    }, [notificationModels, hideNotification]);

    const onScrollEndDragHandler = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = event.nativeEvent.contentOffset.y;
        if (offset >= height / 2) {
          shouldCloseOnScrollEndRef.current = true;
          scrollViewRef.current?.scrollToEnd({animated: true});
        } else {
          shouldCloseOnScrollEndRef.current = false;
          scrollViewRef.current?.scrollTo({y: 0, animated: true});
        }
      },
      [height, scrollViewRef],
    );

    const onMomentumScrollEndHandler = useCallback(() => {
      if (shouldCloseOnScrollEndRef.current) {
        setTimeout(() => {
          setHeight(0);
          closeNotifications();
          shouldCloseOnScrollEndRef.current = false;
        }, 5000);
      }
    }, [shouldCloseOnScrollEndRef, closeNotifications]);

    const notificationHeightWithMargin = useMemo(() => 100, []);

    const notificationWillCloseHandler = useCallback(() => {
      if (notificationModels?.length === 1) {
        setPointerEvents('none');
      }
    }, [notificationModels, setPointerEvents]);

    const closeNotificationHandler = useCallback(
      (id?: string | undefined) => {
        hideNotification?.(id);
        setPointerEvents('auto');
      },
      [hideNotification, setPointerEvents],
    );

    const notifications = useMemo(() => {
      return notificationModels?.map(model => (
        <Notification
          key={model.id}
          model={model}
          onClose={closeNotificationHandler!}
          onNotificationWillClose={notificationWillCloseHandler}
        />
      ));
    }, [
      notificationModels,
      closeNotificationHandler,
      notificationWillCloseHandler,
    ]);

    return (
      <Portal>
        <View style={styles.scrollContainerStyle} pointerEvents={pointerEvents}>
          <Animated.ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEndHandler}
            onScrollEndDrag={onScrollEndDragHandler}
            style={{
              height: notificationHeightWithMargin,
            }}>
            <View
              style={StyleSheet.compose<ViewStyle>(
                styles.controllerContainer,
                styles.scrollContainerStyle,
              )}
              onLayout={onLayoutHandler}
              pointerEvents="box-none">
              {notifications}
            </View>
            <View style={{height: notificationHeightWithMargin}} />
          </Animated.ScrollView>
        </View>
      </Portal>
    );
  },
);

const styles = StyleSheet.create({
  controllerContainer: {
    marginTop: 100,
  },
  scrollContainerStyle: {
    position: 'absolute',
    top: 0,
    zIndex: 120,
    backgroundColor: TRANSPARENT_COLOR,
    width: '100%',
  },
});
