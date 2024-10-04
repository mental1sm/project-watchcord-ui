'use client'

import { AppShell } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setActiveIcon } from "../store/NavigationIconSlice";
import { ActiveNavigation } from "../_constants/enums";
import {useEffect} from "react";

export default function AboutPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveIcon(ActiveNavigation.ABOUT));
    }, []);

    return (
        <AppShell.Main>
            About here...
        </AppShell.Main>
    );
}