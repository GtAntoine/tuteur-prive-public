# 04 - Backlog Produit

> Format : Épics → User Stories → Critères d'acceptation → Priorisation MoSCoW

---

## Épic 1 : Analyse de Leçon par Photo

**Objectif :** Permettre à l'élève de transformer n'importe quelle leçon en contenu d'apprentissage interactif.

---

### US1.1 - Upload de photo de cours

**En tant qu'** élève
**Je veux** pouvoir prendre une photo de mon cours ou télécharger une image
**Afin de** démarrer une analyse de leçon

**Critères d'acceptation :**
- [ ] Je peux prendre une photo via la caméra
- [ ] Je peux uploader une image depuis ma galerie
- [ ] Les formats supportés sont : JPG, PNG, HEIC
- [ ] L'image est prévisualisée avant envoi
- [ ] Je peux supprimer et reprendre la photo

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

---

### US1.2 - Support multi-formats (PDF, DOCX)

**En tant qu'** élève
**Je veux** pouvoir uploader des PDF ou documents Word
**Afin de** analyser des cours numériques

**Critères d'acceptation :**
- [x] Support des fichiers PDF (extraction des pages en images)
- [x] Support des fichiers DOCX (extraction du texte et images)
- [x] Chaque page du PDF est traitée séparément
- [x] L'utilisateur voit le nombre de pages détectées
- [x] Limite de taille : 10 Mo par fichier

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

**Remarque PO :** Initialement prévu en V2, avancé à V1 après feedback utilisateur fort.

---

### US1.3 - Saisie texte manuelle

**En tant qu'** élève
**Je veux** pouvoir coller du texte directement
**Afin de** analyser une leçon copiée depuis un site ou tapée

**Critères d'acceptation :**
- [x] Zone de texte disponible comme alternative à l'image
- [x] Possibilité de combiner texte + images
- [x] Limite : 5000 caractères
- [x] Preview du texte avant envoi

**Priorité :** **Should** (V1)
**Statut :** **Implémenté**

---

### US1.4 - Génération de QCM personnalisés

**En tant qu'** élève
**Je veux** recevoir un QCM basé sur ma leçon
**Afin de** tester ma compréhension

**Critères d'acceptation :**
- [x] Génération de 5 à 10 QCM par leçon
- [x] Questions adaptées au niveau (CP → Terminale)
- [x] 4 choix de réponse par question
- [x] Feedback immédiat (correct/incorrect)
- [x] Explication fournie pour les réponses incorrectes
- [x] Score final affiché en pourcentage

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

**Évolution :** Format de QCM migré de array vers key-value (A/B/C/D) pour éviter duplicates.

---

### US1.5 - Questions de compréhension ouvertes

**En tant qu'** élève
**Je veux** répondre à des questions ouvertes
**Afin de** vérifier ma compréhension en profondeur

**Critères d'acceptation :**
- [x] 3 à 5 questions de réflexion par leçon
- [x] Zone de texte libre pour répondre
- [x] Validation de la réponse via IA (analyse sémantique)
- [x] Feedback personnalisé (correct/partial/incorrect)
- [x] Suggestions d'amélioration si incomplet

**Priorité :** **Should** (V1)
**Statut :** **Implémenté**

---

### US1.6 - Section vocabulaire avec QCM dédiés

**En tant qu'** élève
**Je veux** voir une liste de vocabulaire clé avec définitions
**Afin de** mémoriser les termes importants

**Critères d'acceptation :**
- [x] Extraction automatique des termes clés
- [x] Définitions adaptées au niveau
- [x] QCM vocabulaire séparé (5 questions)
- [x] Affichage sous forme de cartes

**Priorité :** **Should** (V1)
**Statut :** **Implémenté**

---

### US1.7 - Réponses vocales (Whisper)

**En tant qu'** élève
**Je veux** pouvoir répondre aux questions oralement
**Afin de** gagner du temps sur mobile

