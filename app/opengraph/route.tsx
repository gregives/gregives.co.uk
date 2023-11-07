import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

// Download fonts from CDN on the Edge
const Inter = fetch(
  "https://fonts.cdnfonts.com/s/19795/Inter-Medium.woff"
).then((response) => response.arrayBuffer());

const BebasNeue = fetch(
  "https://fonts.cdnfonts.com/s/14902/BebasNeue Bold.woff"
).then((response) => response.arrayBuffer());

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          paddingBottom: 48,
          lineHeight: 1.5,
          fontFamily: "Inter",
        }}
        tw="bg-blue-100"
      >
        <h1
          style={{
            display: "block",
            fontFamily: "Bebas Neue",
            fontSize: 80,
            marginTop: -8,
            lineClamp: 2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            display: "block",
            fontSize: 40,
            lineClamp: 3,
          }}
          tw="text-blue-700"
        >
          {description}
        </p>
        <p
          style={{
            fontSize: 40,
            marginTop: "auto",
            opacity: 0.5,
          }}
        >
          gregives.co.uk
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await Inter,
          style: "normal",
          weight: 500,
        },
        {
          name: "Bebas Neue",
          data: await BebasNeue,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

export const runtime = "edge";
