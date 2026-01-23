# Sistema Bancario - Microservicios

Este proyecto consiste en una aplicación bancaria con una arquitectura de microservicios (Backend) y una interfaz de usuario (Frontend).

## Estructura del Proyecto

- `backend/`: Código fuente de la API REST (Java + Spring Boot).
- `frontend/`: Código fuente de la interfaz de usuario (React).
- `BaseDatos.sql`: Script de inicialización de la base de datos.
- `docker-compose.yml`: Orquestación de contenedores.

## Tecnologías

### Backend
- Java 17
- Spring Boot 3.4.0
- PostgreSQL
- JUnit 5 / Mockito
- OpenAPI / Swagger

### Frontend
- React
- Vite
- React Testing Library

## Instrucciones de Despliegue

### Requisitos Previos
- Docker y Docker Compose instalados.
- Java 17 (para desarrollo local).
- Node.js (para desarrollo local).

### Pasos para ejecutar con Docker



1. **Ejecutar la Aplicación Completa**:
   Levanta la base de datos, el backend y el frontend:
   ```bash
   docker-compose up --build -d
   ```
   - **Frontend**: `http://localhost` o `http://localhost:5173`
   - **API Backend**: `http://localhost:8080`
   - **Swagger UI**: `http://localhost:8080/swagger-ui.html` 

2. **Ejecutar SOLO el Backend y Base de Datos**:
   Útil si prefieres correr el frontend de forma local para desarrollo:
   ```bash
   docker-compose up --build -d backend-app
   ```
   *Docker iniciará automáticamente el servicio de base de datos debido a las dependencias.*

3. **Detener los servicios**:
   ```bash
   docker-compose down
   ```

## Base de Datos
El archivo `BaseDatos.sql` se ejecuta automáticamente al iniciar el contenedor de postgres por primera vez.

## Pruebas
Para ejecutar las pruebas del backend:
```bash
cd backend

./mvnw test

o 
# (si se encuentra en la carpeta backend y se tiene instalado maven)
mvn test  
```

Para ejecutar las pruebas del frontend:
```bash
cd frontend

npm test
```