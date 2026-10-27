import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Ruta de la Croqueta",
    short_name: "La Ruta",
    description: "Dónde comer croquetas, recetas e historia.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF7FA",
    theme_color: "#E9508A",
    lang: "es",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
