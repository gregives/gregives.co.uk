"use client";

import Image from "next/image";
import fullImage from "@/assets/headshots.png";
import previewImage from "@/assets/headshotsPreview.png";
import { useCallback, useEffect, useRef, useState } from "react";

type HeadshotsProperties = JSX.IntrinsicElements["div"];

type Headshot = {
  coordinates: [number, number];
  transform: string;
};

export function Headshots(properties: HeadshotsProperties) {
  const [loaded, setLoaded] = useState(false);
  const [transform, setTransform] = useState(
    `translate(-${400 / 7}%, -${300 / 4}%)`
  );

  const headshotsRef = useRef<HTMLDivElement>(null);

  const changeHeadshot = useCallback((event: MouseEvent | TouchEvent) => {
    if (headshotsRef.current === null) {
      return;
    }

    const [clientX, clientY] = [
      "clientX" in event ? event.clientX : event.changedTouches[0].clientX,
      "clientY" in event ? event.clientY : event.changedTouches[0].clientY,
    ];

    const rect = headshotsRef.current.getBoundingClientRect();
    const mouseX = ((clientX - rect.left) * 10) / rect.width;
    const mouseY = ((clientY - rect.top) * 10) / rect.height;

    const { headshot: closestHeadshot } = headshots.reduce(
      (closest, headshot) => {
        const [headshotX, headshotY] = headshot.coordinates;

        const distance = {
          x: Math.abs(mouseX - headshotX),
          y: Math.abs(mouseY - headshotY),
        };

        const equalY = distance.y === closest.distance.y;
        const closerY = distance.y < closest.distance.y;
        const closerX = distance.x < closest.distance.x;

        return closerY || (equalY && closerX)
          ? { distance, headshot }
          : closest;
      },
      {
        distance: {
          x: Infinity,
          y: Infinity,
        },
        headshot: headshots[0],
      }
    );

    setTransform(closestHeadshot.transform);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.addEventListener("mousemove", changeHeadshot);
      window.addEventListener("touchstart", changeHeadshot);
      window.addEventListener("touchmove", changeHeadshot);
    }

    return () => {
      window.removeEventListener("mousemove", changeHeadshot);
      window.removeEventListener("touchstart", changeHeadshot);
      window.removeEventListener("touchmove", changeHeadshot);
    };
  }, [loaded, changeHeadshot]);

  return (
    <div {...properties}>
      <div className="mx-auto max-w-[50vw] -mb-8">
        <div className="overflow-hidden">
          <div
            className="relative w-full pb-[133.3333%] -m-1"
            ref={headshotsRef}
          >
            {!loaded && (
              <Image
                src={previewImage}
                alt="Photo of Greg Ives"
                className="absolute top-0 left-0 w-[700%] max-w-none mix-blend-hard-light dark:contrast-0 dark:mix-blend-luminosity"
                style={{
                  transform,
                }}
                priority
                sizes="(min-width: 768px) 233.3333vw, 350vw"
              />
            )}
            <Image
              src={fullImage}
              alt="Photo of Greg Ives"
              className="absolute top-0 left-0 w-[700%] max-w-none mix-blend-hard-light dark:contrast-0 dark:mix-blend-luminosity"
              style={{
                transform,
                visibility: loaded ? "visible" : "hidden",
              }}
              onLoad={() => setLoaded(true)}
              sizes="(min-width: 768px) 233.3333vw, 350vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const headshots: Headshot[] = [
  {
    coordinates: [-10, -5],
    transform: `translate(0, 0)`,
  },
  {
    coordinates: [-11, 0],
    transform: `translate(-${100 / 7}%, 0)`,
  },
  {
    coordinates: [-15, 3],
    transform: `translate(-${200 / 7}%, 0)`,
  },
  {
    coordinates: [-17, -5],
    transform: `translate(-${300 / 7}%, 0)`,
  },
  {
    coordinates: [-18, 0],
    transform: `translate(-${400 / 7}%, 0)`,
  },
  {
    coordinates: [-1, 3],
    transform: `translate(-${500 / 7}%, 0)`,
  },
  {
    coordinates: [-20, 6],
    transform: `translate(0, -${100 / 4}%)`,
  },
  {
    coordinates: [-23, 3],
    transform: `translate(-${100 / 7}%, -${100 / 4}%)`,
  },
  {
    coordinates: [-2, -5],
    transform: `translate(-${200 / 7}%, -${100 / 4}%)`,
  },
  {
    coordinates: [-3, 0],
    transform: `translate(-${300 / 7}%, -${100 / 4}%)`,
  },
  {
    coordinates: [-5, -5],
    transform: `translate(-${400 / 7}%, -${100 / 4}%)`,
  },
  {
    coordinates: [-7, 6],
    transform: `translate(-${500 / 7}%, -${100 / 4}%)`,
  },
  {
    coordinates: [-9, 3],
    transform: `translate(0, -${200 / 4}%)`,
  },
  {
    coordinates: [0, 6],
    transform: `translate(-${100 / 7}%, -${200 / 4}%)`,
  },
  {
    coordinates: [10, -5],
    transform: `translate(-${200 / 7}%, -${200 / 4}%)`,
  },
  {
    coordinates: [12, 0],
    transform: `translate(-${300 / 7}%, -${200 / 4}%)`,
  },
  {
    coordinates: [14, 3],
    transform: `translate(-${400 / 7}%, -${200 / 4}%)`,
  },
  {
    coordinates: [14, 6],
    transform: `translate(-${500 / 7}%, -${200 / 4}%)`,
  },
  {
    coordinates: [2, -5],
    transform: `translate(0, -${300 / 4}%)`,
  },
  {
    coordinates: [2, 0],
    transform: `translate(-${100 / 7}%, -${300 / 4}%)`,
  },
  {
    coordinates: [4, 0],
    transform: `translate(-${200 / 7}%, -${300 / 4}%)`,
  },
  {
    transform: `translate(-${300 / 7}%, -${300 / 4}%)`,
    coordinates: [5, -5],
  },
  {
    transform: `translate(-${400 / 7}%, -${300 / 4}%)`,
    coordinates: [5, 3],
  },
  {
    transform: `translate(-${500 / 7}%, -${300 / 4}%)`,
    coordinates: [5, 6],
  },
  {
    coordinates: [8, 0],
    transform: `translate(-${600 / 7}%, 0)`,
  },
  {
    coordinates: [8, 3],
    transform: `translate(-${600 / 7}%, -${100 / 4}%)`,
  },
  {
    coordinates: [9, 6],
    transform: `translate(-${600 / 7}%, -${200 / 4}%)`,
  },
];
