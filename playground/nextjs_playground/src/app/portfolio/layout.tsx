export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main className="m-auto min-w-[300px] max-w-7xl p-4">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
