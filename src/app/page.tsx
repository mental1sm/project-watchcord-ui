'use client'

import {AppShell, Center, SimpleGrid, Stack, Text} from "@mantine/core";
import BotCard from "@/app/components/cards/bot/bot";
import React, {useEffect, useState} from "react";
import {BotService} from "@/app/service/BotService";
import {Bot} from "@/app/_model/Bot";
import { MenuItem } from "./_model/MenuItem";
import ContextMenu from "./components/menu/ContextMenu";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import './page.css';
import {Container} from "@mantine/core";
import Emptiness from "@/app/components/emptyness/Emptiness";

export default function Home() {
    const [botData, setBotData] = useState<Bot[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
    const botService: BotService = BotService.instance();


    useEffect(() => {
        botService.fetchBot(setBotData, setLoading);
    }, []);

    useEffect(() => {
        const handleCLickOutside = () => {
            if (contextMenu) closeContextMenu();
        };

        document.addEventListener('click', handleCLickOutside);
        return () => document.removeEventListener('click', handleCLickOutside);
    }, [contextMenu]);

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu({x: e.pageX, y: e.pageY});
    }

    const closeContextMenu = () => {
        setContextMenu(null);
    }

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
            console.log('Action canceled')
        },
        onConfirm: () => {
            notifications.show({
                title: 'Bot deleted',
                message: 'Successfull action',
                position: 'bottom-right',
                color: 'green',
                style: {zIndex: 50, position: 'fixed', bottom: 30, right: 30, minWidth: '300px'},
            })
        }
    });

    const MenuOptions: MenuItem[] = [
        {
            name: 'Open', callback: () => {
                alert('Opened')
            }
        },
        {
            name: 'Refresh', callback: () => {
                alert('Refreshed')
            }
        },
        {
            name: 'Edit', callback: () => {
                alert('Edited')
            }
        },
        {name: 'Delete', callback: openDeleteModal}
    ]


    return (
        <>
            <AppShell.Navbar>
                Navbar
            </AppShell.Navbar>
            <SimpleGrid
                cols={{base: 1, xs: 2, sm: 3, md: 3, lg: 4, xl: 5, xxl: 6, xxxl: 7, zl: 8}}
                spacing={{base: 10, sm: 'xl'}}
            >
                {loading && null}
                {(!loading && botData!.length > 0) && botData?.map(b => {
                    return <BotCard onContextMenu={handleContextMenu} key={b.id} bot={b}/>
                })}
            </SimpleGrid>
            {(!loading && botData!.length === 0) &&
                <Emptiness showExtra={true}/>
            }
            {contextMenu &&
                <ContextMenu x={contextMenu.x} y={contextMenu.y} items={MenuOptions}/>
            }
        </>
    );
}