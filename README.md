# Taxi24
## Code Challenge BE


/*
Para temas de posicionamiento en tiempo real, supongo seria una api externa,
con la cual se pueden ver los conductores disponibles mas cercanos
*/


### Travel Status
    "1": "Active",
    "2": "Completed"

### Requisitos:
    "node": "18.x",
    "npm": "8.x"


### Para correr el poryecto desde la consola debe ejecutar los siguiente commando:
1. Crear el archivo .env en base a .env_example con las respectivas credenciales para postgres.
2. npm install
3. npm run build
4. npm run migration:run
5. npm run start:prod

### Todas la documentacion esta en la ruta relativa: {BASE_URL}/docs
    Ej: http://localhost:3001/docs