# 03 — Architecture Fonctionnelle

## 1. Vue d'Ensemble

TuteurPrivé repose sur une **architecture moderne React + Supabase + OpenAI** avec un pattern de sécurité critique : **l'AI Proxy via Edge Functions**.

```
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │   Lesson   │  │ Correction │  │   Guided   │        │
│  │   Upload   │  │   Upload   │  │    Help    │        │
│  └─────┬──────┘  └──────┬─────┘  └──────┬─────┘        │
│        │                 │                │              │
│        └─────────────────┴────────────────┘              │
│                          │                               │
└──────────────────────────┼───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│              SUPABASE (Backend as a Service)              │
│  ┌──────────────────────────────────────────────────┐   │
│  │           EDGE FUNCTIONS (Deno)                  │   │
│  │  ┌─────────────┐  ┌──────────────┐             │   │
│  │  │ openai-chat │  │   openai-    │             │   │
│  │  │             │  │  transcribe  │             │   │
│  │  └──────┬──────┘  └──────┬───────┘             │   │
│  └─────────┼────────────────┼──────────────────────┘   │
│            │                │                           │
│  ┌─────────┴────────────────┴────────┐                 │
│  │      DATABASE (PostgreSQL)         │                 │
│  │  - users                           │                 │
│  │  - user_profiles                   │                 │
│  │  - history                         │                 │
│  │  - account_tokens                  │                 │
│  │  - stripe_customers                │                 │
│  └────────────────────────────────────┘                 │
│                                                          │
│  ┌────────────────────────────────────┐                 │
│  │      STORAGE (S3-compatible)       │                 │
│  │  - Lesson images                   │                 │
│  │  - Exercise images                 │                 │
│  └────────────────────────────────────┘                 │
│                                                          │
│  ┌────────────────────────────────────┐                 │
│  │      AUTH (Built-in)               │                 │
│  │  - Email/Password                  │                 │
│  │  - Magic Links                     │                 │
│  │  - Session management              │                 │
│  └────────────────────────────────────┘                 │
└──────────────────┬───────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────┐
│                   EXTERNAL APIs                           │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │   OpenAI     │  │    Stripe    │                     │
│  │  GPT-4 Vision│  │   Payments   │                     │
│  │   Whisper    │  │   Webhooks   │                     │
│  └──────────────┘  └──────────────┘                     │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Modules Fonctionnels Principaux

### Module Analyse de Leçon

**Composants Frontend :**
- `LessonPage.tsx` - Page principale
- `FileUploader.tsx` - Upload image/PDF/DOCX
- `ImageUploader.tsx` - Capture photo
- `LessonDisplay.tsx` - Affichage résultats

**Flux Technique :**

```typescript
// 1. Upload de fichier
User uploads image/PDF/DOCX
    ↓
FileUploader processes:
    - Images → base64
    - PDFs → extract pages as images (pdfjs-dist)
    - DOCX → extract images (mammoth)
    ↓
Files converted to: Array<{ type: 'image' | 'text', content: string }>

// 2. Appel IA sécurisé
secureOpenAI.chat.completions.create({
    model: 'gpt-5-nano', // Configured in constants
    messages: [
        { role: 'system', content: lessonAnalysisPrompt },
        { role: 'user', content: [
            { type: 'text', text: userInput },
            { type: 'image_url', image_url: { url: base64Image }}
        ]}
    ]
})
    ↓
Supabase Edge Function (openai-chat/index.ts)
    ↓
OpenAI API (GPT-4 Vision)
    ↓
Returns structured JSON

// 3. Parsing & Display
JSON response parsed into LessonResponse type
    ↓
Stored in:
    - Supabase Database (history table)
    - Zustand store (profile-store.ts)
    ↓
Rendered in LessonDisplay with tabs:
    - Résumé (LessonSummary)
    - Vocabulaire (VocabularySection)
    - QCM (QCMSection)
    - Questions (QuestionsSection)
```

**Fichiers Clés :**
- `src/lib/openai/analysis.ts` - Fonction `analyzeLessonContent()`
- `src/lib/openai/prompts/lesson-analysis.ts` - Prompt structuré
- `src/hooks/useLessonAnalysis.ts` - Hook avec gestion tokens
- `src/components/lesson/LessonDisplay.tsx` - Rendu UI

---

### Module Correction d'Exercices

**Composants Frontend :**
- `CorrectionPage.tsx` - Page principale
- `ExerciseCorrection.tsx` - Formulaire upload
- `CorrectionDisplay.tsx` - Affichage correction

**Flux Technique :**

```typescript
// 1. Upload énoncé + copie élève
User uploads 2 images:
    - Exercise statement
    - Student's work
    ↓
