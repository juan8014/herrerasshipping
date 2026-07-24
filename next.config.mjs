/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configuración para producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuración para manejo de errores durante el build
  eslint: {
    ignoreDuringBuilds: process.env.CI !== 'true',
  },
  typescript: {
    ignoreBuildErrors: process.env.CI !== 'true',
  },
}

export default nextConfig
