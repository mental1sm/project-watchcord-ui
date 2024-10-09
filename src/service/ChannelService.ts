import { baseUrl } from "../_constants/constants";


export class ChannelService {
    private static _instance: ChannelService;

    private constructor() {}
    public static instance() {
        if (ChannelService._instance === undefined) {
            ChannelService._instance = new ChannelService();
        }
        return ChannelService._instance;
    }

    async fetchAll(botId: string, guildId: string, _fetch: boolean = false): Promise<Response> {
        const fetching = _fetch ? "fetch=true" : "fetch=false";
        return fetch(baseUrl + `/bot/${botId}/guilds/${guildId}/channels?${fetching}`)
    }

    async fetchOne({botId, guildId, channelId, _fetch = false}: {botId: string, guildId: string, channelId: string, _fetch?: boolean}): Promise<Response> {
        const fetching = _fetch ? "fetch=true" : "fetch=false";
        return fetch(baseUrl + `/bot/${botId}/guilds/${guildId}/channels/${channelId}?${fetching}`)
    }
}