export class DateFormatter {
    private static instance: DateFormatter;
    private locale: string = 'en-US';
    private constructor() {}
    public static getInstance(): DateFormatter {
        if (!DateFormatter.instance) {
            DateFormatter.instance = new DateFormatter();
        }
        return DateFormatter.instance;
    }

    public setLocale(locale: string) {
        this.locale = locale;
    }

    public formatISODate(isoString: string) {
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

        return date.toLocaleString(this.locale, options);
    }
    
}