export type Channel = {
    id: string;
    name: string;
    last_message_id: string;
    last_read_message_id: string;
    total_message_sent: number;
    position: number;
    parent_id: string;

    /**
     * GUILD_TEXT 0
     * DM 1
     * GUILD_VOICE 2
     * GROUP_DM 3
     * GUILD_CATEGORY 4
     * GUILD_ANNOUNCEMENT 5
     * ANNOUNCEMENT_THREAD 10
     * PUBLIC_THREAD 11
     * PRIVATE_THREAD 12
     * GUILD_STAGE_VOICE 13
     * GUILD_DIRECTORY 14
     * GUILD_FORUM 15
     * GUILD_MEDIA 16
     */
    type: number;
}