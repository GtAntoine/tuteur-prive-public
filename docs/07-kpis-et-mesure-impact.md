# 07 - KPIs et Mesure d'Impact

## 1. Framework de Mesure

### North Star Metric

> **Heures d'apprentissage actif par semaine (total utilisateurs)**

**Définition :**
Temps passé sur des activités d'apprentissage actif (QCM, questions ouvertes, corrections d'exercices) par opposition au temps passif (lecture du résumé).

**Pourquoi cette métrique ?**
- Reflète l'engagement réel
- Corrèle avec l'apprentissage effectif
- Mesurable via analytics
- Scalable (augmente avec le nombre d'utilisateurs ET l'engagement individuel)

**Cible :**
- V1 (beta) : 10h/semaine (1 utilisateur × 10h)
- V2 (100 users) : 300h/semaine (100 × 3h)
- V3 (1000 users) : 3000h/semaine (1000 × 3h)

---

## 2. KPIs par Catégorie

### Acquisition

| KPI | Définition | Cible V1 | Cible V2 | Outil de mesure |
|-----|------------|----------|----------|-----------------|
| **Inscriptions** | Nouveaux comptes créés / semaine | 5 | 50 | Supabase + Mixpanel |
| **Source d'acquisition** | D'où viennent les utilisateurs | - | - | UTM tracking |
| **Taux de complétion signup** | % qui finissent l'inscription | 80% | 85% | Funnel Mixpanel |
| **Coût d'acquisition (CAC)** | Coût marketing / utilisateur | 0 (organique) | < 5€ | Google Ads + Mixpanel |

