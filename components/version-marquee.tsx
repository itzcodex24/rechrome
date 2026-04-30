"use client"

const VERSIONS = [
  "126.0.6478", "125.0.6422", "124.0.6367", "123.0.6312",
  "122.0.6261", "121.0.6167", "120.0.6099", "119.0.6045",
  "118.0.5993", "117.0.5938", "116.0.5845", "115.0.5790",
  "114.0.5735", "113.0.5672", "112.0.5615", "111.0.5563",
  "110.0.5481", "109.0.5414", "108.0.5359", "107.0.5304",
]

export function VersionMarquee() {
  const doubled = [...VERSIONS, ...VERSIONS]

  return (
    <div className="border-b border-border overflow-hidden bg-card py-2">
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((v, i) => (
          <div
            key={i}
            className="text-[10px] text-dim tracking-[0.5px] px-5 border-r border-border shrink-0"
          >
            <span className="text-muted-foreground">{v}</span>
            {".___ ///"}
          </div>
        ))}
      </div>
    </div>
  )
}
