'use client'

import {RootState} from "@/app/store";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {setNavbarState, setNavbarVisibility} from "@/app/store/NavbarStateSlice";
import {Channel} from "@/app/_model/Channel";
import {ChannelService} from "@/app/service/ChannelService";
import {badNotification, goodNotification} from "@/app/components/notifications/notifications";
import {channelToNavbarItem, NavbarItem, NavbarProperties} from "@/app/components/nav/navbar.properties";
import {IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconRefresh} from "@tabler/icons-react";
import {MenuItem} from "@/app/_model/MenuItem";
import ContextMenu from "@/app/components/menu/ContextMenu";
import {AppShell} from "@mantine/core";
import SideNavbar from "@/app/components/nav/side.navbar";
import Emptiness from "@/app/components/emptyness/Emptiness";
import {rules} from "@/app/components/nav/rules";
import styles from './page.module.css';

export default function GuildChannelsLayout({children, params}: Readonly<{ children: React.ReactNode; params: { botId: string, guildId: string } }>) {

    const [channelData, setChannelData] = useState<Channel[]>([]);
    const [contextMenu, setContextMenu] = useState<{x: number, y: number, type: 'main' | 'nav'} | null>(null);
    const channelService = ChannelService.instance();
    const navbarStatus = useSelector((state: RootState) => state.navbar.isOpened);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setNavbarVisibility(true))
        dispatch(setNavbarState(true));
        channelService.fetchAll(params.botId, params.guildId)
            .then((res) => res.json())
            .then((data) => {
                setChannelData(data)
            })
            .catch(() => {
                badNotification({title: 'Channel fetching', message: 'Failed to fetch'})
            })
    }, []);

    useEffect(() => {

    }, [navbarStatus]);

    // ------ CONTEXT MENU ----------------------------------------------------------
    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu) closeContextMenu();
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('contextmenu', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('contextmenu', handleClickOutside);
        }
    }, [contextMenu]);

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const handleNavContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({x: e.pageX, y: e.pageY, type: 'nav'})
    }

    // const handleMainContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    //     e.preventDefault();
    //     setContextMenu({x: e.pageX, y: e.pageY, type: 'main'})
    // }
    // -------------------------------------------------------------------------------

    // ------ CHANNEL TREE PARSING ---------------------------------------------------
    function parseChannels(): NavbarProperties {
        const properties: NavbarProperties = {
            rules: rules,
            baseHref: `/bot/${params.botId}/guilds/${params.guildId}/channels` + '/@{id}',
            items: []
        };

        properties.items = buildChannelTree(channelData);

        return properties;
    }

    function buildChannelTree(channels: Channel[]) {
        const channelMap = new Map<string, NavbarItem>();
        let resultItems: NavbarItem[] = [];

        channels.forEach(channel => {
            const navbarItem: NavbarItem = channelToNavbarItem(channel);
            channelMap.set(channel.id, navbarItem);

            if (!channel.parent_id) {
                resultItems.push(navbarItem);
            }
        });

        channels.forEach(channel => {
            if (channel.parent_id) {
                const parentItem = channelMap.get(channel.parent_id);
                const childItem = channelMap.get(channel.id);
                if (parentItem && childItem) {
                    parentItem.children.push(childItem);
                }
            }
        });

        const sortChannels = (items: NavbarItem[]) => {
            return items.sort((a, b) => {
                if (a.type === 4 && b.type !== 4) {
                    return 1;
                }
                if (a.type !== 4 && b.type === 4) {
                    return -1;
                }

                if (a.position === b.position) {
                    return a.id.localeCompare(b.id);
                }
                return a.position - b.position;
            })
        }

        const recursiveSort = (items: NavbarItem[]) => {
            items.forEach(item => {
                if (item.children.length > 0) {
                    item.children = sortChannels(item.children);
                    recursiveSort(item.children);
                }
            })
        }

        resultItems = sortChannels(resultItems);
        recursiveSort(resultItems);
        return resultItems;
    }
    // -------------------------------------------------------------------------------

    const refreshChannels = () => {
        channelService.refreshAll(params.botId, params.guildId)
            .then(res => res.json())
            .then(data => {
                setChannelData(data);
                goodNotification({title: 'Channel refreshing', message: 'Successfully refreshed channels!'});
            })
            .catch(() => {
                badNotification({title: 'Channel refreshing', message: 'Failed to refresh channels!'})
            })
    }

    const navContextMenuOptions: MenuItem[] = [
        { name: 'Refresh all', iconChild: <IconRefresh stroke={2} />, callback: refreshChannels },
        { name: 'Collapse sidebar', iconChild: <IconLayoutSidebarLeftCollapse stroke={2}/>, callback: () => dispatch(setNavbarState(false))}
    ]

    const mainContextMenuOptions: MenuItem[] = [
        { name: 'Expand sidebar', iconChild: <IconLayoutSidebarLeftExpand stroke={2}/>, callback: () => dispatch(setNavbarState(true))}
    ];

    return (
        <>
            {contextMenu && <ContextMenu
                x={contextMenu.x} y={contextMenu.y}
                items={contextMenu.type === 'nav' ? navContextMenuOptions : mainContextMenuOptions}/>}
            <AppShell.Navbar onContextMenu={handleNavContextMenu}>
                {channelData.length > 0 &&
                    <SideNavbar props={parseChannels()}/>
                }
                {channelData.length === 0 && <Emptiness showExtra={false}/>}
            </AppShell.Navbar>
            <AppShell.Main className={styles.main}>
                {children}
            </AppShell.Main>
        </>
    );

}