export class HeaderNavigator {
    private static _instance: HeaderNavigator;
    private path: string = '/';
    private constructor() {}
    public static getInstance(): HeaderNavigator {
        if (!HeaderNavigator._instance) {
            HeaderNavigator._instance = new HeaderNavigator();
        }
        return HeaderNavigator._instance;
    }

    public setPath(path: string) {
        this.path = path;
    }

    public getPath() {
        return this.path;
    }
}