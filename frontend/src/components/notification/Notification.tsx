import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {TRANSPARENT_COLOR} from '../../constants/colors';
import {NotificationParams} from './types';

const renderActionPlaceholder = () => <View style={styles.notificationLeft} />;

const animationDuration = 300;
const animationTranslateY = 64;

const Notification = ({
  model: {title, text, id, timeout, contentStyle},
  onClose,
  onNotificationWillClose,
}: NotificationParams): JSX.Element => {
  const anim = React.useRef(new Animated.Value(0)).current;
  const timeoutId = useRef();

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const hideAnimation = useCallback(() => {
    // workaround for react-native issue 23090
    ref.current?.setNativeProps({style: {elevation: 0}});

    Animated.timing(anim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const closeNotification = useCallback(() => {
    hideAnimation();
    onClose(id);
  }, [hideAnimation, onClose, id]);

  useEffect(() => {
    if (timeout) {
      timeoutId.current = setTimeout(() => closeNotification(), timeout);
    }
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [closeNotification, timeout]);

  const ref = useRef<View>(null);

  const containerStyle = useMemo(
    () => ({
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-animationTranslateY, 0],
          }),
        },
      ],
    }),
    [anim],
  );

  const notificationContent = useMemo(() => {
    return (
      <View
        ref={ref}
        style={StyleSheet.compose<ViewStyle>(
          styles.notificationContent,
          contentStyle,
        )}>
        <View style={styles.textContainer}>
          {!!title && <Text>{title}</Text>}
          {!!text && <Text>{text}</Text>}
        </View>
      </View>
    );
  }, [contentStyle, text, title]);

  return (
    <Swipeable
      renderRightActions={renderActionPlaceholder}
      onSwipeableRightOpen={closeNotification}
      renderLeftActions={renderActionPlaceholder}
      onSwipeableLeftOpen={closeNotification}
      // onSwipeableWillOpen will be called when the notification is closed and empty space will be open
      onSwipeableWillOpen={onNotificationWillClose}
      // typing mistake in react-native-gesture-handler
      // @ts-ignore
      containerStyle={containerStyle}
      childrenContainerStyle={styles.childContainer}>
      {notificationContent}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  notificationLeft: {
    width: '100%',
    backgroundColor: TRANSPARENT_COLOR,
  },
  buttonContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  notificationButton: {
    marginLeft: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 6,
  },
  notificationContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 6,
    flexDirection: 'row',
    padding: 12,
    minHeight: 44,
    marginHorizontal: 16,
  },
  childContainer: {
    flex: 1,
  },
});

export default Notification;
