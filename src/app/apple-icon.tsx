import { ImageResponse } from "next/og";
import { interDisplay } from "@/lib/og-font";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111114",
          color: "#fafafa",
          fontFamily: "InterDisplay",
          fontSize: 112,
          fontWeight: 600,
          letterSpacing: "-0.06em",
          border: "1px solid rgba(250,250,250,0.14)",
        }}
      >
        e.
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "InterDisplay",
          data: interDisplay,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
