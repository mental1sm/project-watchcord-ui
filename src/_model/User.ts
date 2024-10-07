import {Member} from "./Member";

export type User = {
    id: string,
    username: string,
    avatar: string | null,
    membership: Member
}