Both converted to base64

// 2. Appel IA avec prompt spécialisé
secureOpenAI.chat.completions.create({
    messages: [
        { role: 'system', content: exerciseCorrectionPrompt },
        { role: 'user', content: [
            { type: 'image_url', image_url: { url: statementImage }},
            { type: 'image_url', image_url: { url: studentWorkImage }}
        ]}
    ]
})
    ↓
Returns CorrectionResponse:
    - evaluation_detailed_responses[]
    - elements_corrects[]
    - elements_incorrects_or_incompletes[]
    - specific_improvement_suggestions[]
    - general_appreciation

// 3. Display with components
CorrectionDisplay renders:
    - DetailedResponse (question by question)
    - ElementsList (correct/incorrect)
    - ImprovementSuggestions
    - Appreciation (encouragement)
```

**Fichiers Clés :**
- `src/lib/openai/analysis.ts` - Fonction `correctExercise()`
- `src/lib/openai/prompts/exercise-correction.ts` - Prompt correction
- `src/components/correction/CorrectionDisplay.tsx` - Rendu UI

---

### Module Aide Guidée

**Composants Frontend :**
- `GuidedPage.tsx` - Page principale
- `GuidedExercises.tsx` - Formulaire upload
- `GuidedDisplay.tsx` - Affichage étapes

**Flux Technique :**

```typescript
// 1. Upload problème difficile
User uploads image of difficult exercise
    ↓
Converted to base64

// 2. Appel IA pour décomposition
secureOpenAI.chat.completions.create({
    messages: [
        { role: 'system', content: guidedHelpPrompt },
        { role: 'user', content: [
            { type: 'image_url', image_url: { url: exerciseImage }}
        ]}
    ]
})
    ↓
Returns GuidedExerciseResponse:
    - exercise_analysis (title, difficulty, concepts)
    - guided_steps[] (step-by-step with hints)
    - key_points[]
    - learning_objectives[]
    - encouragement_message

// 3. Display step-by-step
GuidedDisplay renders progressive steps with hints
```

**Fichiers Clés :**
- `src/lib/openai/analysis.ts` - Fonction `getGuidedHelp()`
- `src/lib/openai/prompts/guided-help.ts` - Prompt aide guidée
- `src/components/guided/GuidedDisplay.tsx` - Rendu UI

---

## 3. Architecture de Sécurité (Critique)

### Ancienne Architecture (Insécure)

```
Frontend React
    ↓
    Direct call to OpenAI API
    (API key in VITE_OPENAI_API_KEY)
    ↓
OpenAI API

PROBLÈME : Clé API visible dans le bundle JavaScript
→ OpenAI détectait cela et désactivait la clé régulièrement
```

### Nouvelle Architecture (Sécurisée)

```
Frontend React
    ↓
    secureOpenAI.chat.completions.create()
    (calls Supabase Edge Function)
    ↓
Supabase Edge Function
    (API key in Deno.env - server-side only)
    ↓
OpenAI API

AVANTAGES :
- Clé API jamais exposée au client
- Conforme aux règles OpenAI
- Pas de désactivation de clé
- Possibilité d'ajouter rate limiting
- Possibilité d'ajouter monitoring côté serveur
```

**Décision PO :**
> Migration critique effectuée en priorité (bloquant toutes autres features) car l'app devenait inutilisable avec les désactivations fréquentes.

**Fichiers Concernés :**
- `src/lib/openai/secure-client.ts` - Nouveau client sécurisé
- `src/lib/openai/client.ts` - Ancien client (deprecated)
- `supabase/functions/openai-chat/index.ts` - Edge Function proxy
- `supabase/functions/openai-transcribe/index.ts` - Proxy transcription

**Documentation :**
- `OPENAI_SETUP.md` - Guide complet de setup

---

## 4. Système de Gestion d'État (Zustand)

### Auth Store (`auth-store.ts`)

```typescript
interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}
```

**Usage :** Gestion de la session utilisateur (Supabase Auth)

### Profile Store (`profile-store.ts`)

```typescript
interface ProfileState {
  profiles: UserProfile[];
  currentProfile: UserProfile | null;
  setCurrentProfile: (profile: UserProfile) => void;
  addProfile: (profile: UserProfile) => void;
  // ... tokens, history management
}
```

**Usage :**
- Multi-profils (plusieurs élèves par compte)
- Balance de tokens
- Historique des leçons
- Profil actif

**Pattern :**
```typescript
// Dans un composant
const { currentProfile, profiles } = useProfileStore();

