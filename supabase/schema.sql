-- aivergelijker.nl database schema
-- Uitvoeren via: Supabase Dashboard > SQL Editor

CREATE TABLE tools (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  naam          text NOT NULL,
  tagline       text NOT NULL,
  beschrijving  text NOT NULL,
  logo_url      text,
  website_url   text NOT NULL,
  affiliate_url text,
  categorie     text NOT NULL CHECK (categorie IN ('chatbot','afbeelding','video','coding','audio','productiviteit')),
  prijsmodel    text NOT NULL CHECK (prijsmodel IN ('gratis','freemium','betaald')),
  plannen       jsonb NOT NULL DEFAULT '[]',
  beoordeling   numeric(3,1) CHECK (beoordeling >= 0 AND beoordeling <= 5),
  uitgelicht    boolean NOT NULL DEFAULT false,
  badge         text,
  aangemaakt    timestamptz NOT NULL DEFAULT now(),
  bijgewerkt    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE klik_tracking (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_slug   text NOT NULL,
  tijdstip    timestamptz NOT NULL DEFAULT now(),
  referer     text,
  user_agent  text
);

CREATE TABLE nieuwsbrief (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text UNIQUE NOT NULL,
  aangemeld  timestamptz NOT NULL DEFAULT now(),
  bevestigd  boolean NOT NULL DEFAULT false
);

-- Index voor snelle categorie-queries
CREATE INDEX idx_tools_categorie ON tools(categorie);
CREATE INDEX idx_tools_uitgelicht ON tools(uitgelicht) WHERE uitgelicht = true;
CREATE INDEX idx_klik_tracking_slug ON klik_tracking(tool_slug);

-- Read-only toegang voor de frontend (anon key)
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tools leesbaar voor iedereen" ON tools FOR SELECT USING (true);

ALTER TABLE klik_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "klikken schrijfbaar voor iedereen" ON klik_tracking FOR INSERT WITH CHECK (true);

ALTER TABLE nieuwsbrief ENABLE ROW LEVEL SECURITY;
CREATE POLICY "nieuwsbrief schrijfbaar voor iedereen" ON nieuwsbrief FOR INSERT WITH CHECK (true);

-- Seed data: 20 tools
INSERT INTO tools (slug, naam, tagline, beschrijving, logo_url, website_url, affiliate_url, categorie, prijsmodel, plannen, beoordeling, uitgelicht, badge) VALUES

('chatgpt', 'ChatGPT', 'De bekendste AI-chatbot ter wereld', 'ChatGPT van OpenAI is de meest gebruikte AI-assistent. Je kunt er mee chatten, teksten schrijven, code debuggen, vragen beantwoorden en veel meer. De gratis versie biedt toegang tot GPT-4o mini, de Plus-versie geeft onbeperkte toegang tot GPT-4o inclusief DALL-E 3 beeldgeneratie.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png', 'https://chatgpt.com', null, 'chatbot', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["GPT-4o mini","40 berichten per dag","Basis beeldgeneratie"],"aanbevolen":false},{"naam":"Plus","prijs_mnd":22,"prijs_jaar":220,"functies":["GPT-4o onbeperkt","DALL-E 3","Geavanceerde analyse","Plugins"],"aanbevolen":true},{"naam":"Team","prijs_mnd":30,"prijs_jaar":300,"functies":["Alles van Plus","Workspace beheer","Geen trainingsdata"],"aanbevolen":false}]', 4.7, true, 'Populair'),

('claude', 'Claude', 'De slimste AI-assistent van Anthropic', 'Claude van Anthropic staat bekend om zijn lange contextvenster, nuance en veiligheid. Uitstekend voor het analyseren van lange documenten, schrijven van kwalitatieve teksten en complexe redenering. De gratis versie is al indrukwekkend.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/240px-Claude_AI_logo.svg.png', 'https://claude.ai', null, 'chatbot', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["Claude Sonnet","Beperkte berichten per dag","200K token context"],"aanbevolen":false},{"naam":"Pro","prijs_mnd":22,"prijs_jaar":220,"functies":["Claude Opus 4","5x meer gebruik","Projecten","Prioriteit toegang"],"aanbevolen":true}]', 4.6, true, 'Aanbevolen'),

