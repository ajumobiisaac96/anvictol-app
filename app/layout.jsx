import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Anvictol Integrated Services | Industrial Maintenance & Operations",
  description:
    "Expert maintenance, factory operations, and conveyor cleaning services for sustainable industrial performance.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  generator: "v0.app",
};

export default function RootLayout({ children }) {
  const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  const shouldLoadCrisp =
    crispWebsiteId && crispWebsiteId !== "YOUR_CRISP_WEBSITE_ID";

  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased`}>
        {children}
        <Toaster />

        {shouldLoadCrisp && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.$crisp = [];
                window.CRISP_WEBSITE_ID = "${crispWebsiteId}";
                (function () {
                  var d = document;
                  var s = d.createElement("script");
                  s.src = "https://client.crisp.chat/l.js";
                  s.async = 1;
                  d.getElementsByTagName("head")[0].appendChild(s);
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
