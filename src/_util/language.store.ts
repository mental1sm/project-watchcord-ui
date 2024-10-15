import { Langs } from "../store/SettingsStateSlice";

export type Localization = {
    LANG: string;
    UI_SCALE: string;
    SETTINGS: string;
    ABOUT: string;
    GITHUB: string;
    

    OPEN: string;
    REFRESH: string;
    REFRESH_ALL: string;
    EDIT: string;
    DELETE: string;
    COLLAPSE_SIDEBAR: string;
    EXPAND_SIDEBAR: string;
    COPY_TO_CLIPBOARD: string;

    MODAL_DELETE: string;
    MODAL_DELETE_ALERT_TEXT: string;
    MODAL_CANCEL: string;
    MODAL_TOKEN: string;
    MODAL_ENTER_TOKEN: string;
    MODAL_TOKEN_DESC: string;


    BOT: string;
    NEW_BOT: string;
    BOT_EDIT: string;
    BOT_ADDITION: string;
    BOT_EDITION: string;
    BOT_DELETION: string;
    BOT_FETCHING: string;
    BOT_REFRESHING: string;

    ADDITION_SUCCESS: string;
    ADDITION_FAIL: string;
    FETCHING_SUCCESS: string;
    FETCHING_FAIL: string;
    REFRESHING_SUCCESS: string;
    REFRESHING_FAIL: string;
    DELETION_SUCCESS: string;
    DELETION_FAIL: string;
    EDITION_SUCCESS: string;
    EDITION_FAIL: string;

    GUILD: string;
    GUILDS_COUNT: string;
    MEMBERS_COUNT: string;
    GUILD_FETCHING: string;
    GUILD_REFRESHING: string;

    CHANNEL: string;
    CHANNEL_FETCHING: string;

    MESSAGE: string;
    MESSAGE_FETCHING: string;
}

export type LocalisationItem = {
    name: 'ru' | 'en';
    loc: Localization
}

const APP_LOCALISATION: LocalisationItem[] = [
    {
        name: 'en',
        loc: {
            LANG: 'English',
            UI_SCALE: 'UI Scale',
            SETTINGS: 'Settings',
            ABOUT: 'About',
            GITHUB: 'Github',


            OPEN: 'Open',
            REFRESH: 'Refresh',
            REFRESH_ALL: 'Refresh all',
            EDIT: 'Edit',
            DELETE: 'Delete',
            COLLAPSE_SIDEBAR: 'Collapse sidebar',
            EXPAND_SIDEBAR: 'Expand sidebar',
            COPY_TO_CLIPBOARD: 'Copy to clipboard',

            MODAL_DELETE: 'Delete',
            MODAL_DELETE_ALERT_TEXT: "This action will delete this Bot from WatchCord. Real bot is not affected. Are you sure?",
            MODAL_TOKEN: "Token",
            MODAL_ENTER_TOKEN: "Enter token",
            MODAL_TOKEN_DESC: "Discord Bot secret token",


            MODAL_CANCEL: 'Cancel',
            BOT: 'Bot',
            NEW_BOT: 'New bot',
            BOT_EDIT: 'Edit existing Bot',
            BOT_ADDITION: 'Bot addition',
            BOT_EDITION: 'Bot edition',
            BOT_DELETION: 'Bot deletion',
            BOT_FETCHING: 'Bot fetching',
            BOT_REFRESHING: 'Bot refreshing',

            GUILD: 'Guild',
            GUILDS_COUNT: 'Guilds count',
            MEMBERS_COUNT: 'Members count',
            GUILD_FETCHING: 'Guild fetching',
            GUILD_REFRESHING: "Guilds refreshing",

            CHANNEL: 'Channel',
            CHANNEL_FETCHING: 'Channel fetching',

            MESSAGE: 'Message',
            MESSAGE_FETCHING: 'Message fetching',

            ADDITION_SUCCESS: 'Successfully added',
            ADDITION_FAIL: 'Failed to add',
            FETCHING_SUCCESS: 'Successfully fetched',
            FETCHING_FAIL: 'Failed to fetch',
            REFRESHING_SUCCESS: 'Successfully refreshed',
            REFRESHING_FAIL: 'Failed to refresh',
            DELETION_SUCCESS: 'Successfully deleted',
            DELETION_FAIL: 'Failed to delete',
            EDITION_SUCCESS:'Successfully edited',
            EDITION_FAIL: 'Failed to edit',
        }
    },
    {
        name: 'ru',
        loc: {
            LANG: 'Русский',
            UI_SCALE: 'Масштаб интерфейса',
            SETTINGS: 'Настройки',
            ABOUT: 'О программе',
            GITHUB: 'Репозиторий',


            OPEN: 'Открыть',
            REFRESH: 'Обновить',
            REFRESH_ALL: 'Обновить все',
            EDIT: 'Редактировать',
            DELETE: 'Удалить',
            COLLAPSE_SIDEBAR: 'Спрятать боковую панель',
            EXPAND_SIDEBAR: 'Раскрыть боковую панель',
            COPY_TO_CLIPBOARD: 'Скопировать в буфер обмена',


            MODAL_DELETE: 'Удалить',
            MODAL_DELETE_ALERT_TEXT: "Это действие удалит бота только из WatchCord. Реальный бот не будет затронут. Вы уверены?",
            MODAL_TOKEN: "Токен",
            MODAL_ENTER_TOKEN: "Введите токен",
            MODAL_TOKEN_DESC: "Токен бота",


            MODAL_CANCEL: 'Отенить',
            BOT: 'Бот',
            NEW_BOT: 'Новый бот',
            BOT_EDIT: 'Редактировать существующего бота',
            BOT_ADDITION: 'Добавление бота',
            BOT_EDITION: 'Редактирование бота',
            BOT_DELETION: 'Удаление бота',
            BOT_FETCHING: 'Подгрузка бота',
            BOT_REFRESHING: 'Обновление бота',


            GUILD: 'Сервер',
            GUILDS_COUNT: 'Количество серверов',
            MEMBERS_COUNT: 'Количество участников',
            GUILD_FETCHING: 'Подгрузка серверов',
            GUILD_REFRESHING: "Обновление серверов",

            CHANNEL: 'Канал',
            CHANNEL_FETCHING: 'Подгрузка каналов',

            MESSAGE: 'Сообщения',
            MESSAGE_FETCHING: 'Подгрузка сообщений',

            ADDITION_SUCCESS: 'Успешно добавлено',
            ADDITION_FAIL: 'Не удалось добавить',
            FETCHING_SUCCESS: 'Успешно подгружено',
            FETCHING_FAIL: 'Не удалось подгрузить',
            REFRESHING_SUCCESS: 'Успешно обновлено',
            REFRESHING_FAIL: 'Не удалось обновить',
            DELETION_SUCCESS: 'Успешно удалено',
            DELETION_FAIL: 'Не удалось удалить',
            EDITION_SUCCESS:'Успешно отредактировано',
            EDITION_FAIL: 'Не удалось отредактировать',
        }
    }
]

export const LocalizationStore: Map<Langs, Localization> = new Map();

APP_LOCALISATION.map(l => LocalizationStore.set(l.name, l.loc));