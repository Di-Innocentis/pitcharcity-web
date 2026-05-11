import { NextResponse } from 'next/server';

// 1. LISTA OFICIAL DE SOBREVIVIENTES
const ROSTER = {
  twitch: ["leshliepink", "rubynavx", "arvintach"],
  kick: ["alejandroreport", "thealex30", "ElPipeBro", "Marchelo9", "Rubynavx", "Centis"]
};

// --- AUTENTICACIÓN TWITCH ---
async function getTwitchToken() {
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error('Fallo auth Twitch');
  return data.access_token;
}

// --- AUTENTICACIÓN KICK OFICIAL ---
async function getKickToken() {
  const response = await fetch('https://id.kick.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.KICK_CLIENT_ID,
      client_secret: process.env.KICK_CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error('Fallo auth Kick. Revisa tus llaves.');
  return data.access_token;
}

export async function GET() {
  try {
    const resultados = [];

    // --- PROCESAMIENTO TWITCH ---
    if (ROSTER.twitch.length > 0) {
      try {
        const token = await getTwitchToken();
        const headers = { 
          'Client-ID': process.env.TWITCH_CLIENT_ID, 
          'Authorization': `Bearer ${token}` 
        };

        const [streamsRes, usersRes] = await Promise.all([
          fetch(`https://api.twitch.tv/helix/streams?${ROSTER.twitch.map(n => `user_login=${n.toLowerCase()}`).join('&')}`, { headers, cache: 'no-store' }),
          fetch(`https://api.twitch.tv/helix/users?${ROSTER.twitch.map(n => `login=${n.toLowerCase()}`).join('&')}`, { headers, cache: 'no-store' })
        ]);

        const streamsData = await streamsRes.json();
        const usersData = await usersRes.json();

        ROSTER.twitch.forEach(nombre => {
          const stream = (streamsData.data || []).find(s => s.user_login.toLowerCase() === nombre.toLowerCase());
          const user = (usersData.data || []).find(u => u.login.toLowerCase() === nombre.toLowerCase());

          resultados.push({
            nombre: user ? user.display_name : nombre,
            plataforma: 'twitch',
            enVivo: !!stream,
            titulo: stream ? stream.title : 'Fuera de rango...',
            espectadores: stream ? stream.viewer_count : 0,
            avatar: user ? user.profile_image_url : null
          });
        });
      } catch (e) {
        console.error("⚠️ Fallo en radar Twitch:", e.message);
      }
    }

    // --- PROCESAMIENTO KICK OFICIAL (VERSIÓN CORREGIDA POR DOCUMENTACIÓN) ---
    if (ROSTER.kick.length > 0) {
      try {
        const kickToken = await getKickToken();
        const kickHeaders = {
          'Authorization': `Bearer ${kickToken}`,
          'Accept': 'application/json'
        };
        
        // 1. OBTENER CANALES (Para saber estado en vivo y obtener sus IDs numéricos)
        const channelParams = ROSTER.kick.map(n => `slug=${n.toLowerCase()}`).join('&');
        const channelsRes = await fetch(`https://api.kick.com/public/v1/channels?${channelParams}`, { 
          headers: kickHeaders, 
          cache: 'no-store' 
        });
        
        let kickChannelsData = [];
        if (channelsRes.ok) {
            const channelsJson = await channelsRes.json();
            kickChannelsData = channelsJson.data || [];
        } else {
            console.error(`Error HTTP Kick (channels): ${channelsRes.status}`);
        }

        // 2. OBTENER USUARIOS (Para extraer los profile_picture usando los IDs)
        // Extraemos los IDs que nos devolvió el paso 1
        const userIds = kickChannelsData.map(c => c.broadcaster_user_id).filter(id => id);
        
        let kickUsersProfiles = [];
        if (userIds.length > 0) {
            // La documentación dice que se pasa ?id=123&id=456
            const userParams = userIds.map(id => `id=${id}`).join('&');
            const usersRes = await fetch(`https://api.kick.com/public/v1/users?${userParams}`, { 
                headers: kickHeaders, 
                cache: 'no-store' 
            });
            
            if (usersRes.ok) {
                const usersJson = await usersRes.json();
                kickUsersProfiles = usersJson.data || [];
            } else {
                console.error(`Error HTTP Kick (users): ${usersRes.status}`);
            }
        }

        // 3. FUSIÓN DE DATOS
        ROSTER.kick.forEach(nombre => {
          // Buscamos el canal por slug
          const channel = kickChannelsData.find(c => c.slug.toLowerCase() === nombre.toLowerCase());

          if (channel) {
            // Buscamos el perfil de usuario usando el ID numérico
            const userProfile = kickUsersProfiles.find(u => u.user_id === channel.broadcaster_user_id);
            
            // Evaluamos si está en vivo (según tu JSON, is_live está dentro de stream)
            const isLive = channel.stream && channel.stream.is_live === true;

            resultados.push({
              nombre: channel.slug || nombre,
              plataforma: 'kick',
              enVivo: isLive,
              titulo: isLive ? (channel.stream_title || 'Transmisión en curso') : 'Señal perdida...',
              espectadores: isLive && channel.stream ? (channel.stream.viewer_count || 0) : 0,
              // Aquí asignamos el profile_picture oficial de la API de usuarios
              avatar: userProfile ? userProfile.profile_picture : null
            });
          } else {
            // Si la API no encontró el canal
            resultados.push({
              nombre: nombre,
              plataforma: 'kick',
              enVivo: false,
              titulo: 'Señal perdida...',
              avatar: null
            });
          }
        });

      } catch (e) {
        console.error("⚠️ Fallo crítico en radar Kick Oficial:", e.message);
      }
    }

    // Ordenar: Los vivos arriba
    resultados.sort((a, b) => (a.enVivo === b.enVivo ? 0 : a.enVivo ? -1 : 1));

    return NextResponse.json(resultados);

  } catch (error) {
    console.error("🔥 Error crítico en el núcleo del radar:", error);
    return NextResponse.json({ error: "Fallo total de matriz" }, { status: 500 });
  }
}