# Soccer Team

Se desarrolla la aplicación usando Nest.js (Framework de Node.js) y TypeORM.  
Se utiliza una base de datos PostgreSQL y Docker para levantar la base de datos.

## Instrucciones

1. Clonar el proyecto
2. Instalar las dependencias con `npm install`
3. Crear un archivo `.env` en la raíz del proyecto en base a `.env.example`
   - `DB_NAME` y `DB_PASSWORD` puede ser cualquier valor, docker se encargará de crear la base de datos con los valores.
4. Levantar la base de datos con `docker-compose up -d`
5. Levantar el proyecto con `npm run start:dev`
6. Conectarse a la base de datos con cualquier gestor de base de datos, poner las credenciales de las variables de entorno.
7. Ejecutar el script `insert-players.sql` en la base de datos para insertar los jugadores base, se encuentra en
   la raíz del proyecto. (Los jugadores también se podrían crear desde el frontend).
8. Importar en postman la colección `SoccerTeam.postman_collection.json` para probar los endpoints, se encuentra en
   la raíz del proyecto.
   - Se deberia cambiar la variable `host` en la colección por el valor que se desea, por defecto es `http://localhost:3000`
   - Allí se encuentran ejemplos de los endpoints y sus respectivas respuestas.

Se entrega un repositorio de Frontend en Angular que consume este backend. [SoccerTeamFront](https://github.com/juanpabotero/pt-mercadolibre-front).  
Allí estan las instrucciones para levantar ese proyecto.

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
