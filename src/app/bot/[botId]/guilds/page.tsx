'use client'

import React, { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import {setActiveIcon} from "@/app/store/NavigationIconSlice";
import {ActiveNavigation} from "@/app/_constants/enums";
import Emptiness from "@/app/components/emptyness/Emptiness";
import {AppShell, SimpleGrid} from "@mantine/core";
import {badNotification, goodNotification} from "@/app/components/notifications/notifications";
import {GuildService} from "@/app/service/GuildService";
import {Guild} from "@/app/_model/Guild";
import GuildCard from "@/app/components/cards/guild/guild.card";
import {MenuItem} from "@/app/_model/MenuItem";
import {IconFolderOpen, IconRefresh} from "@tabler/icons-react";
import ContextMenu from "@/app/components/menu/ContextMenu";
import {useRouter} from "next/navigation";
import {setNavbarState, setNavbarVisibility} from "@/app/store/NavbarStateSlice";

enum ContextMenuType {
    MAIN,
    GUILD
}

export default function BotGuildsPage({ params }: { params: { botId: string } }) {

    const router = useRouter();
    const dispatch = useDispatch();
    dispatch(setActiveIcon(ActiveNavigation.HOME));

    const guildService = GuildService.instance();
    const [guildData, setGuildData] = useState<Guild[]>([]);

    const [contextMenu, setContextMenu] = useState<{x: number, y: number, type: ContextMenuType, guild: Guild | null} | null>(null);

    const fetchAllGuilds = () => {
        guildService.fetchAll(params.botId)
            .then((res) => res.json())
            .then((data) => {
                setGuildData(data);
            })
            .catch(() => {
                badNotification({title: 'Guilds fetching', message: 'Failed to fetch guilds from database!'});
            })
            .finally(() => {});
    }

    useEffect(() => {
        dispatch(setNavbarVisibility(false));
        dispatch(setNavbarState(false));
        fetchAllGuilds();
    }, []);

    // ------ CONTEXT MENU ----------------------------------------------------------
    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const handleGuildContextMenu = (e: React.MouseEvent<HTMLDivElement>, guild: Guild) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({x: e.pageX, y: e.pageY, type: ContextMenuType.GUILD, guild: guild});
    }

    const handleMainContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({x: e.pageX, y: e.pageY, type: ContextMenuType.MAIN, guild: null})
    }

    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu) closeContextMenu();
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [contextMenu]);
    // -------------------------------------------------------------------------------

    const refreshAllGuilds = () => {
        guildService.refreshAll(params.botId)
            .then(res => res.json())
            .then(data => {
                setGuildData(data);
                goodNotification({title: 'Guilds refreshing', message: 'Successfully refreshed guilds!'});
            })
            .catch(e => {badNotification({title: 'Guilds refreshing', message: 'Failed to refresh guilds!'})});
    }

    const refreshOneGuild = () => {
        guildService.refreshOne(params.botId, contextMenu!.guild!.id)
            .then(res => res.json())
            .then(data => {
                setGuildData(data);
                goodNotification({title: 'Guild refreshing', message: 'Successfully refreshed guild!'});
            })
            .catch(e => {badNotification({title: 'Guild refreshing', message: 'Failed to refresh guild!'})});
    }

    const guildContextMenuOptions: MenuItem[] = [
        { name: 'Open', iconChild: <IconFolderOpen stroke={2} />, callback: () => {
            router.push(`/bot/${params.botId}/guilds/${contextMenu!.guild!.id}/channels`)
        }},
        { name: 'Refresh', iconChild: <IconRefresh stroke={2} />, callback: refreshOneGuild }
    ]

    const mainContextMenuOptions: MenuItem[] = [
        { name: 'Refresh all', iconChild: <IconRefresh stroke={2} />, callback: refreshAllGuilds }
    ]

    return (
        <AppShell.Main onContextMenu={handleMainContextMenu}>
            {contextMenu && <ContextMenu
                x={contextMenu.x} y={contextMenu.y}
                items={contextMenu.type === ContextMenuType.GUILD ? guildContextMenuOptions : mainContextMenuOptions}/>}

            {guildData.length < 0 && <Emptiness showExtra={false}/>}

            <SimpleGrid
                cols={{base: 1, xs: 2, sm: 3, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7, zl: 8}}
                spacing={{base: 10, sm: 'xl'}}>

                {guildData.length > 0 &&
                    guildData.map((guild) =>
                        <GuildCard
                            guild={guild}
                            onContextMenu={(e) => {handleGuildContextMenu(e, guild)}}
                            onClick={() => {router.push(`/bot/${params.botId}/guilds/${guild.id}/channels`)}}
                            key={guild.id}/>
                    )}

            </SimpleGrid>
        </AppShell.Main>
    );
}