'use client'

import { BotService } from "@/app/service/BotService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BotGuildsPage() {

    const botService = BotService.instance();
    const searchParams = useSearchParams();
    const botId = searchParams.get('botId'); 
    const [botData, setBotData] = useState(null);

    useEffect(() => {
        console.log(searchParams);
    }, []);

    return (
        <>
            Guild Here...
        </>
    );
}