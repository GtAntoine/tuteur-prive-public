# 05 — Roadmap Produit

## Vue Globale Stratégique

```
2024 ────────────── 2025 ────────────── 2026 ───────────▶
  │                   │                   │
  V1                  V2                  V3
  Validation         Engagement          Expansion
  │                   │                   │
  └─ Product-Market   └─ Rétention       └─ B2B2C
     Fit                 Gamification        Mode Prof
```

---

## Release 1 — Fondations & Validation (Shipped — Décembre 2024)

### Objectif Stratégique
> **Valider que le pipeline "photo → analyse → exercices" apporte une vraie valeur pédagogique.**

### Hypothèses à Tester
1. Les élèves sont prêts à utiliser une IA pour réviser (pas juste pour tricher)
2. L'analyse de photo est suffisamment précise pour être utile
3. Le modèle économique token-based est acceptable
4. Les parents font confiance à un outil IA éducatif

### Features Livrées

#### Core Features
- **Analyse de leçon** : photo/PDF/DOCX/texte → QCM + questions + vocabulaire
- **Correction d'exercices** : analyse du raisonnement avec feedback structuré
- **Aide guidée** : décomposition step-by-step sans donner la réponse
- **Multi-profils** : gestion de plusieurs élèves par compte (fratries)

#### Sécurité & Infrastructure
- **Architecture sécurisée** : migration vers Edge Functions (clé API protégée)
- **Authentification** : Supabase Auth (email/password + magic links)
- **Données persistantes** : historique complet en base Supabase

#### Monétisation
- **Token system** : 20 gratuits, puis achat via Stripe
- **Stripe Checkout** : 3 packs (50/100/200 tokens)
- **Webhooks** : attribution automatique après paiement

#### UX & Accessibilité
- **i18n** : français + anglais
- **Responsive** : mobile-first design
- **Partage public** : liens partageables pour les leçons
- **Historique** : filtrable par matière et type

#### Bonus (ajouté en V1)
- **Réponses vocales** : Whisper (OpenAI) pour répondre oralement
- **Support avatars** : personnalisation profils

### KPIs Ciblés (V1)
- **Time-to-value** < 2 min (photo → résultats)
- **Taux de complétion** d'une leçon > 70%
- **NPS** (beta testers) ≥ 8/10
- **Conversion freemium → paid** : 5-10% (à mesurer sur 3 mois)

### Résultats V1
- **Beta tester principal (nièce) :** utilisation quotidienne, feedback "très contente"
- **Précision OCR** : 85-90% sur photos nettes, 70% sur photos manuscrites
- **Qualité QCM** : pertinents et adaptés au niveau (selon feedback utilisateur)
- **Coût par analyse** : ~0.015$/leçon (plus élevé que prévu, à optimiser)

### Décisions PO Critiques (V1)
1. **Migration Edge Functions** : priorisée en urgence (bloquant critique)
2. **Réponses vocales** : avancées de V2 → V1 (forte demande mobile)
3. **Format QCM** : migration array → key-value pour éviter duplicates
4. **Tokens gratuits** : fixés à 20 (équilibre entre test et conversion)

---

## Release 2 — Engagement & Rétention (En cours — Q1-Q2 2025)

### Objectif Stratégique
> **Transformer les utilisateurs occasionnels en utilisateurs réguliers via la gamification et le suivi de progression.**

### Hypothèses à Tester
1. Un système de progression visible augmente la motivation
2. Les rappels de révision augmentent l'usage régulier
3. La gamification (badges, streaks) fonctionne pour les 10-17 ans
4. Les parents payent plus s'ils voient la progression clairement

### Features Prévues

#### Dashboard de Progression
**User Story :**
> En tant qu'élève, je veux voir un dashboard de ma progression par matière afin de visualiser mes forces et faiblesses.

**Scope :**
- [ ] Graphiques de progression par matière (% de réussite QCM)
- [ ] Historique d'évolution (courbe sur 30 jours)
- [ ] Identification des chapitres non maîtrisés
- [ ] Suggestions de révision ciblées

**Priorité :** Must (V2)
**Complexité :** M (5-8 jours)

---

#### Gamification

**User Story :**
> En tant qu'élève, je veux gagner des badges et maintenir un streak afin de rester motivé.

**Scope :**
- [ ] **Système de points** : +10 pts par leçon complétée, +5 pts par QCM parfait
- [ ] **Badges** : "Première leçon", "10 leçons", "Perfectionniste" (10 QCM parfaits), etc.
- [ ] **Streaks** : jours consécutifs d'utilisation (avec rappels)
- [ ] **Niveaux** : Bronze → Argent → Or → Platine

**Priorité :** Should (V2)
**Complexité :** L (8-12 jours)

**Risque PO :** Gamification mal conçue peut dévier l'objectif pédagogique → focus sur badges liés à la maîtrise, pas juste à l'usage.

---

#### Révisions Espacées (Spaced Repetition)

**User Story :**
> En tant qu'élève, je veux être rappelé de réviser les leçons anciennes afin de consolider ma mémoire long terme.

