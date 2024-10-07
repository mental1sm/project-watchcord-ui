import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, redirect, Route, RouterProvider, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.tsx'
import BotPage from './pages/bot/page.tsx'
import BotGuildsPage from './pages/guilds/page.tsx'
import GuildDetailsPage from './pages/guild-details/page.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <App/>
      </RootLayout>
    ),
    errorElement: <p>ERROR</p>,
  },
  {
    path: "/bot",
    element: (
      <RootLayout>
        <></>
      </RootLayout>
    )
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/bot' element={<BotPage/>}/>
          <Route path='/bot/:botId/guilds' element={<BotGuildsPage/>}/>
          <Route path='/bot/:botId/guilds/:guildId' element={<GuildDetailsPage/>}/>
        </Routes>
      </RootLayout>
    </BrowserRouter>
  </StrictMode>
)