('gemini', 'Gemini', 'Google''s krachtige multimodale AI', 'Gemini van Google combineert tekst, beeld en code in één model. Diep geïntegreerd met Google Workspace (Docs, Gmail, Drive). Ideaal als je al in het Google-ecosysteem werkt. Gemini Advanced biedt toegang tot het krachtigste model.', null, 'https://gemini.google.com', null, 'chatbot', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["Gemini 1.5 Flash","Google integraties","Beeldanalyse"],"aanbevolen":false},{"naam":"Advanced","prijs_mnd":22,"prijs_jaar":219,"functies":["Gemini 1.5 Ultra","Google One 2TB","Workspace AI"],"aanbevolen":true}]', 4.3, true, null),

('perplexity', 'Perplexity', 'AI-zoekmachine met live bronnen', 'Perplexity is een AI-zoekmachine die antwoorden geeft met directe bronvermeldingen. Perfect voor research en up-to-date informatie. Anders dan ChatGPT heeft het altijd toegang tot internet.', null, 'https://perplexity.ai', null, 'chatbot', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["Onbeperkt zoeken","Basis AI-modellen","Bronnenvermeldingen"],"aanbevolen":false},{"naam":"Pro","prijs_mnd":22,"prijs_jaar":200,"functies":["GPT-4o & Claude","Onbeperkte uploads","Geavanceerde analyse"],"aanbevolen":true}]', 4.4, false, null),

('copilot', 'Microsoft Copilot', 'AI van Microsoft gratis in Windows', 'Microsoft Copilot is gratis beschikbaar en gebouwd op GPT-4. Diep geïntegreerd in Windows 11, Edge en Microsoft 365. Ideaal voor gebruikers die al met Microsoft-producten werken.', null, 'https://copilot.microsoft.com', null, 'chatbot', 'gratis', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["GPT-4","Onbeperkt gebruik","Windows integratie","DALL-E beelden"],"aanbevolen":true}]', 4.0, false, null),

('midjourney', 'Midjourney', 'De gouden standaard voor AI-kunst', 'Midjourney produceert de mooiste en meest artistieke AI-afbeeldingen. Gebruikt via Discord of de eigen website. Geen gratis tier, maar de kwaliteit rechtvaardigt de prijs. Populair bij designers, marketeers en creatieven.', null, 'https://midjourney.com', null, 'afbeelding', 'betaald', '[{"naam":"Basic","prijs_mnd":12,"prijs_jaar":96,"functies":["200 afbeeldingen per maand","Persoonlijk gebruik"],"aanbevolen":false},{"naam":"Standard","prijs_mnd":30,"prijs_jaar":288,"functies":["Onbeperkt relaxed","15u fast GPU","Commercieel gebruik"],"aanbevolen":true},{"naam":"Pro","prijs_mnd":60,"prijs_jaar":576,"functies":["Alles van Standard","30u fast GPU","Stealth modus"],"aanbevolen":false}]', 4.8, true, 'Populair'),

('dall-e', 'DALL-E 3', 'OpenAI''s afbeeldingsgenerator', 'DALL-E 3 is beschikbaar via ChatGPT en de OpenAI API. Uitstekend in het begrijpen van gedetailleerde omschrijvingen en het genereren van fotorealistische beelden. Ingebouwd in ChatGPT Plus.', null, 'https://openai.com/dall-e-3', null, 'afbeelding', 'freemium', '[{"naam":"Via ChatGPT Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["Beperkte generaties","Lagere kwaliteit"],"aanbevolen":false},{"naam":"Via ChatGPT Plus","prijs_mnd":22,"prijs_jaar":220,"functies":["Hogere kwaliteit","Meer generaties","HD modus"],"aanbevolen":true}]', 4.2, false, null),

('adobe-firefly', 'Adobe Firefly', 'AI-beelden veilig voor commercieel gebruik', 'Adobe Firefly is getraind op gelicenseerde content, waardoor alle gegenereerde beelden veilig zijn voor commercieel gebruik. Ingebouwd in Photoshop en Illustrator. Ideaal voor professionals die rechtszeker willen werken.', null, 'https://firefly.adobe.com', null, 'afbeelding', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["25 generaties per maand","Watermark"],"aanbevolen":false},{"naam":"Premium","prijs_mnd":5,"prijs_jaar":50,"functies":["100 generaties","Geen watermark","Alle functies"],"aanbevolen":true}]', 4.1, false, null),

