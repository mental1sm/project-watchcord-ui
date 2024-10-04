import {Bot} from "@/app/_model/Bot";
import {baseUrl} from "@/app/_constants/constants";

export class BotService {
    private static _instance: BotService;

    private constructor() {}
    public static instance() {
        if (BotService._instance === undefined) {
            BotService._instance = new BotService();
        }
        return BotService._instance;
    }

    async fetchAllBots(): Promise<Response> {
        return fetch(baseUrl + '/bot', {method: 'GET'});
    }

    async fetchOneBot(botId: string): Promise<Response> {
        return fetch(baseUrl + `/bot/${botId}`, {method: 'GET'});
    }

    async addNewBot(token: string): Promise<Response> {
        const payload = {'token': token};
        const headers = {'Content-Type': 'application/json'};
        console.log(payload)
        return fetch(baseUrl + '/bot', {method: 'POST', body: JSON.stringify(payload), headers: headers});
    }

    async editBot(bot: Bot, token: string): Promise<Response> {
        const payload = {'token': token};
        const headers = {'Content-Type': 'application/json'};
        return fetch(baseUrl + `/bot/${bot.id}`, {method: 'PUT', body: JSON.stringify(payload), headers: headers})
    }

    async deleteBot(bot: Bot): Promise<Response> {
        return fetch(baseUrl + `/bot/${bot.id}`, {method: 'DELETE'})
    }
}