// Changer de profil
const switchProfile = (profileId: string) => {
  const profile = profiles.find(p => p.id === profileId);
  setCurrentProfile(profile);
};
```

---

## 5. Système de Tokens & Monétisation

### Architecture Token System

```
User Account
    ↓
account_tokens table (Supabase)
    - tokens_remaining: number
    - last_reset_date: timestamp
    ↓
Vérifié avant chaque action coûteuse
    ↓
Si insuffisant → prompt upgrade
    ↓
Stripe Checkout
    ↓
Webhook → add tokens
```

**Fichiers Clés :**
- `src/hooks/useTokens.ts` - Hook gestion tokens
- `supabase/functions/create-checkout-session/` - Création session Stripe
- `supabase/functions/stripe-webhook/` - Gestion webhooks (ajout tokens)

**Coûts :**
- Analyse leçon : 1 token
- Correction exercice : 1 token
- Aide guidée : 1 token

**Offres :**
- Gratuit : 20 tokens à l'inscription
- Pack 50 tokens : 4.99€
- Pack 100 tokens : 9.99€
- Abonnement mensuel : X tokens/mois (à définir en V2)

---

## 6. Internationalisation (i18n)

**Stack :**
- `react-i18next`
- `i18next-browser-languagedetector`

**Langues supportées :**
- 🇫🇷 Français (défaut)
- 🇬🇧 Anglais

**Structure :**
```
src/i18n/
├── index.ts (config)
├── locales/
    ├── fr/
    │   └── translation.json
    └── en/
        └── translation.json
```

**Pattern d'usage :**
```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Usage
<h1>{t('lesson.title')}</h1>

// Changement de langue
i18n.changeLanguage('en');
```

**Prompts multilingues :**
Les prompts OpenAI sont également traduits :
```typescript
// src/lib/openai/prompts/index.ts
export const systemPrompts = {
  lessonAnalysis: {
    fr: "Vous êtes un tuteur...",
    en: "You are a tutor..."
  }
};
```

---

## 7. Gestion des Images & Fichiers

### Pipeline de Traitement

```
User uploads file
    ↓
FileUploader.tsx détecte le type:
    ├─ Image (JPG/PNG) → convertToBase64()
    ├─ PDF → extractPDFImages() (pdfjs-dist)
    └─ DOCX → extractDOCXImages() (mammoth)
    ↓
Array<{ type: 'image' | 'text', content: string }>
    ↓
Envoyé à l'API OpenAI via Edge Function
    ↓
(Optionnel) Stocké dans Supabase Storage
    ↓
URL stockée dans history.images[]
```

**Fichiers Clés :**
- `src/lib/openai/image-processing.ts` - Fonctions traitement
- `src/lib/openai/image-utils.ts` - Utilitaires base64
- `src/components/FileUploader.tsx` - Composant upload

**Optimisations :**
- Compression images avant upload (à implémenter en V2)
- Lazy loading des images historique (`LazyImage.tsx`)
- Cache images (`useImageCache.ts`)

---

## 8. Base de Données (Supabase PostgreSQL)

### Schéma Simplifié

```sql
-- Authentification (géré par Supabase Auth)
users
  ├─ id (UUID, PK)
  ├─ email
  └─ created_at

-- Profils utilisateurs (multi-profils)
user_profiles
  ├─ id (UUID, PK)
  ├─ user_id (FK → users.id)
  ├─ name (string)
  ├─ grade (enum: CP, CE1, ..., Terminale)
  ├─ avatar_color (string)
  ├─ avatar_id (string)
  ├─ created_at
  └─ updated_at

-- Historique des leçons/corrections/guidances
history
  ├─ id (UUID, PK)
  ├─ user_id (FK → users.id)
  ├─ profile_id (FK → user_profiles.id)
  ├─ type (enum: 'lesson' | 'correction' | 'guided')
  ├─ data (JSONB) -- LessonResponse | CorrectionResponse | GuidedExerciseResponse
  ├─ images (text[]) -- URLs des images
  ├─ timestamp
  ├─ is_public (boolean) -- Pour partage
  └─ shared_at (timestamp)

-- Tokens par compte
account_tokens
  ├─ user_id (FK → users.id, PK)
  ├─ tokens_remaining (integer)
  ├─ last_reset_date (timestamp)
  └─ updated_at

-- Liaison Stripe
stripe_customers
  ├─ user_id (FK → users.id, PK)
  ├─ stripe_customer_id (string)
  ├─ created_at
  └─ updated_at
