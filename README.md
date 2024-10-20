# Proyecto: Aplicación Full-Stack con Docker, React, Node.js y PostgreSQL

Este proyecto es una aplicación full-stack que utiliza **React** para el frontend, **Node.js** y **Express** para el backend, y **PostgreSQL** como base de datos. La aplicación está completamente dockerizada para un despliegue y desarrollo sencillo.

---

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Despliegue](#despliegue)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Mejores Prácticas](#mejores-prácticas)
- [Seguridad](#seguridad)

---

## Requisitos

Antes de instalar y ejecutar la aplicación, asegúrate de tener lo siguiente instalado en tu sistema:

1. [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/)
2. [Git](https://git-scm.com/)
3. [Node.js](https://nodejs.org/) (Solo si deseas ejecutar el proyecto sin Docker)

---

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local.

### Clonar el repositorio

```bash
git clone https://github.com/kevin-lo-al-98/prueba-tecnica-node-1
.git
cd prueba-tecnica-node-1
```

---

## Despliegue

### Variables de Entorno

Para configurar las variables de entorno del frontend y backend, asegúrate de crear los archivos .env en sus respectivas carpetas. Estos archivos se usarán para definir la configuración sensible como la URL de la API y las credenciales de la base de datos.

#### Frontend (ubicado en frontend/.env):
Este archivo contiene la URL base de la API para el frontend.

VITE_API_URL=http://localhost:3001/api


#### Backend (ubicado en backend/.env):
Este archivo define las configuraciones del servidor backend, como la base de datos y el secreto JWT para la autenticación.

DATABASE_URL=postgres://root:root@db:5432/pruebatecnicadb
JWT_SECRET=tu_llave_secreta_jwt
PORT=3001

---

### Ejecutar la aplicación con Docker
Para ejecutar la aplicación en tu entorno local, utilizamos Docker. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

Iniciar los contenedores
Ejecuta el siguiente comando en la raíz del proyecto para levantar los contenedores del frontend, backend y la base de datos.

```bash
docker-compose up --build
```

Este comando:

Construye las imágenes Docker de cada servicio (frontend, backend y base de datos).
Levanta los contenedores con los puertos necesarios.

### Acceso a la Aplicación
Frontend: La aplicación React estará disponible en http://localhost:5173.
Backend: El servidor Node.js estará disponible en http://localhost:3001.
Base de Datos: PostgreSQL estará disponible en localhost:5432. Puedes conectarte con el usuario root y la contraseña root.

#### Parar los contenedores
Cuando hayas terminado de trabajar con la aplicación, puedes detener y eliminar los contenedores ejecutando:

```bash
docker-compose down
```

---

## Estructura del Proyecto
Aquí tienes una vista general de la estructura del proyecto para facilitar la navegación.

.
├── backend
│   ├── src
│   │   ├── controllers        # Lógica del negocio y manejo de peticiones
│   │   ├── models             # Modelos de base de datos utilizando Sequelize
│   │   ├── routes             # Definición de rutas de la API
│   │   └── app.js             # Punto de entrada del servidor
│   ├── .env                   # Variables de entorno para el backend
│   ├── dockerfile             # Dockerfile del backend
│   └── package.json           # Dependencias del backend
├── frontend
│   ├── src
│   │   ├── components         # Componentes de React
│   │   ├── api                # Lógica de llamadas a la API
│   │   ├── App.jsx            # Componente principal
│   │   └── index.js           # Punto de entrada del frontend
│   ├── .env                   # Variables de entorno para el frontend
│   ├── dockerfile             # Dockerfile del frontend
│   └── package.json           # Dependencias del frontend
├── docker-compose.yml          # Configuración de Docker Compose
└── README.md                   # Documentación del proyecto

---

## Mejores Prácticas

Durante el desarrollo y despliegue de este proyecto, se han seguido varias mejores prácticas para asegurar su calidad, escalabilidad y seguridad:

Modularización del código: Tanto en el backend como en el frontend, el código está modularizado en componentes (en React) y rutas/controladores (en Node.js). Esto facilita la escalabilidad y mantenimiento del proyecto.

Uso de Docker: La aplicación está completamente dockerizada, lo que permite que cualquier desarrollador pueda levantar el entorno sin importar su configuración local. Esto garantiza la consistencia entre entornos de desarrollo y producción.

Control de versiones con Git: Se sigue un flujo de trabajo basado en Git para asegurar que todos los cambios en el código estén versionados. Se recomienda usar ramas para nuevas funcionalidades y solicitudes de extracción (Pull Requests) para una revisión adecuada.

Separación de Responsabilidades:

El frontend y el backend son independientes, lo que permite el desarrollo separado y facilita la escalabilidad en proyectos más grandes.
Cada servicio tiene su propio Dockerfile y configuración de entorno, lo que mejora la portabilidad.
Uso de Variables de Entorno: Las configuraciones sensibles como credenciales o URLs se manejan mediante archivos .env que no se suben al repositorio. Esto permite una fácil configuración y seguridad en diferentes entornos (desarrollo, producción, etc.).

---

## Seguridad

Se han tomado medidas de seguridad para proteger tanto los datos de la aplicación como la arquitectura del sistema:

Autenticación JWT:

Se utiliza JSON Web Tokens (JWT) para manejar la autenticación de los usuarios. El token JWT es almacenado en el cliente de forma segura y utilizado para proteger rutas privadas en el backend.
Los tokens tienen una expiración definida y se verifican en cada solicitud para asegurar la autenticidad de los usuarios.
Protección contra ataques de SQL Injection y XSS:

En el backend, todas las consultas a la base de datos están parametrizadas utilizando el ORM Sequelize para evitar inyecciones SQL.
Para prevenir Cross-Site Scripting (XSS), las entradas del usuario son saneadas con la librería validator tanto en el frontend como en el backend.
Manejo seguro de contraseñas:

Las contraseñas de los usuarios son encriptadas usando bcrypt antes de almacenarlas en la base de datos.
Las contraseñas nunca se almacenan ni transmiten en texto plano.
Helmet en el Backend:

El servidor Express utiliza la librería Helmet para establecer cabeceras HTTP seguras y proteger contra ataques comunes como XSS y clickjacking.
Limitación de intentos de inicio de sesión:

Para prevenir ataques de fuerza bruta, se pueden implementar limitaciones en los intentos de inicio de sesión, aunque esta funcionalidad está en la lista de futuras mejoras.