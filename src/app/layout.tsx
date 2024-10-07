'use client'

import '@mantine/core/styles.css';
import "./globals.css";
import {AppShell, ColorSchemeScript, MantineProvider} from '@mantine/core';
import {useState} from "react";
import Header from "@/app/components/header/header";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import {Provider} from 'react-redux';
import store from './store';

// const Preloader = () => (
//     <div style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 9999
//     }}>
//         <Loader size="xl" />
//     </div>
// );

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

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

    const [navOpened, setNavOpened] = useState(false)

    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body>
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
                                        {children}
                                </AppShell>
                            </>
                        </ModalsProvider>
                    </MantineProvider>
                </Provider>
            </body>
        </html>
    );
}
