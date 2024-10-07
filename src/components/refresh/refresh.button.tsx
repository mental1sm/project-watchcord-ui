import React from "react";
import {Center, UnstyledButton} from "@mantine/core";
import styles from './refresh.button.module.css';
import {IconRefresh} from "../icons/IconBundle.tsx";

export default function RefreshButton({onClick}: {onClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Center p={10}>
            <UnstyledButton onClick={onClick} className={styles.refresh_button}>
                <IconRefresh size={50}/>
            </UnstyledButton>
        </Center>
    );
}