import {ReactNode} from "react";

export interface MenuItem {
    name: string;
    callback: Function;
    iconChild: ReactNode;
}