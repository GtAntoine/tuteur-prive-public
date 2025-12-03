# 06 - Processus Product Owner

## 1. Cadre Méthodologique

### Approche Scrum Adaptée

**Contexte :** TuteurPrivé est développé en mode "solo founder" (Product Owner + Développeur), donc les rituels Scrum sont adaptés à une équipe de 1.

**Sprints :** 2 semaines
**Release Cycle :** Continuous (Netlify auto-deploy sur main)

### Rituels (version solo)

| Rituel | Fréquence | Durée | Objectif |
|--------|-----------|-------|----------|
| **Sprint Planning** | Début de sprint | 1h | Sélectionner les US du sprint |
| **Daily Standup** | Quotidien (mental) | 5 min | Se recentrer sur l'objectif |
| **Sprint Review** | Fin de sprint | 30 min | Demo à la beta tester (nièce) |
| **Retrospective** | Fin de sprint | 30 min | Note Notion : What went well / What to improve |
| **Backlog Refinement** | Mi-sprint | 1h | Clarifier les US futures, re-prioriser |

---

## 2. Gestion du Backlog

### Priorisation (MoSCoW)

```
Must-Have (P0)
  ↓ Bloquants ou critique pour la V1
Should-Have (P1)
  ↓ Important mais peut attendre 1 sprint
Could-Have (P2)
  ↓ Nice-to-have, si temps disponible
Won't-Have
  ↓ Hors scope actuel
```

### Critères de Priorisation

**Matrice Valeur × Effort :**

```
         │ Faible Effort │ Moyen Effort │ Fort Effort
─────────┼───────────────┼──────────────┼─────────────
Valeur   │               │              │
Haute    │  DO IT NOW    │   PLAN       │   DECIDE
         │  (Quick wins) │  (Important) │   (Risky)
─────────┼───────────────┼──────────────┼─────────────
Valeur   │  MAYBE        │   LATER      │   AVOID
Moyenne  │  (Nice-to-have)│             │
─────────┼───────────────┼──────────────┼─────────────
Valeur   │  AVOID        │   AVOID      │   AVOID
Faible   │               │              │
```

**Exemple concret :**

| Feature | Valeur | Effort | Priorité | Décision |
|---------|--------|--------|----------|----------|
| Réponses vocales | Haute | Moyen | P1 → P0 | Avancé en V1 (feedback fort) |
| Dashboard progression | Haute | Fort | P1 | V2 (valeur forte mais complexe) |
| Mode dark | Faible | Faible | P2 | Won't-have (pas de demande) |
| Migration Edge Functions | **CRITIQUE** | Fort | **P0** | 🚨 Urgent (bloquant) |

---

## 3. Définition of Done (DoD)

Une User Story est "Done" quand :

### Code
- [x] Code écrit et fonctionnel
- [x] Testé manuellement (pas de TDD en V1 pour vitesse)
- [x] Responsive (mobile + desktop)
- [x] Pas de console errors
- [x] Lint passed (`npm run lint`)

### UX
- [x] UI cohérente avec le design system (Tailwind)
- [x] Feedback utilisateur approprié (loading states, errors)
- [x] Accessible (contrast, keyboard navigation basique)

### Documentation
- [x] CLAUDE.md mis à jour si architecture changée
- [x] README mis à jour si commandes ajoutées
- [x] Commentaires dans le code sur la logique complexe

### Déploiement
- [x] Merge dans `main` → auto-deploy Netlify
- [x] Testé en production
- [x] Migration DB appliquée si nécessaire (Supabase)

### Validation Utilisateur (pour features majeures)
- [x] Testé par la beta tester (nièce)
- [x] Feedback positif ou ajustements mineurs

**Note PO :** DoD intentionnellement légère en V1 pour maximiser la vélocité. Sera renforcée en V2 (tests automatisés).

---

## 4. Exemples d'Arbitrages Produit

### Arbitrage 1 : Migration Edge Functions (Urgence)

**Contexte :**
Semaine 3 de V1, la clé OpenAI a été désactivée 3 fois en 1 semaine. L'app devient inutilisable.

