'use client'

import React, {useEffect, useState} from "react";
import {Message} from "@/app/_model/Message";
import {MessageService} from "@/app/service/MessageService";
import {badNotification} from "@/app/components/notifications/notifications";
import {ChannelService} from "@/app/service/ChannelService";
import {Channel} from "@/app/_model/Channel";
import {Skeleton, Stack} from "@mantine/core";
import {rules} from "@/app/components/nav/rules";
import ChannelShell from "@/app/bot/[botId]/guilds/[guildId]/(guild-content)/channels/[channelId]/channel.shell";
import Emptiness from "@/app/components/emptyness/Emptiness";
import MessageCard from "@/app/components/cards/message/message.card";
import {MenuItem} from "@/app/_model/MenuItem";
import {IconLayoutSidebarLeftExpand} from "@tabler/icons-react";
import {setNavbarState} from "@/app/store/NavbarStateSlice";
import {useDispatch} from "react-redux";
import ContextMenu from "@/app/components/menu/ContextMenu";
import RefreshButton from "@/app/components/refresh/refresh.button";
import {MessageFetchingOptions} from "@/app/_model/MessageFetchingOptions";

export default function ChannelViewPage({ params }: { params: { botId: string, guildId: string, channelId: string } }) {

    const dispatch = useDispatch();
    const [messageData, setMessageData] = useState<Message[]>([]);
    const [channelData, setChannelData] = useState<Channel | null>(null);
    const [contextMenu, setContextMenu] = useState<{x: number, y: number, type: 'channel' | 'message', message: Message | null} | null>(null);

    const messageService = MessageService.instance();
    const channelService = ChannelService.instance();

    const fetchChannel = () => {
        channelService.fetchOne(params)
            .then(res => res.json())
            .then(data => setChannelData({...data}))
            .catch(() => {badNotification({title: 'Channel fetching', message: 'Failed to fetch channel!'})});
    }

    const fetchMessages = (options: MessageFetchingOptions) => {
        messageService.fetch(params, options)
            .then(res => res.json())
            .then((data: Message[]) => {
                setMessageData(prevState => {
                    const newMessages = data.filter(msg => !prevState.some(existingMsg => existingMsg.id === msg.id))
                    return [...prevState, ...newMessages];
                })
            })
            .catch(() => {badNotification({title: 'Message fetching', message: 'Failed to fetch messages!'})});
    }

    const refreshMessages = (options: MessageFetchingOptions) => {
        messageService.refresh(params, options)
            .then(res => res.json())
            .then((data: Message[]) => {
                setMessageData(prevState => {
                    const newMessages = data.filter(msg => !prevState.some(existingMsg => existingMsg.id === msg.id))
                    return [...prevState, ...newMessages];
                })
            })
            .catch(() => {badNotification({title: 'Message fetching', message: 'Failed to fetch messages!'})});
    }

    useEffect(() => {
       fetchChannel();
       fetchMessages({limit: 50});
    }, []);

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
        };
    }, [contextMenu]);

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const handleChannelContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({x: e.pageX, y: e.pageY, type: 'channel', message: null})
    }

    // const handleMessageContextMenu = (e: React.MouseEvent<HTMLDivElement>, msg: Message) => {
    //     e.preventDefault();
    //     setContextMenu({x: e.pageX, y: e.pageY, type: 'message', message: msg})
    // }
    // -------------------------------------------------------------------------------

    const channelContextMenuOptions: MenuItem[] = [
        { name: 'Expand sidebar', iconChild: <IconLayoutSidebarLeftExpand stroke={2}/>, callback: () => dispatch(setNavbarState(true))}
    ];

    const messageContextMenuOptions: MenuItem[] = [

    ]

    return (
        <>
                {contextMenu && <ContextMenu
                x={contextMenu.x} y={contextMenu.y}
                items={contextMenu.type === 'channel' ? channelContextMenuOptions : messageContextMenuOptions}/>}
                <ChannelShell onContextMenu={handleChannelContextMenu}>
                    <ChannelShell.Header>
                        {!channelData &&<Skeleton w={'30%'} height={18} mt={6} radius="xl" />}
                        {channelData &&
                            <>
                                {rules.find((rule) => rule.type === channelData.type)!.icon}
                                {channelData.name}
                            </>
                        }
                    </ChannelShell.Header>
                    <ChannelShell.Main>
                        {messageData.length > 0 && <RefreshButton onClick={() => {}}/>}
                        <Stack>
                            {messageData.length === 0 && <Emptiness showExtra={false}/>}

                            {messageData.length > 0 && messageData.map(msg =>
                                <MessageCard message={msg} key={msg.id}/>
                            )}
                        </Stack>
                        <RefreshButton onClick={() => {
                            if (messageData.length === 0) {
                               refreshMessages({limit: 50})
                            }

                        }}/>
                    </ChannelShell.Main>
                    <ChannelShell.Footer>
                        ...
                    </ChannelShell.Footer>
                </ChannelShell>
        </>
    );
}