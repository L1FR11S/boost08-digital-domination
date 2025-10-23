import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://xllsdlqptbrwjjinxgca.supabase.co'),
    'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbHNkbHFwdGJyd2pqaW54Z2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNzM0MTUsImV4cCI6MjA3Njc0OTQxNX0.0vUZutiU40hn9QtD8pJwlYooj22lU_7CS-PsASDJgjo'),
    'import.meta.env.VITE_SUPABASE_PROJECT_ID': JSON.stringify('xllsdlqptbrwjjinxgca'),
  },
}));
