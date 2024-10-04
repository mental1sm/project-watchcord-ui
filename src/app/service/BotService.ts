import {Bot} from "@/app/_model/Bot";

const baseUrl: string = "http://localhost:3000";

export class BotService {
    private static _instance: BotService;

    private constructor() {}
    public static instance() {
        if (BotService._instance === undefined) {
            BotService._instance = new BotService();
        }
        return BotService._instance;
    }

    async fetchBot(): Promise<Response> {
        return fetch(baseUrl + '/bot', {method: 'GET'});
    }

    async addNewBot(token: string): Promise<Response> {
        return fetch(baseUrl + '/bot', {method: 'POST', body: JSON.stringify({token: token})})
    }

    async editBot(bot: Bot, token: string): Promise<Response> {
        return fetch(baseUrl + `/bot/${bot.id}`, {method: 'PUT', body: JSON.stringify({token: token})})
    }

    async deleteBot(bot: Bot): Promise<Response> {
        return fetch(baseUrl + `/bot/${bot.id}`, {method: 'DELETE'})
    }
}