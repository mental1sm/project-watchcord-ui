'use client'

import {AppShell, Burger, Group} from "@mantine/core";
import {Dispatch, SetStateAction, useEffect} from "react";
import styles from './header.module.css'
import NavbarBreadcrumbs from "../breadcrumbs/NavbarBreadcrumbs";
import { CrumbItem } from "../../_model/CrumbItem";
import {AppDispatch, RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import { ActiveNavigation } from "../../_constants/enums";
import {setNavbarState} from "../../store/NavbarStateSlice";
import { Link, useNavigate } from "react-router-dom";

import {IconBrandGithub, IconCategory, IconInfoSquareRounded, IconSettings, Logo} from "../icons/IconBundle.tsx";

export default function Header({setNavOpened} : {setNavOpened: Dispatch<SetStateAction<boolean>>}) {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const activeIcon = useSelector((state: RootState) => state.icon.activeIcon);
    const navbarStatus = useSelector((state: RootState) => state.navbar.isOpened);
    const navbarHidden = useSelector((state: RootState) => state.navbar.visible);

    useEffect(() => {
        setNavOpened(navbarStatus);
    }, [navbarStatus]);
    
    const navLinks: CrumbItem[] = [
        // {href: '/', name: 'Home'},
        // {href: '/', name: 'Home'},
        // {href: '/', name: 'Home'}
    ]
    
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
            <div className={`${styles.header_item} ${styles.future_breadcrumbs}`}>
                <NavbarBreadcrumbs items={navLinks}/>
            </div>
            <div className={`${styles.header_item} ${styles.wide_menu}`}>
                <a 
                className={`${styles.link_wrapper} ${styles.link_hover} ${activeIcon === ActiveNavigation.ABOUT ? styles.active : null}`} 
                onClick={() => navigate('/about')}
                >
                    <IconInfoSquareRounded stroke={2} size={30}/>
                </a>
                <Link target={'_blank'} className={`${styles.link_wrapper} ${styles.link_hover}`} to={'https://github.com/mental1sm'}>
                    <IconBrandGithub stroke={2} size={30} />
                </Link>
                <a 
                className={`${styles.link_wrapper} ${styles.link_hover} ${activeIcon === ActiveNavigation.SETTINGS ? styles.active : null}`} 
                onClick={() => navigate('/settings')}
                >
                    <IconSettings stroke={2} size={30} />
                </a>
            </div>
            <div style={{justifyContent: 'center', minWidth: '59px'}} className={`${styles.header_item} ${styles.dropdown_icon_menu}`}>
                <Group>
                    <IconCategory stroke={2} size={30}/>
                </Group>
            </div>


        </AppShell.Header>
    );
}