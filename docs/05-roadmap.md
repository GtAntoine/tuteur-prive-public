# 05 - Roadmap Produit

## Vue Globale Stratégique

```
V1                  V2                  V3                  V4
Validation         Communauté          Expansion           Temps Réel
│                   │                   │                   │
└─ Product-Market   └─ Marketplace      └─ B2B2C            └─ Vision Vidéo
   Fit                 Communautaire       Mode Prof           Live
```

---

## Release 1 - Fondations & Validation (Shipped)

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

## Release 2 - Mode Communauté

### Objectif Stratégique
> **Créer une communauté d'apprentissage où les élèves partagent leurs leçons et s'entraident via une marketplace de contenus.**

### Hypothèses à Tester
1. Les élèves sont motivés par le partage de leurs leçons avec d'autres
2. Une marketplace de leçons communautaires augmente la valeur perçue de l'app
3. La gamification communautaire (points pour contributions) renforce l'engagement
4. Les leçons partagées par les pairs sont aussi pertinentes que celles créées individuellement

### Features Prévues

#### Partage de Leçons

**User Story :**
> En tant qu'élève, je veux partager mes leçons analysées avec la communauté afin d'aider d'autres élèves.

**Scope :**
- [ ] Bouton "Partager avec la communauté" sur chaque leçon
- [ ] Choix de visibilité : publique ou privée
- [ ] Métadonnées automatiques : matière, niveau, classe
- [ ] Modération automatique des contenus partagés

**Priorité :** Must (V2)
**Complexité :** M (5-7 jours)

---

#### Marketplace de Leçons Communautaires

**User Story :**
> En tant qu'élève, je veux explorer des leçons partagées par d'autres élèves afin de réviser de nouveaux chapitres ou renforcer ma compréhension.

**Scope :**
- [ ] Page "Explorer" avec catalogue de leçons publiques
- [ ] Filtres : matière, niveau, classe, popularité
- [ ] Recherche par mots-clés
- [ ] Aperçu de la leçon avant utilisation
- [ ] Import en 1 clic dans son historique personnel
- [ ] Système de "likes" ou "merci" pour valoriser les contributions

**Priorité :** Must (V2)
**Complexité :** L (10-12 jours)

---

#### Gamification Communautaire

**User Story :**
> En tant qu'élève, je veux gagner des points en partageant des leçons utiles afin d'être reconnu dans la communauté.

**Scope :**
- [ ] **Système de points** :
  - +20 pts par leçon partagée
  - +5 pts par "like" reçu sur une leçon partagée
  - +10 pts pour utilisation d'une leçon communautaire
- [ ] **Badges communautaires** :
  - "Premier partage"
  - "10 leçons partagées"
  - "100 likes reçus"
  - "Super contributeur"
- [ ] **Classement communautaire** : top contributeurs du mois
- [ ] **Profil public** : nombre de leçons partagées, likes reçus, niveau

**Priorité :** Should (V2)
**Complexité :** L (8-12 jours)

**Risque PO :** La compétition peut décourager certains élèves → mettre l'accent sur la contribution plutôt que le classement.

---

#### Statistiques de Contribution

**User Story :**
> En tant qu'élève contributeur, je veux voir l'impact de mes partages afin de comprendre ce qui aide le plus la communauté.

**Scope :**
- [ ] Dashboard personnel des contributions
- [ ] Nombre de vues par leçon partagée
- [ ] Nombre d'utilisations par leçon
- [ ] Likes et retours reçus
- [ ] Matières les plus consultées

**Priorité :** Could (V2)
**Complexité :** M (5-7 jours)

---

### KPIs Ciblés (V2)
- **Leçons partagées** : 30% des leçons créées sont partagées publiquement
- **Utilisations communautaires** : 50% des utilisateurs actifs utilisent au moins 1 leçon communautaire/mois
- **Rétention J30** : 25% (vs 10% en V1)
- **Engagement communautaire** : 20% des utilisateurs actifs contribuent régulièrement
- **NPS** : ≥ 40

### Timeline Estimée
**Phase 1 :**
- Partage de leçons
- Marketplace de base (exploration + import)

**Phase 2 :**
- Gamification communautaire
- Statistiques de contribution
- Optimisations UX basées sur le feedback

---

## Release 3 - Expansion B2B2C : Mode Professeur

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
**Phase 1 :**
- Dashboard prof
- Création leçons + assignment

**Phase 2 :**
- Messagerie prof-élève
- Rapports automatiques
- Bibliothèque ressources (MVP)

---

## Release 4 - Mode Professeur en Temps Réel avec Vision Vidéo

### Objectif Stratégique
> **Révolutionner l'accompagnement pédagogique en permettant aux professeurs de donner des cours en temps réel avec analyse vidéo continue.**

### Hypothèses à Tester
1. Les professeurs sont prêts à payer pour un système d'analyse vidéo en temps réel
2. L'analyse vidéo (vs image statique) permet un feedback plus riche et contextuel
3. Le mode temps réel améliore significativement l'engagement élève-professeur
4. Les sessions vidéo enregistrées deviennent des ressources pédagogiques réutilisables

### Features Prévues

#### Sessions de Cours Vidéo en Temps Réel

**User Story :**
> En tant que professeur, je veux donner un cours en visioconférence avec analyse IA en temps réel afin d'enrichir l'expérience d'apprentissage.

**Scope :**
- [ ] Intégration visioconférence (WebRTC)
- [ ] Streaming vidéo bidirectionnel (prof ↔ élève)
- [ ] Partage d'écran avec annotations
- [ ] Tableau blanc collaboratif
- [ ] Chat intégré

