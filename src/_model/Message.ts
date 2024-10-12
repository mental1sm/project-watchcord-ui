import {User} from "./User";

export type Message = {
    id: string,
    channel_id: string,
    timestamp: string,
    type: number,
    content: string,
    author: User,
    attachments: MessageAttachment[];
}

export type MessageAttachment = {
    id: string,
    width: number,
    height: number,
    content_type: string,
    filename: string,
    ulr: string,
    proxy_url: string
}