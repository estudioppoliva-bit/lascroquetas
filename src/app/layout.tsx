import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.larutadelacroqueta.com"),
  title: {
    default: "La Ruta de la Croqueta",
    template: "%s · La Ruta de la Croqueta",
  },
  description:
    "Dónde comer croquetas en Miami y en todo EE.UU.: lugares con su evaluación, recetas de 11 estilos del mundo y la historia de la croqueta.",
  applicationName: "La Ruta de la Croqueta",
};

export const viewport: Viewport = {
  themeColor: "#E9508A",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap"
        />
      </head>
      <body>
        {children}
        <footer className="pie">
          <div className="contenedor pie-fila">
            <span>
              <strong>larutadelacroqueta.com</strong> · también en lascroquetas.com
            </span>
            <span>Evaluaciones de Google y de la comunidad de la Ruta</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
