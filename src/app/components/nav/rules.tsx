import {NavbarIconRule} from "@/app/components/nav/navbar.properties";
import {IconCalendarClock, IconHash, IconJoinRound, IconMessageCircleFilled, IconVolume2} from "@tabler/icons-react";

export const rules: NavbarIconRule[] = [
    {type: 0, icon: <IconHash stroke={2}/>},
    {type: 2, icon: <IconVolume2 stroke={2}/>},
    {type: 15, icon: <IconMessageCircleFilled/>},
    {type: 11, icon: <IconJoinRound stroke={2} />},
    {type: 5, icon: <IconCalendarClock stroke={2}/>}
]