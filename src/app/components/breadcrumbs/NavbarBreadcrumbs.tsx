import { CrumbItem } from "@/app/_model/CrumbItem";
import { Anchor, Breadcrumbs } from "@mantine/core";
import styles from './NavbarBreadcrumbs.module.css';

export default function NavbarBreadcrumbs({ items }: { items: CrumbItem[] }) {

    return (
        <Breadcrumbs>
            {items.map((item) => 
                <Anchor className={styles.crumb} href={item.href} key={item.href}>
                    {item.name}
                </Anchor>
            )}
        </Breadcrumbs>
    );
}