**Critères d'acceptation :**
- [x] Bouton micro disponible sur chaque question ouverte
- [x] Transcription via Whisper (OpenAI)
- [x] Texte transcrit éditable avant envoi
- [x] Support français et anglais

**Priorité :** 🟡 **Could** (V1)
**Statut :** **Implémenté**

**Décision PO :** Ajouté en V1 car très demandé en beta test (usage mobile).

---

## Épic 2 : Correction d'Exercices

**Objectif :** Fournir un feedback intelligent sur les exercices faits par l'élève.

---

### US2.1 - Upload énoncé + copie élève

**En tant qu'** élève
**Je veux** prendre une photo de l'énoncé ET de ma copie
**Afin de** recevoir une correction détaillée

**Critères d'acceptation :**
- [x] Upload de 2 images distinctes (énoncé + copie)
- [x] Prévisualisation des 2 images côte à côte
- [x] Possibilité de réordonner ou supprimer
- [x] Support multi-pages

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

---

### US2.2 - Analyse du raisonnement

**En tant qu'** élève
**Je veux** que l'IA analyse mon raisonnement
**Afin de** comprendre mes erreurs de logique

**Critères d'acceptation :**
- [x] L'IA lit l'énoncé ET la copie
- [x] Analyse question par question
- [x] Identifie les erreurs de raisonnement (pas juste le résultat)
- [x] Statut par question : correct / partiellement correct / incorrect

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

---

### US2.3 - Feedback structuré

**En tant qu'** élève
**Je veux** recevoir un feedback organisé
**Afin de** savoir clairement quoi améliorer

**Critères d'acceptation :**
- [x] Section "Ce qui est correct" (liste)
- [x] Section "Ce qui est incorrect/incomplet" (liste)
- [x] Suggestions d'amélioration spécifiques par question
- [x] Appréciation globale encourageante

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

**Pattern PO :** Structure inspirée des copies corrigées par profs (format familier).

---

### US2.4 - Ne pas donner la réponse directement

**En tant que** PO soucieux de pédagogie
**Je veux** que l'IA guide sans dévoiler la solution complète
**Afin de** éviter la triche et favoriser l'apprentissage

**Critères d'acceptation :**
- [x] L'IA indique si la réponse est correcte ou non
- [x] Si incorrecte, elle explique POURQUOI c'est faux
- [x] Elle donne des indices / méthode
- [x] Mais ne donne PAS la réponse finale

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

**Différenciation clé :** vs ChatGPT qui donne directement les réponses.

---

## Épic 3 : Aide Guidée

**Objectif :** Décomposer les problèmes difficiles en étapes compréhensibles.

---

### US3.1 - Analyse de difficulté

**En tant qu'** élève
**Je veux** que l'IA identifie la difficulté d'un exercice
**Afin de** savoir si je peux le faire seul ou avec aide

**Critères d'acceptation :**
- [x] Analyse automatique du niveau de difficulté
- [x] Identification des concepts requis
- [x] Affichage du niveau (facile / moyen / difficile)

**Priorité :** **Should** (V1)
**Statut :** **Implémenté**

---

### US3.2 - Décomposition en étapes

**En tant qu'** élève bloqué sur un exercice
**Je veux** recevoir une décomposition pas-à-pas
**Afin de** comprendre la méthode sans avoir la réponse

**Critères d'acceptation :**
- [x] L'exercice est découpé en 3-7 étapes
- [x] Chaque étape a une description claire
- [x] Chaque étape a un indice (hint)
- [x] L'élève peut révéler les étapes progressivement

**Priorité :** **Should** (V1)
**Statut :** **Implémenté**

---

### US3.3 - Points clés et objectifs pédagogiques

**En tant qu'** élève
**Je veux** comprendre ce que l'exercice me fait travailler
**Afin de** faire le lien avec mon cours

**Critères d'acceptation :**
- [x] Liste des points clés à retenir
- [x] Objectifs pédagogiques explicites
- [x] Message d'encouragement personnalisé

**Priorité :** **Could** (V1)
**Statut :** **Implémenté**

