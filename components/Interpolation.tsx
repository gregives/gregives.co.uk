"use client";

import { useState } from "react";

type InterpolationProperties = {
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

type HSL = [number, number, number];

export default function Interpolation({ step }: InterpolationProperties) {
  const [progress, setProgress] = useState(40);

  // TODO: Add inputs to change start and end colours
  const [[sH, sS, sL], setStart] = useState<HSL>([0, 100, 50]);
  const [[eH, eS, eL], setEnd] = useState<HSL>([120, 100, 50]);

  const interpolationClassName =
    step === 4
      ? "interpolation-animate"
      : step === 5
      ? "interpolation-animate-delay"
      : step === 6
      ? "interpolation-animate-multiple"
      : step === 7
      ? "interpolation-animate-variable"
      : "interpolation-variable";

  return (
    <div className="mb-8 last:mb-0">
      <div
        className={`w-full h-28 rounded-xl ${interpolationClassName}`}
        style={{
          // @ts-ignore
          "--s-h": sH,
          "--s-s": sS + "%",
          "--s-l": sL + "%",
          "--e-h": eH,
          "--e-s": eS + "%",
          "--e-l": eL + "%",
          "--progress": progress,
        }}
      />
      {step !== 4 && (
        <div className="-mt-8 p-4 sm:px-6 bg-slate-200 rounded-b-xl">
          <label className="flex text-sm">
            Progress
            <input
              type="range"
              min="0"
              max="100"
              defaultValue={progress}
              onChange={(event) =>
                setProgress(parseInt(event.target.value, 10))
              }
              className="flex-grow ml-4"
            />
          </label>
        </div>
      )}
    </div>
  );
}