('ideogram', 'Ideogram', 'AI-afbeeldingen met perfecte tekst', 'Ideogram is de beste AI-tool voor afbeeldingen met leesbare tekst erin. Waar andere tools struikelen over letters en woorden, presteert Ideogram uitstekend. Populair voor posters, social media en marketing.', null, 'https://ideogram.ai', null, 'afbeelding', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["10 generaties per dag","Publiek"],"aanbevolen":false},{"naam":"Basic","prijs_mnd":8,"prijs_jaar":80,"functies":["400 generaties per maand","Privé","Prioriteit"],"aanbevolen":true}]', 4.3, false, 'Nieuw'),

('stable-diffusion', 'Stable Diffusion', 'Open-source AI-beeldgenerator', 'Stable Diffusion is volledig gratis en open-source. Je kunt het lokaal draaien of via platforms als Automatic1111. Maximale controle en aanpasbaarheid, maar vereist technische kennis. Via Stability.ai ook online beschikbaar.', null, 'https://stability.ai', null, 'afbeelding', 'gratis', '[{"naam":"Open-source","prijs_mnd":0,"prijs_jaar":0,"functies":["Volledig gratis","Lokaal draaien","Onbeperkt gebruik","Community modellen"],"aanbevolen":true}]', 4.0, false, null),

('runway', 'Runway Gen-3', 'Professionele AI-videobewerking', 'Runway is de favoriete AI-videotool van professionals. Gen-3 Alpha genereert indrukwekkende video''s van tekst of afbeeldingen. Breed gebruikt in de filmindustrie en reclamewereld.', null, 'https://runwayml.com', null, 'video', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["125 credits","720p export","Watermark"],"aanbevolen":false},{"naam":"Standard","prijs_mnd":15,"prijs_jaar":144,"functies":["625 credits per maand","1080p","Geen watermark"],"aanbevolen":true},{"naam":"Pro","prijs_mnd":35,"prijs_jaar":336,"functies":["2250 credits","4K","Commercieel gebruik"],"aanbevolen":false}]', 4.5, true, null),

('sora', 'Sora', 'OpenAI''s hyperrealistische videogenerator', 'Sora van OpenAI genereert tot 20 seconden hyperrealistische video van een tekstbeschrijving. Beschikbaar voor ChatGPT Plus en Pro abonnees. Baanbrekend in kwaliteit maar nog in vroege fase.', null, 'https://sora.com', null, 'video', 'betaald', '[{"naam":"Via ChatGPT Plus","prijs_mnd":22,"prijs_jaar":220,"functies":["50 video''s per maand","480p","5 seconden max"],"aanbevolen":false},{"naam":"Via ChatGPT Pro","prijs_mnd":220,"prijs_jaar":2200,"functies":["500 video''s per maand","1080p","20 seconden max"],"aanbevolen":true}]', 4.4, false, 'Nieuw'),

('kling', 'Kling AI', 'Krachtige Chinese AI-videogenerator', 'Kling van Kuaishou is een snel opkomende concurrent van Sora en Runway. Genereert indrukwekkende video''s met een royaal gratis tier. Populair vanwege de combinatie van kwaliteit en toegankelijkheid.', null, 'https://klingai.com', null, 'video', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["166 credits per maand","720p","5 seconden"],"aanbevolen":false},{"naam":"Pro","prijs_mnd":35,"prijs_jaar":299,"functies":["3000 credits","1080p","2 minuten video"],"aanbevolen":true}]', 4.2, false, null),

('cursor', 'Cursor', 'De AI-code-editor voor developers', 'Cursor is een fork van VS Code met diepgaande AI-integratie. Je kunt code genereren, debuggen en refactoren met natuurlijke taal. Begrijpt je hele codebase en geeft contextbewuste suggesties. De favoriet van veel professionele developers.', null, 'https://cursor.com', null, 'coding', 'freemium', '[{"naam":"Hobby","prijs_mnd":0,"prijs_jaar":0,"functies":["2000 completions","50 slow premium requests","VS Code fork"],"aanbevolen":false},{"naam":"Pro","prijs_mnd":20,"prijs_jaar":192,"functies":["Onbeperkte completions","500 premium requests","Snellere modellen"],"aanbevolen":true}]', 4.7, true, 'Aanbevolen'),

