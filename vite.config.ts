import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: true,         // Mengekspos server ke jaringan agar ngrok bisa mendeteksinya
    cors: true,         // Mengizinkan semua origin (mengatasi blokir CORS)
    allowedHosts: true, // Mengizinkan akses dari domain dinamis ngrok (penting di Vite versi terbaru)
  },
})