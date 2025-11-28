import { useState, useEffect } from 'react';

interface DiscordUser {
  username: string;
  discriminator: string;
  display_name: string;
  id: string;
  avatar: string;
}

interface Activity {
  type: number;
  name: string;
  state?: string;
  details?: string;
  emoji?: { name: string; id?: string; animated?: boolean };
}

interface LanyardData {
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Activity[];
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
}

const DISCORD_ID = '500293365494054932'; // DISCORD ID

export function useLanyard() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [status, setStatus] = useState<'online' | 'idle' | 'dnd' | 'offline'>('offline');

  useEffect(() => {
    let socket: WebSocket | null = null;
    let heartbeatInterval: NodeJS.Timeout;

    const connect = () => {
      socket = new WebSocket('wss://api.lanyard.rest/socket');

      socket.onopen = () => {
        socket?.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_ID },
          })
        );
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const { t, d, op } = message;

        if (op === 1) {
          heartbeatInterval = setInterval(() => {
            socket?.send(JSON.stringify({ op: 3 }));
          }, d.heartbeat_interval);
        }

        if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
          setData(d);
          setStatus(d.discord_status);
        }
      };

      socket.onclose = () => {
        clearInterval(heartbeatInterval);
        setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      clearInterval(heartbeatInterval);
      socket?.close();
    };
  }, []);

  return { data, status };
}