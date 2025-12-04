# <img src="https://github.com/GtAntoine/tuteur-prive-public/raw/main/public/images/logo.png" alt="TuteurPrivé" width="50" style="vertical-align: middle;"/> TuteurPrivé - Case Study

> Portfolio complet de l'application [TuteurPrivé](https://tuteurprive.com), 
> une plateforme éducative utilisant l'IA pour transformer l'apprentissage scolaire

<div align="center">
  <img src="./public/images/TPT1.jpg" alt="Page d'accueil" width="49%" />
  <img src="./public/images/TPT2.jpg" alt="Interface interactive" width="49%" />
  <br/>
  <em>Page d'accueil de l'application • Interface interactive avec QCM et questions</em>
</div>

---

## 🔗 Liens Utiles

- **Application Live :** [tuteurprive.com](https://tuteurprive.com)
- **Exemples de Leçons Générées :**
  - [La démographie en France](https://tuteurprive.com/shared/97b9edc4-aab8-46f1-9c1f-e9dec2d4ad90/la-demographie-en-france)
  - [L'école sous la IIIe République](https://tuteurprive.com/shared/05c5fa54-7bb3-4396-842c-73f751d315eb/l-ecole-sous-la-iiie-republique)

---

## 👋 Contexte

TuteurPrivé est une application éducative innovante qui utilise l'intelligence artificielle (GPT-4 Vision) pour révolutionner l'apprentissage scolaire. L'application permet aux élèves de :

- **Photographier leurs cours** → extraction automatique du contenu
- **Générer des QCM personnalisés** → basés sur leur leçon exacte
- **Corriger leurs exercices** → analyse intelligente avec feedback détaillé
- **Recevoir une aide guidée** → décomposition pas-à-pas des problèmes difficiles

### 🎯 La différence TuteurPrivé

Contrairement aux IA éducatives généralistes (comme [Louxor.ai](https://louxor.ai/)), TuteurPrivé ne se contente pas d'expliquer des concepts. **L'application transforme les vraies leçons des élèves en contenu pédagogique interactif.**

Ce repo documente mon travail sur ce produit :
- Vision produit et positionnement marché
- Personas utilisateurs
- Architecture fonctionnelle
- Backlog complet priorisé
- Roadmap produit
- Processus de décision PO
- KPIs et mesure d'impact
- Cas pratiques d'arbitrage

---

## 🔍 Contenu du Portfolio

Les documents détaillés se trouvent dans le dossier [`docs/`](./docs).

- **[01 - Vision Produit](./docs/01-vision-produit.md)**
  Problème, solution, proposition de valeur, comparaison avec la concurrence

- **[02 - Personas](./docs/02-personas.md)**
  Élève, parent, professeur (futur mode)

- **[03 - Architecture Fonctionnelle](./docs/03-architecture-fonctionnelle.md)**
  Modules, pipeline IA, flux techniques, choix d'architecture

- **[04 - Backlog Produit](./docs/04-backlog-produit.md)**
  Épics, user stories, critères d'acceptation, priorisation MoSCoW

- **[05 - Roadmap](./docs/05-roadmap.md)**
  Découpage en releases, objectifs par version, stratégie de déploiement

- **[06 - Processus PO](./docs/06-processus-po.md)**
  Approche Scrum, refinements, arbitrages, gestion de la dette technique

- **[07 - KPIs et Mesure d'Impact](./docs/07-kpis-et-mesure-impact.md)**
  Indicateurs suivis, hypothèses, mesure de l'impact pédagogique


---

## 🚀 Innovation Technique

### Pipeline IA Unique

```
[Photo du cours]
    ↓
[OCR + Vision GPT-5]
    ↓
[Extraction des concepts clés]
    ↓
[Génération QCM + Questions + Vocabulaire]
    ↓
[Adaptation au niveau de l'élève]
```

### Stack Technique

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (Auth, Database, Edge Functions, Storage)
- **IA:** OpenAI GPT-5 Vision + Whisper (transcription vocale)
- **State:** Zustand
- **Payments:** Stripe (tokens + abonnements)
- **i18n:** react-i18next (FR/EN)

### Ampleur du Projet

- **15k lignes de code** dans `src/`
  - TypeScript (.ts) : 5k lignes
  - TypeScript React (.tsx) : 10k lignes
  - 200+ fichiers TS/TSX

---

## 🆚 Positionnement Marché vs [Louxor.ai](https://louxor.ai/)

| Critère | Louxor.ai | TuteurPrivé |
|---------|-----------|-------------|
| **Source du contenu** | Questions écrites par l'élève | Photo d'un cours réel (extraction automatique) |
| **Objectif pédagogique** | Expliquer un concept | Faire travailler l'élève sur ses propres leçons |
| **Mode d'entraînement** | Quiz générés à la volée | QCM & exercices basés sur la photo du cahier |
| **Correction d'exercices** | ❌ Non | ✅ Correction via photo |
| **Adaptation au niveau** | ✅ Niveau / âge | ✅ Niveau + contenu spécifique du cours |
| **Type d'IA** | Prof virtuel, réexplication | Assistant d'apprentissage actif |
| **Innovation clé** | IA souveraine française | Pipeline image → leçon → exercices unique |
| **Différenciation** | IA "qui explique" | IA "qui entraîne" |

**Conclusion :** TuteurPrivé occupe une niche plus profonde, plus différenciante, plus pédagogique. L'application ne remplace pas le professeur mais augmente l'efficacité de l'apprentissage autonome.

---

## 📊 Résultats & Impact

### Métriques Actuelles (V1)
- **Tokens gratuits** pour tester le produit
- **1 token = 1 analyse** (leçon/correction/aide guidée)
- **Multi-profils** : plusieurs élèves par compte (fratries)
- **Partage public** : leçons partageables via lien

### Validation Utilisateur
- **Beta tester principal :** Nièce de l'auteur (utilisatrice quotidienne)
- **Feedback :** "Très contente" - utilisation régulière et naturelle
- **Taux d'adoption :** Passage d'un usage ponctuel à un usage systématique
