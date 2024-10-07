import {NavbarIconRule, NavbarItem} from "@/app/components/nav/navbar.properties";
import styles from  './side.navbar.module.css';
import {Collapse, Group, Stack, UnstyledButton} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {CollapseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CollapseIcon";

export default function SideNavItem({ item, rules, onClick }: {item: NavbarItem, rules: NavbarIconRule[], onClick: (id: string) => void}) {
    const [opened, { toggle }] = useDisclosure(true);


    const handleClick = () => {
        if (item.type === 4) {
            toggle();
        } else {
            onClick(item.id)
        }
    }

    return (
        <Stack gap={0}>
            <UnstyledButton className={styles.channel_wrapper} onClick={handleClick}>
                <Group gap={7}>
                    {item.type === 4 ? <CollapseIcon collapsed={opened}/> : null}
                    {rules.find((rule) => rule.type === item.type)!.icon}
                    {item.type === 4 ? item.name.toUpperCase() : item.name }
                </Group>
            </UnstyledButton>
            {item.children.length > 0 &&
                <Collapse className={styles.collapsed} in={opened}>
                    {item.children.map(child => <SideNavItem key={child.id} item={child} rules={rules} onClick={onClick}/>)}
                </Collapse>
            }
        </Stack>
    );
}