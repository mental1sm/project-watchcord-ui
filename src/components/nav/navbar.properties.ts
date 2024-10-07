import {ReactNode} from "react";
import {Channel} from "../../_model/Channel.ts";


export type NavbarProperties = {
    rules: NavbarIconRule[];
    items: NavbarItem[]
    baseHref: string;
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
