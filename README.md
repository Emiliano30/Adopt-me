# 🐾 AdoptMe API - Backend Architecture & Mocking System

![NodeJS](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Winston](https://img.shields.io/badge/Winston-Logging-FF6C37?style=for-the-badge&logo=logstash&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-Testing-8D6748?style=for-the-badge&logo=mocha&logoColor=white)

API RESTful profesional construida con arquitectura en capas, sistema de inyección de dependencias (Repository/DAO), gestión centralizada de errores, sistema avanzado de logging multinivel con Winston y módulo completo de Mocking & Data Seeding con Faker.js.

---

## 📌 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Tecnologías y Librerías](#-tecnologías-y-librerías)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Documentación de Endpoints](#-documentación-de-endpoints)
  - [Módulo de Mocks y Seeding](#1-módulo-de-mocks-y-seeding-apimocks)
  - [Sistema de Logger](#2-sistema-de-logger)
  - [Recursos Principales (Users & Pets)](#3-recursos-principales)
- [Sistema de Logging con Winston](#-sistema-de-logging-con-winston)
- [Testing Automatizado](#-testing-automatizado)

---

## 🚀 Características Principales

- **Arquitectura en Capas:** Desacoplamiento total entre Routers, Controllers, Services, Repositories y DAOs.
- **Inyección de Dependencias:** Permite alternar fácilmente entre DAOs reales de MongoDB y DAOs Mock en memoria para testing y simulación.
- **Patrón Singleton:** Conexión persistente y única a la base de datos mediante `MongoSingleton`.
- **Módulo de Mocking & Seeding (`/api/mocks`):** Generación masiva de datos estructurados con Faker.js y poblado automático de MongoDB mediante `POST /generateData`.
- **Logging Multinivel con Winston:** Separación estricta de entornos (Desarrollo vs Producción) y almacenamiento de errores en `errors.log`.
- **Manejo Centralizado de Errores:** Middleware global (`errorHandler`) asistido por wrapper asíncrono (`asyncHandler`) y `CustomError`.
- **Testing Exhaustivo:** Tests unitarios y de integración con Mocha, Chai y Supertest.

---

## 🏗 Arquitectura del Proyecto

```text
src/
├── config/
│   └── mongoose.config.js      # Conexión Singleton a MongoDB Atlas
├── controllers/
│   ├── adoptions.controller.js
│   ├── mock.controller.js       # Controlador del módulo de mocking y seed
│   ├── pets.controller.js
│   ├── sessions.controller.js
│   └── users.controller.js
├── dao/
│   ├── Adoption.js
│   ├── Pets.dao.js             # DAO de MongoDB para Mascotas
│   └── Users.dao.js            # DAO de MongoDB para Usuarios
├── dto/
│   ├── Pet.dto.js
│   └── User.dto.js
├── middleware/
│   └── errorHandler.js         # Middleware global de captura de errores
├── models/
│   ├── Adoption.js
│   ├── Pet.js                  # Esquema Mongoose para Mascotas
│   └── User.js                 # Esquema Mongoose para Usuarios
├── repository/
│   ├── GenericRepository.js    # Repositorio genérico base
│   ├── PetRepository.js
│   └── UserRepository.js
├── routes/
│   ├── adoption.router.js
│   ├── mocks.router.js         # Router montado bajo /api/mocks
│   ├── pets.router.js
│   ├── sessions.router.js
│   └── users.router.js
├── services/
│   ├── index.js                # Instancias de repositorios con DAOs reales
│   └── mocks.service.js        # Instancias de repositorios con DAOs Mocks
├── test/
│   ├── mocks/
│   │   ├── pets.dao.mock.js    # DAO simulado para mascotas
│   │   ├── pets.mock.js        # Generador Faker de mascotas
│   │   ├── users.dao.mock.js   # DAO simulado para usuarios
│   │   └── users.mock.js       # Generador Faker de usuarios
│   ├── asyncHandler.test.js    # Unit test de asyncHandler
│   ├── errorHandler.test.js    # Integration test de errorHandler
│   ├── logger.test.js          # Test de endpoint /loggerTest
│   ├── pets.mock.test.js       # Tests de mocks de mascotas
│   └── users.mock.test.js      # Tests de mocks de usuarios
├── utils/
│   ├── asyncHandler.js         # Wrapper para control de promesas en controllers
│   ├── CustomError.js          # Clase de error personalizada
│   ├── index.js                # Utilidades de hashing con Bcrypt
│   ├── logger.js               # Configuración Winston y middleware addLogger
│   └── uploader.js             # Middleware Multer para subida de imágenes
└── app.js                      # Punto de entrada y configuración de Express
```

---

## 🛠 Tecnologías y Librerías

| Tecnología | Descripción |
|---|---|
| **Node.js (v20+)** | Entorno de ejecución JavaScript con soporte nativo de ES Modules |
| **Express.js** | Framework web para la construcción de la API REST |
| **Mongoose** | ODM para la persistencia de datos en MongoDB Atlas |
| **Winston** | Motor de logging avanzado con niveles customizados y transportes múltiples |
| **Bcrypt** | Hashing seguro de contraseñas |
| **@faker-js/faker** | Generación masiva y realista de datos simulados |
| **Mocha & Chai** | Framework de pruebas y librería de aserciones |
| **Supertest** | Pruebas de integración sobre endpoints HTTP |

---

## ⚙ Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone <url-del-repositorio>
cd RecursosBackend-Adoptme-main
npm install
```

### 2. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
PORT=8080
NODE_ENV=development
MONGO_URL=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

### 3. Scripts disponibles
```bash
# Iniciar en modo producción
npm start

# Iniciar en modo desarrollo con nodemon
npm run dev

# Ejecutar todos los tests automatizados
npm test
```

---

## 📡 Documentación de Endpoints

### 1. Módulo de Mocks y Seeding (`/api/mocks`)

#### 🔹 `GET /api/mocks/mockingpets`
Genera una colección de mascotas ficticias.
- **Query Params opcionales:** `?quantity=100` (por defecto 100).
- **Respuesta (200 OK):**
```json
{
  "status": "success",
  "payload": [
    {
      "name": "Lucky",
      "specie": "dog",
      "birthDate": "2021-04-12T00:00:00.000Z",
      "adopted": false,
      "image": "https://picsum.photos/..."
    }
  ]
}
```

#### 🔹 `GET /api/mocks/mockingusers`
Genera una colección de usuarios simulados listos para MongoDB.
- **Características:** Contraseña fija `"coder123"` hasheada con bcrypt, roles variables (`user`/`admin`) y `pets: []`.
- **Query Params opcionales:** `?quantity=50` (por defecto 50).
- **Respuesta (200 OK):**
```json
{
  "status": "success",
  "payload": [
    {
      "first_name": "Juan",
      "last_name": "Pérez",
      "email": "juan.perez@example.com",
      "password": "$2b$10$abcdefghijklmnopqrstuvwxyz...",
      "role": "user",
      "pets": []
    }
  ]
}
```

#### 🔹 `POST /api/mocks/generateData`
**Poblador de Base de Datos (Data Seeder)**: Genera la cantidad especificada de usuarios y mascotas mockeados y los inserta de manera persistente en MongoDB.
- **Request Body (JSON):**
```json
{
  "users": 10,
  "pets": 5
}
```
- **Respuesta (200 OK):**
```json
{
  "status": "success",
  "message": "Datos creado y guardados con exito!"
}
```

---

### 2. Sistema de Logger

#### 🔹 `GET /loggerTest`
Dispara todos los niveles de log soportados por Winston para comprobar su salida en consola y archivo según el entorno actual.
- **Respuesta (200 OK):** `"Los logs fueron probado"`

---

### 3. Recursos Principales

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/users` | Obtiene todos los usuarios persistidos en MongoDB |
| `GET` | `/api/pets` | Obtiene todas las mascotas persistidas en MongoDB |
| `POST` | `/api/sessions/register` | Registro de usuario |
| `POST` | `/api/sessions/login` | Inicio de sesión con JWT |
| `GET` | `/api/adoptions` | Lista de adopciones |

---

## 📋 Sistema de Logging con Winston

Se diseñó un esquema de prioridades personalizadas (de menor a mayor gravedad):

| Nivel | Prioridad Winston | Consola Dev | Consola Prod | Archivo `errors.log` |
|:---:|:---:|:---:|:---:|:---:|
| `debug` | 5 | ✅ | ❌ | ❌ |
| `http` | 4 | ✅ | ❌ | ❌ |
| `info` | 3 | ✅ | ✅ | ❌ |
| `warning` | 2 | ✅ | ✅ | ❌ |
| `error` | 1 | ✅ | ✅ | ✅ |
| `fatal` | 0 | ✅ | ✅ | ✅ |

* **Desarrollo:** Registra desde `debug` hacia arriba en consola.
* **Producción:** Registra desde `info` hacia arriba en consola, y almacena desde `error` en el archivo `errors.log`.

---

## 🧪 Testing Automatizado

El proyecto cuenta con suites de pruebas unitarias y de integración desarrolladas con **Mocha**, **Chai** y **Supertest**:

```bash
# Correr todas las suites de prueba
npx mocha src/test/*.test.js --exit
```

### Cobertura de Tests:
- `users.mock.test.js`: Valida la estructura del usuario generado, arrays de respuesta y el `UserRepository` trabajando en aislamiento con `UsersDaoMock`.
- `pets.mock.test.js`: Valida la estructura de mascotas y el `PetRepository` con `PetsDaoMock`.
- `logger.test.js`: Valida el endpoint `/loggerTest` y la ejecución de los transportes de Winston.
- `asyncHandler.test.js`: Valida la captura de errores síncronos y asíncronos hacia la función `next()`.
- `errorHandler.test.js`: Valida las respuestas HTTP ante errores personalizados `CustomError`.

---

## 👨‍💻 Autor

Desarrollado como parte del módulo de Backend Avanzado - Coderhouse.
