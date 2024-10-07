import {Center, Stack, Text} from "@mantine/core";

export default function Emptiness({showExtra = false} : {showExtra: boolean}) {

    return (
        <Center>
            <Stack align={'center'}>
                <Text fz={20}>There is nothing here...</Text>
                {showExtra && <Text fz={20}>Press right click to add new</Text>}
            </Stack>
        </Center>
    );
}