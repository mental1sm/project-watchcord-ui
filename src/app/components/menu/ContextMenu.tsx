import { MenuItem } from "@/app/_model/MenuItem";
import {Group, Menu, MenuDropdown} from "@mantine/core";

export default function ContextMenu({x, y, items}: {x: number, y: number, items: MenuItem[]}) {

    return (
        <Menu opened={true}>
            <MenuDropdown
            style={{
                top: y,
                left: x,
                position: "absolute",
                zIndex: 1000
            }}
            >
                {items.map((item) =>
                    <Menu.Item key={item.name} onClick={() => {item.callback()}}>
                        <Group style={{gap: 5}}>
                            {item.iconChild}
                            {item.name}
                        </Group>
                    </Menu.Item>)}
            </MenuDropdown >
        </Menu>
    );
}