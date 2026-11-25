import "./globals.css";

export const metadata = {
  title: "Погода",
  description: "Погода в любом городе на Next.js и Open-Meteo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
