import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconRefresh} from "../../components/icons/IconBundle.tsx";
import {AppShell} from "@mantine/core";
import styles from './page.module.css';
import { Channel } from "../../_model/Channel";
import { ChannelService } from "../../service/ChannelService";
import { RootState } from "../../store";
import { setNavbarState, setNavbarVisibility } from "../../store/NavbarStateSlice";
import { badNotification, goodNotification } from "../../components/notifications/notifications";
import { channelToNavbarItem, NavbarItem, NavbarProperties } from "../../components/nav/navbar.properties";
import { rules } from "../../components/nav/rules";
import { MenuItem } from "../../_model/MenuItem";
import ContextMenu from "../../components/menu/ContextMenu";
import SideNavbar from "../../components/nav/side.navbar";
import Emptiness from "../../components/emptyness/Emptiness";
import { Outlet, useParams } from "react-router";

export default function GuildDetailsPage() {
    const {botId, guildId} = useParams();
    const [channelData, setChannelData] = useState<Channel[]>([]);
    const [contextMenu, setContextMenu] = useState<{x: number, y: number, type: 'main' | 'nav'} | null>(null);
    const channelService = ChannelService.instance();
    const navbarStatus = useSelector((state: RootState) => state.navbar.isOpened);
    const dispatch = useDispatch();


    const fetchChannels = (fetch: boolean = false) => {
        channelService.fetchAll(botId!, guildId!, fetch)
            .then((res) => res.json())
            .then((data) => {
                setChannelData(data)
                fetch ? goodNotification({title: 'Channel fetching', message: 'Successful channel fetching'}) : null;
            })
            .catch(() => {
                badNotification({title: 'Channel fetching', message: 'Failed to fetch!'})
            })
    }

    useEffect(() => {
        dispatch(setNavbarVisibility(true))
        dispatch(setNavbarState(true));
        fetchChannels();
    }, []);

    useEffect(() => {

    }, [navbarStatus]);

    // ------ CONTEXT MENU ----------------------------------------------------------
    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu) closeContextMenu();
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [contextMenu]);

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const handleNavContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({x: e.pageX, y: e.pageY, type: 'nav'})
    }

    // @ts-ignore
    const handleMainContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({x: e.pageX, y: e.pageY, type: 'main'})
    }
    // -------------------------------------------------------------------------------

    // ------ CHANNEL TREE PARSING ---------------------------------------------------
    function parseChannels(): NavbarProperties {
        const properties: NavbarProperties = {
            rules: rules,
            baseHref: `/bot/${botId}/guilds/${guildId}/channels` + '/@{id}',
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

    const navContextMenuOptions: MenuItem[] = [
        { name: 'Refresh all', iconChild: <IconRefresh stroke={2} />, callback: () => fetchChannels(true)},
        { name: 'Collapse sidebar', iconChild: <IconLayoutSidebarLeftCollapse stroke={2}/>, callback: () => dispatch(setNavbarState(false))}
    ]

    const mainContextMenuOptions: MenuItem[] = [
        { name: 'Expand sidebar', iconChild: <IconLayoutSidebarLeftExpand stroke={2}/>, callback: () => dispatch(setNavbarState(true))}
    ];

    return (
        <>
            {contextMenu && <ContextMenu
                key={`${contextMenu.x}-${contextMenu.y}-${contextMenu.type}`}
                x={contextMenu.x} y={contextMenu.y}
                items={contextMenu.type === 'nav' ? navContextMenuOptions : mainContextMenuOptions}/>}
            <AppShell.Navbar pt={10} onContextMenu={handleNavContextMenu}>
                {channelData.length > 0 &&
                    <SideNavbar props={parseChannels()}/>
                }
                {channelData.length === 0 && <Emptiness showExtra={false}/>}
            </AppShell.Navbar>
            <AppShell.Main className={styles.main}>
                <Outlet/>
            </AppShell.Main>
        </>
    );

}