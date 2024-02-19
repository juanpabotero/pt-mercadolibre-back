# Soccer Team

1. Clonar el proyecto
2. Instalar las dependencias con `npm install`
3. Crear un archivo `.env` en la raíz del proyecto en base a `.env.example`
   - `DB_NAME` y `DB_PASSWORD` puede ser cualquier valor, docker se encargará de crear la base de datos con los valores.
4. Levantar la base de datos con `docker-compose up -d`
5. Levantar el proyecto con `npm run start:dev`
6. Ejecutar el script `insert-players.sql` en la base de datos para insertar los jugadores base, se encuentra en
   la raíz del proyecto.
7. Importar en postman la colección `SoccerTeam.postman_collection.json` para probar los endpoints, se encuentra en
   la raíz del poroyecto.
   - Allí se encuentran ejemplos de los endpoints y sus respectivas respuestas.

Se entrega un repositorio de Frontend en Angular que consume este backend. [SoccerTeamFront](https://github.com/juanpabotero/pt-mercadolibre-front).  
Alli estan las instrucciones para levantar el frontend.

## Endpoints

### Equipo

- `GET /team` - Obtener los jugadores titulares

### Entrenamiento

- `POST /training` - Crear un entrenamiento

### Jugadores

- `GET /players` - Obtener todos los jugadores
- `GET /players/:id` - Obtener un jugador por id
- `POST /players` - Crear un jugador
- `DELETE /players/:id` - Eliminar un jugador

## Despliegue

El proyecto se encuentra desplegado en Railway, se puede acceder a través de la siguiente 
URL: [SoccerTeamBack](https://pt-mercadolibre-back-production.up.railway.app/)