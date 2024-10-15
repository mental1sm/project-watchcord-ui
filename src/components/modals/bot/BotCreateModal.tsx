import { Button, Input, InputWrapper, Stack } from "@mantine/core";
import { useState } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {LocalizationStore} from "../../../_util/language.store.ts";

interface CreateBotModalProps {
    onClose: () => void;
    onSave: (newToken: string) => void;
}

export default function BotCreateModal({ onClose, onSave }: CreateBotModalProps) {
    const [token, setToken] = useState('');
    const language = useSelector((state: RootState) => state.settings.lang);
    const localization = LocalizationStore.get(language)!;

    return (
        <Stack>
            <InputWrapper label={localization.MODAL_TOKEN} description={localization.MODAL_TOKEN_DESC}>
                <Input placeholder={localization.MODAL_ENTER_TOKEN} value={token} onChange={(e) => setToken(e.currentTarget.value)}/>
            </InputWrapper>
            <Button onClick={() => {onSave(token); onClose();}}>Add</Button>
        </Stack>
    );
}