import Nav from "@/components/Nav";
import Social from "@/components/Social";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <Social />
        {children}
      </body>
    </html>
  )
}
