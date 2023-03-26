import "./globals.css";

export const metadata = {
  title: "Matchi",
  description: "Play matchi with your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className="antialiased bg-primary 
      text-secondary h-screen flex
        flex-1 max-w-3xl md:p-10 mx-auto p-[0.05rem] 
        rounded-b-xl md:rounded-xl"
      >
        <main
          className="flex flex-1 
            bg-gradient-to-b from-[#626A88]/10 to-[#2E3149]/10 
            md:rounded-xl p-2"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
