import {Bot} from "../_model/Bot";
import {baseUrl} from "../_constants/constants";

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

    async addNewBot(token: string): Promise<Response> {
        const payload = {'token': token};
        const headers = {'Content-Type': 'application/json'};
        console.log(payload)
        return fetch(baseUrl + '/bot', {method: 'POST', body: JSON.stringify(payload), headers: headers});
    }

    /**
     * Can be user as for edit, as for fetch actual info :)
     * @param bot Bot id
     * @param token Bot token
     */
    async editBot(bot: Bot, token: string): Promise<Response> {
        const payload = {'token': token};
        const headers = {'Content-Type': 'application/json'};
        return fetch(baseUrl + `/bot/${bot.id}`, {method: 'PUT', body: JSON.stringify(payload), headers: headers})
    }

    async deleteBot(bot: Bot): Promise<Response> {
        return fetch(baseUrl + `/bot/${bot.id}`, {method: 'DELETE'})
    }
}