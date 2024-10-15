import { Divider, Group, Paper, Text } from "@mantine/core";
import { ReactNode } from "react";
import styles from './settings.module.css';

export function SettingCard({children, name}: {children: ReactNode, name: string}) {
    
    return (
            <Paper className={styles.card}>
                <Group className={styles.card_group} gap={30}>
                    <Text className={styles.setting_name}>{name}</Text>
                    {children}
                </Group>
                <Divider className={styles.divider}/>
            </Paper> 
    );
}