**Options évaluées :**

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **A. Continuer comme ça** | Aucun effort | App non fonctionnelle | Non viable |
| **B. Migrer vers Edge Functions** | Sécurisé, conforme OpenAI | 3-4 jours de travail, bloque autres features | **Choisi** |
| **C. Switch vers Anthropic Claude** | Pas de problème de clé | Migration complète, coût incertain | Trop risqué |

**Décision PO :**
> Prioriser la migration Edge Functions en urgence (P0), bloquer toutes autres features jusqu'à résolution. Mieux perdre 1 semaine de roadmap que d'avoir une app cassée.

**Résultat :**
- Migration effectuée en 3 jours
- Aucune désactivation depuis
- App stable → peut continuer développement

**Learning :**
> Sécurité et stabilité > features. Une feature de moins ne fait pas mourir le produit, mais une app inutilisable oui.

---

### Arbitrage 2 : Réponses Vocales (Scope Creep)

**Contexte :**
Sprint 5 de V1, focus sur corrections d'exercices. La beta tester demande : "Je peux répondre à l'oral ? C'est chiant de taper sur mobile."

**Options évaluées :**

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **A. Dire non (scope V2)** | Focus sur la roadmap V1 | Frustration utilisateur, usage mobile limité | Risque de churn |
| **B. Ajouter en V1** | Améliore UX mobile, différenciation | +2 jours de dev, retarde correction exos | **Choisi** |
| **C. Faire un MVP audio basique** | Compromis | Qualité médiocre, mauvaise expérience | Pas de compromis qualité |

**Décision PO :**
> Ajouter les réponses vocales en V1 (via Whisper). Justification :
> - Feedback utilisateur fort (pain point réel)
> - Différenciation vs concurrence
> - Effort raisonnable (2 jours)
> - Usage mobile = critique pour adoption

**Résultat :**
- Feature ajoutée en 2 jours
- Adoption immédiate par la beta tester
- Argument marketing fort ("réponds à l'oral")

**Learning :**
> Écouter les vrais utilisateurs > suivre la roadmap aveuglément. Mais ne cède qu'aux demandes à forte valeur/effort ratio.

---

### Arbitrage 3 : Format QCM (Dette Technique)

**Contexte :**
Sprint 7 de V1, découverte d'un bug : parfois les QCM générés ont des options dupliquées (ex: "Paris" apparaît 2 fois).

**Options évaluées :**

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **A. Fix prompt (demander à l'IA de ne pas dupliquer)** | Rapide (1h) | Pas garanti (l'IA peut quand même dupliquer) | Patch temporaire |
| **B. Migrer vers format key-value (A/B/C/D)** | Résout le problème structurellement | 1 jour de refacto, breaking change | **Choisi** |
| **C. Post-process côté frontend (dédupliquer)** | Pas de refacto backend | Masque le problème, complexité frontend | Bricolage |

**Décision PO :**
> Refactoriser le format QCM pour utiliser des clés (A/B/C/D) au lieu d'un array. Ajouter une validation stricte dans le prompt.

**Implémentation :**
```typescript
// Ancien format
{
  options: ["Paris", "Londres", "Berlin", "Paris"], // duplicate
  correctAnswer: "Paris"
}

// Nouveau format
{
  options: {
    "A": "Paris",
    "B": "Londres",
    "C": "Berlin",
    "D": "Madrid"
  },
  correctAnswer: "A" // Pas de duplicate possible
}
```

**Résultat :**
- Bug résolu structurellement
- Format plus propre et extensible
- Support des deux formats pour backward compatibility

**Learning :**
> Investir dans la bonne solution technique dès qu'un pattern problématique est identifié. La dette technique coûte plus cher à long terme.

---

### Arbitrage 4 : Tokens Gratuits (Pricing)

**Contexte :**
Sprint 2 de V1, définir le nombre de tokens gratuits à l'inscription.

**Options évaluées :**

| Option | Avantages | Inconvénients | Décision |
|--------|-----------|---------------|----------|
| **A. 5 tokens** | Force la conversion rapide | Pas assez pour tester vraiment | Frustrant |
| **B. 50 tokens** | Test complet du produit | Risque de ne jamais convertir | Trop généreux |
| **C. 20 tokens** | 3-4 leçons complètes, teste la valeur | Équilibre conversion/frustration | **Choisi** |

