'use client'

import { AppShell } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setActiveIcon } from "../store/IconSlice";
import { ActiveNavigation } from "../_constants/enums";

export default function SettingsPage() {
    const dispatch = useDispatch();
    const activeIcon = useSelector((state: RootState) => state.icon.activeIcon);
    dispatch(setActiveIcon(ActiveNavigation.SETTINGS));
    
    return (
        <AppShell.Main>
            Settings here...
        </AppShell.Main>
    );
}