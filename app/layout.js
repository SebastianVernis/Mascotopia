import './globals.css'

export const metadata = {
  title: 'Mascotopia - Tu tienda de mascotas',
  description: 'Los mejores productos para tus mascotas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