---

## Épic 4 : Gestion de Profils

**Objectif :** Permettre plusieurs élèves sur un même compte (fratries).

---

### US4.1 - Création de profils multiples

**En tant que** parent
**Je veux** créer un profil par enfant
**Afin de** séparer les historiques et progressions

**Critères d'acceptation :**
- [x] Formulaire de création de profil (nom, niveau, avatar)
- [x] Limite : 5 profils par compte
- [x] Chaque profil a son propre historique
- [x] Les tokens sont partagés au niveau du compte

**Priorité :** **Should** (V1)
**Statut :** **Implémenté**

---

### US4.2 - Sélection rapide de profil

**En tant qu'** utilisateur avec plusieurs profils
**Je veux** changer de profil facilement
**Afin de** passer d'un enfant à l'autre rapidement

**Critères d'acceptation :**
- [x] Menu déroulant en haut de page
- [x] Affichage de l'avatar + nom du profil actif
- [x] Changement de profil sans rechargement de page

**Priorité :** **Should** (V1)
**Statut :** **Implémenté**

---

### US4.3 - Personnalisation avatar

**En tant qu'** élève
**Je veux** choisir mon avatar et ma couleur
**Afin de** personnaliser mon profil

**Critères d'acceptation :**
- [x] Choix parmi 8 couleurs
- [x] Choix parmi 12 avatars (icônes)
- [x] Prévisualisation en temps réel

**Priorité :** **Could** (V1)
**Statut :** **Implémenté**

---

## Épic 5 : Historique & Partage

**Objectif :** Permettre de retrouver et partager les leçons travaillées.

---

### US5.1 - Historique des leçons

**En tant qu'** élève
**Je veux** voir la liste de toutes mes leçons passées
**Afin de** retrouver rapidement un cours

**Critères d'acceptation :**
- [x] Liste chronologique des leçons
- [x] Affichage : titre, matière, date, score QCM
- [x] Clic sur une leçon → affiche le détail complet
- [x] Filtres : matière, type (leçon/correction/guidé)

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

---

### US5.2 - Modification du titre de leçon

**En tant qu'** élève
**Je veux** pouvoir renommer une leçon
**Afin de** mieux m'y retrouver dans mon historique

**Critères d'acceptation :**
- [x] Clic sur le titre → mode édition
- [x] Sauvegarde automatique
- [x] Limite : 100 caractères

**Priorité :** **Could** (V1)
**Statut :** **Implémenté**

---

### US5.3 - Partage public de leçon

**En tant qu'** élève
**Je veux** pouvoir partager une leçon via un lien
**Afin de** aider mes camarades de classe