**Scope :**
- [ ] Algorithme de répétition espacée (inspiré de Anki)
- [ ] Calcul automatique du "prochain review" par leçon
- [ ] Notifications/emails de rappel
- [ ] Mode "Révision du jour" : leçons à revoir

**Priorité :** Should (V2)
**Complexité :** L (10-15 jours)

**Inspiration :** Duolingo, Anki, mais adapté au contenu scolaire.

---

#### PWA (Progressive Web App)

**User Story :**
> En tant qu'élève, je veux installer l'app sur mon téléphone afin d'y accéder rapidement.

**Scope :**
- [ ] Manifest.json configuré
- [ ] Service worker pour cache offline
- [ ] Icône d'app personnalisée
- [ ] Splash screen

**Priorité :** Could (V2)
**Complexité :** S (2-3 jours)

**Décision PO :** Seulement si les métriques montrent un usage mobile > 60%.

---

#### Export de Progression (PDF pour Parents)

**User Story :**
> En tant que parent, je veux exporter un rapport PDF de progression afin de le montrer aux professeurs.

**Scope :**
- [ ] Bouton "Exporter" dans le profil
- [ ] PDF généré avec :
  - Graphiques de progression par matière
  - Liste des leçons travaillées
  - Scores moyens QCM
  - Points forts / faibles identifiés
- [ ] Branding TuteurPrivé

**Priorité :** Should (V2)
**Complexité :** M (5-7 jours)

---

#### Optimisation Images

**User Story :**
> En tant que système, je veux compresser les images uploadées afin de réduire les coûts Supabase Storage.

**Scope :**
- [ ] Compression client-side avant upload (via canvas API)
- [ ] Redimensionnement max 1920px
- [ ] Format WebP pour stockage
- [ ] Réduction estimée : -70% taille

**Priorité :** Should (V2)
**Complexité :** S (2-3 jours)

**ROI :** Économie ~50$/mois en coûts de stockage à 1000 utilisateurs actifs.

---

### KPIs Ciblés (V2)
- **Rétention J7** : 40% (vs 25% en V1)
- **Rétention J30** : 20% (vs 10% en V1)
- **Fréquence d'usage** : 3x/semaine (vs 1.5x/semaine en V1)
- **Conversion freemium → paid** : 10-15%
- **Taux d'activation des notifications** : 50%

### Timeline Estimée
**Q1 2025 (Jan-Mar) :**
- Dashboard progression
- Gamification basique (points, badges)
- PWA

**Q2 2025 (Apr-Jun) :**
- Révisions espacées
- Export PDF
- Optimisations techniques

---

## Release 3 — Expansion B2B2C : Mode Professeur  Q3-Q4 2025)

### Objectif Stratégique
> **Ouvrir un nouveau segment de marché en proposant un outil pour professeurs particuliers, tout en augmentant la valeur pour les élèves.**

### Hypothèses à Tester
1. Les profs particuliers sont prêts à payer 15-30€/mois pour gagner du temps
2. Le mode prof augmente la rétention des élèves (car encadrement)
3. Le modèle B2B2C (prof paye, élève utilise) est viable
4. Les profs deviennent des prescripteurs (acquisition virale)

### Features Prévues

####  Dashboard Professeur

**User Story :**
> En tant que professeur particulier, je veux voir tous mes élèves sur un dashboard afin de gérer leur suivi.

**Scope :**
- [ ] Vue "Mes Élèves" avec liste + statistiques
- [ ] Ajout d'élèves (invitation via email)
- [ ] Vue détaillée par élève :
  - Historique des leçons
  - Progression par matière
  - Points forts / faibles
  - Dernière activité
- [ ] Graphiques de progression comparés

**Priorité :** Must (V3)
**Complexité :** XL (15-20 jours)

---

#### Création de Leçons Professeur

**User Story :**
> En tant que professeur, je veux créer une leçon personnalisée et l'envoyer à un élève afin de lui donner du travail ciblé.

**Scope :**
- [ ] Upload de contenu (photo/PDF/texte)
- [ ] Génération automatique QCM + questions
- [ ] Édition des questions avant envoi
- [ ] Assignment à un ou plusieurs élèves
- [ ] Date limite (optionnelle)

**Priorité :** Must (V3)
**Complexité :** L (10-12 jours)

---

#### Communication Prof ↔ Élève

**User Story :**
> En tant que professeur, je veux envoyer des messages à mes élèves afin de les encourager ou de clarifier des points.

**Scope :**
- [ ] Messagerie intégrée (type WhatsApp)
- [ ] Notifications push/email
- [ ] Partage de ressources (liens, fichiers)

**Priorité :** Should (V3)
**Complexité :** XL (15-20 jours avec WebSockets)

**Alternative V3.1 :** Email-based messaging (plus simple, MVP) → WebSockets en V3.2.

---

#### Rapport Automatique pour Parents

**User Story :**
> En tant que professeur, je veux générer un rapport automatique pour les parents afin de justifier mon travail.

**Scope :**
- [ ] Rapport mensuel auto-généré
- [ ] Contenu :
  - Séances effectuées
  - Progression par matière
  - Points travaillés
  - Recommandations
