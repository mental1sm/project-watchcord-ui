import styles from './side.navbar.module.css';
import {ScrollArea, Stack} from "@mantine/core";
import {NavbarProperties} from "../../components/nav/navbar.properties";
import SideNavItem from "../../components/nav/side.nav.item";
import { useNavigate } from 'react-router-dom';

export default function SideNavbar({props}: {props: NavbarProperties}) {
    const navigate = useNavigate();

    for (let i = 0; i < 30; i++) {
        const rule = props.rules.find((rule) => rule.type === i);
        if (!rule) {
            props.rules.push({type: i, icon: null});
        }
    }

    const items = props.items.map((item) => (
            <SideNavItem key={item.id} item={item} rules={props.rules} onClick={(id) => {navigate(props.baseHref.replace('@{id}', id))}}/>
    ));

    return (
        <nav>
            <ScrollArea h={'93vh'}>
                <Stack gap={0} className={styles.navbar}>
                    {items}
                </Stack>
            </ScrollArea>
        </nav>
    );
}