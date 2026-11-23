import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/content";
import { interDisplay } from "@/lib/og-font";

export const alt = `${PROFILE.name}. ${PROFILE.headline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "InterDisplay",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 430,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 430,
            display: "flex",
            backgroundImage:
              "linear-gradient(to bottom, rgba(9,9,11,0) 0%, #09090b 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            display: "flex",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 28, fontWeight: 600 }}>{PROFILE.handle}</span>
            <span
              style={{
                marginLeft: 4,
                fontSize: 24,
                color: "#a1a1aa",
                letterSpacing: "-0.02em",
              }}
            >
              {PROFILE.tld}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              color: "#a1a1aa",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#34d399",
              }}
            />
            {PROFILE.availabilityBadge}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              fontSize: 76,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
            }}
          >
            {PROFILE.headline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 860,
              fontSize: 25,
              lineHeight: 1.4,
              color: "#a1a1aa",
              letterSpacing: "-0.01em",
            }}
          >
            {PROFILE.subheadline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid #27272a",
            paddingTop: 24,
            fontSize: 17,
            color: "#71717a",
            letterSpacing: "0.08em",
          }}
        >
          <span>{PROFILE.email}</span>
          <span>{PROFILE.handle}{PROFILE.tld}</span>
        </div>
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
