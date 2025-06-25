# Utilise Node.js 20 en version Alpine (légère)
FROM node:20-alpine

# Définir le dossier de travail
WORKDIR /usr/src/app

# Copier uniquement package.json pour installer les dépendances en premier (cache Docker)
COPY package.json ./

# Installer les dépendances en mode production
RUN npm install --production

# Copier le fichier de code
COPY app.js ./

# Exposer le port sur lequel l'app écoute ses métriques
EXPOSE 8080

# Commande par défaut
CMD ["npm", "start"]
