import {ReactNode, useEffect, useState} from "react";
import { AppShell, Button, Center, Stack } from "@mantine/core";
import { SettingCard } from "../../components/cards/settings/settings.card";
import styles from './page.module.css';
import ComboBoxSetting, { ComboboxItem } from "../../components/cards/settings/combobox.setting";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../store";
import {Localization, LocalizationStore} from "../../_util/language.store.ts";
import {setNavbarState} from "../../store/NavbarStateSlice.ts";

export default function SettingsPage() {
    const language = useSelector((state: RootState) => state.settings.lang);
    const [localization, setLocalization] = useState<Localization>(LocalizationStore.get(language)!);
    const dispatch = useDispatch();

    type Setting = {
        name: string,
        children: ReactNode
    }

    const languageOptions: ComboboxItem[] = [
        {name: '🇺🇸 English', value: 'en'},
        {name: '🇷🇺 Russian', value: 'ru'}
    ];
    const settings: Setting[] = [
        {name: `${localization.UI_LANG}: ${localization.LANG}`, children: <ComboBoxSetting options={languageOptions}/>},
        //{name: localization.UI_SCALE, children: <Button>Test</Button>}
    ]

    useEffect(() => {
        dispatch(setNavbarState(false));
    }, []);

    useEffect(() => {
        setLocalization(LocalizationStore.get(language)!);
    }, [language]);

    

    return (
        <>
            <AppShell.Main>
                <div className={styles.settings_wrapper}>
                    <Stack>
                        {settings.map(s => <SettingCard key={s.name} name={s.name}>{s.children}</SettingCard>)}
                    </Stack>
                </div>
            </AppShell.Main>
        </>
    );
}