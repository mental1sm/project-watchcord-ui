import {Message} from "../../../_model/Message";
import {Avatar, Group, Image, Paper} from "@mantine/core";
import styles from  './message.card.module.css';
import {formatISODate} from "../../../_util/date.formatter";
import image from '../../../assets/887bc8fac6c9878f058a.png';

export default function MessageCard({message}: {message: Message}) {

    const formatText = (text: string): string => {
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        return text;

    };

    return (
        <Paper className={styles.card}>
            <div className={styles.avatar_wrapper}>
                <Avatar size={45}>
                    <Image
                        src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=128`}
                        fallbackSrc={image}
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
                    <div
                        className={styles.msg_body}
                        dangerouslySetInnerHTML={{
                            __html: formatText(message.content.replace(/\n/g, '<br/>'))
                        }}
                    ></div>
                </div>
            </div>
        </Paper>
    );
}