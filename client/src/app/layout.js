"use client";

import '../index.css'
import { socket } from "../socket";
import { useEffect, useState } from "react";
import PlayerList from './components/PlayerList'
import TitleBar from './components/TitleBar'

//export const metadata = {
//  title: 'React App',
//  description: 'Web site created with Next.js',
//}

export default function RootLayout({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      })
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <TitleBar />
        <PlayerList />
        <div>
          <p>Status: { isConnected ? "connected" : "disconnected" }</p>
          <p>Transport: { transport }</p>
        </div>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
