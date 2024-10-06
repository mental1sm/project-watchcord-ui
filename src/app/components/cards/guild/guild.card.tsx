import {Badge, Card, Group, Image, Text} from "@mantine/core";
import styles from '../card.module.css'
import React from "react";
import {Guild} from "@/app/_model/Guild";


export default function GuildCard({guild, onContextMenu, onClick}: {guild: Guild, onContextMenu: React.MouseEventHandler<HTMLDivElement>, onClick: React.MouseEventHandler<HTMLDivElement>}) {

    return (
        <Card shadow={'sm'} withBorder onContextMenu={onContextMenu} onClick={onClick} className={styles.card}>
            <Card.Section>
                <Image
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=512`}
                    fallbackSrc={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU'}
                    height={160}
                    alt={'no way'}/>
            </Card.Section>
            <Group justify='space-between' mt='md' mb='xs'>
                <Text fw={500}>{guild.name}</Text>
            </Group>
            <Group>
                <Badge color="blue">Members: {guild.membersCount}</Badge>
                <Badge color="grape">Channels: {guild.channelsCount}</Badge>
            </Group>
        </Card>
    );
}