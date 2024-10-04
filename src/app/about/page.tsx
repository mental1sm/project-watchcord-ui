'use client'

import { AppShell } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setActiveIcon } from "../store/IconSlice";
import { ActiveNavigation } from "../_constants/enums";

export default function AboutPage() {
    const dispatch = useDispatch();
    const activeIcon = useSelector((state: RootState) => state.icon.activeIcon);
    dispatch(setActiveIcon(ActiveNavigation.ABOUT));

    return (
        <AppShell.Main>
            About here...
        </AppShell.Main>
    );
}