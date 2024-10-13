import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {HashRouter, Route, Routes} from 'react-router-dom'
import RootLayout from './layouts/RootLayout.tsx'
import BotPage from './pages/bot/page.tsx'
import BotGuildsPage from './pages/guilds/page.tsx'
import GuildDetailsPage from './pages/guild-details/page.tsx'
import ChannelViewPage from "./pages/guild-details/channel-details/page.tsx";
import AboutPage from './pages/about/page.tsx'
import SettingsPage from './pages/settings/page.tsx'
import {Navigate} from "react-router";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <RootLayout>
//         <App/>
//       </RootLayout>
//     ),
//     errorElement: <p>ERROR</p>,
//   },
//   {
//     path: "/bot",
//     element: (
//       <RootLayout>
//         <></>
//       </RootLayout>
//     )
//   }
// ]);

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Routes>
            <Route path='/' element={<RootLayout />}>
                <Route index element={<App />} />
                <Route path='about' element={<AboutPage />} />
                <Route path='settings' element={<SettingsPage />} />
                <Route path='bot' element={<BotPage />} />
                <Route path='bot/:botId/guilds' element={<BotGuildsPage />} />
                <Route path='bot/:botId/guilds/:guildId/channels' element={<GuildDetailsPage />}>
                    <Route path=':channelId' element={<ChannelViewPage />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </HashRouter>
)
