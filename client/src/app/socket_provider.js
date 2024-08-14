'use client';

import { socket } from '../socket';
import React, { createContext, useState, useEffect } from 'react';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [mySocket, setMySocket] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setMySocket(socket);
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
    socket.on("pages", console.log)
    
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  
  return (
    <SocketContext.Provider value={{mySocket, isConnected, transport }}>{children}</SocketContext.Provider>
  );
}