**Stratégie d'acquisition V1 :**
- Bouche-à-oreille (famille, amis)
- Partage public de leçons (viral loop)
- SEO (articles de blog sur l'apprentissage IA)

---

### Activation

| KPI | Définition | Cible V1 | Cible V2 | Outil de mesure |
|-----|------------|----------|----------|-----------------|
| **Time to first value** | Temps entre inscription et 1ère leçon complétée | < 5 min | < 3 min | Mixpanel |
| **Taux d'activation** | % qui complètent 1 leçon dans les 24h | 70% | 80% | Mixpanel |
| **Taux de création de profil** | % qui créent un profil élève | 100% | 100% | Supabase |
| **Leçons complétées (J0)** | Nombre de leçons le jour de l'inscription | 1.5 | 2 | Mixpanel |

**Hypothèse :**
> Si l'utilisateur complète 1 leçon dans les 24h, probabilité de rétention × 3.

---

### Engagement

| KPI | Définition | Cible V1 | Cible V2 | Outil de mesure |
|-----|------------|----------|----------|-----------------|
| **DAU/MAU** | Daily Active Users / Monthly Active Users | 30% | 40% | Mixpanel |
| **Fréquence d'usage** | Sessions par utilisateur actif / semaine | 2 | 3.5 | Mixpanel |
| **Durée de session** | Temps moyen par session | 15 min | 20 min | Mixpanel |
| **Leçons par semaine** | Leçons complétées par utilisateur actif / semaine | 3 | 5 | Supabase |
| **Taux de complétion QCM** | % de QCM terminés (vs abandonnés) | 75% | 85% | Mixpanel |

**Segmentation :**
- **Power users** : > 5 leçons/semaine
- **Utilisateurs réguliers** : 2-5 leçons/semaine
- **Utilisateurs occasionnels** : < 2 leçons/semaine
- **Dormants** : 0 leçon depuis 14 jours

---

### Monétisation

| KPI | Définition | Cible V1 | Cible V2 | Outil de mesure |
|-----|------------|----------|----------|-----------------|
| **Conversion freemium → paid** | % qui achètent des tokens | 5% | 10% | Stripe + Supabase |
| **ARPU** | Average Revenue Per User / mois | 2€ | 5€ | Stripe |
| **LTV** | Lifetime Value (revenu total par utilisateur) | 10€ | 30€ | Calcul Stripe |
| **Temps avant 1er achat** | Jours entre inscription et 1er achat | < 14 | < 10 | Stripe + Supabase |
| **Tokens utilisés (gratuits)** | % des tokens gratuits consommés | 80% | 90% | Supabase |
| **Pack le plus acheté** | Répartition 50/100/200 tokens | - | - | Stripe |

**Hypothèses à valider :**
1. Les utilisateurs qui épuisent leurs tokens gratuits achètent dans 50% des cas
2. ARPU augmente si dashboard progression est visible (V2)
3. Abonnement mensuel > achats one-shot pour LTV

---

### Rétention

| KPI | Définition | Cible V1 | Cible V2 | Outil de mesure |
|-----|------------|----------|----------|-----------------|
| **Rétention J1** | % qui reviennent le lendemain | 50% | 60% | Mixpanel |
| **Rétention J7** | % qui reviennent après 7 jours | 30% | 40% | Mixpanel |
| **Rétention J30** | % qui reviennent après 30 jours | 15% | 25% | Mixpanel |
| **Churn rate** | % qui ne reviennent jamais après 30j | 50% | 40% | Mixpanel |
| **Resurrection rate** | % de dormants qui reviennent | 10% | 20% | Mixpanel |

**Courbe de rétention cible (V2) :**
```
100% │●
     │ ●
 60% │   ●
     │     ●
 40% │       ●──●──●──●  (plateau)
     │
     └────────────────────────
      J0  J1  J7  J14 J30 J60
```

**Actions pour améliorer rétention :**
- Email J+3 si pas de retour
- Notifications push (PWA en V2)
- Gamification (streaks)
- Révisions espacées

---

### Progression Pédagogique (Impact Réel)

| KPI | Définition | Cible V1 | Cible V2 | Outil de mesure |
|-----|------------|----------|----------|-----------------|
| **Score QCM moyen** | Moyenne des scores QCM par utilisateur | 70% | 75% | Supabase |
| **Progression QCM** | Amélioration score entre 1ère et 3ème tentative | +15% | +20% | Calcul Supabase |
| **Taux de réponse correcte (questions ouvertes)** | % de réponses jugées correctes par IA | 60% | 70% | Supabase |
| **Leçons révisées** | % de leçons consultées > 1 fois | 20% | 40% | Supabase |
| **Satisfaction utilisateur** | Note /10 après une leçon | 8 | 9 | In-app survey |

**Hypothèse pédagogique :**
Si un élève refait une leçon, son score devrait augmenter de +15-20%. Si ce n'est pas le cas, la qualité des explications doit être améliorée.

---

### Satisfaction

| KPI | Définition | Cible V1 | Cible V2 | Outil de mesure |
|-----|------------|----------|----------|-----------------|
| **NPS (Net Promoter Score)** | "Recommanderiez-vous TuteurPrivé ?" | 40 | 50 | In-app survey |
| **CSAT (Customer Satisfaction)** | Satisfaction après interaction | 4.5/5 | 4.7/5 | In-app survey |
| **Taux de réponse feedback** | % qui répondent aux sondages | 30% | 50% | Mixpanel |
| **Avis App Store** | Note moyenne (si app mobile) | - | 4.5/5 | App Store |

**NPS Segmentation :**
- 9-10 = Promoteurs (font du bouche-à-oreille)
- 7-8 = Passifs (neutres)
- 0-6 = Détracteurs (risque de churn)

---

## 3. Mesure d'Impact Pédagogique

### Méthodologie

**Avant/Après (A/B sur soi-même) :**

```
Élève fait une leçon
    ↓
QCM initial (baseline)
    ↓
Révision avec TuteurPrivé
    ↓
QCM final (même questions, 7 jours après)
    ↓
Mesure : amélioration du score
```

**Cible :** +20% de score entre QCM initial et final après 7 jours.

---

### Indicateurs Qualitatifs

**Verbatims utilisateurs (à collecter) :**

> "Avant je relisais mon cours 3 fois sans savoir si j'avais compris. Maintenant je fais les QCM et je vois direct."
> → **Impact :** Passage de l'apprentissage passif à actif

> "Ma fille travaille toute seule maintenant, je n'ai plus à vérifier si elle a révisé."
> → **Impact :** Autonomie de l'élève

> "Les explications sont adaptées à mon niveau, pas trop compliquées."
> → **Impact :** Personnalisation efficace

---

### Métriques Comportementales

| Indicateur | Signification | Cible |
|------------|---------------|-------|
| **Refaire un QCM** | Volonté de progresser | 30% des leçons |
| **Réponses vocales** | Engagement mobile | 20% des réponses |
| **Partager une leçon** | Satisfaction suffisante pour recommander | 10% des leçons |
| **Créer 2e profil** | Valeur perçue (fratrie) | 40% des comptes |

---

## 4. Dashboard PO (Vue Hebdomadaire)

### Metrics to Track Weekly

**Tableau de Bord Notion (exemple) :**

```markdown
# KPIs Semaine du XX/XX/2025

## North Star
- Heures d'apprentissage actif : 250h (↗️ +15% vs semaine dernière)

## Croissance
- Nouveaux inscrits : 42 (↗️ +10%)
- Total utilisateurs : 358

## Engagement
- DAU/MAU : 35% (↗️ +5%)
- Leçons créées : 520 (↗️ +20%)
- Taux de complétion QCM : 78% (→ stable)

## Revenus
- MRR : 1,240€ (↗️ +8%)
- Conversion freemium → paid : 7% (↗️ +2%)
- ARPU : 3.46€

## Rétention
- Rétention J7 : 38% (↗️ +3%)
- Churn : 45% (↘️ -2%)

## Satisfaction
- NPS : 42 (→ stable)
- Support tickets : 3 (bug reports)

## Alertes
- Coûts OpenAI en hausse : 85€ cette semaine (+25%)
  → Action : monitorer, prévoir optimisation
```

---

## 5. Expérimentations & A/B Tests

### Framework d'Expérimentation

**Méthode :**
1. **Hypothèse** : "Si je fais X, alors Y devrait augmenter de Z%"
2. **Métrique de succès** : Définir le KPI principal
3. **Durée** : Minimum 2 semaines (pour signifiance statistique)
4. **Taille échantillon** : Minimum 100 utilisateurs par groupe
5. **Décision** : Si succès → ship à 100%, sinon rollback

---

### Exemples d'Expérimentations V2

#### Expérience 1 : Gamification sur Rétention

**Hypothèse :**
> Si j'ajoute un système de streaks (jours consécutifs), alors la rétention J7 augmentera de +10%.

**Groupes :**
- **Contrôle (50%)** : Pas de streaks
- **Test (50%)** : Streaks affichés + notification J+1

**Métrique primaire :** Rétention J7
**Métrique secondaire :** Sessions/semaine

**Durée :** 3 semaines

**Résultat attendu :** Rétention J7 passe de 40% → 44%

**Décision :** Si +10% → ship, si < +5% → itérer, si pas d'impact → abandon

---

#### Expérience 2 : Pricing (Tokens Gratuits)

**Hypothèse :**
> Si j'augmente les tokens gratuits de 20 → 30, alors la conversion paid augmentera (car plus d'engagement).

