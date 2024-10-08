import { Group, Paper } from "@mantine/core";
import { Message } from "../../../_model/Message";
import styles from './message.card.module.css';
import { IconArrowRight } from "../../icons/IconBundle";

export default function JoinMessageCard({message}: {message: Message}) {
    return (
        <Paper className={styles.card}>
            <Group>
                <IconArrowRight/>
                {message.author.username} is joined to guild.
            </Group>
        </Paper>
    );
}