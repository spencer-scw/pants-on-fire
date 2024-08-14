"use client";

import '../index.css'
//import { socket } from "../socket";
import { useEffect, useState } from "react";
import PlayerList from './components/PlayerList';
import TitleBar from './components/TitleBar';
import { SocketProvider } from './socket_provider';

//export const metadata = {
//  title: 'React App',
//  description: 'Web site created with Next.js',
//}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <TitleBar />
        <PlayerList />
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
