import {Bot} from "@/app/_model/Bot";
import {Dispatch, SetStateAction} from "react";

const baseUrl: string = "http://localhost:3000";

export class BotService {
    private static _instance: BotService;
    private constructor() {}
    public static instance() {
        if (BotService._instance === undefined) {
            BotService._instance = new BotService();
        }
        return BotService._instance;
    }

    fetchBot(dataHook: Dispatch<SetStateAction<Bot[] | null>>, loadingHook: Dispatch<SetStateAction<boolean>>) {
        // fetch(baseUrl + '/bot', {method: 'GET'})
        //     .then((res) => res.json())
        //     .then((data) => {
        //         dataHook(data);
        //         loadingHook(false);
        //     })
        //     .catch((e) => {console.log(e)})
        loadingHook(false);
        dataHook([
            {
                id: '14124414534634',
                token: 'vgeepojhpjgepvejgepjrheh',
                avatar: '1ee4375beb131ae43a4e4b81e267a265',
                username: 'Bot-Servitor',
                guilds_count: 1
            },
            {
                id: '1412442534634',
                token: 'vgeepojhpjggwggwepvejgepjrheh',
                avatar: '1ee4375beb131ae43a4e4b81e267a265',
                username: 'Test Bot',
                guilds_count: 1
            }
        ])
    }
}