**Calcul :**
```
1 leçon = 1 token (analyse) + potentiellement 0-3 tokens (questions/corrections)
→ Moyenne : 1.5 tokens par session complète

20 tokens = ~13 sessions légères OU ~6 sessions complètes
→ Suffisant pour tester pendant 1-2 semaines
```

**Décision PO :**
> 20 tokens gratuits. Permet de tester toutes les features (leçon, correction, guidé) sans frustration immédiate, mais force conversion après usage sérieux.

**Résultat (à mesurer sur 3 mois) :**
- 🔄 Taux d'utilisation des 20 tokens : à tracker
- 🔄 Conversion après épuisement : à tracker
- 🔄 Feedback utilisateur : à collecter

**Learning :**
> Freemium = équilibre délicat. Trop généreux = pas de revenus. Trop restrictif = churn. Itérer selon data.

---

## 5. Communication & Feedback

### Canaux de Feedback

**Beta Tester Principal (nièce) :**
- 🗣️ **Verbal** : discussions après utilisation
- 📱 **WhatsApp** : bugs/suggestions en temps réel
- 🎥 **Observation** : regarder l'usage (UX insights)

**Futurs Utilisateurs :**
- 📧 **Email** : hello@tuteurprive.com
- 📝 **Formulaire in-app** : "Signaler un problème"
- 📊 **Analytics** : (V2) Mixpanel ou Amplitude

### Process de Traitement Feedback

```
Feedback reçu
    ↓
Catégoriser :
    - Bug → Jira/Notion (P0 si bloquant)
    - Feature request → Backlog (prioriser)
    - Question → Réponse directe
    ↓
Prioriser selon :
    - Fréquence (combien d'utilisateurs ?)
    - Impact (bloquant ? nice-to-have ?)
    - Effort (quick win ? long projet ?)
    ↓
Décision :
    - Now (sprint en cours)
    - Next (prochain sprint)
    - Later (backlog V2/V3)
    - Never (hors vision produit)
    ↓
Communiquer au demandeur
```

**Exemple :**
> Feedback : "Je voudrais pouvoir exporter en PDF"
> → Catégorie : Feature request
> → Fréquence : 1 demande (low)
> → Impact : Nice-to-have
> → Effort : Medium (5-7 jours)
> → Décision : **V2** (pas critique pour V1)
> → Communication : "Super idée ! C'est prévu pour la V2 en Q1 2025"

---

## 6. Gestion de la Dette Technique

### Principe

> **Dette technique = intérêts à payer.** Chaque raccourci pris coûte du temps futur. Il faut rembourser régulièrement.

### Dette Intentionnelle (V1)

Certaines dettes ont été prises volontairement pour maximiser la vélocité :

| Dette | Justification | Plan de remboursement |
|-------|---------------|----------------------|
| **Pas de tests automatisés** | Trop lent en phase d'exploration | V2 : ajouter tests E2E (Playwright) |
| **Pas d'optimisation images** | Pas critique à faible volume | V2 : compression client-side |
| **Modèle OpenAI en dur** | Changement facile si besoin | V3 : réévaluation selon coûts |
| **Pas de monitoring** | Console.log suffit en V1 | V2 : Sentry pour error tracking |

### Dette Accidentelle (à éviter)

Certaines dettes sont des erreurs et doivent être corrigées immédiatement :

| Dette | Impact | Action |
|-------|--------|--------|
| **Clé API exposée** | 🚨 Critique (sécurité) | Corrigé immédiatement (Edge Functions) |
| **Bug duplicates QCM** | Qualité produit | Corrigé en V1 (refacto format) |
| **Pas de validation input** | Risque crash | 🔄 À corriger en priorité |

### Règle des 20%

> **Allouer 20% du temps de chaque sprint au remboursement de dette technique.**

En pratique (sprint de 2 semaines = 10 jours) :
- 8 jours : features
- 2 jours : refacto / optimisations / tests

---

## 7. Définition d'une "Feature"

### Taille des Features (T-Shirt Sizing)