**Critères d'acceptation :**
- [x] Bouton "Partager" sur chaque leçon
- [x] Génération d'un lien public unique
- [x] Accessible sans authentification
- [x] Affichage : résumé + QCM + questions (pas les réponses de l'élève)

**Priorité :** **Could** (V1)
**Statut :** **Implémenté**

**Différenciation :** Fonctionnalité communautaire unique sur le marché EdTech IA.

---

### US5.4 - Suppression de leçon

**En tant qu'** élève
**Je veux** pouvoir supprimer une leçon de mon historique
**Afin de** nettoyer les tests ou erreurs

**Critères d'acceptation :**
- [x] Bouton "Supprimer" sur chaque leçon
- [x] Confirmation avant suppression
- [x] Suppression définitive (pas de corbeille)

**Priorité :** **Could** (V1)
**Statut :** **Implémenté**

---

## Épic 6 : Système de Tokens & Paiement

**Objectif :** Monétiser l'application via un système de tokens.

---

### US6.1 - Affichage du solde de tokens

**En tant qu'** utilisateur
**Je veux** voir mon solde de tokens en permanence
**Afin de** savoir combien il me reste

**Critères d'acceptation :**
- [x] Affichage en haut de page (header)
- [x] Icône + nombre
- [x] Tooltip explicatif au survol

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

---

### US6.2 - Vérification avant action coûteuse

**En tant que** système
**Je veux** vérifier les tokens avant chaque analyse
**Afin de** bloquer les actions si solde insuffisant

**Critères d'acceptation :**
- [x] Check automatique avant analyse/correction/aide
- [x] Si insuffisant → modal "Acheter des tokens"
- [x] Déduction automatique après analyse réussie

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

---

### US6.3 - Achat de tokens via Stripe

**En tant qu'** utilisateur
**Je veux** acheter des tokens facilement
**Afin de** continuer à utiliser l'app

**Critères d'acceptation :**
- [x] Page dédiée /billing
- [x] 3 offres : 50, 100, 200 tokens
- [x] Paiement via Stripe Checkout
- [x] Redirection automatique après paiement
- [x] Ajout automatique des tokens au compte

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

---

### US6.4 - Tokens gratuits à l'inscription

**En tant que** nouvel utilisateur
**Je veux** recevoir 20 tokens gratuits
**Afin de** tester l'application avant d'acheter

**Critères d'acceptation :**
- [x] 20 tokens ajoutés automatiquement à l'inscription
- [x] Visible dans le profil
- [x] Message de bienvenue expliquant le système

**Priorité :** **Must** (V1)
**Statut :** **Implémenté**

**Décision PO :** 20 tokens = suffisant pour tester 3-4 leçons complètes.

---

## Épic 7 : Authentification & Sécurité

**Objectif :** Sécuriser l'accès à l'application.

---

### US7.1 - Inscription / Connexion

**En tant qu'** utilisateur
**Je veux** créer un compte et me connecter
**Afin de** sauvegarder ma progression

**Critères d'acceptation :**
- [x] Inscription via email + mot de passe
- [x] Connexion via email + mot de passe
- [x] Lien "Mot de passe oublié"
- [x] Session persistante (auto-reconnexion)

**Priorité :** **Must** (V1)
**Statut :** **Implémenté** (via Supabase Auth)

---

### US7.2 - Migration sécurisée OpenAI

**En tant que** PO
**Je veux** sécuriser les appels OpenAI via Edge Functions
**Afin de** éviter la désactivation de la clé API

**Critères d'acceptation :**
- [x] Clé OpenAI stockée dans Supabase Secrets (côté serveur)
- [x] Frontend appelle Edge Functions (pas OpenAI direct)
- [x] Edge Functions proxy vers OpenAI
- [x] Ancien client déprécié mais conservé pour rollback

**Priorité :** **CRITICAL** (bloquant)
**Statut :** **Implémenté**

**Décision PO :** Migration priorisée en urgence suite à 3 désactivations de clé en 1 semaine.

---

## Priorisation Globale (MoSCoW)

### Must-Have (V1)

- Analyse de leçon par photo/PDF/DOCX/texte
- Génération QCM + questions ouvertes
- Correction d'exercices
- Aide guidée
- Multi-profils
- Système de tokens + Stripe
- Historique
- Architecture sécurisée OpenAI

### Should-Have (V1 ou V2)

- Partage public de leçons (fait en V1)
- Réponses vocales (fait en V1)
- Internationalisation FR/EN (fait en V1)
- Dashboard de progression (V2)
- Gamification (V2)

### Could-Have (V2 ou V3)

- Révisions espacées
- Mode professeur
- Analytics avancées
- PWA / App mobile

### Won't-Have (hors scope actuel)

- Vidéoconférence prof-élève
- Marketplace de leçons
- Réseau social éducatif
- API publique

---

## Backlog Refinement Process

**Fréquence :** Hebdomadaire (si équipe)
**Participants :** PO + Dev + (optionnel) UX Designer
**Durée :** 1h

**Agenda type :**
1. Review des US terminées (10 min)
2. Clarification des US prochaines (30 min)
3. Estimation relative (T-shirt sizing) (15 min)
4. Re-priorisation si nécessaire (5 min)

**Output :** Top 5 US prêtes pour le prochain sprint.