('github-copilot', 'GitHub Copilot', 'AI-assistent ingebouwd in je IDE', 'GitHub Copilot integreert in VS Code, JetBrains en meer. Genereert code suggesties terwijl je typt en beantwoordt vragen over je code. Gekoppeld aan je GitHub account en repository context.', null, 'https://github.com/features/copilot', null, 'coding', 'betaald', '[{"naam":"Individual","prijs_mnd":10,"prijs_jaar":100,"functies":["Onbeperkte suggesties","Chat","CLI integratie"],"aanbevolen":true},{"naam":"Business","prijs_mnd":19,"prijs_jaar":228,"functies":["Alles van Individual","Teambeleid","Audit logs"],"aanbevolen":false}]', 4.3, false, null),

('elevenlabs', 'ElevenLabs', 'Meest realistische AI-stemmen', 'ElevenLabs maakt de meest overtuigende AI-stemmen beschikbaar. Je kunt elke tekst omzetten naar spraak, bestaande stemmen klonen of je eigen stem aanmaken. Gebruikt door podcasters, YouTubers en app-ontwikkelaars.', null, 'https://elevenlabs.io', null, 'audio', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["10.000 tekens per maand","3 aangepaste stemmen"],"aanbevolen":false},{"naam":"Starter","prijs_mnd":5,"prijs_jaar":50,"functies":["30.000 tekens","10 stemmen","Commercieel gebruik"],"aanbevolen":true},{"naam":"Creator","prijs_mnd":22,"prijs_jaar":220,"functies":["100.000 tekens","Professionele kloning"],"aanbevolen":false}]', 4.6, false, null),

('suno', 'Suno', 'Volledige nummers genereren met AI', 'Suno genereert complete liedjes — inclusief zang, instrumenten en productie — van een simpele tekstomschrijving. Baanbrekend voor iedereen die muziek wil maken zonder muzikale achtergrond. Enorm populair op sociale media.', null, 'https://suno.com', null, 'audio', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["50 credits per dag","Niet-commercieel","2 nummers tegelijk"],"aanbevolen":false},{"naam":"Pro","prijs_mnd":10,"prijs_jaar":96,"functies":["2500 credits per maand","Commercieel gebruik","Geen wachtrij"],"aanbevolen":true}]', 4.4, false, 'Populair'),

('notion-ai', 'Notion AI', 'AI ingebouwd in je werkruimte', 'Notion AI voegt AI-functies toe aan Notion: tekst schrijven, samenvatten, vertalen, actiepunten extraheren en meer. Ideaal als je Notion al gebruikt voor notities, projectbeheer of documentatie.', null, 'https://notion.so/product/ai', null, 'productiviteit', 'betaald', '[{"naam":"Notion AI add-on","prijs_mnd":10,"prijs_jaar":96,"functies":["Onbeperkte AI-gebruik","Alle Notion functies","Team samenwerking"],"aanbevolen":true}]', 4.2, false, null),

('gamma', 'Gamma', 'Presentaties maken met AI', 'Gamma maakt in seconden professionele presentaties, documenten en websites van een prompt of bestaande tekst. Geen PowerPoint kennis nodig. Populair bij studenten, ondernemers en sales-teams.', null, 'https://gamma.app', null, 'productiviteit', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["400 AI-credits","Onbeperkte weergaven","Gamma-branding"],"aanbevolen":false},{"naam":"Plus","prijs_mnd":10,"prijs_jaar":96,"functies":["Onbeperkte AI-gebruik","Geen branding","Aangepaste domeinen"],"aanbevolen":true}]', 4.3, false, null),

('windsurf', 'Windsurf', 'AI-code-editor met diep contextbegrip', 'Windsurf (voorheen Codeium) is een krachtig alternatief voor Cursor met een eigen AI-engine genaamd Cascade. Begrijpt je gehele codebase en kan meerdere bestanden tegelijk aanpassen. Royaal gratis tier.', null, 'https://windsurf.com', null, 'coding', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["Onbeperkte completions","25 Flow credits","Cascade toegang"],"aanbevolen":false},{"naam":"Pro","prijs_mnd":15,"prijs_jaar":144,"functies":["Onbeperkte completions","500 Flow credits","Geavanceerde modellen"],"aanbevolen":true}]', 4.5, false, 'Nieuw'),

