import '@/app/globals.css';
import {Providers} from "@/app/providers";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <Providers>
            <body className={` antialiased`}>{children}</body>
        </Providers>
      </html>
  );
}