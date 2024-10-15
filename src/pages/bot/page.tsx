'use client'

import {AppShell, SimpleGrid, Text} from "@mantine/core";
import BotCard from "../../components/cards/bot/bot.card";
import React, {useEffect, useState} from "react";
import {BotService} from "../../service/BotService";
import {Bot} from "../../_model/Bot";
import {MenuItem} from "../../_model/MenuItem";
import ContextMenu from "../../components/menu/ContextMenu";
import {modals} from "@mantine/modals";
import Emptiness from "../../components/emptyness/Emptiness";
import {badNotification, goodNotification} from "../../components/notifications/notifications";
import EditBotModal from "../../components/modals/bot/EditBotModal";
import {IconEdit, IconFolderOpen, IconPlus, IconRefresh, IconTrash} from "../../components/icons/IconBundle.tsx";
import {useDispatch, useSelector} from "react-redux";
import BotCreateModal from "../../components/modals/bot/BotCreateModal";
import {setNavbarState, setNavbarVisibility} from "../../store/NavbarStateSlice";
import { useNavigate } from "react-router-dom";
import {LocalizationStore} from "../../_util/language.store.ts";
import {RootState} from "../../store";

export default function BotPage() {
    const language = useSelector((state: RootState) => state.settings.lang);
    const localization = LocalizationStore.get(language)!;

    const [botData, setBotData] = useState<Bot[]>([]);

    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, type: 'main' | 'bot', bot: Bot | null } | null>(null);
    const botService: BotService = BotService.instance();

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const fetchAllBots = () => {

        botService.fetchAllBots()
            .then((res) => res.json())
            .then((data) => {
                setBotData(data);
            })
            .catch(() => {
                badNotification({title: localization.BOT_FETCHING, message: localization.FETCHING_FAIL})
            })
            .finally(() => {});
    }
    useEffect(() => {
        dispatch(setNavbarVisibility(false));
        dispatch(setNavbarState(false));
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
        title: localization.BOT_DELETION,
        children: (
            <Text size='sm'>
                {localization.MODAL_DELETE_ALERT_TEXT}
            </Text>
        ),
        labels: {confirm: localization.MODAL_DELETE, cancel: localization.MODAL_CANCEL},
        confirmProps: {color: 'red'},
        onCancel: () => {
            
        },
        onConfirm: () => {
            botService.deleteBot(contextMenu!.bot!)
                .then((res) => {
                    if (res.ok) {
                        goodNotification({title: localization.BOT_DELETION, message: localization.DELETION_SUCCESS});
                        setBotData(botData.filter((bot) => bot.id === contextMenu!.bot!.id))
                    }
                })
                .catch(() => {
                    badNotification({title: localization.BOT_DELETION, message: localization.DELETION_FAIL})
                })
        }
    });

    const handleBotCreate = (token: string) => {
        botService.addNewBot(token)
            .then((res) => {
                if (res.status === 201) {
                    goodNotification({
                        title: localization.NEW_BOT,
                        message: localization.ADDITION_SUCCESS
                    })
                    fetchAllBots();
                }
            }).catch(() => {
                badNotification({
                    title: localization.NEW_BOT,
                    message: localization.ADDITION_SUCCESS
                })
        })

    }
    const openCreateBotModal = () => modals.open({
        title: localization.NEW_BOT,
        children: (
            <BotCreateModal onClose={() => modals.closeAll()} onSave={handleBotCreate}/>
        )
    });

    const openEditBotModal = () => modals.open({
        title: localization.BOT_EDIT,
        children: (
            <EditBotModal
                token={contextMenu!.bot!.token}
                onClose={() => modals.closeAll()}
                onSave={(newToken) => {
                    botService.editBot(contextMenu!.bot!, newToken)
                        .then((res) => {
                        if (res.ok) {
                            goodNotification({title: localization.BOT_EDITION, message: localization.EDITION_SUCCESS})
                        }
                    })
                        .catch(() => { badNotification({title: localization.BOT_EDITION, message: localization.EDITION_FAIL}) })
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
                    goodNotification({title: localization.BOT_REFRESHING, message: localization.REFRESHING_SUCCESS})
                }
            })
            .catch(() => {
                badNotification({title: localization.BOT_REFRESHING, message: localization.REFRESHING_FAIL})
            })
    }

    const botMenuOptions: MenuItem[] = [
        {name: localization.OPEN, callback: () => {navigate(`/bot/${contextMenu!.bot!.id}/guilds`)}, iconChild: <IconFolderOpen stroke={2} />},
        {name: localization.REFRESH, callback: refreshBot, iconChild: <IconRefresh stroke={2} />},
        {name: localization.EDIT, callback: openEditBotModal, iconChild: <IconEdit stroke={2} />},
        {name: localization.DELETE, callback: openDeleteModal, iconChild: <IconTrash stroke={2} />}
    ];

    const mainMenuOptions: MenuItem[] = [
        {name: localization.NEW_BOT, callback: () => openCreateBotModal(), iconChild: <IconPlus stroke={2} />},
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
                            onClick={() => {navigate(`/bot/${b.id}/guilds`)}}
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
