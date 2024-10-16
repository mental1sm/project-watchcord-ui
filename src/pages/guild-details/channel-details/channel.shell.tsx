import React, {useEffect, useRef, useState} from 'react';
import styles from './page.module.css';
import {Divider, Group, ScrollArea} from "@mantine/core";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { addAccumulatedScroll } from '../../../store/AccumulatedScrolStateSlice';


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
    const dispatch = useDispatch();

    const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
    const viewportRef = useRef<HTMLDivElement>(null);
    const prevScrollHeight = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const accumulatedScroll = useSelector((state: RootState) => state.accumulated.accumulated);

    const uiAccumulatedScroll = (amount: number) => {
        dispatch(addAccumulatedScroll(amount));

        console.log(`Added: ${amount} | total: ${accumulatedScroll}`);

        let scrollAmount = amount + accumulatedScroll;
        if (accumulatedScroll !== 0) {
            scrollAmount = amount > accumulatedScroll ? amount : accumulatedScroll;
        }


        if (viewportRef.current) {
            viewportRef.current.scrollTo({ top: scrollAmount, behavior: 'instant' });
            console.log(`Scrolling to: ${scrollAmount}`);
        }
    };

    useEffect(() => {
        if (!viewportRef.current) return;

        const scrollDiffer = viewportRef.current.scrollHeight - prevScrollHeight.current;

        prevScrollHeight.current = viewportRef.current.scrollHeight;

        if (scrollDiffer > 0) {
            requestAnimationFrame(() => {
                uiAccumulatedScroll(scrollDiffer);
            })
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
