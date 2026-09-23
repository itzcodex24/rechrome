import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const alt = "ReChrome - Download Old Chrome Versions"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const VERSIONS = ["126.0.6478", "125.0.6422", "124.0.6367", "123.0.6312", "122.0.6261"]

export default async function Image() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/SpaceMono-Regular.ttf")),
    readFile(join(process.cwd(), "app/fonts/SpaceMono-Bold.ttf")),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#d8d8d8",
          fontFamily: "Space Mono",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "60px 80px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 24, color: "#3dde7a", letterSpacing: "0.06em" }}>
            <span>~/rechrome</span>
            <div style={{ width: 14, height: 26, background: "#3dde7a" }} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 36,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            <span>Every Chrome version.</span>
            <span style={{ color: "#3dde7a", marginTop: 12 }}>One click away.</span>
          </div>

          <div style={{ marginTop: 32, fontSize: 24, color: "#888888" }}>
            The complete Chromium archive for every platform.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 80px 40px" }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>ReChrome</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 22,
                color: "#888888",
                border: "1px solid #2a2a2a",
                padding: "10px 18px",
                letterSpacing: "0.1em",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#3dde7a" }} />
              OPEN SOURCE
            </div>
          </div>

          <div
            style={{
              display: "flex",
              background: "#111111",
              borderTop: "1px solid #1e1e1e",
              padding: "16px 0",
              fontSize: 20,
              color: "#555555",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {VERSIONS.map((v) => (
              <div key={v} style={{ display: "flex", padding: "0 28px", borderRight: "1px solid #1e1e1e" }}>
                <span style={{ color: "#888888" }}>{v}</span>
                <span>.___ ///</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Mono", data: regular, weight: 400, style: "normal" },
        { name: "Space Mono", data: bold, weight: 700, style: "normal" },
      ],
    },
  )
}
