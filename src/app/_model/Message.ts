import {User} from "@/app/_model/User";

export type Message = {
    id: string,
    channel_id: string,
    timestamp: string,
    type: number,
    content: string,
    author: User
}