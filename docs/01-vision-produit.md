# 01 — Vision Produit

## 1. Problème

L'apprentissage scolaire souffre aujourd'hui de plusieurs obstacles structurels :

### Pour les élèves
- **Matériel dispersé** : cahiers, photocopies, photos floues, documents PDF
- **Manque de structure** : difficulté à identifier ce qui est important dans une leçon
- **Révisions inefficaces** : relire passivement sans vérifier la compréhension
- **Pas de feedback immédiat** : attendre le prochain cours pour savoir si on a compris
- **Perte de motivation** : ne pas voir sa progression clairement

### Pour les parents
- **Zéro visibilité** : impossible de savoir ce qui est vraiment compris
- **ROI incertain** : difficile d'évaluer l'efficacité du travail personnel
- **Impuissance** : ne pas pouvoir aider efficacement sur toutes les matières

### Pour les professeurs particuliers (besoin futur)
- **Perte de temps** : créer des exercices personnalisés manuellement
- **Suivi limité** : pas d'outil dédié pour tracker la progression par compétence
- **Outils fragmentés** : jongler entre Google Docs, WhatsApp, Excel, Drive

### État actuel du marché

Le marché des solutions éducatives se divise en deux catégories :

**1. IA généralistes** (ex: ChatGPT, Louxor.ai)
- Expliquent des concepts de manière générale
- Ne travaillent pas sur le contenu réel de l'élève
- Risque de dérive vers la triche (faire les devoirs à la place)

**2. Plateformes de soutien scolaire** (ex: ancien TuteurPrivé, Acadomia)
- Dépendent de la disponibilité d'un tuteur humain
- Coût élevé (20-50€/h)
- Pas d'aide entre deux séances

**→ Gap identifié :** Aucune solution ne transforme les cours réels des élèves en outils d'apprentissage actif et personnalisé.

---

## 2. Solution : TuteurPrivé (Nouvelle Génération)

TuteurPrivé est une application qui permet de **transformer n'importe quelle leçon en expérience d'apprentissage interactive**.

### Fonctionnalités Clés

#### Analyse de Leçon par Photo
**Ce que fait l'élève :**
1. Prend une photo de son cours (cahier, manuel, fiche)
2. L'IA (GPT-4 Vision) extrait automatiquement le contenu
3. Identifie la matière, le niveau, les concepts clés

**Ce que génère l'app :**
- **Synthèse structurée** : résumé clair avec points essentiels
- **Vocabulaire** : définitions des termes importants + QCM vocabulaire
-  **QCM de compréhension** : 5-10 questions à choix multiples
- **Questions de réflexion** : questions ouvertes pour approfondir
- **Validation des réponses** : feedback intelligent sur les réponses ouvertes

#### Correction d'Exercices
**Comment ça marche :**
1. L'élève photographie l'énoncé ET sa copie
2. L'IA analyse le raisonnement (pas juste la réponse finale)
3. Génère un feedback détaillé :
   - Ce qui est correct
   - Ce qui est incorrect/incomplet
   - Suggestions d'amélioration spécifiques
   - Appréciation globale encourageante

**Différenciation clé :** Ne donne pas la réponse, guide vers la bonne méthode.

#### Aide Guidée
**Pour les exercices difficiles :**
1. L'élève indique qu'il est bloqué
2. L'IA décompose le problème en étapes
3. Donne des indices progressifs (sans dévoiler la solution)
4. Encourage l'autonomie

### Architecture Technique Innovante

```
[Élève prend photo]
        ↓
[Upload Frontend React]
        ↓
[Supabase Edge Function (sécurisé)]
        ↓
[GPT-5 Vision API]
        ↓
[Parsing JSON structuré]
        ↓
[Affichage interactif]
```

**Décision d'architecture critique :** Passer par des Supabase Edge Functions plutôt que d'appeler OpenAI directement depuis le navigateur.

**Pourquoi ?**
- **Sécurité** : clé API jamais exposée côté client
- **Conformité** : respecte les règles d'utilisation d'OpenAI
- **Fiabilité** : évite la désactivation de la clé par OpenAI

---

## 3. Proposition de Valeur

### Pour l'Élève (Utilisateur Principal)
> "Je peux réviser n'importe quelle leçon de manière active, quand je veux, sans attendre mon prof ou mes parents."

**Bénéfices :**
- **Immédiat** : feedback en moins de 30 secondes
- **Personnalisé** : basé sur SON cours, SON niveau, SA matière
- **Engageant** : QCM interactifs, points, progression visible
- **Répétable** : peut refaire les exercices autant qu'il veut
- **Motivant** : voit sa progression en temps réel

### Pour le Parent (Utilisateur Secondaire)
 "Je peux suivre les progrès de mon enfant sans être expert dans toutes les matières."

**Bénéfices :**
- **Visibilité** : historique des leçons travaillées
- **Transparence** : comprendre sur quoi l'enfant progresse
- **Économique** : alternative abordable au soutien scolaire classique
- **Rassurant** : l'enfant travaille de manière structurée

### Pour le Professeur (Mode Futur - V3)
> "Je peux générer automatiquement des exercices adaptés à chaque élève et suivre leur progression."