**Groupes :**
- **Contrôle (50%)** : 20 tokens gratuits
- **Test (50%)** : 30 tokens gratuits

**Métrique primaire :** Conversion freemium → paid
**Métrique secondaire :** Leçons créées, rétention J30

**Durée :** 4 semaines

**Résultat attendu :** Conversion augmente de 7% → 9%

**Risque :** Si les utilisateurs ne convertissent pas plus, on perd de l'argent (30 au lieu de 20)

---

#### Expérience 3 : Onboarding Amélioré

**Hypothèse :**
> Si j'ajoute un tutoriel interactif au premier lancement, alors le taux d'activation augmentera de +15%.

**Groupes :**
- **Contrôle (50%)** : Pas de tutoriel
- **Test (50%)** : Tutoriel 3 étapes (1 min)

**Métrique primaire :** Taux d'activation (% qui complètent 1 leçon en J0)
**Métrique secondaire :** Time to first value

**Durée :** 2 semaines

**Résultat attendu :** Activation passe de 70% → 80%

---

## 6. Coûts & Unit Economics

### Structure de Coûts (mensuel à 1000 utilisateurs)

| Poste | Coût | Détail |
|-------|------|--------|
| **OpenAI API** | ~300€ | 1000 users × 5 leçons/mois × 0.06€ |
| **Supabase** | 25€ | Plan Pro (database + storage + edge functions) |
| **Netlify** | 0€ | Free tier suffit |
| **Stripe** | 2.5% | Frais transaction (sur 500€ MRR = 12.5€) |
| **Domaine** | 1€ | tuteurprive.com |
| **Total** | ~338€/mois | |

