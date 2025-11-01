import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && prerender({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: [
        '/',
        '/om-oss',
        '/kontakt',
        '/losningar',
        '/losningar/smart-narvarohantering',
        '/losningar/intelligent-rykteshantering',
        '/losningar/social-media-automatisering',
        '/losningar/lokalt-seo',
        '/bransch/kliniker-vard',
        '/bransch/skonhetssalonger',
        '/bransch/butikskedjor',
        '/bransch/restauranger-cafeer',
        '/resultat',
        '/blogg'
      ],
      renderer: 'jsdom'
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://vllpaaomsmuhcngiikhf.supabase.co'),
    'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbHBhYW9tc211aGNuZ2lpa2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwODYzNDgsImV4cCI6MjA3NTY2MjM0OH0.vwOOzdWRobxq80j8aE7SpBeHbm_GMVD5J0QkVqk9ctE'),
    'import.meta.env.VITE_SUPABASE_PROJECT_ID': JSON.stringify('vllpaaomsmuhcngiikhf'),
  },
}));
