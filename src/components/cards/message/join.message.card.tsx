import { Group, Paper } from "@mantine/core";
import { Message } from "../../../_model/Message";
import styles from './message.card.module.css';
import { IconArrowRight } from "../../icons/IconBundle";
import {formatISODate} from "../../../_util/date.formatter.ts";

export default function JoinMessageCard({message}: {message: Message}) {
    return (
        <Paper className={styles.card}>
            <Group>
                <IconArrowRight/>
                <strong>{message.author.username} joined to the guild.</strong> {formatISODate(message.timestamp)}
            </Group>
        </Paper>
    );
}