- [ ] Envoi automatique aux parents (email)
- [ ] Branding prof + TuteurPrivé

**Priorité :** Should (V3)
**Complexité :** M (6-8 jours)

**Différenciation :** Valorise le travail du prof, rassure les parents → justifie le prix.

---

#### Bibliothèque de Ressources Partagée

**User Story :**
> En tant que professeur, je veux accéder à une bibliothèque de leçons créées par d'autres profs afin de gagner du temps.

**Scope :**
- [ ] Marketplace de leçons (opt-in)
- [ ] Filtres : matière, niveau, note
- [ ] Import en 1 clic dans son espace
- [ ] (Optionnel) Monétisation : profs peuvent vendre leurs leçons

**Priorité :** Could (V3 ou V4)
**Complexité :** XL (20+ jours)

**Risque PO :** Complexité élevée, peut distraire du cœur de valeur → à réévaluer selon feedback V3.

---

### Modèle Économique V3

#### Pricing Professeur
- **Plan Gratuit** : 1 élève max, 10 leçons/mois
- **Plan Pro** : 19.99€/mois
  - Jusqu'à 10 élèves
  - Leçons illimitées
  - Rapports automatiques
  - Priorité support
- **Plan Premium** : 39.99€/mois
  - Élèves illimités
  - Fonctionnalités avancées (analytics, API)
  - White-label (branding personnalisé)

#### Pricing Élève (inchangé)
- Freemium : 20 tokens gratuits
- Packs : 50/100/200 tokens
- (Nouveau) Abonnement : 9.99€/mois = 100 tokens/mois

**Stratégie :** Les profs offrent souvent les tokens à leurs élèves (inclus dans leur tarif horaire).

---

### KPIs Ciblés (V3)
- **Profs inscrits** : 50 dans les 3 premiers mois
- **Conversion prof gratuit → payant** : 30%
- **Élèves par prof (moyenne)** : 5
- **Churn prof** : < 10%/mois
- **NPS profs** : ≥ 40

### Timeline Estimée
**Q3 2025 (Jul-Sep) :**
- Dashboard prof
- Création leçons + assignment

**Q4 2025 (Oct-Dec) :**
- Messagerie prof-élève
- Rapports automatiques
- Bibliothèque ressources (MVP)

---

## Release 4 — Intelligence & Scale (2026)

### Objectif Stratégique
> **Utiliser l'IA pour prédire les difficultés et automatiser l'adaptation du contenu.**

### Features Imaginées

#### Adaptation Automatique de Difficulté

**Concept :**
L'IA analyse les résultats passés et ajuste automatiquement la difficulté des prochaines questions.

**Exemples :**
- Élève réussit 10 QCM d'affilée → questions plus difficiles
- Élève échoue 3 fois → questions plus simples + rappels de base

**Priorité :** Innovation (V4)

---

#### Détection de Lacunes

**Concept :**
L'IA détecte les chapitres non maîtrisés et propose des parcours de remise à niveau.

**Exemple :**
> "Tu as des difficultés en fractions. Voici 3 leçons pour progresser : CM1 > CM2 > 6ème."

**Priorité :** Innovation (V4)

---

#### Mode Compétition / Classements

**Concept :**
Leaderboards par classe/école pour motiver via la compétition saine.

**Priorité :** Nice-to-have (V4)
**Risque :** Peut démotiver les élèves faibles → à concevoir prudemment.

---

#### Marketplace de Leçons Communautaires

**Concept :**
Les élèves peuvent partager leurs meilleures leçons publiquement et gagner des tokens.

**Priorité :** Nice-to-have (V4)

---

#### Analytics Avancées (Écoles ?)

**Concept :**
Dashboard pour établissements scolaires (suivi de cohortes d'élèves).

**Modèle :** B2B (écoles payent pour leurs élèves).
**Priorité :** Exploratoire (V4+)

---

## Stratégie de Déploiement

### Approche Itérative

```
V1 → Validation (Beta privée)
V2 → Rétention (Beta publique)
V3 → Expansion (Launch officiel B2B2C)
V4 → Scale (Lever de fonds ?)
```

### Gestion du Risque

**Risque Technique :**
- Coûts OpenAI explosent → prévoir switch vers Mistral/Llama si > 1000 users/day
- Latence augmente → caching + optimisations

**Risque Produit :**
- Gamification détourne de la pédagogie → A/B testing prudent
- Mode prof trop complexe → MVP minimal d'abord

**Risque Business :**
- Conversion freemium faible → ajuster tokens gratuits ou pricing
- Churn élevé → focus rétention avant croissance

---

## Synthèse Timeline

| Release | Période | Focus | KPI Principal |
|---------|---------|-------|---------------|
| **V1** | Q4 2024 | Validation | NPS > 8 |
| **V2** | Q1-Q2 2025 | Rétention | Rétention J30 > 20% |
| **V3** | Q3-Q4 2025 | Expansion | 50 profs payants |
| **V4** | 2026 | Intelligence | Scale to 10K users |

---
