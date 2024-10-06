'use client'

import {AppShell} from "@mantine/core";
import {AppDispatch} from "@/app/store";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setNavbarVisibility} from "@/app/store/NavbarStateSlice";

export default function GuildChannelsLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setNavbarVisibility(true))
    }, []);

    return (
        <>
                {children}
        </>
    );
}