| Taille | Durée | Exemple |
|--------|-------|---------|
| **XS** | 0.5-1 jour | Ajouter un bouton, changer une couleur |
| **S** | 1-2 jours | Partage public de leçons |
| **M** | 3-5 jours | Système de tokens |
| **L** | 5-10 jours | Correction d'exercices |
| **XL** | 10-15 jours | Mode professeur |
| **XXL** | 15+ jours | Marketplace de leçons |

**Règle PO :** Si une feature est > M, découper en sous-features ou en plusieurs sprints.

---

## 8. Découpage d'une Fonctionnalité (Exemple Réel)

### Cas : Analyse de Leçon

**Epic :** Permettre l'analyse de leçon par photo
**Complexité totale :** XL (10 jours)

**Découpage en User Stories :**

```
Epic: Analyse de Leçon (10 jours)
  ├─ US1: Upload photo (1 jour) 
  ├─ US2: Appel OpenAI avec vision (1 jour) 
  ├─ US3: Parsing JSON structuré (0.5 jour) 
  ├─ US4: Affichage résumé (1 jour) 
  ├─ US5: Affichage QCM interactif (2 jours) 
  ├─ US6: Validation réponses QCM (1 jour) 
  ├─ US7: Questions ouvertes (1 jour) 
  ├─ US8: Validation réponses ouvertes (1.5 jour) 
  ├─ US9: Section vocabulaire (1 jour) 
  └─ US10: Sauvegarde historique (1 jour) 
```

**Approche :**
1. **Sprint 1 :** US1-US4 (MVP : photo → résumé)
2. **Sprint 2 :** US5-US6 (QCM interactif)
3. **Sprint 3 :** US7-US10 (questions + vocabulaire + historique)

**Justification :**
- Sprint 1 = validation technique (ça marche ?)
- Sprint 2 = validation valeur (les utilisateurs aiment ?)
- Sprint 3 = complétion (feature riche)

---

## 9. Outils & Stack PO

### Outils Utilisés

| Outil | Usage | Justification |
|-------|-------|---------------|
| **Notion** | Backlog, docs, notes | Flexible, visuel |
| **GitHub** | Code + issues + projects | Intégré au code |
| **Figma** | (Minimal) Wireframes rapides | Standard design |
| **Google Sheets** | Suivi KPIs (temporaire) | Simple, pas besoin d'outil complexe en V1 |
| **Netlify** | Hosting + CI/CD | Auto-deploy, simple |
| **Supabase Dashboard** | Database + logs + analytics | Intégré au backend |

**Principe :** Stack minimaliste en V1. Éviter over-engineering.

---

## 10. Learnings Product Owner (Rétrospective V1)

### Ce qui a bien fonctionné

1. **Architecture sécurisée dès V1**
   - Éviter les problèmes de sécurité futurs
   - Conforme aux best practices

2. **Écouter la beta tester**
   - Réponses vocales avancées en V1 grâce à son feedback
   - Usage réel > hypothèses

3. **MVP focalisé**
   - 3 features core (leçon/correction/guidé)
   - Pas de distractions (pas de réseau social, pas de chat, etc.)

4. **Multi-profils dès V1**
   - Anticipation d'un besoin réel (fratries)
   - Différenciation vs concurrence

### Ce qui peut être amélioré

1. **Manque de tests automatisés**
   - Régression manuelle = lent
   - À prioriser en V2

2. **Pas de monitoring d'erreurs**
   - Bugs découverts par utilisateurs, pas par nous
   - Sentry à ajouter en V2

3. **Coûts OpenAI non optimisés**
   - ~0.015$/analyse → peut devenir cher à scale
   - Explorer Mistral/Llama en V3

4. **Pas d'analytics utilisateur**
   - Difficile de mesurer rétention/engagement précisément
   - Mixpanel/Amplitude à ajouter en V2

### 🎯 Actions pour V2

- [ ] Ajouter tests E2E (Playwright)
- [ ] Intégrer Sentry (error tracking)
- [ ] Ajouter Mixpanel (analytics)
- [ ] Optimiser coûts IA (compression images, caching)
- [ ] Mettre en place A/B testing (pour gamification)

---

*"Product Owner, c'est être responsable du QUOI et du POURQUOI, pas du COMMENT. Mais quand tu es aussi dev, tu dois jongler entre les deux casquettes sans perdre la vision produit."*
