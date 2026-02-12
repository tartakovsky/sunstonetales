import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sunstone Tales",
    short_name: "Sunstone",
    description:
      "Bedtime stories where real feelings meet real adventures. Stories for ages 3-7, read aloud together.",
    start_url: "/ru/stories",
    display: "standalone",
    background_color: "#1a1714",
    theme_color: "#1a1714",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