### Revenus (mensuel à 1000 utilisateurs)

| Source | Revenu | Détail |
|--------|--------|--------|
| **Achats tokens** | 400€ | 10% conversion × 1000 users × 4€ panier moyen |
| **Abonnements** | 100€ | 2% conversion × 1000 users × 5€/mois (V2) |
| **Total** | 500€/mois | |

### Marge

```
Revenus : 500€
Coûts : 338€
─────────────
Marge : 162€ (32%)
```

**Analyse PO :**
- Marge faible à 1000 users → besoin d'optimiser coûts IA (Mistral ?) ou augmenter pricing
- Break-even à ~700 utilisateurs actifs
- Scalabilité : coûts marginaux décroissants (Supabase plan Pro couvre jusqu'à 10K users)

---

## 7. OKRs (Objectives & Key Results)

### Q1 2025 (V2)

**Objective 1 : Augmenter la rétention**
- KR1 : Rétention J7 passe de 30% → 40%
- KR2 : Rétention J30 passe de 15% → 25%
- KR3 : DAU/MAU passe de 30% → 40%

**Objective 2 : Prouver la valeur pédagogique**
- KR1 : Score QCM moyen augmente de +15% entre 1ère et 3ème tentative
- KR2 : 70% des utilisateurs actifs disent "J'ai mieux compris grâce à TuteurPrivé"
- KR3 : NPS ≥ 50

**Objective 3 : Améliorer la monétisation**
- KR1 : Conversion freemium → paid passe de 5% → 10%
- KR2 : ARPU passe de 2€ → 5€
- KR3 : LTV passe de 10€ → 30€

---

### Q3 2025 (V3 - Mode Professeur)

**Objective 1 : Lancer le mode professeur**
- KR1 : 50 professeurs inscrits en 3 mois
- KR2 : 30% de conversion prof gratuit → payant
- KR3 : 5 élèves en moyenne par prof

**Objective 2 : Doubler la base utilisateur**
- KR1 : Passer de 1,000 → 2,000 utilisateurs actifs
- KR2 : Acquisition via profs (50% des nouveaux inscrits)
- KR3 : CAC < 5€

**Objective 3 : Atteindre la rentabilité**
- KR1 : MRR = 3,000€
- KR2 : Marge brute > 50%
- KR3 : Runway > 12 mois

---

## 8. Synthèse : Métriques Critiques par Phase

| Phase | Métrique Clé | Cible | Outil |
|-------|--------------|-------|-------|
| **V1 - Validation** | NPS | > 40 | Survey |
| **V2 - Rétention** | Rétention J30 | > 25% | Mixpanel |
| **V3 - Expansion** | MRR | 3,000€ | Stripe |
| **V4 - Scale** | North Star (heures d'apprentissage) | 30,000h/mois | Analytics |

---

*"You can't improve what you don't measure. But don't measure everything, focus on the metrics that actually drive the business forward."*
