import {baseUrl} from "@/app/_constants/constants";
import {MessageFetchingOptions} from "@/app/_model/MessageFetchingOptions";

export class MessageService {
    private static _instance: MessageService;

    private constructor() {}
    public static instance() {
        if (MessageService._instance === undefined) {
            MessageService._instance = new MessageService();
        }
        return MessageService._instance;
    }

    async fetch({botId, guildId, channelId} : {botId: string, guildId: string, channelId: string}, options: MessageFetchingOptions) {
        return fetch(baseUrl + `/bot/${botId}/guilds/${guildId}/channels/${channelId}/messages?fetch=false` + this.buildQuery(options))
    }

    async refresh({botId, guildId, channelId}: {botId: string, guildId: string, channelId: string}, options: MessageFetchingOptions) {
        return fetch(baseUrl + `/bot/${botId}/guilds/${guildId}/channels/${channelId}/messages?fetch=true` + this.buildQuery(options))
    }

    buildQuery(options: MessageFetchingOptions): string {
        let query = '';
        if (options.limit) {query += `&limit=${options.limit}`;}
        if (options.after) {query += `&after=${options.after}`;}
        if (options.before) {query += `&before=${options.before}`;}
        if (options.around) {query += `&around=${options.around}`;}
        return query;
    }
}