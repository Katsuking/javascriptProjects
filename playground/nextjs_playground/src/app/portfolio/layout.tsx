import Footer from "@/components/Portfolio/Footer";
import Navbar from "@/components/Portfolio/Navbar/navbar";
import SessionProvider from "@/components/Portfolio/SessionProvicer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <SessionProvider>
          <Navbar />
          <main className="m-auto min-w-[300px] max-w-7xl p-4">
            <div>{children}</div>
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
