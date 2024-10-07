import {Member} from "@/app/_model/Member";

export type User = {
    id: string,
    username: string,
    avatar: string | null,
    membership: Member
}