```

### Migrations

Migrations dans `supabase/migrations/`:
- Row-Level Security (RLS) policies
- Indexes sur colonnes fréquemment requêtées
- Triggers pour mises à jour automatiques

**Exemple RLS :**
```sql
-- Les utilisateurs ne voient que leurs propres données
CREATE POLICY "Users can view own history"
ON history FOR SELECT
USING (auth.uid() = user_id);

-- Sauf les leçons publiques (partage)
CREATE POLICY "Anyone can view public history"
ON history FOR SELECT
USING (is_public = true);
```

---

## 9. Choix d'Architecture Critiques

### Pourquoi Supabase plutôt que Firebase ?

| Critère | Supabase | Firebase |
|---------|----------|----------|
| **Base de données** | PostgreSQL (SQL) | Firestore (NoSQL) |
| **Edge Functions** | Deno (TypeScript natif) | Cloud Functions (Node.js) |
| **Pricing** | Plus généreux en free tier | Coûteux rapidement |
| **Open Source** | Self-hostable | Propriétaire Google |
| **SQL queries** | Complexes possibles | Limité en NoSQL |

**Décision PO :** Supabase choisi pour flexibilité SQL + Edge Functions natives.

### Pourquoi GPT-4 Vision plutôt que modèles open-source ?

| Critère | GPT-4 Vision | LLaVA / Open-source |
|---------|--------------|---------------------|
| **Qualité OCR** | Excellente | Moyenne |
| **Compréhension pédagogique** | Très bonne | Faible |
| **Coût** | ~0.01$/requête | Gratuit (mais infra) |
| **Latence** | ~5-10s | Variable |
| **Maintenance** | Zéro | Importante |

**Décision PO :** GPT-4 en V1 pour time-to-market. Réévaluation en V3 si volumes importants.

### Pourquoi React plutôt que Next.js ?

| Critère | React (Vite) | Next.js |
|---------|--------------|---------|
| **Build time** | Très rapide | Plus lent |
| **SSR needed** | Non (SPA) | Utile pour SEO |
| **Simplicité** | Client-side uniquement | Hybrid |
| **Hosting** | Netlify simple | Vercel ou custom |

**Décision PO :** React + Vite car app = outil privé (pas besoin SSR SEO). Si pivot vers landing pages complexes → migration Next.js en V3.

---

## 10. Architecture V2 : Mode Communautaire Amélioré

### Vision Fonctionnelle

Transformer TuteurPrivé d'un outil individuel en plateforme communautaire où les élèves peuvent découvrir et partager des leçons.

### Architecture Technique

```
┌─────────────────────────────────────────────────────────┐
│            BIBLIOTHÈQUE COMMUNAUTAIRE                    │
│  ┌────────────────────────────────────────────────┐    │
│  │  Community Feed (Page principale)              │    │
│  │  - Filtres : matière, niveau, popularité       │    │
│  │  - Recherche full-text                         │    │
│  │  - Tri : récent, populaire, mieux notés        │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Lesson Card Component                         │    │
│  │  - Aperçu (titre, matière, niveau)             │    │
│  │  - Auteur (pseudo + avatar)                    │    │
│  │  - Statistiques (vues, imports, note)          │    │
│  │  - Actions : Voir, Importer, Noter             │    │
│  └────────────────┬───────────────────────────────┘    │
└───────────────────┼──────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│               BASE DE DONNÉES (Nouvelle table)           │
│  ┌────────────────────────────────────────────────┐    │
│  │  community_lessons                             │    │
│  │  ├─ id (UUID, PK)                              │    │
│  │  ├─ history_id (FK → history.id)               │    │
│  │  ├─ author_id (FK → user_profiles.id)          │    │
│  │  ├─ title (string)                             │    │
│  │  ├─ subject (enum: math, french, etc.)         │    │
│  │  ├─ grade_level (enum: CP, CE1, etc.)          │    │
│  │  ├─ view_count (integer)                       │    │
│  │  ├─ import_count (integer)                     │    │
│  │  ├─ average_rating (float)                     │    │
│  │  ├─ created_at                                 │    │
│  │  └─ updated_at                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  lesson_ratings                                │    │
│  │  ├─ id (UUID, PK)                              │    │
│  │  ├─ lesson_id (FK → community_lessons.id)      │    │
│  │  ├─ user_id (FK → users.id)                    │    │
│  │  ├─ rating (integer 1-5)                       │    │
│  │  ├─ comment (text, optional)                   │    │
│  │  └─ created_at                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  user_public_profiles (opt-in)                 │    │
│  │  ├─ profile_id (FK → user_profiles.id, PK)     │    │
│  │  ├─ display_name (string)                      │    │
│  │  ├─ bio (text, optional)                       │    │
│  │  ├─ total_shares (integer)                     │    │
│  │  ├─ total_rating (float)                       │    │
│  │  └─ is_public (boolean)                        │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Composants Clés

