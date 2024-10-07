export const formatISODate = (isoString: string) => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    return date.toLocaleString('ru-RU', options);
};