import {Message} from "@/app/_model/Message";
import {Avatar, Group, Image, Paper} from "@mantine/core";
import styles from  './message.card.module.css';
import {formatISODate} from "@/app/_util/date.formatter";
import image from '@/public/887bc8fac6c9878f058a.png'

export default function MessageCard({message}: {message: Message}) {

    return (
        <Paper className={styles.card}>
            <div className={styles.avatar_wrapper}>
                <Avatar size={45}>
                    <Image
                        src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=128`}
                        fallbackSrc={image.src}
                        className={styles.image}
                    />
                </Avatar>

            </div>
            <div className={styles.msg_wrapper}>
                <div className={styles.msg_title}>
                    <Group gap={10}>
                        <div>{message.author.username}</div>
                        <div>{formatISODate(message.timestamp)}</div>
                    </Group>
                </div>
                <div className={styles.msg_body}>
                    {message.content}
                </div>
            </div>
        </Paper>
    );
}