```typescript
// src/pages/CommunityPage.tsx
interface CommunityLesson {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  author: {
    name: string;
    avatar: string;
  };
  stats: {
    views: number;
    imports: number;
    averageRating: number;
  };
  preview: LessonResponse; // Data de la leçon
}

// Action : Importer une leçon communautaire
const importCommunityLesson = async (lessonId: string) => {
  // 1. Copier la leçon dans l'historique de l'utilisateur
  const { data } = await supabase
    .from('history')
    .insert({
      user_id: currentUser.id,
      profile_id: currentProfile.id,
      type: 'lesson',
      data: lesson.preview,
      imported_from: lessonId
    });

  // 2. Incrémenter le compteur d'imports
  await supabase.rpc('increment_import_count', { lesson_id: lessonId });

  // 3. Notifier l'auteur (optionnel)
  await sendNotification(lesson.author.id, 'lesson_imported');
};
```

### Fonctionnalités Clés

1. **Partage de leçon** : Bouton "Partager avec la communauté" sur une leçon existante
2. **Découverte** : Page dédiée avec filtres et recherche
3. **Import 1-clic** : Copie la leçon dans l'historique de l'utilisateur
4. **Notation** : Système 5 étoiles + commentaires optionnels
5. **Profils publics** : Opt-in, permet de voir les leçons d'un auteur

### Impact Produit

- Rétention : Augmente la valeur perçue (contenu illimité)
- Engagement : Crée une communauté d'apprenants
- Acquisition : Bouche-à-oreille via partage de leçons

---

## 11. Architecture V3 : Mode Professeur

### Vision Fonctionnelle

Permettre aux professeurs particuliers d'utiliser TuteurPrivé pour gérer leurs élèves, créer du contenu personnalisé, et suivre la progression.

### Architecture Technique

```
┌─────────────────────────────────────────────────────────┐
│              DASHBOARD PROFESSEUR                        │
│  ┌────────────────────────────────────────────────┐    │
│  │  Teacher Dashboard (Vue principale)            │    │
│  │  ├─ Liste élèves (avec stats)                  │    │
│  │  ├─ Graphiques de progression globale          │    │
│  │  ├─ Leçons créées (bibliothèque perso)         │    │
│  │  └─ Messages non lus                           │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Student Detail View                           │    │
│  │  ├─ Profil élève                               │    │
│  │  ├─ Historique complet des leçons              │    │
│  │  ├─ Graphiques de progression par matière      │    │
│  │  ├─ Points forts / Points faibles détectés     │    │
│  │  ├─ Temps passé (analytics)                    │    │
│  │  └─ Actions : Assigner leçon, Envoyer message  │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│         BASE DE DONNÉES (Nouvelles tables V3)            │
│  ┌────────────────────────────────────────────────┐    │
│  │  teacher_accounts                              │    │
│  │  ├─ id (UUID, PK)                              │    │
│  │  ├─ user_id (FK → users.id)                    │    │
│  │  ├─ plan_type (enum: free, pro, premium)       │    │
│  │  ├─ stripe_subscription_id (string)            │    │
│  │  ├─ max_students (integer)                     │    │
│  │  ├─ created_at                                 │    │
│  │  └─ updated_at                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  teacher_student_links                         │    │
│  │  ├─ id (UUID, PK)                              │    │
│  │  ├─ teacher_id (FK → teacher_accounts.id)      │    │
│  │  ├─ student_profile_id (FK → user_profiles.id) │    │
│  │  ├─ invitation_status (enum: pending, active)  │    │
│  │  ├─ invited_at                                 │    │
│  │  ├─ accepted_at                                │    │
│  │  └─ notes (text, private to teacher)           │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  lesson_assignments                            │    │
│  │  ├─ id (UUID, PK)                              │    │
│  │  ├─ teacher_id (FK → teacher_accounts.id)      │    │
│  │  ├─ student_profile_id (FK → user_profiles.id) │    │
│  │  ├─ history_id (FK → history.id)               │    │
│  │  ├─ assigned_at                                │    │
│  │  ├─ due_date (timestamp, optional)             │    │
│  │  ├─ completed_at (timestamp, nullable)         │    │
│  │  ├─ score (float, nullable)                    │    │
│  │  └─ teacher_feedback (text, nullable)          │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  teacher_student_messages                      │    │
│  │  ├─ id (UUID, PK)                              │    │
│  │  ├─ sender_id (FK → users.id)                  │    │
│  │  ├─ recipient_id (FK → users.id)               │    │
│  │  ├─ content (text)                             │    │
│  │  ├─ is_read (boolean)                          │    │
│  │  ├─ created_at                                 │    │
│  │  └─ attachments (text[], optional)             │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  student_analytics (computed)                  │    │
│  │  ├─ student_profile_id (FK, PK)                │    │
│  │  ├─ total_lessons_completed (integer)          │    │
│  │  ├─ total_time_spent_minutes (integer)         │    │
│  │  ├─ average_qcm_score (float)                  │    │
│  │  ├─ weak_subjects (jsonb)                      │    │
│  │  ├─ strong_subjects (jsonb)                    │    │
│  │  ├─ last_activity_at                           │    │
│  │  └─ updated_at                                 │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Composants Clés

```typescript
// src/pages/teacher/TeacherDashboard.tsx
interface TeacherStudent {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  stats: {
    lessonsCompleted: number;
    averageScore: number;
    lastActivity: Date;
    weakSubjects: string[];
  };
}

