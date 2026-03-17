# DAX Framework

> Bibliothèque collaborative de mesures DAX pour Power BI.

Trouvez, comprenez et réutilisez des mesures DAX standards — avec un générateur de mesures personnalisées intégré.

---

## Stack technique

| Couche        | Technologie                        |
|---------------|------------------------------------|
| Frontend      | Next.js 14 (App Router) + TypeScript |
| Styling       | Tailwind CSS                       |
| Base de données | Supabase (PostgreSQL)             |
| Auth          | *(v2)* Microsoft Entra ID via NextAuth |
| Déploiement   | Vercel                             |

---

## Installation locale

### 1. Cloner le repo

```bash
git clone https://github.com/TON_USERNAME/dax-framework.git
cd dax-framework
npm install
```

### 2. Configurer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Va dans **SQL Editor** → colle et exécute `supabase/schema.sql`
3. Puis exécute `supabase/seed.sql` pour charger les 10 premières mesures

### 3. Variables d'environnement

```bash
cp .env.example .env.local
```

Remplis `.env.local` avec tes clés Supabase :
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Tu trouves ces valeurs dans Supabase : **Settings → API**

### 4. Lancer en local

```bash
npm run dev
# → http://localhost:3000
```

---

## Déploiement Vercel

1. Push le repo sur GitHub
2. [vercel.com](https://vercel.com) → **New Project** → importer le repo
3. Dans **Environment Variables**, ajouter :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy** ✅

> `vercel.json` configure automatiquement la région `cdg1` (Paris).

---

## Structure du projet

```
src/
├── app/
│   ├── page.tsx                  # Homepage — liste + recherche
│   ├── categories/page.tsx       # Grille des catégories
│   ├── measures/[slug]/page.tsx  # Page détail mesure
│   ├── api/measures/route.ts     # API REST (GET /api/measures)
│   ├── loading.tsx               # Skeleton de chargement
│   └── not-found.tsx             # Page 404
├── components/
│   ├── ui/
│   │   ├── Header.tsx
│   │   ├── DaxCode.tsx           # Syntax highlighting DAX
│   │   └── DifficultyBadge.tsx
│   └── measures/
│       ├── MeasureCard.tsx
│       ├── MeasureGenerator.tsx  # Générateur paramétrable
│       ├── SearchBar.tsx
│       ├── CategoryFilter.tsx
│       └── ExampleTable.tsx
├── lib/
│   ├── supabase.ts               # Client Supabase
│   └── data.ts                   # Fonctions de requête
└── types/index.ts                # Types TypeScript

supabase/
├── schema.sql                    # Schéma complet
└── seed.sql                      # 10 mesures DAX initiales
```

---

## Roadmap

### MVP ✅
- [x] Bibliothèque de mesures en lecture
- [x] Recherche par nom / description
- [x] Filtres par catégorie et tag
- [x] Page détail avec syntax highlighting
- [x] Générateur de mesure personnalisé
- [x] Compteurs vues / copies

### v2
- [ ] Authentification Microsoft (Entra ID)
- [ ] Système de contribution (proposer une mesure)
- [ ] Workflow de validation (Reviewer / Maintainer)
- [ ] Commentaires sur les mesures
- [ ] Export `.bim` compatible Tabular Editor
- [ ] Recherche par fonction DAX

### v3
- [ ] API publique documentée
- [ ] VS Code Extension
- [ ] Intégration Teams / notifications

---

## Ajouter une mesure (en attendant la v2)

En attendant le système de contribution, tu peux ajouter des mesures directement via le **SQL Editor** de Supabase en suivant le format de `supabase/seed.sql`.

---

## Licence

MIT — contributions bienvenues.