('grok', 'Grok', 'xAI''s ongefiltreerde AI-chatbot', 'Grok van Elon Musk''s xAI is een AI-chatbot met realtime toegang tot X (Twitter). Staat bekend om directe, ongefiltreerde antwoorden en humoristische stijl. Beschikbaar voor X Premium+ abonnees en via de Grok-app.', null, 'https://grok.x.ai', null, 'chatbot', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["Grok-2 basis","10 berichten per uur","Beeldgeneratie"],"aanbevolen":false},{"naam":"Premium+","prijs_mnd":16,"prijs_jaar":168,"functies":["Grok-2 onbeperkt","Realtime X data","Geen wachtrij","Prioriteit toegang"],"aanbevolen":true},{"naam":"SuperGrok","prijs_mnd":30,"prijs_jaar":300,"functies":["Grok-3 toegang","Maximaal gebruik","Geavanceerde analyse"],"aanbevolen":false}]', 4.1, true, 'Nieuw'),

('claude-code', 'Claude Code', 'Anthropic''s AI coding agent in je terminal', 'Claude Code is een CLI-tool van Anthropic waarmee je hele projecten kunt bouwen, debuggen en refactoren via natuurlijke taal. Begrijpt je volledige codebase en kan zelfstandig bestanden aanmaken, bewerken en commando''s uitvoeren.', null, 'https://claude.ai/code', null, 'coding', 'betaald', '[{"naam":"Via Claude Pro","prijs_mnd":22,"prijs_jaar":220,"functies":["Sonnet-toegang","Basis usage","IDE integraties"],"aanbevolen":false},{"naam":"Via Claude Max","prijs_mnd":100,"prijs_jaar":1000,"functies":["Opus-toegang","5x meer gebruik","Onbeperkt code"],"aanbevolen":true}]', 4.8, true, 'Aanbevolen'),

('v0', 'v0', 'AI UI-builder van Vercel', 'v0 van Vercel genereert complete React-componenten en webpagina''s van een tekstomschrijving of screenshot. Produceert productie-klare code met Tailwind CSS en shadcn/ui. Ideaal voor prototyping en frontend development.', null, 'https://v0.dev', null, 'coding', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["200 berichten per maand","Basis generaties","Code export"],"aanbevolen":false},{"naam":"Premium","prijs_mnd":20,"prijs_jaar":200,"functies":["Onbeperkte berichten","Prioriteit","Geavanceerde modellen"],"aanbevolen":true}]', 4.4, false, 'Nieuw'),

('poe', 'Poe', 'Toegang tot alle AI-modellen in één app', 'Poe van Quora biedt toegang tot ChatGPT, Claude, Gemini, Llama en meer in één interface. Je kunt eigen bots maken en delen. Ideaal als je meerdere AI-modellen wilt vergelijken zonder overal apart te betalen.', null, 'https://poe.com', null, 'chatbot', 'freemium', '[{"naam":"Gratis","prijs_mnd":0,"prijs_jaar":0,"functies":["Dagelijkse credits","Meerdere modellen","Community bots"],"aanbevolen":false},{"naam":"Subscriber","prijs_mnd":20,"prijs_jaar":200,"functies":["Onbeperkt GPT-4o","Onbeperkt Claude","Hogere limieten","Eigen bots"],"aanbevolen":true}]', 4.2, false, null),

('jasper', 'Jasper', 'AI-platform voor marketing content', 'Jasper is het toonaangevende AI-platform voor marketingteams. Schrijf blogposts, social media content, advertentieteksten en meer in je eigen brand voice. Krachtige templates en team-samenwerking.', null, 'https://jasper.ai', null, 'productiviteit', 'betaald', '[{"naam":"Creator","prijs_mnd":49,"prijs_jaar":468,"functies":["1 brand voice","SEO modus","Afbeeldingsgeneratie","Browser extensie"],"aanbevolen":false},{"naam":"Pro","prijs_mnd":69,"prijs_jaar":660,"functies":["3 brand voices","Kennis assets","Campagne toolkit","Teamfuncties"],"aanbevolen":true}]', 4.0, false, null);
