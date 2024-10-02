'use client'

import {AppShell, Button, Input, InputWrapper, SimpleGrid, Stack, Text} from "@mantine/core";
import BotCard from "@/app/components/cards/bot/bot";
import React, {useEffect, useState} from "react";
import {BotService} from "@/app/service/BotService";
import {Bot} from "@/app/_model/Bot";
import {MenuItem} from "./_model/MenuItem";
import ContextMenu from "./components/menu/ContextMenu";
import {modals} from "@mantine/modals";
import {notifications} from "@mantine/notifications";
import './page.css';
import Emptiness from "@/app/components/emptyness/Emptiness";

export default function Home() {
    const [botData, setBotData] = useState<Bot[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, type: 'main' | 'bot', bot: Bot | null } | null>(null);
    const botService: BotService = BotService.instance();

    useEffect(() => {
        botService.fetchBot(setBotData, setLoading);
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
            notifications.show({
                title: 'Bot deleted',
                message: 'Successfull action',
                position: 'bottom-right',
                color: 'green',
                style: {zIndex: 50, position: 'fixed', bottom: 30, right: 30, minWidth: '300px'},
            });
        }
    });

    const openCreateBotModal = () => modals.open({
        title: 'New Bot',
        children: (
            <Stack>
                <InputWrapper label={'Token'} description={'Discord Bot secret token'}>
                    <Input placeholder={'Enter token'}/>
                </InputWrapper>
                <Button>Add</Button>
            </Stack>
        ),
    });

    const openEditBotModal = () => modals.open({
        title: 'Edit existing Bot',
        children: (
            <Stack>
                <InputWrapper label={'Token'} description={'Discord Bot secret token'}>
                    <Input placeholder={'Enter token'} value={contextMenu!.bot!.token}/>
                </InputWrapper>
                <Button color={'violet'}>Edit</Button>
            </Stack>
        )
    });

    // Menu for bot cards
    const botMenuOptions: MenuItem[] = [
        {name: 'Open', callback: () => alert('Opened')},
        {name: 'Refresh', callback: () => alert('Refreshed')},
        {name: 'Edit', callback: openEditBotModal},
        {name: 'Delete', callback: openDeleteModal}
    ];

    // Menu for Main
    const mainMenuOptions: MenuItem[] = [
        {name: 'New Bot', callback: () => openCreateBotModal()},
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
                    {loading && null}
                    {(!loading && botData!.length > 0) && botData?.map(b => {
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
                        items={contextMenu.type === 'bot' ? botMenuOptions : mainMenuOptions}  // Select menu based on type
                    />
                }
            </AppShell.Main>
        </>
    );
}