// src/pages/teacher/StudentDetailPage.tsx
const StudentDetailPage = ({ studentId }: { studentId: string }) => {
  const { analytics, history } = useStudentData(studentId);

  return (
    <div>
      <StudentProgressCharts data={analytics} />
      <WeakPointsDetection subjects={analytics.weakSubjects} />
      <LessonHistory history={history} />
      <AssignLessonButton studentId={studentId} />
      <MessageButton studentId={studentId} />
    </div>
  );
};

// Action : Assigner une leçon à un élève
const assignLessonToStudent = async (
  teacherId: string,
  studentId: string,
  lessonId: string,
  dueDate?: Date
) => {
  await supabase.from('lesson_assignments').insert({
    teacher_id: teacherId,
    student_profile_id: studentId,
    history_id: lessonId,
    assigned_at: new Date(),
    due_date: dueDate
  });

  // Notifier l'élève
  await sendPushNotification(studentId, 'new_lesson_assigned');
};
```

### Fonctionnalités Clés

1. **Dashboard multi-élèves** : Vue centralisée de tous les élèves
2. **Suivi de progression** : Graphiques par matière, détection automatique des points faibles
3. **Assignment de leçons** : Créer ou sélectionner une leçon et l'assigner
4. **Messagerie** : Communication directe prof ↔ élève
5. **Rapports automatiques** : Génération PDF mensuelle pour parents
6. **Gestion de classes** : Regrouper élèves par classe/groupe

### Modèle Économique

- **Plan Gratuit** : 1 élève, 10 leçons/mois
- **Plan Pro** : 19.99€/mois, 10 élèves, leçons illimitées
- **Plan Premium** : 39.99€/mois, élèves illimités, white-label

### Impact Produit

- Nouveau segment : B2B2C (profs payent, élèves utilisent)
- Rétention élèves : Encadrement professionnel augmente l'usage
- Acquisition virale : Profs deviennent prescripteurs

---

## 12. Architecture V4 : Mode Vision Live avec Guidage Vocal

### Vision Fonctionnelle

Transformer TuteurPrivé en **tuteur virtuel en temps réel** qui observe l'élève résoudre un exercice via webcam et le guide vocalement sans donner la réponse.

### Architecture Technique

```
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (React + WebRTC)                   │
│  ┌────────────────────────────────────────────────┐    │
│  │  Live Tutoring Session                         │    │
│  │  ├─ Webcam Stream (élève + feuille)            │    │
│  │  ├─ Audio Input (élève peut parler)            │    │
│  │  ├─ Audio Output (voix IA du tuteur)           │    │
│  │  └─ Visual Feedback (surlignage zones)         │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Real-time Video Processing                    │    │
│  │  - Capture frame toutes les 2-3 secondes       │    │
│  │  - Envoi au backend via WebSocket              │    │
│  │  - Détection de changements (diff frames)      │    │
│  └────────────────┬───────────────────────────────┘    │
└───────────────────┼──────────────────────────────────────┘
                    │ WebSocket
                    ▼
