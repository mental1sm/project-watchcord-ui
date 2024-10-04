import {notifications} from "@mantine/notifications";
import {DefaultMantineColor} from "@mantine/core";

export const goodNotification = ({title, message}: {title: string, message: string}) => {
    notifications.show({
        title: title,
        message: message,
        position: 'bottom-right',
        color: 'green',
        style: {zIndex: 50, position: 'fixed', bottom: 30, right: 30, minWidth: '300px'},
    });
}

export const badNotification = ({title, message}: {title: string, message: string}) => {
    notifications.show({
        title: title,
        message: message,
        position: 'bottom-right',
        color: 'red',
        style: {zIndex: 50, position: 'fixed', bottom: 30, right: 30, minWidth: '300px'},
    });
}

export const simpleNotification = ({title, message, color}: {title: string, message: string, color: DefaultMantineColor}) => {
    notifications.show({
        title: title,
        message: message,
        position: 'bottom-right',
        color: color,
        style: {zIndex: 50, position: 'fixed', bottom: 30, right: 30, minWidth: '300px'},
    });
}