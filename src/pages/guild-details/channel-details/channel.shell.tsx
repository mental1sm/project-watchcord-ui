import React, {useEffect, useRef, useState} from 'react';
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

const ChannelShellMain = ({children}: { children: React.ReactNode }) => {

    const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
    const viewportRef = useRef<HTMLDivElement>(null);
    const prevScrollHeight = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!viewportRef.current) return;

        const scrollDiffer = viewportRef.current.scrollHeight - prevScrollHeight.current;

        prevScrollHeight.current = viewportRef.current.scrollHeight;

        if (scrollDiffer > 0) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    viewportRef.current!.scrollTo({ top: scrollDiffer, behavior: 'instant' });
                });
            });
        }

    }, [scrollPosition, children]);

    return (
        <ScrollArea onScrollPositionChange={onScrollPositionChange} mah={'100vh'} h={'30vh'} className={styles.message_body} viewportRef={viewportRef}>
            <div ref={containerRef}>
                {children}
            </div>
        </ScrollArea>
    );
};

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
