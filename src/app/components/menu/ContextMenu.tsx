import { MenuItem } from "@/app/_model/MenuItem";
import { Menu, MenuDropdown } from "@mantine/core";

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
                {items.map((item) => <Menu.Item key={item.name} onClick={() => {item.callback()}}>{item.name}</Menu.Item>)}
            </MenuDropdown >
        </Menu>
    );
}