┌─────────────────────────────────────────────────────────┐
│        BACKEND (Supabase Realtime + Edge Function)       │
│  ┌────────────────────────────────────────────────┐    │
│  │  Live Vision Analysis Service                  │    │
│  │  - Reçoit frames vidéo en streaming            │    │
│  │  - Détecte l'exercice en cours                 │    │
│  │  - Analyse le travail de l'élève               │    │
│  │  - Détecte les blocages/erreurs                │    │
│  │  - Génère des hints progressifs                │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  AI Pipeline (GPT-4 Vision + TTS)              │    │
│  │  ├─ Frame analysis (GPT-4o real-time)          │    │
│  │  ├─ Context maintenance (historique session)   │    │
│  │  ├─ Hint generation (progressif)               │    │
│  │  └─ Voice synthesis (ElevenLabs/OpenAI TTS)    │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│                   ▼ Audio stream                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  WebSocket Response                              │  │
│  │  - Audio chunks (streaming)                      │  │
│  │  - Visual annotations (JSON)                     │  │
│  │  - Hint text (fallback)                          │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                    │ WebSocket
                    ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (Playback)                         │
│  ┌────────────────────────────────────────────────┐    │
│  │  - Play audio stream (voix IA)                 │    │
│  │  - Display visual hints (overlay)              │    │
│  │  - Show encouragement messages                 │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Composants Clés

```typescript
// src/pages/LiveTutoringPage.tsx
const LiveTutoringPage = () => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const wsRef = useRef<WebSocket>(null);
  const [tutorVoice, setTutorVoice] = useState<AudioStream>(null);

  // Connexion WebSocket
  useEffect(() => {
    wsRef.current = new WebSocket(
      `wss://${SUPABASE_URL}/functions/v1/live-vision-tutor`
    );

    wsRef.current.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      if (type === 'audio_chunk') {
        // Jouer l'audio du tuteur
        playAudioChunk(data.chunk);
      } else if (type === 'visual_hint') {
        // Afficher un surlignage sur la zone à revoir
        highlightArea(data.coordinates);
      } else if (type === 'encouragement') {
        // Afficher un message d'encouragement
        showToast(data.message);
      }
    };
  }, []);

  // Capture et envoi de frames
  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current && wsRef.current) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = webcamRef.current.videoWidth;
        canvas.height = webcamRef.current.videoHeight;
        ctx.drawImage(webcamRef.current, 0, 0);

        const frame = canvas.toDataURL('image/jpeg', 0.7);

        wsRef.current.send(JSON.stringify({
          type: 'video_frame',
          data: { frame, timestamp: Date.now() }
        }));
      }
    }, 2000); // Toutes les 2 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-tutoring">
      <video ref={webcamRef} autoPlay />
      <div className="visual-overlay" id="hints-overlay" />
      <div className="audio-player" />
      <button onClick={startSession}>Démarrer la session</button>
    </div>
  );
};

// supabase/functions/live-vision-tutor/index.ts
serve(async (req) => {
  const { socket, response } = Deno.upgradeWebSocket(req);

  let sessionContext = {
    exercise: null,
    previousFrames: [],
    hintsGiven: [],
    studentProgress: []
  };

  socket.onmessage = async (event) => {
    const { type, data } = JSON.parse(event.data);

    if (type === 'video_frame') {
      const { frame, timestamp } = data;

      // 1. Analyser le frame avec GPT-4 Vision
      const analysis = await analyzeFrameRealtime(frame, sessionContext);

      // 2. Détecter si l'élève est bloqué
      const isBlocked = detectBlocking(analysis, sessionContext);

      if (isBlocked) {
        // 3. Générer un hint vocal progressif
        const hint = await generateProgressiveHint(
          sessionContext.exercise,
          sessionContext.hintsGiven,
          analysis.studentWork
        );

        // 4. Convertir en audio (TTS)
        const audioStream = await textToSpeech(hint.text);

        // 5. Envoyer l'audio en chunks
        for await (const chunk of audioStream) {
          socket.send(JSON.stringify({
            type: 'audio_chunk',
            data: { chunk }
          }));
        }

        // 6. Enregistrer le hint donné
        sessionContext.hintsGiven.push(hint);
      }

      // Mettre à jour le contexte
      sessionContext.previousFrames.push({ frame, timestamp, analysis });
      if (sessionContext.previousFrames.length > 10) {
        sessionContext.previousFrames.shift(); // Garder seulement les 10 derniers
      }
    }
  };

  return response;
});

// Fonction : Détection de blocage
const detectBlocking = (analysis, context) => {
  // Si aucune écriture nouvelle depuis 30 secondes
  const lastFrames = context.previousFrames.slice(-15); // 30s à 2fps
  const hasNewWriting = lastFrames.some(f => f.analysis.hasNewContent);

  if (!hasNewWriting && context.previousFrames.length > 15) {
    return true; // Élève probablement bloqué
  }

  // Si erreur détectée dans le raisonnement
  if (analysis.detectedError && !analysis.correctedByStudent) {
    return true;
  }

  return false;
};

