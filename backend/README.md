# Backend - Predict Sale App

API REST del sistema web de ventas (proyecto de tesis). Esta primera etapa implementa
los cimientos full-stack: conexión a PostgreSQL, migraciones, seeds y una API mínima.

- **Stack:** Node.js + Express + PostgreSQL (`pg`, sin ORM).
- **Módulo:** ESM (`"type": "module"`).

## 1. Requisitos

- Node.js >= 20 (probado con v24).
- PostgreSQL 13+ en ejecución local (probado con PostgreSQL 17).
- npm.

## 2. Crear la base de datos local

Con `psql` (o `createdb`) en tu PATH:

```bash
createdb -U postgres predict_sale
```

Alternativa con `psql`:

```sql
CREATE DATABASE predict_sale;
```

> Si ya existe la base, omite este paso.

## 2.1. Cliente `psql` / `createdb` (Windows)

Si `psql` no está en el `PATH`, puedes usar la ruta completa, por ejemplo:

```powershell
& "C:\Program Files\PostgreSQL\17\bin\createdb.exe" -U postgres -h localhost -p 5432 predict_sale
```

## 2. Configurar variables de entorno

Copia el archivo de ejemplo y edítalo con tus credenciales locales:

```bash
cp .env.example .env
```

Contenido:

```env
PORT=3001
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/predict_sale
```

> El archivo `.env` está ignorado por git. **No subas contraseñas reales.**

## 3. Instalar dependencias

```bash
npm install
```

## 4. Ejecutar migraciones

Crea las tablas del esquema inicial. El script registra las migraciones ya aplicadas
en la tabla `schema_migrations`, por lo que puede ejecutarse varias veces sin duplicar.

```bash
npm run db:migrate
```

## 5. Cargar datos seed

Carga los servicios base y un **historial de ventas SIMULADO** (datos ficticios para
pruebas de dashboard y futuras pruebas de Machine Learning).

> **Aviso:** `npm run db:seed` reinicia la tabla `sales` y la reemplaza con los datos
> simulados. No ejecutar sobre una base con ventas reales que quieras conservar.

```bash
npm run db:seed
```

Estos datos **no son reales** de la empresa y no contienen información de clientes.

## 6. Iniciar el backend

Modo desarrollo (reinicio automático al guardar):

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

La API queda disponible en `http://localhost:3001`.

## 7. Iniciar el frontend

En otra terminal:

```bash
cd ../frontend
npm install
npm run dev
```

El frontend se sirve en `http://localhost:5173` y el backend ya permite CORS para ese origen.

## Endpoints disponibles

| Método | Ruta            | Descripción                                  |
| ------ | --------------- | -------------------------------------------- |
| GET    | `/api/health`   | Estado de la API y de la conexión a la BD    |
| GET    | `/api/services` | Lista los servicios activos                  |
| GET    | `/api/leads`    | Lista los leads                              |
| POST   | `/api/leads`    | Crea un lead                                 |
| GET    | `/api/quotes`   | Lista las cotizaciones                       |
| POST   | `/api/quotes`   | Crea una cotización básica                   |
| GET    | `/api/sales`    | Lista las ventas                             |

### Validaciones

- `POST /api/leads` requiere `full_name` y al menos `email` o `phone`.
- `POST /api/quotes` requiere `lead_id`, `project_type`, `estimated_min` y `estimated_max`.
  El `lead_id` debe existir y `estimated_max` debe ser >= `estimated_min`.

### Ejemplos

```bash
curl http://localhost:3001/api/health

curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d "{\"full_name\":\"Ana Perez\",\"email\":\"ana@example.com\",\"phone\":\"999111222\"}"

curl -X POST http://localhost:3001/api/quotes \
  -H "Content-Type: application/json" \
  -d "{\"lead_id\":1,\"project_type\":\"Web corporativa\",\"estimated_min\":1800,\"estimated_max\":2600}"
```

## Estructura

```
backend/
  src/
    config/       Conexión a PostgreSQL (pool de pg)
    controllers/  Manejo de request/response y validaciones
    routes/       Definición de rutas y montaje bajo /api
    services/     Acceso a datos (consultas SQL)
    middleware/   Manejo de errores y rutas no encontradas
    utils/        Helpers (validaciones, generación de código de cotización)
    app.js        Configuración de Express (CORS, JSON, rutas)
    server.js     Arranque del servidor
  database/
    migrations/   Archivos .sql de esquema
    seeds/        Archivos .sql de datos iniciales
    scripts/      Ejecutores de migraciones y seeds
  .env.example
  package.json
  README.md