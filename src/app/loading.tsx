import {Loader} from "@mantine/core";

export default function Loading() {

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <Loader size="xl"/>
        </div>
    );
}