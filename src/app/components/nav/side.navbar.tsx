import styles from './side.navbar.module.css';
import {ScrollArea, Stack} from "@mantine/core";
import {NavbarProperties} from "@/app/components/nav/navbar.properties";
import SideNavItem from "@/app/components/nav/side.nav.item";
import {useRouter} from "next/navigation";

export default function SideNavbar({props}: {props: NavbarProperties}) {
    const router = useRouter();

    for (let i = 0; i < 30; i++) {
        const rule = props.rules.find((rule) => rule.type === i);
        if (!rule) {
            props.rules.push({type: i, icon: null});
        }
    }

    const items = props.items.map((item) => (
            <SideNavItem key={item.id} item={item} rules={props.rules} onClick={(id) => {router.push(props.baseHref.replace('@{id}', id))}}/>
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