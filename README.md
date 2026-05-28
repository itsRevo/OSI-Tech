# OSI-Tech

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the Next.js development server:
   `npm run dev`

The app runs on <http://localhost:3000>.

## Admin Preisverwaltung

Es gibt eine responsive Admin-Seite unter `http://localhost:3000/admin` mit Login,
direkt editierbaren Preisen, CRUD-Funktionen und Speichern über Supabase.

### 1) Umgebungsvariablen

1. `.env.example` nach `.env.local` kopieren
2. Werte setzen:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 2) Datenbank-Tabelle anlegen

Führe das SQL aus `docs/supabase-pricing-schema.sql` in deinem Supabase SQL Editor aus.

### 3) Was enthalten ist

- Sicheres Admin-Login mit signiertem HttpOnly-Cookie
- Dynamische Preisverwaltung (anlegen, bearbeiten, löschen, Status aktiv/inaktiv)
- Optionales Auto-Save + manuelles Speichern
- Öffentliche Preisseite lädt Preise aus der Datenbank (`/api/pricing`) mit Fallback
