import { Group, Paper } from "@mantine/core";
import { Message } from "../../../_model/Message";
import styles from './message.card.module.css';
import { IconArrowRight } from "../../icons/IconBundle";
import { DateFormatter } from "../../../_util/date.formatter";

export default function JoinMessageCard({message}: {message: Message}) {
    const formatter = DateFormatter.getInstance();
    
    return (
        <Paper className={styles.card}>
            <Group>
                <IconArrowRight/>
                <strong>{message.author.username} joined to the guild.</strong> {formatter.formatISODate(message.timestamp)}
            </Group>
        </Paper>
    );
}