import React from 'react';
import styles from './page.module.css';
import {Divider, Group, ScrollArea} from "@mantine/core";

const ChannelShell = ({ children, onContextMenu }: {children: React.ReactNode, onContextMenu: React.MouseEventHandler<HTMLDivElement>}) => {
    return <div onContextMenu={onContextMenu} className={styles.channel_body}>
        {children}
    </div>;
};

const ChannelShellHeader = ({ children }: {children: React.ReactNode}) => (
    <>
        <div className={styles.channel_section}>
            <Group gap={15} className={styles.channel_header_group}>
                {children}
            </Group>
        </div>
        <Divider/>
    </>
)
;

const ChannelShellMain = ({children}: { children: React.ReactNode }) => (

        <ScrollArea mah={'80vh'} className={styles.message_body}>
            {children}
        </ScrollArea>
);

const ChannelShellFooter = ({ children }: {children: React.ReactNode}) => (
    <div className={styles.channel_footer}>
        <Divider />
        <div className={styles.channel_section}>{children}</div>
    </div>
);

ChannelShell.Header = ChannelShellHeader;
ChannelShell.Main = ChannelShellMain;
ChannelShell.Footer = ChannelShellFooter;

export default ChannelShell;
