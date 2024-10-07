import React from "react";
import {Center, UnstyledButton} from "@mantine/core";
import {IconRefresh} from "@tabler/icons-react";
import styles from './refresh.button.module.css';

export default function RefreshButton({onClick}: {onClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Center p={10}>
            <UnstyledButton onClick={onClick} className={styles.refresh_button}>
                <IconRefresh size={50}/>
            </UnstyledButton>
        </Center>
    );
}