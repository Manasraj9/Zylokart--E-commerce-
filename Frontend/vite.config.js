import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure the port matches your request
    strictPort: true, // Prevent port fallback
    https: false, // Ensure HTTP is used
    open: true, // Auto-open browser on start
  },
})

