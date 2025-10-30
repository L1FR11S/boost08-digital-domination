-- Drop old form builder tables
DROP TABLE IF EXISTS public.form_submissions CASCADE;
DROP TABLE IF EXISTS public.email_templates CASCADE;
DROP TABLE IF EXISTS public.custom_forms CASCADE;

-- Create new email_templates table
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key TEXT UNIQUE NOT NULL,
  template_name TEXT NOT NULL,
  description TEXT,
  
  -- Email settings
  from_name TEXT NOT NULL DEFAULT 'Boost08',
  from_email TEXT NOT NULL DEFAULT 'noreply@boost08.com',
  reply_to TEXT,
  subject TEXT NOT NULL,
  
  -- Content
  html_body TEXT NOT NULL,
  preview_text TEXT,
  
  -- Metadata
  available_placeholders JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage email templates"
  ON public.email_templates
  FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Insert initial email templates
INSERT INTO public.email_templates (template_key, template_name, description, subject, html_body, available_placeholders) VALUES
(
  'blog_notification',
  'Blogginlägg Notifikation',
  'Skickas när AI skapar ett nytt blogginlägg',
  '🤖 Nytt AI-genererat blogginlägg: {{postTitle}}',
  '<!DOCTYPE html><html><head><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f6f9fc;margin:0;padding:20px}.container{max-width:600px;margin:0 auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:30px;text-align:center;color:white}.header h1{margin:0;font-size:24px}.content{padding:30px}.status-badge{display:inline-block;padding:8px 16px;border-radius:20px;font-weight:600;font-size:14px;margin-bottom:20px}.status-published{background:#d4edda;color:#155724}.status-draft{background:#fff3cd;color:#856404}.details-box{background:#f8f9fa;border-left:4px solid #667eea;padding:20px;margin:20px 0;border-radius:4px}.details-box h2{margin-top:0;color:#333;font-size:18px}.details-box p{margin:8px 0;color:#666}.button{display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-decoration:none;border-radius:6px;font-weight:600;margin:20px 0}.tips{background:#e3f2fd;border-radius:6px;padding:20px;margin-top:30px}.tips h3{margin-top:0;color:#1976d2}.tips ul{margin:10px 0;padding-left:20px}.tips li{margin:8px 0;color:#555}.footer{text-align:center;padding:20px;color:#999;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>🤖 Nytt Blogginlägg Skapat!</h1></div><div class="content"><span class="status-badge {{statusClass}}">{{statusText}}</span><div class="details-box"><h2>📄 Inlägg Detaljer</h2><p><strong>Titel:</strong> {{postTitle}}</p><p><strong>Ämne:</strong> {{topic}}</p><p><strong>ID:</strong> {{postId}}</p></div><a href="{{actionUrl}}" class="button">{{actionText}} →</a><div class="tips"><h3>💡 Tips</h3><ul><li>Kolla att AI:n använt rätt tonalitet för din målgrupp</li><li>Verifiera att nyckelord är naturligt integrerade</li><li>Se till att exempel och citat är relevanta</li><li>Kontrollera att CTA:n matchar inläggets syfte</li></ul></div></div><div class="footer">Detta är ett automatiskt meddelande från Boost08</div></div></body></html>',
  '["{{postTitle}}", "{{postSlug}}", "{{postId}}", "{{postUrl}}", "{{editUrl}}", "{{topic}}", "{{wasAutoPublished}}", "{{statusText}}", "{{statusClass}}", "{{actionText}}", "{{actionUrl}}"]'
),
(
  'blog_lead',
  'Blog Lead Magnet',
  'Skickas när någon laddar ner en guide från bloggen',
  '📚 Din guide är här!',
  '<!DOCTYPE html><html><head><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f6f9fc;margin:0;padding:20px}.container{max-width:600px;margin:0 auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px;text-align:center;color:white}.header h1{margin:0 0 10px 0;font-size:28px}.header p{margin:0;opacity:0.9}.content{padding:30px}.greeting{font-size:18px;color:#333;margin-bottom:20px}.download-box{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:10px;padding:30px;text-align:center;margin:20px 0}.download-box h2{color:white;margin:0 0 20px 0}.button{display:inline-block;padding:14px 28px;background:white;color:#667eea;text-decoration:none;border-radius:6px;font-weight:600}.value-section{margin-top:30px}.value-section h3{color:#333;font-size:18px}.value-section ul{padding-left:20px}.value-section li{margin:10px 0;color:#666}.cta-box{background:#f8f9fa;border-radius:6px;padding:20px;margin-top:30px;text-align:center}.cta-box p{margin:0 0 15px 0;color:#666}.cta-button{display:inline-block;padding:12px 24px;background:#667eea;color:white;text-decoration:none;border-radius:6px;font-weight:600}.footer{text-align:center;padding:20px;color:#999;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>📚 Tack för ditt intresse!</h1><p>Din guide är redo att ladda ner</p></div><div class="content"><p class="greeting">Hej {{name}}!</p><p>Tack för att du vill lära dig mer om lokal SEO. Vi har förberett en omfattande guide som hjälper dig att förbättra din synlighet online.</p><div class="download-box"><h2>📥 Ladda ner din guide</h2><a href="{{downloadUrl}}" class="button">Ladda ner nu →</a></div><div class="value-section"><h3>I guiden lär du dig:</h3><ul><li>Hur du optimerar din Google My Business-profil</li><li>Lokala nyckelords-strategier som faktiskt fungerar</li><li>Så bygger du upp positiva recensioner</li><li>Tips för att ranka högre i lokala sökningar</li></ul></div><div class="cta-box"><p>Vill du ha hjälp med att implementera dessa strategier?</p><a href="https://boost08.com/contact" class="cta-button">Boka ett kostnadsfritt samtal</a></div></div><div class="footer">Boost08 - Din partner för lokal digital marknadsföring</div></div></body></html>',
  '["{{name}}", "{{email}}", "{{company}}", "{{downloadUrl}}"]'
),
(
  'contact',
  'Kontaktformulär Bekräftelse',
  'Skickas när någon kontaktar er via kontaktformuläret',
  'Tack för att du kontaktat oss!',
  '<!DOCTYPE html><html><head><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f6f9fc;margin:0;padding:20px}.container{max-width:600px;margin:0 auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:30px;text-align:center;color:white}.header h1{margin:0;font-size:24px}.content{padding:30px}.content p{line-height:1.6;color:#666;margin:15px 0}.highlight{background:#f8f9fa;border-left:4px solid #667eea;padding:15px;margin:20px 0;border-radius:4px}.highlight strong{color:#333}.next-steps{background:#e3f2fd;border-radius:6px;padding:20px;margin:20px 0}.next-steps h3{margin-top:0;color:#1976d2}.next-steps ul{margin:10px 0;padding-left:20px}.next-steps li{margin:8px 0;color:#555}.footer{text-align:center;padding:20px;color:#999;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>✅ Vi har tagit emot ditt meddelande</h1></div><div class="content"><p>Hej {{name}}!</p><p>Tack för att du kontaktat Boost08. Vi har tagit emot ditt meddelande och kommer att återkomma till dig inom 24 timmar.</p><div class="highlight"><strong>Ditt meddelande:</strong><br>{{message}}</div><div class="next-steps"><h3>Vad händer nu?</h3><ul><li>En av våra specialister granskar ditt ärende</li><li>Vi återkommer med en skräddarsydd lösning</li><li>Du får hjälp med att nå dina digitala mål</li></ul></div><p>Behöver du akut hjälp? Ring oss på <strong>08-123 456 78</strong></p></div><div class="footer">Boost08 - Din partner för lokal digital marknadsföring</div></div></body></html>',
  '["{{name}}", "{{email}}", "{{company}}", "{{message}}"]'
),
(
  'roi_calculator',
  'ROI-rapport',
  'Skickas när någon använder ROI-kalkylatorn',
  '📊 Din personliga ROI-rapport från Boost08',
  '<!DOCTYPE html><html><head><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f6f9fc;margin:0;padding:20px}.container{max-width:600px;margin:0 auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:30px;text-align:center;color:white}.header h1{margin:0 0 10px 0;font-size:24px}.content{padding:30px}.stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:20px 0}.stat-card{background:#f8f9fa;padding:20px;border-radius:8px;text-align:center}.stat-card .label{color:#666;font-size:12px;text-transform:uppercase;margin-bottom:8px}.stat-card .value{color:#667eea;font-size:24px;font-weight:bold}.roi-highlight{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;border-radius:10px;text-align:center;margin:20px 0}.roi-highlight h2{margin:0 0 10px 0;font-size:32px}.roi-highlight p{margin:0;opacity:0.9}.cta-box{background:#e3f2fd;border-radius:6px;padding:20px;margin-top:30px;text-align:center}.cta-box p{margin:0 0 15px 0;color:#666}.button{display:inline-block;padding:14px 28px;background:#667eea;color:white;text-decoration:none;border-radius:6px;font-weight:600}.footer{text-align:center;padding:20px;color:#999;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>📊 Din ROI-rapport är klar!</h1><p>Se vilken potential som finns för {{company}}</p></div><div class="content"><p>Hej {{name}}!</p><p>Baserat på dina uppgifter har vi beräknat potentialen för {{company}}:</p><div class="stats-grid"><div class="stat-card"><div class="label">Nuvarande Omsättning</div><div class="value">{{revenue}} kr</div></div><div class="stat-card"><div class="label">Nya Kunder/Månad</div><div class="value">{{newCustomers}}</div></div><div class="stat-card"><div class="label">Antal Platser</div><div class="value">{{locations}}</div></div><div class="stat-card"><div class="label">Recensioner</div><div class="value">{{reviews}}</div></div></div><div class="roi-highlight"><h2>+{{estimatedIncrease}}%</h2><p>Uppskattad ökning i synlighet och kundflöde</p></div><p>Med rätt strategi för lokal SEO, recensionshantering och digital närvaro kan du öka din synlighet markant och attrahera fler kunder.</p><div class="cta-box"><p>Vill du veta exakt hur vi kan hjälpa {{company}}?</p><a href="https://boost08.com/contact" class="button">Boka strategisamtal →</a></div></div><div class="footer">Boost08 - Din partner för lokal digital marknadsföring</div></div></body></html>',
  '["{{name}}", "{{email}}", "{{company}}", "{{phone}}", "{{industry}}", "{{revenue}}", "{{newCustomers}}", "{{estimatedIncrease}}", "{{locations}}", "{{reviews}}"]'
),
(
  'free_trial',
  'Kostnadsfri provperiod',
  'Skickas när någon startar en kostnadsfri provperiod',
  '🎉 Välkommen till din kostnadsfria provperiod!',
  '<!DOCTYPE html><html><head><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f6f9fc;margin:0;padding:20px}.container{max-width:600px;margin:0 auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px;text-align:center;color:white}.header h1{margin:0 0 10px 0;font-size:28px}.header .emoji{font-size:48px;margin-bottom:10px}.content{padding:30px}.welcome-box{background:#f8f9fa;border-left:4px solid #667eea;padding:20px;margin:20px 0;border-radius:4px}.welcome-box p{margin:8px 0;color:#666}.welcome-box strong{color:#333}.timeline{margin:30px 0}.timeline-item{display:flex;margin:20px 0}.timeline-item .icon{width:40px;height:40px;background:#667eea;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;flex-shrink:0}.timeline-item .content{margin-left:15px;flex:1}.timeline-item h4{margin:0 0 5px 0;color:#333}.timeline-item p{margin:0;color:#666;font-size:14px}.cta-box{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;border-radius:10px;text-align:center;margin:30px 0}.cta-box h3{margin:0 0 15px 0}.cta-box p{margin:0 0 20px 0;opacity:0.9}.button{display:inline-block;padding:14px 28px;background:white;color:#667eea;text-decoration:none;border-radius:6px;font-weight:600}.footer{text-align:center;padding:20px;color:#999;font-size:12px}</style></head><body><div class="container"><div class="header"><div class="emoji">🎉</div><h1>Välkommen {{fullName}}!</h1><p>Din provperiod startar nu</p></div><div class="content"><p>Tack för att du valde Boost08! Vi är glada att få hjälpa {{companyName}} att växa inom {{industry}}-branschen.</p><div class="welcome-box"><p><strong>Ditt konto:</strong></p><p>Email: {{email}}</p><p>Telefon: {{phone}}</p><p>Antal platser: {{locations}}</p></div><div class="timeline"><div class="timeline-item"><div class="icon">1</div><div class="content"><h4>Idag - Välkommen!</h4><p>Din provperiod är aktiverad. Vi kontaktar dig inom 24 timmar.</p></div></div><div class="timeline-item"><div class="icon">2</div><div class="content"><h4>Dag 2-3 - Kick-off</h4><p>Vi går igenom din nuvarande digitala närvaro och sätter upp mål.</p></div></div><div class="timeline-item"><div class="icon">3</div><div class="content"><h4>Vecka 1-2 - Implementering</h4><p>Vi börjar optimera dina profiler och strategier.</p></div></div><div class="timeline-item"><div class="icon">4</div><div class="content"><h4>Vecka 3-4 - Resultat</h4><p>Du börjar se förbättrad synlighet och fler kundkontakter.</p></div></div></div><div class="cta-box"><h3>Redo att komma igång?</h3><p>Boka ett kick-off-möte med oss idag</p><a href="https://boost08.com/contact" class="button">Boka möte →</a></div><p>Har du frågor? Svara på detta mail eller ring oss på <strong>08-123 456 78</strong></p></div><div class="footer">Boost08 - Din partner för lokal digital marknadsföring</div></div></body></html>',
  '["{{fullName}}", "{{email}}", "{{companyName}}", "{{phone}}", "{{locations}}", "{{industry}}"]'
);