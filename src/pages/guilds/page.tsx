import React, { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import {AppShell, SimpleGrid} from "@mantine/core";
import {IconFolderOpen, IconRefresh} from "../../components/icons/IconBundle.tsx";
import { useNavigate, useParams } from "react-router";
import { setActiveIcon } from "../../store/NavigationIconSlice";
import { ActiveNavigation } from "../../_constants/enums";
import { GuildService } from "../../service/GuildService";
import { Guild } from "../../_model/Guild";
import { badNotification, goodNotification } from "../../components/notifications/notifications";
import { setNavbarState, setNavbarVisibility } from "../../store/NavbarStateSlice";
import { MenuItem } from "../../_model/MenuItem";
import ContextMenu from "../../components/menu/ContextMenu";
import GuildCard from "../../components/cards/guild/guild.card";
import Emptiness from "../../components/emptyness/Emptiness";

enum ContextMenuType {
    MAIN,
    GUILD
}

export default function BotGuildsPage() {
    const {botId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(setActiveIcon(ActiveNavigation.HOME));

    const guildService = GuildService.instance();
    const [guildData, setGuildData] = useState<Guild[]>([]);

    const [contextMenu, setContextMenu] = useState<{x: number, y: number, type: ContextMenuType, guild: Guild | null} | null>(null);

    const fetchAllGuilds = () => {
        guildService.fetchAll(botId!)
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
        guildService.refreshAll(botId!)
            .then(res => res.json())
            .then(data => {
                setGuildData(data);
                goodNotification({title: 'Guilds refreshing', message: 'Successfully refreshed guilds!'});
            })
            .catch(() => {badNotification({title: 'Guilds refreshing', message: 'Failed to refresh guilds!'})});
    }

    const refreshOneGuild = () => {
        guildService.refreshOne(botId!, contextMenu!.guild!.id)
            .then(res => res.json())
            .then(data => {
                refreshAllGuilds();
                goodNotification({title: 'Guild refreshing', message: 'Successfully refreshed guild!'});
            })
            .catch(() => {badNotification({title: 'Guild refreshing', message: 'Failed to refresh guild!'})});
    }

    const guildContextMenuOptions: MenuItem[] = [
        { name: 'Open', iconChild: <IconFolderOpen stroke={2} />, callback: () => {
            navigate(`/bot/${botId}/guilds/${contextMenu!.guild!.id}/channels`)
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
                p={'md'}
                cols={{base: 1, xs: 2, sm: 3, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7, zl: 8}}
                spacing={{base: 10, sm: 'xl'}}>

                {guildData.length > 0 &&
                    guildData.map((guild) =>
                        <GuildCard
                            guild={guild}
                            onContextMenu={(e) => {handleGuildContextMenu(e, guild)}}
                            onClick={() => {navigate(`/bot/${botId}/guilds/${guild.id}/channels`)}}
                            key={guild.id}/>
                    )}

            </SimpleGrid>
        </AppShell.Main>
    );
}