// Fonction : Génération de hint progressif
const generateProgressiveHint = async (exercise, hintsGiven, studentWork) => {
  const hintLevel = hintsGiven.length; // 0 = premier hint, 1 = deuxième, etc.

  const prompt = `
Tu es un tuteur bienveillant qui guide un élève sans donner la réponse.

Exercice : ${exercise.text}
Travail actuel de l'élève : ${studentWork.description}
Hints déjà donnés : ${hintsGiven.map(h => h.text).join(', ')}

Niveau de hint (0 = vague, 3 = précis) : ${hintLevel}

Génère un hint vocal de niveau ${hintLevel} qui :
- Ne donne PAS la réponse directement
- Oriente progressivement vers la bonne méthode
- Encourage l'élève

Réponds en JSON :
{
  "text": "le hint vocal",
  "visual_hint": { "highlight_area": "zone à regarder", "coordinates": [x, y, w, h] }
}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content);
};
```

### Fonctionnalités Clés

1. **Streaming vidéo en temps réel** : Webcam → backend toutes les 2-3 secondes
2. **Analyse continue** : GPT-4 Vision analyse chaque frame
3. **Détection de blocage** : Si pas de progrès pendant 30s ou erreur détectée
4. **Hints progressifs** : Niveau 0 (vague) → Niveau 3 (précis)
5. **Voix naturelle** : TTS en temps réel (ElevenLabs ou OpenAI TTS)
6. **Visual hints** : Surlignage des zones à revoir

### Technologies Requises

- **WebRTC** : Capture vidéo côté client
- **WebSockets** : Communication bidirectionnelle temps réel
- **GPT-4o** : Modèle vision optimisé pour real-time
- **TTS** : ElevenLabs ou OpenAI TTS pour voix naturelle
- **Supabase Realtime** : Infrastructure WebSocket

### Modèle Économique

- **Mode Premium** : 2 tokens/minute de session live (coûteux en API)
- **Offre dédiée** : Abonnement "Tuteur Live" 29.99€/mois = 10h de live

### Impact Produit

- Différenciation maximale : Aucun concurrent ne fait ça
- Valeur perçue très élevée : "Tuteur personnel en temps réel"
- Upsell naturel : Les utilisateurs freemium voudront tester
- Risque : Coûts IA élevés, complexité technique importante

---

## 13. Roadmap Technique

### V1 (Actuel)
- [x] Pipeline photo → analyse → QCM
- [x] Architecture sécurisée (Edge Functions)
- [x] Multi-profils
- [x] Token system + Stripe
- [x] i18n FR/EN
- [x] Partage public

### V2 (Q1-Q2 2025)
- [ ] Révisions espacées (algorithme Anki)
- [ ] Gamification (badges, streaks, points)
- [ ] Mode Communautaire Amélioré
  - [ ] Bibliothèque de leçons partagées par la communauté
  - [ ] Système de notation et commentaires
  - [ ] Filtrage par matière, niveau, popularité
  - [ ] Import en 1 clic de leçons communautaires
  - [ ] Profils publics (opt-in)
- [ ] Optimisation images (compression WebP)
- [ ] Analytics utilisateur (Mixpanel)
- [ ] PWA (install sur mobile)

### V3 (Q3-Q4 2025)
- [ ] Mode Professeur Complet
  - [ ] Dashboard professeur multi-élèves
  - [ ] Suivi de progression par élève
  - [ ] Création et assignment de leçons personnalisées
  - [ ] Messagerie prof ↔ élève
  - [ ] Rapports automatiques pour parents
  - [ ] Analytics avancées (temps passé, points faibles détectés)
  - [ ] Gestion de classes/groupes
- [ ] Websockets (temps réel pour messagerie)
- [ ] Réévaluation modèles IA (Mistral/Llama ?)
- [ ] API publique (B2B)
- [ ] Mobile app native (React Native)

### V4 (2026)
- [ ] Mode Vision Live avec Guidage Vocal Temps Réel
  - [ ] Streaming vidéo en temps réel
  - [ ] Analyse continue de l'exercice pendant résolution
  - [ ] Voix IA en temps réel (TTS naturel)
  - [ ] Détection automatique de blocage
  - [ ] Guidage progressif vocal sans donner la réponse
  - [ ] Mode "Tuteur Virtuel" interactif
- [ ] Adaptation automatique de difficulté (IA prédictive)
- [ ] Détection de lacunes avec parcours personnalisés
- [ ] Mode compétition (leaderboards responsables)
- [ ] Marketplace de leçons (monétisation créateurs)
