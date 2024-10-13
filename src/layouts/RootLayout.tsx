import '@mantine/core/styles.css';

import {AppShell, ColorSchemeScript, MantineProvider} from '@mantine/core';
import {useState} from "react";
import Header from "../components/header/header";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import {Provider} from 'react-redux';
import store from '../store';
import {Outlet} from "react-router";
import './globals.css';


const breakpoints = {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '70em',
    xl: '88em',
    xxl: '101em',
    xxxl: '120em',
    zl: '140em'
}

export default function RootLayout() {

    const [navOpened, setNavOpened] = useState(false)

    return (
            <>
                <ColorSchemeScript />
                <Provider store={store}>
                    <MantineProvider theme={{autoContrast: true, breakpoints: breakpoints}} forceColorScheme={'dark'}>
                        <ModalsProvider>
                            <Notifications />
                            <>
                                <AppShell
                                    header={{ height: 60 }}
                                    navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: !navOpened, mobile: !navOpened } }}
                                    onContextMenu={(e) => {e.preventDefault()}}
                                    >
                                    <Header setNavOpened={setNavOpened}/>
                                        <Outlet/>
                                </AppShell>
                            </>
                        </ModalsProvider>
                    </MantineProvider>
                </Provider>
            </>
    );
}