import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // We need this for React projects
import tailwindcss from '@tailwindcss/vite'; // This is the new Tailwind v4 plugin

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    return {
      // ADDED: The plugins array is where Vite, React, and Tailwind connect.
      plugins: [
        react(),
        tailwindcss(),
      ],

      // KEPT: Your existing environment variable configuration is preserved.
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      
      // KEPT: Your existing path alias configuration is preserved.
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});