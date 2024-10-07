import {baseUrl} from "@/app/_constants/constants";

export class ChannelService {
    private static _instance: ChannelService;

    private constructor() {}
    public static instance() {
        if (ChannelService._instance === undefined) {
            ChannelService._instance = new ChannelService();
        }
        return ChannelService._instance;
    }

    async fetchAll(botId: string, guildId: string): Promise<Response> {
        return fetch(baseUrl + `/bot/${botId}/guilds/${guildId}/channels`)
    }

    async refreshAll(botId: string, guildId: string): Promise<Response> {
        return fetch(baseUrl + `/bot/${botId}/guilds/${guildId}/channels?fetch=true`)
    }

    async fetchOne({botId, guildId, channelId}: {botId: string, guildId: string, channelId: string}): Promise<Response> {
        return fetch(baseUrl + `/bot/${botId}/guilds/${guildId}/channels/${channelId}`)
    }
}