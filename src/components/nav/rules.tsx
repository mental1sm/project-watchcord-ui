import {NavbarIconRule} from "./navbar.properties";
import {
    IconCalendarClock,
    IconHash,
    IconJoinRound,
    IconMessageCircleFilled,
    IconVolume
} from "../icons/IconBundle.tsx";

export const rules: NavbarIconRule[] = [
    {type: 0, icon: <IconHash stroke={2}/>},
    {type: 2, icon: <IconVolume stroke={2}/>},
    {type: 15, icon: <IconMessageCircleFilled/>},
    {type: 11, icon: <IconJoinRound stroke={2} />},
    {type: 5, icon: <IconCalendarClock stroke={2}/>}
]