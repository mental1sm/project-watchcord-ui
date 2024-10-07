'use client'

import {AppShell, SimpleGrid, Text} from "@mantine/core";
import BotCard from "@/app/components/cards/bot/bot.card";
import React, {useEffect, useState} from "react";
import {BotService} from "@/app/service/BotService";
import {Bot} from "@/app/_model/Bot";
import {MenuItem} from "../_model/MenuItem";
import ContextMenu from "../components/menu/ContextMenu";
import {modals} from "@mantine/modals";
import Emptiness from "@/app/components/emptyness/Emptiness";
import {badNotification, goodNotification} from "@/app/components/notifications/notifications";
import EditBotModal from "@/app/components/modals/bot/EditBotModal";
import {IconEdit, IconFolderOpen, IconPlus, IconRefresh, IconTrash} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { setActiveIcon } from "@/app/store/NavigationIconSlice";
import { ActiveNavigation } from "../_constants/enums";
import {useRouter} from "next/navigation";
import BotCreateModal from "@/app/components/modals/bot/BotCreateModal";
import {setNavbarState, setNavbarVisibility} from "@/app/store/NavbarStateSlice";

export default function Home() {
    const [botData, setBotData] = useState<Bot[]>([]);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, type: 'main' | 'bot', bot: Bot | null } | null>(null);

    const botService: BotService = BotService.instance();

    const dispatch = useDispatch();
    const router = useRouter();

    const fetchAllBots = () => {
        botService.fetchAllBots()
            .then((res) => res.json())
            .then((data) => {
                setBotData(data);
            })
            .catch(() => {
                badNotification({title: 'Bot fetching', message: 'Failed to fetch bots from database!'})
            })
            .finally(() => {});
    }

    useEffect(() => {
        dispatch(setNavbarVisibility(false));
        dispatch(setNavbarState(false));
        dispatch(setActiveIcon(ActiveNavigation.HOME));
        fetchAllBots();
    }, []);

    // ------ CONTEXT MENU ----------------------------------------------------------
    const handleBotCardContextMenu = (e: React.MouseEvent<HTMLDivElement>, bot: Bot) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({x: e.pageX, y: e.pageY, type: 'bot', bot: bot});
    };

    const handleMainContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({x: e.pageX, y: e.pageY, type: 'main', bot: null});
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu) closeContextMenu();
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [contextMenu]);
    // -------------------------------------------------------------------------------

    // ------ BOT MODALS -- ----------------------------------------------------------
    const openDeleteModal = () => modals.openConfirmModal({
        title: 'Bot deletion',
        children: (
            <Text size='sm'>
                This action will delete this Bot from WatchCord. Real bot is not affected. Are you sure?
            </Text>
        ),
        labels: {confirm: 'Delete', cancel: 'Cancel'},
        confirmProps: {color: 'red'},
        onCancel: () => {
            console.log('Action canceled');
        },
        onConfirm: () => {
            botService.deleteBot(contextMenu!.bot!)
                .then((res) => {
                    if (res.ok) {
                        goodNotification({title: 'Bot deletion', message: 'Successfully deleted'});
                        setBotData(botData.filter((bot) => bot.id === contextMenu!.bot!.id))
                    }
                })
                .catch(() => {
                    badNotification({title: 'Bot deletion', message: 'Failed to delete'})
                })
        }
    });

    const handleBotCreate = (token: string) => {
        botService.addNewBot(token)
            .then((res) => {
                if (res.status === 201) {
                    goodNotification({
                        title: 'New Bot',
                        message: 'Successfully added to the database'
                    })
                    fetchAllBots();
                }
            }).catch(() => {
                badNotification({
                    title: 'New Bot',
                    message: 'Failed to add'
                })
        })

    }
    const openCreateBotModal = () => modals.open({
        title: 'New Bot',
        children: (
            <BotCreateModal onClose={() => modals.closeAll()} onSave={handleBotCreate}/>
        )
    });

    const openEditBotModal = () => modals.open({
        title: 'Edit existing Bot',
        children: (
            <EditBotModal
                token={contextMenu!.bot!.token}
                onClose={() => modals.closeAll()}
                onSave={(newToken) => {
                    botService.editBot(contextMenu!.bot!, newToken)
                        .then((res) => {
                        if (res.ok) {
                            goodNotification({title: 'Bot edit', message: 'Successfully edited'})
                        }
                    })
                        .catch(() => { badNotification({title: 'Bot edit', message: 'Failed to edit'}) })
                }}
            />
        )
    });
    // -------------------------------------------------------------------------------

    const refreshBot = () => {
        const bot = contextMenu!.bot!;
        botService.editBot(bot, bot.token)
            .then(res => {
                if (res.ok) {
                    fetchAllBots();
                    goodNotification({title: 'Bot refreshing', message: 'Successfully refreshed bot!'})
                }
            })
            .catch(() => {
                badNotification({title: 'Bot refreshing', message: 'Failed to refresh bot!'})
            })
    }

    const botMenuOptions: MenuItem[] = [
        {name: 'Open', callback: () => {router.push(`/bot/${contextMenu!.bot!.id}/guilds`)}, iconChild: <IconFolderOpen stroke={2} />},
        {name: 'Refresh', callback: refreshBot, iconChild: <IconRefresh stroke={2} />},
        {name: 'Edit', callback: openEditBotModal, iconChild: <IconEdit stroke={2} />},
        {name: 'Delete', callback: openDeleteModal, iconChild: <IconTrash stroke={2} />}
    ];

    const mainMenuOptions: MenuItem[] = [
        {name: 'New Bot', callback: () => openCreateBotModal(), iconChild: <IconPlus stroke={2} />},
    ];

    return (
        <>
            <AppShell.Main onContextMenu={handleMainContextMenu}>
                <SimpleGrid
                    p={'md'}
                    cols={{base: 1, xs: 2, sm: 3, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7, zl: 8}}
                    spacing={{base: 10, sm: 'xl'}}
                >
                    {botData.length > 0 && botData?.map(b => {
                        return <BotCard
                            onContextMenu={(e) => {handleBotCardContextMenu(e, b)}}
                            onClick={() => {router.push(`/bot/${b.id}/guilds`)}}
                            key={b.id}
                            bot={b}/>
                    })}
                </SimpleGrid>
                {botData!.length === 0 && <Emptiness showExtra={true}/>}
                {contextMenu &&
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        items={contextMenu.type === 'bot' ? botMenuOptions : mainMenuOptions}
                    />
                }
            </AppShell.Main>
        </>
    );
}
