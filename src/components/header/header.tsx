'use client'

import {AppShell, Burger, Group} from "@mantine/core";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from './header.module.css'
import NavbarBreadcrumbs from "../breadcrumbs/NavbarBreadcrumbs";
import { CrumbItem } from "../../_model/CrumbItem";
import {AppDispatch, RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {setNavbarState} from "../../store/NavbarStateSlice";
import {Link, NavLink, useLocation} from "react-router-dom";

import {IconBrandGithub, IconCategory, IconInfoSquareRounded, IconSettings, Logo} from "../icons/IconBundle.tsx";
import {useParams} from "react-router";
import {BotService} from "../../service/BotService.ts";
import {GuildService} from "../../service/GuildService.ts";
import {ChannelService} from "../../service/ChannelService.ts";
import {Bot} from "../../_model/Bot.ts";
import {Guild} from "../../_model/Guild.ts";
import {Channel} from "../../_model/Channel.ts";

export default function Header({setNavOpened} : {setNavOpened: Dispatch<SetStateAction<boolean>>}) {
    const dispatch: AppDispatch = useDispatch();
    const navbarStatus = useSelector((state: RootState) => state.navbar.isOpened);
    const navbarHidden = useSelector((state: RootState) => state.navbar.visible);

    const location = useLocation();
    const botService = BotService.instance();
    const guildService = GuildService.instance();
    const channelService = ChannelService.instance();

    const {botId, guildId, channelId} = useParams();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const generateCrumbs = async () => {
        const crumbs: CrumbItem[] = await Promise.all(pathnames.map(async (name, index) => {
            let href = `#/${pathnames.slice(0, index + 1).join('/')}`;
            let label = name;

            if (name === botId) {
                href = `#/${pathnames.slice(0, index).join('/')}`;
                const bot: Bot = await (await botService.fetchOne(botId)).json()
                label = `${bot?.username}`;
            }
            if (name === guildId && botId) {
                href = `#/${pathnames.slice(0, index).join('/')}`;
                const guild: Guild = await (await guildService.fetchOne(botId, guildId)).json();
                label = `${guild?.name}`;
            }
            if (name === channelId && botId && guildId) {
                const channel: Channel = await (await channelService.fetchOne({botId, guildId, channelId})).json();
                label = `${channel?.name}`;
            }

            return { href, name: label };
        }));
        setNavLinks(crumbs)
    }

    const [navLinks, setNavLinks] = useState<CrumbItem[]>([]);

    useEffect(() => {
        generateCrumbs();
    }, [location]);


    useEffect(() => {
        setNavOpened(navbarStatus);
    }, [navbarStatus]);


    return (
        <AppShell.Header className={styles.header}>
            {navbarHidden &&
                <Burger
                opened={navbarStatus}
                onClick={() => {
                    dispatch(setNavbarState(!navbarStatus));
                }}
                hiddenFrom="sm"
                size="sm"/>
            }

            <div className={`${styles.header_item} ${styles.logo_wrapper}`}>
                <Link to={'/'} className={`${styles.link_wrapper}`}>
                    <div className={styles.image_wrapper}>
                        <Logo className={styles.logo}/>
                    </div>
                    <p>WatchCord</p>
                </Link>
            </div>
            <div className={`${styles.header_item} ${styles.breadcrumbs_wrapper}`}>
                <NavbarBreadcrumbs items={navLinks}/>
            </div>
            <div className={`${styles.header_item} ${styles.wide_menu}`}>
                <NavLink 
                className={
                    ({isActive, isPending}) => `${styles.link_wrapper} ${styles.link_hover} ${isActive ? styles.active : null}`
                } 
                to={'/about'}>
                    <IconInfoSquareRounded stroke={2} size={30}/>
                </NavLink>
                <Link
                    onClick={(e) => {
                        e.preventDefault();
                        // @ts-ignore
                        window.electronAPI.openExternal('https://github.com/mental1sm')
                    }}
                    target={'_blank'}
                    className={`${styles.link_wrapper} ${styles.link_hover}`}
                    to={'https://github.com/mental1sm'}>
                    <IconBrandGithub stroke={2} size={30} />
                </Link>
                <NavLink 
                className={
                    ({isActive, isPending}) => `${styles.link_wrapper} ${styles.link_hover} ${isActive ? styles.active : null}`
                } 
                to={'/settings'}>
                    <IconSettings stroke={2} size={30} />
                </NavLink>
            </div>
            <div style={{justifyContent: 'center', minWidth: '59px'}} className={`${styles.header_item} ${styles.dropdown_icon_menu}`}>
                <Group>
                    <IconCategory stroke={2} size={30}/>
                </Group>
            </div>


        </AppShell.Header>
    );
}