**Priorité :** Must (V4)
**Complexité :** XL (20-30 jours)

**Stack technique potentiel :** Daily.co, Agora, ou solution custom WebRTC

---

#### Analyse Vidéo en Temps Réel (Vision API)

**User Story :**
> En tant que professeur, je veux que l'IA analyse en temps réel ce que l'élève montre à sa caméra afin de fournir un feedback instantané.

**Scope :**
- [ ] **Capture vidéo continue** : analyse frame par frame
- [ ] **Détection automatique de contenu** :
  - Détection de texte manuscrit (OCR en temps réel)
  - Reconnaissance d'équations mathématiques
  - Identification de graphiques/schémas
  - Détection de gestes (ex: élève lève la main)
- [ ] **Transcription en direct** : speech-to-text des explications orales
- [ ] **Suggestions IA contextuelles** : l'IA propose des explications ou exercices basés sur ce qu'elle voit

**Priorité :** Must (V4)
**Complexité :** XXL (30-40 jours)

**Technologies :** GPT-4 Vision (mode streaming si disponible), Whisper API, Computer Vision custom

---

#### Enregistrement et Replay Intelligent

**User Story :**
> En tant qu'élève, je veux revoir une session de cours enregistrée avec les annotations et suggestions IA afin de réviser efficacement.

**Scope :**
- [ ] Enregistrement automatique des sessions (vidéo + audio + transcription)
- [ ] Timeline interactive avec :
  - Moments clés identifiés par l'IA
  - Questions posées
  - Exercices résolus
  - Concepts abordés
- [ ] Export en leçon structurée (comme en V1)
- [ ] Partage sélectif avec d'autres élèves (mode communauté V2)

**Priorité :** Should (V4)
**Complexité :** L (15-20 jours)

---

#### Dashboard Analytique Avancé (Professeur)

**User Story :**
> En tant que professeur, je veux voir des analytics détaillées de mes sessions en temps réel afin d'améliorer ma pédagogie.

**Scope :**
- [ ] **Métriques par session** :
  - Temps d'attention élève (détection visuelle)
  - Nombre de questions posées
  - Concepts travaillés
  - Taux de compréhension estimé (via quizz intégrés)
- [ ] **Analyse comparative** : progression élève session après session
- [ ] **Recommandations IA** : "L'élève semble avoir du mal avec X, proposer un exercice sur Y"

**Priorité :** Should (V4)
**Complexité :** L (12-15 jours)

---

#### Mode "Assistant IA" pour le Professeur

**User Story :**
> En tant que professeur, je veux que l'IA m'assiste pendant le cours en temps réel afin de me concentrer sur la pédagogie plutôt que sur la logistique.

**Scope :**
- [ ] **Suggestions d'exercices** : l'IA propose des exercices adaptés au niveau détecté
- [ ] **Génération de QCM à la volée** : basé sur ce qui vient d'être expliqué
- [ ] **Détection de confusion** : l'IA alerte le prof si l'élève semble perdu
- [ ] **Prise de notes automatique** : résumé structuré de la session

**Priorité :** Could (V4)
**Complexité :** XL (20-25 jours)

**Inspiration :** GitHub Copilot, mais pour l'enseignement

---

### Modèle Économique V4

#### Pricing Professeur (mis à jour)
- **Plan Pro** : 29.99€/mois
  - Jusqu'à 10 élèves
  - 20h de sessions vidéo/mois
  - Enregistrements illimités
  - Analyse vidéo temps réel

- **Plan Premium** : 59.99€/mois
  - Élèves illimités
  - Sessions vidéo illimitées
  - Analytics avancées
  - Assistant IA activé
  - White-label

#### Coûts estimés
- **GPT-4 Vision (streaming)** : ~0.10$/minute de vidéo analysée
- **Stockage vidéo** : ~0.02$/GB/mois (Supabase Storage ou AWS S3)
- **Bande passante WebRTC** : ~0.05$/GB

**Calcul par session :**
- Session 1h = 60 min × 0.10$ = 6$ en coûts IA
- Stockage 1h vidéo (720p) ≈ 1GB = 0.02$/mois
- **Total : ~6.02$ par session**

**Rentabilité :** Plan Pro à 29.99€/mois avec max 20h = ~5 sessions → limite à 30$ de coûts → marge serrée, modèle viable si usage réel < limite.

---

### KPIs Ciblés (V4)
- **Sessions vidéo mensuelles** : 500 sessions/mois dans les 6 premiers mois
- **Durée moyenne session** : 45-60 minutes
- **NPS professeurs** : ≥ 50
- **Taux d'utilisation analyse vidéo** : 80% des sessions utilisent la vision IA
- **Conversion Plan Pro → Premium** : 20%

### Timeline Estimée
**Phase 1 :**
- Infrastructure visioconférence
- Analyse vidéo temps réel (MVP)

**Phase 2 :**
- Enregistrement et replay intelligent
- Dashboard analytique avancé

**Phase 3 :**
- Mode Assistant IA
- Optimisations performance et coûts

---

## Stratégie de Déploiement

### Approche Itérative

```
V1 → Validation (Beta privée)
V2 → Communauté (Beta publique)
V3 → Expansion (Launch officiel B2B2C)
V4 → Innovation (Mode temps réel vidéo)
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

| Release | Focus |
|---------|-------|
| **V1** | Validation |
| **V2** | Communauté |
| **V3** | Expansion |
| **V4** | Temps Réel Vidéo |

---
