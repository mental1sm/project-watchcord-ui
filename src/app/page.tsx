'use client'

import {AppShell, Button, Center, Input, InputWrapper, Loader, SimpleGrid, Stack, Text} from "@mantine/core";
import BotCard from "@/app/components/cards/bot/bot";
import React, {useEffect, useState} from "react";
import {BotService} from "@/app/service/BotService";
import {Bot} from "@/app/_model/Bot";
import {MenuItem} from "./_model/MenuItem";
import ContextMenu from "./components/menu/ContextMenu";
import {modals} from "@mantine/modals";
import './page.css';
import Emptiness from "@/app/components/emptyness/Emptiness";
import {mockBots} from "@/app/_constants/constants";
import {badNotification, goodNotification} from "@/app/components/notifications/notifications";
import EditBotModal from "@/app/components/modals/bot/EditBotModal";
import {IconEdit, IconFolderOpen, IconPlus, IconRefresh, IconTrash} from "@tabler/icons-react";

export default function Home() {
    const [botData, setBotData] = useState<Bot[]>([]);
    const [loading, setLoading] = useState(true);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, type: 'main' | 'bot', bot: Bot | null } | null>(null);
    const [token, setToken] = useState('');

    const botService: BotService = BotService.instance();

    

    useEffect(() => {
        //botService.fetchBot(setBotData, setLoading);
        setBotData(mockBots);
        setLoading(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu) closeContextMenu();
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [contextMenu]);

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
                        goodNotification({title: 'Bot deletion', message: 'Successfully deleted'})
                    }
                })
                .catch((e) => {
                    badNotification({title: 'Bot deletion', message: 'Failed to delete'})
                })
        }
    });

    const handleBotCreate = () => {
        botService.addNewBot(token)
            .then((res) => {
                if (res.status === 201) {
                    goodNotification({
                        title: 'New Bot',
                        message: 'Successfully added to the database'
                    })
                }
            }).catch((e) => {
                badNotification({
                    title: 'New Bot',
                    message: 'Failed to add'
                })
        })

    }
    const openCreateBotModal = () => modals.open({
        title: 'New Bot',
        children: (
            <Stack>
                <InputWrapper label={'Token'} description={'Discord Bot secret token'}>
                    <Input placeholder={'Enter token'} onInput={(e) => setToken(e.currentTarget.value)}/>
                </InputWrapper>
                <Button onClick={() => {handleBotCreate(); modals.closeAll()}}>Add</Button>
            </Stack>
        ),
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
                        .catch((e) => { badNotification({title: 'Bot edit', message: 'Failed to edit'}) })
                }}
            />
        )
    });

    const botMenuOptions: MenuItem[] = [
        {name: 'Open', callback: () => alert('Opened'), iconChild: <IconFolderOpen stroke={2} />},
        {name: 'Refresh', callback: () => alert('Refreshed'), iconChild: <IconRefresh stroke={2} />},
        {name: 'Edit', callback: openEditBotModal, iconChild: <IconEdit stroke={2} />},
        {name: 'Delete', callback: openDeleteModal, iconChild: <IconTrash stroke={2} />}
    ];

    const mainMenuOptions: MenuItem[] = [
        {name: 'New Bot', callback: () => openCreateBotModal(), iconChild: <IconPlus stroke={2} />},
    ];

    return (
        <>
            <AppShell.Navbar>
                Navbar
            </AppShell.Navbar>
            <AppShell.Main onContextMenu={handleMainContextMenu}>
                <SimpleGrid
                    cols={{base: 1, xs: 2, sm: 3, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7, zl: 8}}
                    spacing={{base: 10, sm: 'xl'}}
                >
                    {loading && <Loader style={{position: 'fixed', top: '40%', left: '50%'}}/>}
                    {(!loading && botData.length > 0) && botData?.map(b => {
                        return <BotCard onContextMenu={(e) => {handleBotCardContextMenu(e, b)}} key={b.id} bot={b}/>
                    })}
                </SimpleGrid>
                {(!loading && botData!.length === 0) &&
                    <Emptiness showExtra={true}/>
                }
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
