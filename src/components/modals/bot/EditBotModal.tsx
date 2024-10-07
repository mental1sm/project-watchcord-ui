import { Button, Input, InputWrapper, Stack } from "@mantine/core";
import React, { useState } from "react";

interface EditBotModalProps {
    token: string;
    onClose: () => void;
    onSave: (newToken: string) => void;
}

const EditBotModal: React.FC<EditBotModalProps> = ({ token, onClose, onSave }) => {
    const [editableToken, setEditableToken] = useState(token);

    return (
        <Stack>
            <InputWrapper label={'Token'} description={'Discord Bot secret token'}>
                <Input
                    placeholder={'Enter token'}
                    value={editableToken}
                    onChange={(e) => setEditableToken(e.currentTarget.value)}
                />
            </InputWrapper>
            <Button color={'violet'} onClick={() => { onSave(editableToken); onClose(); }}>
                Edit
            </Button>
        </Stack>
    );
};

export default EditBotModal;
