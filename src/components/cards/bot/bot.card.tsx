'use client'

import {Badge, Card, Group, Image, Text} from "@mantine/core";
import styles from '../card.module.css'
import {Bot} from "../../../_model/Bot";
import React from "react";


export default function BotCard({bot, onContextMenu, onClick}: {bot: Bot, onContextMenu: React.MouseEventHandler<HTMLDivElement>, onClick: React.MouseEventHandler<HTMLDivElement>}) {

    return (
        <Card shadow={'sm'} withBorder onContextMenu={onContextMenu} onClick={onClick} className={styles.card}>
            <Card.Section>
                <Image
                    src={`https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png?size=512`}
                    fallbackSrc={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU'}
                    height={160}
                    alt={'no way'}/>
            </Card.Section>
            <Group justify='space-between' mt='md' mb='xs'>
                <Text fw={500}>{bot.username}</Text>
            </Group>
            <Badge color="blue">Guilds count: {bot.guilds_count}</Badge>
        </Card>
    );
}