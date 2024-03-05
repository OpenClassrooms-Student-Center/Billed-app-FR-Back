# Billapp backend

================ FR ====================

## Comment lancer l'API en local avec Docker:

### Prérequis:

Assurez-vous d'avoir Docker installé sur votre machine. Pour vérifier si Docker est installé, exécutez:

```bash
docker --version
```

Si vous n'avez pas Docker, suivez les instructions d'installation sur [le site officiel de Docker](https://docs.docker.com/get-docker/).

### Cloner le projet:

```bash
git clone https://github.com/fischer-c187/Docker-Billed-app-FR-Back.git
```

### Acceder au repertoire du projet :

```
cd Billed-app-FR-Back
```

### Construire l'image Docker

Pour construire l'image Docker à partir de votre `Dockerfile`, exécutez la commande suivante dans le répertoire où se trouve votre `Dockerfile` :

```bash
docker build -t billed-backend .
```

### Exécuter le conteneur Docker

Une fois l'image construite, vous pouvez exécuter un conteneur basé sur cette image avec la commande suivante :

```bash
docker run -p 5678:5678 --name billed -d billed-backend
```

### Arrêter le conteneur Docker

Pour arrêter le conteneur, utilisez la commande suivante :

```bash
docker stop billed
```

### Relancer le conteneur Docker

Pour relancer le conteneur, utilisez la commande suivante :

```bash
docker start billed
```

### Supprimer le conteneur Docker

Après avoir arrêté le conteneur, vous pouvez le supprimer avec la commande suivante :

```bash
docker rm billed
```

### Accéder à l'API :

L'api est accessible sur le port `5678` en local, c'est à dire `http://localhost:5678`

## Utilisateurs par défaut:

### administrateur :

```
utilisateur : admin@test.tld
mot de passe : admin
```

### employé :

```
utilisateur : employee@test.tld
mot de passe : employee
```

================ EN ====================

### Prerequisites:

Ensure you have Docker installed on your machine. To check if Docker is installed, run:

```bash
docker --version
```

### Clone the projet:

```
git clone https://github.com/fischer-c187/Docker-Billed-app-FR-Back.git
```

If you don't have Docker, follow the installation instructions on [the official Docker website](https://docs.docker.com/get-docker/).

### Go to the project directory :

```
cd Billed-app-FR-Back
```

### Build the Docker Image

To build the Docker image from your `Dockerfile`, run the following command in the directory where your `Dockerfile` is located:

```bash
docker build -t billed-backend .
```

### Run the Docker Container

Once the image is built, you can run a container based on this image with the following command:

```bash
docker run -p 5678:5678 --name billed -d billed-backend
```

### Stop the Docker Container

To stop the container, use the following command:

```bash
docker stop billed
```

### Restart the Docker Container

To restart the container, use the following command:

```bash
docker start billed
```

### Remove the Docker Container

After stopping the container, you can remove it with the following command:

```bash
docker rm billed
```

### Access to the PAI :

The API is locally available on port `5678`, go to `http://localhost:5678`

### administrateur :

```
utilisateur : admin@company.tld
mot de passe : admin
```

### employé :

```
utilisateur : employee@company.tld
mot de passe : employee
```
