import PushNotification from 'react-native-push-notification';

const onNotification = (handler, notification) => {
    if (typeof handler._onNotification === 'function') {
        handler._onNotification(notification);
    }
};

const onRegister = (handler, token) => {
    if (typeof handler._onRegister === 'function') {
        handler._onRegister(token);
    }
};

const onAction = (handler, notification) => {
    if (notification.action === 'Yes') {
        PushNotification.invokeApp(notification);
    }
};

const onRegistrationError = (err) => {
    // Handle registration error if needed
};

const attachRegister = (handler, registerHandler) => {
    handler._onRegister = registerHandler;
};

const attachNotification = (handler, notificationHandler) => {
    handler._onNotification = notificationHandler;
};

const configureNotificationHandler = () => {
    const handler = {};

    PushNotification.configure({
        onRegister: (token) => onRegister(handler, token),
        onNotification: (notification) => onNotification(handler, notification),
        onAction: (notification) => onAction(handler, notification),
        onRegistrationError: onRegistrationError,

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    });

    return handler;
};

const handler = configureNotificationHandler();

export { attachRegister, attachNotification };
export default handler;