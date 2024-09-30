FROM node:22-alpine

WORKDIR /app

# Installer bash pour le script "wait-for-it"
RUN apk add --no-cache bash

# Copier le reste des fichiers de l’application
COPY likewatt-api-test-technique/ .

# Installation des dépendances
RUN npm install

# Installe le script "wait-for-it" dans le container
COPY docker/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Exposer le port de l'API
EXPOSE 3000

# Démarre l'appli après avoir attendu que la base de données soit correctement démarrée (timeout de 60 secondes, mode strict).
# Si la base de données est prête avant 60 secondes, le script n'attend pas la fin des 60 secondes, il se connecte directement.
CMD ["wait-for-it", "db:3306", "-s", "--timeout=60", "--", "npm", "run", "start"]