**Bénéfices :**
- **Gain de temps** : génération automatique d'exercices
- **Suivi précis** : dashboard de progression par élève
- **Personnalisation** : contenu adapté au niveau de chaque élève
- **Professionnel** : image moderne et outillée

---

## 4. Différenciation vs Concurrence

### vs Louxor.ai (IA Éducative Française)

| Aspect | Louxor.ai | TuteurPrivé |
|--------|-----------|-------------|
| **Usage** | Poser une question, recevoir une explication | Analyser une leçon complète |
| **Source** | L'élève doit taper sa question | Photo automatique du cours |
| **Type d'aide** | Explications théoriques | Exercices pratiques sur le contenu réel |
| **Correction** | Non disponible | Analyse de copies |
| **Personnalisation** | Niveau scolaire général | Cours spécifique + niveau + matière |
| **Pédagogie** | Prof virtuel (mode passif) | Entraînement actif |

**Conclusion :** Complémentaires mais TuteurPrivé est plus adapté à l'apprentissage actif.

### vs ChatGPT / IA Généralistes

| Aspect | ChatGPT | TuteurPrivé |
|--------|---------|-------------|
| **Interface** | Chat générique | Interface éducative dédiée |
| **Risque triche** | Élevé (fait les devoirs) | Faible (guide sans donner réponses) |
| **Structuration** | Réponses en texte libre | JSON structuré → UI pédagogique |
| **Progression** | Aucune mémoire | Historique + profils élèves |
| **Gamification** | Non | Tokens, QCM, scores |

**Conclusion :** TuteurPrivé est pensé pour l'apprentissage, pas la productivité générale.

### vs Soutien Scolaire Classique

| Aspect | Soutien scolaire | TuteurPrivé |
|--------|------------------|-------------|
| **Disponibilité** | Rendez-vous fixe | 24/7 |
| **Coût** | 20-50€/h | Freemium (20 tokens gratuits) |
| **Couverture** | 1-2 matières | Toutes matières |
| **Scalabilité** | Limité par disponibilité humaine | Illimité |
| **Relation humaine** | Forte | Absente |

**Conclusion :** TuteurPrivé complète (ne remplace pas) le soutien scolaire en offrant de la pratique entre deux séances.

---

## 5. Objectifs par Version

### V1 — App Élève : Fondations (Actuel)

**Objectif :** Valider que le pipeline "photo → analyse → exercices" fonctionne et apporte de la valeur.

**Scope :**
- Analyse de leçon par photo ou texte
- Génération de QCM + questions de compréhension
- Correction d'exercices par photo
- Aide guidée pour problèmes difficiles
- Multi-profils (fratries)
- Système de tokens (20 gratuits, puis achat)
- Historique des leçons
- Partage public de leçons
- Support français + anglais

**KPI de succès :**
- Taux de complétion d'une leçon > 70%
- Temps moyen par leçon < 15 min
- Retour utilisateur positif (beta testers)

---

### V2 — Progression & Engagement (En cours)

**Objectif :** Augmenter la rétention en ajoutant des mécaniques d'engagement et de suivi de progression.

**Scope prévu :**
- Dashboard de progression par matière
- Système de points et badges
- Révisions espacées (algorithme de répétition)
- Statistiques détaillées par élève
- Objectifs personnalisables
- Rappels de révision
- Export de progression (PDF pour parents)

**Hypothèse à tester :**
> Si l'élève voit sa progression et reçoit des rappels, il utilisera l'app de manière plus régulière.

---

### V3 — Mode Professeur (Futur)

**Objectif :** Ouvrir un nouveau segment de marché (B2B2C) en proposant un outil pour professeurs particuliers.

**Scope imaginé :**
- Dashboard professeur
- Gestion de plusieurs élèves
- Création de leçons personnalisées
- Suivi de progression par élève
- Communication prof ↔ élève
- Rapport automatique pour parents
- Partage de ressources entre profs

**Modèle économique :**
- Freemium pour élèves (avec limites)
- Abonnement pro pour professeurs (15-30€/mois)

---

### V4 — Intelligence & Automatisation (Vision)

**Objectif :** Utiliser l'IA pour prédire les difficultés et adapter automatiquement le contenu.

**Scope imaginé :**
- Adaptation automatique du niveau de difficulté
- Détection des lacunes (chapitres non maîtrisés)
- Génération automatique de parcours de révision
- Analytics avancées (pour écoles ?)
- Marketplace de leçons communautaires
- Mode compétition / classements

---

## 6. Mesure de Succès (OKRs)

### Objectif Principal
**"Augmenter l'efficacité de l'apprentissage autonome des élèves"**

**Indicateurs :**
- Nombre de leçons complétées par utilisateur actif
- Note de satisfaction utilisateur (NPS)
- Taux de rétention J7, J30
- Conversion freemium → payant
- Progression mesurée (score QCM avant/après)

### Vision Long Terme
> "Devenir l'assistant IA de référence pour l'apprentissage scolaire en France, puis en Europe."

**North Star Metric :** Nombre d'heures d'apprentissage actif par semaine (somme de tous les utilisateurs).
