import { Button, Input, InputWrapper, Stack } from "@mantine/core";
import { useState } from "react";

interface CreateBotModalProps {
    onClose: () => void;
    onSave: (newToken: string) => void;
}

export default function BotCreateModal({ onClose, onSave }: CreateBotModalProps) {
    const [token, setToken] = useState('');

    return (
        <Stack>
            <InputWrapper label={'Token'} description={'Discord Bot secret token'}>
                <Input placeholder={'Enter token'} value={token} onChange={(e) => setToken(e.currentTarget.value)}/>
            </InputWrapper>
            <Button onClick={() => {onSave(token); onClose();}}>Add</Button>
        </Stack>
    );
}