import {baseUrl} from "@/app/_constants/constants";

export class GuildService {
    private static _instance: GuildService;

    private constructor() {}
    public static instance() {
        if (GuildService._instance === undefined) {
            GuildService._instance = new GuildService();
        }
        return GuildService._instance;
    }

    async fetchAll(botId: string): Promise<Response> {
        return fetch(baseUrl + `/bot/${botId}/guilds`);
    }
}