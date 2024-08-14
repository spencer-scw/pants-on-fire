"use client"

import Link from "next/link"
import React, { useContext } from 'react';
import { SocketContext } from '../socket_provider';

export default function Page() {
  const { socket, isConnected, transport } = useContext(SocketContext);

  return (
  <div>
    <h2>Welcome!</h2>
    <Link href="/">Home</Link>
    <div>
      <p>Status: { isConnected ? "connected" : "disconnected" }</p>
      <p>Transport: { transport }</p>
    </div>
  </div>
  );
}
