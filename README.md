# Project Architecture

You can find the NestJS project in the folder `likewatt-api-test-technique`.  
The Docker project is located in the folder `docker`.

# How to Start

You must copy the `.env.example` file to `.env` in NestJS project
```bash
cd /path/to/repository/likewatt-api-test-technique
cp .env.example .env
```
And update the `.env` database credentials *(you can use the credentials `user : user_password` as defined in `/docker/docker-compose.yml`)*

Then navigate to the Docker folder and build the Docker Compose environment:
```bash
cd /path/to/repository/docker
docker-compose up -d --build
```

After a few seconds, the API will be available at [http://localhost:3000](http://localhost:3000).  
To test the API, a Postman collection is available at the root of this repository: `/Likewatt-Test-Technique.postman_collection.json`.

# Explanations

## Docker

- We set up two containers:
  - **api**
    - Contains the NestJS API, which is exposed on port 3000.
    - Uses the "db" container as the database host.
      - Uses the credentials "user:user_password," as we don't need root privileges for this use case.
  - **db**
    - Configured with the "user:user_password" credentials.
  
- **api**
  - Uses the `wait-for-it` script.
    - During the first launch, we must wait a few seconds for the database to initialize; otherwise, the API will throw timeout exceptions.
    - This script is sourced from [GitHub](https://github.com/vishnubob/wait-for-it) and is designed for this use case.
      - Once the script finishes, we start the API service.
  - **Persistence**
    - No persistence has been set up for this container since the API does not write files or require any persistence, apart from the database.

- **db**
  - For this example, the database content is saved in `./docker/mysql-data` to retain database modifications between reboots.
  - The database is linked to port 3306 on the host. In a real scenario, we would restrict access to only the `api` container.

## Code

I had never used NestJS before this exercise.  
I implemented a `.env` file to configure access to the database.

Then, I created a `Project` module with its corresponding routes and DTOs.

I have added comments to the code that I wrote.

In this use case, I decided to implement integrity checks in the controller (to check if a project exists before updating or deleting) since I only have a few routes and models.
