'use client'

import {AppShell, Burger, Group} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/croissants-pupil.svg";
import {Dispatch, SetStateAction, useEffect} from "react";
import styles from './header.module.css'
import NavbarBreadcrumbs from "../breadcrumbs/NavbarBreadcrumbs";
import { CrumbItem } from "@/app/_model/CrumbItem";
import {IconBrandGithub, IconCategory, IconInfoSquareRounded, IconSettings} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {AppDispatch, RootState} from "@/app/store";
import {useDispatch, useSelector} from "react-redux";
import { ActiveNavigation } from "@/app/_constants/enums";
import {setNavbarState} from "@/app/store/NavbarStateSlice";

export default function Header({setNavOpened} : {setNavOpened: Dispatch<SetStateAction<boolean>>}) {
    const router = useRouter();
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
                <Link href="/" className={`${styles.link_wrapper}`}>
                    <div className={styles.image_wrapper}>
                        <Image className={styles.logo} src={logo} alt="logo"/>
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
                onClick={() => router.push('/about')}
                >
                    <IconInfoSquareRounded stroke={2} size={30}/>
                </a>
                <Link target={'_blank'} className={`${styles.link_wrapper} ${styles.link_hover}`} href={'https://github.com/mental1sm'}>
                    <IconBrandGithub stroke={2} size={30} />
                </Link>
                <a 
                className={`${styles.link_wrapper} ${styles.link_hover} ${activeIcon === ActiveNavigation.SETTINGS ? styles.active : null}`} 
                onClick={() => router.push('/settings')}
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