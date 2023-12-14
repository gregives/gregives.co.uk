import querystring from "querystring";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

if (
  SPOTIFY_CLIENT_ID === undefined ||
  SPOTIFY_CLIENT_SECRET === undefined ||
  SPOTIFY_REFRESH_TOKEN === undefined
) {
  throw new Error("Missing Spotify environment variables");
}

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    next: {
      revalidate: 1800,
    },
  });

  const { access_token: accessToken } = await response.json();
  return accessToken;
}

type Track = {
  track: {
    album: {
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
    };
    artists: {
      name: string;
    }[];
    duration_ms: 220146;
    external_urls: {
      spotify: string;
    };
    name: string;
  };
  played_at: string;
};

export async function getRecentlyPlayed() {
  const accessToken = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60,
      },
    }
  ).then((response) => response.json());

  const [mostRecent]: Track[] = response.items;

  const albumImage = mostRecent.track.album.images.reduce((smallest, image) => {
    return image.width < smallest.width ? image : smallest;
  });

  return {
    name: mostRecent.track.name,
    album: mostRecent.track.album.name,
    albumImage,
    artist: mostRecent.track.artists[0].name,
    duration: mostRecent.track.duration_ms,
    playedAt: mostRecent.played_at,
    url: mostRecent.track.external_urls.spotify,
  };
}
