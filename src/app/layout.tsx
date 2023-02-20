import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased bg-primary text-secondary h-screen flex">
        <div className="flex flex-1 max-w-3xl md:my-10 mx-auto p-[0.05rem] rounded-b-xl md:rounded-xl">
          <main className="flex flex-1 bg-gradient-to-b from-[#626A88]/10 to-[#2E3149]/10 md:rounded-xl p-2">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
