import {ReactNode} from "react";
import {Channel} from "@/app/_model/Channel";

export type NavbarProperties = {
    rules: NavbarIconRule[];
    items: NavbarItem[];
}

export type NavbarItem = {
    id: string;
    name: string;
    type: number;
    position: number;
    children: NavbarItem[];
}

export type NavbarIconRule = {
    type: number;
    icon: ReactNode | null;
}

export function channelToNavbarItem(channel: Channel): NavbarItem {
    return {
        id: channel.id,
        type: channel.type,
        name: channel.name,
        position: channel.position,
        children: []
    }
}
