'use client'

import React, {useEffect, useState} from "react";
import {Skeleton, Stack} from "@mantine/core";
import {IconClipboard, IconLayoutSidebarLeftExpand} from "../../../components/icons/IconBundle.tsx";
import {useDispatch, useSelector} from "react-redux";
import { Message } from "../../../_model/Message.ts";
import { Channel } from "../../../_model/Channel.ts";
import { MessageService } from "../../../service/MessageService.ts";
import { ChannelService } from "../../../service/ChannelService.ts";
import {badNotification, goodNotification} from "../../../components/notifications/notifications.ts";
import { MessageFetchingOptions } from "../../../_model/MessageFetchingOptions.ts";
import { MenuItem } from "../../../_model/MenuItem.ts";
import { setNavbarState } from "../../../store/NavbarStateSlice.ts";
import ContextMenu from "../../../components/menu/ContextMenu.tsx";
import ChannelShell from "./channel.shell.tsx";
import { rules } from "../../../components/nav/rules.tsx";
import RefreshButton from "../../../components/refresh/refresh.button.tsx";
import Emptiness from "../../../components/emptyness/Emptiness.tsx";
import MessageCard from "../../../components/cards/message/message.card.tsx";
import { useParams } from "react-router";
import JoinMessageCard from "../../../components/cards/message/join.message.card.tsx";
import { RootState } from "../../../store";
import { resetAccumulatedScroll } from "../../../store/AccumulatedScrolStateSlice.ts";
import {LocalizationStore} from "../../../_util/language.store.ts";
import { DateFormatter } from "../../../_util/date.formatter.ts";

export default function ChannelViewPage() {
    type Params = {
        botId: string, 
        guildId: string, 
        channelId: string
    }
    const {botId, guildId, channelId} = useParams();
    const params: Params = {botId: botId!, guildId: guildId!, channelId: channelId!};
    const dispatch = useDispatch();
    const [messageData, setMessageData] = useState<Message[]>([]);
    const [channelData, setChannelData] = useState<Channel | null>(null);
    const [contextMenu, setContextMenu] = useState<{x: number, y: number, type: 'channel' | 'message', message: Message | null} | null>(null);

    const language = useSelector((state: RootState) => state.settings.lang);
    const localization = LocalizationStore.get(language)!;
    const formatter = DateFormatter.getInstance();
    formatter.setLocale(localization.LOCALE);

    const messageService = MessageService.instance();
    const channelService = ChannelService.instance();

    const fetchChannel = () => {
        channelService.fetchOne(params)
            .then(res => res.json())
            .then(data => setChannelData({...data}))
            .catch(() => {badNotification({title: localization.CHANNEL_FETCHING, message: localization.FETCHING_FAIL})});
    }

    const fetchMessages = (options: MessageFetchingOptions, onException?: () => void) => {
        messageService.fetch(params, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error fetching messages: ${res.statusText}`);
                }
                return res.json();
            })
            .then((data: Message[]) => {
                if (data.length === 0) return;
                setMessageData(prevState => {
                    const messageMap = new Map(prevState.map(msg => [msg.id, msg]));

                    data.forEach(msg => {
                        if (!messageMap.has(msg.id)) {
                            messageMap.set(msg.id, msg);
                        }
                    });

                    return Array.from(messageMap.values()).sort((a, b) => a.id.localeCompare(b.id)) as Message[];
                });
                options._fetch ? goodNotification({title: localization.MESSAGE_FETCHING, message: localization.FETCHING_SUCCESS}): null;
            })
            .catch((e) => {
                badNotification({title: localization.MESSAGE_FETCHING, message: localization.FETCHING_FAIL});
                if (onException) onException();
            });
    }

    useEffect(() => {
        dispatch(resetAccumulatedScroll(0));
    }, []);


    useEffect(() => {
       setMessageData([]);
       fetchChannel();
       fetchMessages({limit: 100});
    }, [channelId]);


    // ------ CONTEXT MENU ----------------------------------------------------------
    useEffect(() => {
        // if (messageData.length > 0) console.log(`first: ${messageData[0].id} ${messageData[0].content}`)
        const handleClickOutside = () => {
            if (contextMenu) closeContextMenu();
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
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

    const copySelectedText = () => {
        const selection = window.getSelection();
        if (selection) {
            navigator.clipboard.writeText(selection.toString()).then(() => {}).catch(() => {});
        }
    };
    // -------------------------------------------------------------------------------

    const channelContextMenuOptions: MenuItem[] = [
        { name: localization.EXPAND_SIDEBAR, iconChild: <IconLayoutSidebarLeftExpand stroke={2}/>, callback: () => dispatch(setNavbarState(true))},
        { name: localization.COPY_TO_CLIPBOARD, iconChild: <IconClipboard stroke={2}/> , callback: copySelectedText}
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
                    {messageData.length > 0 && <RefreshButton onClick={() => {
                        console.log('RESET!')
                        dispatch(resetAccumulatedScroll(0));
                        const lastMessage = messageData[0];
                        const options = {limit: 100, _fetch: true, before: lastMessage.id};
                        fetchMessages(options, () => {
                            fetchMessages({
                                ...options,
                                _fetch: false
                            });
                        })
                    }}/>}
                    <Stack>
                        {messageData.length === 0 && <Emptiness showExtra={false}/>}

                        {messageData.length > 0 && messageData.map(msg =>
                            (
                                msg.type === 7 ? <JoinMessageCard message={msg} key={msg.id}/> : <MessageCard message={msg} key={msg.id}/>
                            )
                        )}
                    </Stack>
                    <RefreshButton onClick={() => {
                        fetchMessages({limit: 100, _fetch: true})
                    }}/>
                </ChannelShell.Main>
                <ChannelShell.Footer>
                    ...
                </ChannelShell.Footer>
            </ChannelShell>
        </>
    );
}