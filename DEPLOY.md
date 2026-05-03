# Déploiement – Kit génération numérique

## 1. Prérequis

- Compte [Netlify](https://netlify.com) (gratuit)
- Compte [GitHub](https://github.com) (gratuit)
- Node.js 20+

## 2. Mise en place locale

```bash
cd kit-generation-numerique
npm install
npm run dev
```

Ouvrir http://localhost:3000

## 3. Ajouter les logos

Copier les fichiers dans `public/logos/` :
- `loiret.png`
- `agir-jeunes.png`

## 4. Déploiement sur Netlify

### Via l'interface Netlify

1. Pousser le code sur un repo GitHub
2. Sur Netlify : **New site > Import from Git**
3. Sélectionner le repo → les paramètres `netlify.toml` sont détectés automatiquement
4. Déployer

### Activer Netlify Identity

1. Dans Netlify : **Site settings > Identity > Enable Identity**
2. Sous **Registration** : passer en **Invite only**
3. Sous **External providers** : optionnel (Google, etc.)
4. Sous **Git Gateway** : **Enable Git Gateway**

### Créer le compte admin

1. Identity > **Invite users** → envoyer l'invitation à l'adresse admin
2. Cliquer sur le lien reçu par email → créer le mot de passe
3. Dans Identity, ouvrir le compte → **Roles** → ajouter `admin`

## 5. Interface d'administration

URL : `https://votre-site.netlify.app/admin`

Connectez-vous avec le compte admin pour :
- Ajouter des fiches mémo (images ou PDF)
- Ajouter ou modifier des jeux
- Gérer les thématiques

## 6. Ajouter des fiches

1. Aller sur `/admin`
2. **Fiches mémo > New Fiche**
3. Renseigner : titre, thématique, sous-thématique, type (image/pdf), uploader le fichier
4. **Publish** → commit automatique → déploiement déclenché (~1-2 min)

## 7. Icônes PWA

Générer `icon-192.png` et `icon-512.png` sur https://realfavicongenerator.net/
Les placer dans `public/icons/`
