import {ReactNode} from "react";

export interface MenuItem {
    name: string;
    callback: () => void;
    iconChild: ReactNode;
}