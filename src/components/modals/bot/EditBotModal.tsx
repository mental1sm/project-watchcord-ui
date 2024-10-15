import { Button, Input, InputWrapper, Stack } from "@mantine/core";
import React, { useState } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {LocalizationStore} from "../../../_util/language.store.ts";

interface EditBotModalProps {
    token: string;
    onClose: () => void;
    onSave: (newToken: string) => void;
}

const EditBotModal: React.FC<EditBotModalProps> = ({ token, onClose, onSave }) => {
    const [editableToken, setEditableToken] = useState(token);
    const language = useSelector((state: RootState) => state.settings.lang);
    const localization = LocalizationStore.get(language)!;

    return (
        <Stack>
            <InputWrapper label={localization.MODAL_TOKEN} description={localization.MODAL_TOKEN_DESC}>
                <Input
                    placeholder={localization.MODAL_ENTER_TOKEN}
                    value={editableToken}
                    onChange={(e) => setEditableToken(e.currentTarget.value)}
                />
            </InputWrapper>
            <Button color={'violet'} onClick={() => { onSave(editableToken); onClose(); }}>
                {localization.EDIT}
            </Button>
        </Stack>
    );
};

export default EditBotModal;
