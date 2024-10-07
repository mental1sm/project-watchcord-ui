import { baseUrl } from "../_constants/constants";

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

    async refreshAll(botId: string): Promise<Response> {
        return fetch(baseUrl + `/bot/${botId}/guilds?fetch=true`)
    }

    async refreshOne(botId: string, guildId: string): Promise<Response> {
        const promises: Promise<Response>[] = [];
        promises.push(fetch(baseUrl + `/bot/${botId}/guilds/${guildId}?fetch=true`));
        promises.push(fetch(baseUrl + `/bot/${botId}/guilds/${guildId}/members?fetch=true`))
        await Promise.all(promises);
        return fetch(baseUrl + `/bot/${botId}/guilds/${guildId}`);
    }
}