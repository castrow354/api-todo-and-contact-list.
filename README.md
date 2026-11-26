# API REST y Frontend Unificado: Lista de Tareas y Lista de Contactos

Proyecto desarrollado como práctica de integración entre un servidor backend construido con **Node.js y Express** y dos interfaces web interactivas manipuladas mediante el **DOM y Fetch API**.

## Estructura del Proyecto

* `src/server.js`: Servidor Express con rutas REST (`GET`, `POST`, `PUT`, `DELETE`) para `/tareas` y `/contactos`.
* `public/index.html`: Menú principal unificado para navegar entre ambos módulos.
* `public/tareas/`: Interfaz web para gestionar tareas (crear, listar, marcar como completada, editar y eliminar).
* `public/contactos/`: Interfaz web para gestionar contactos personales (crear, listar, editar y eliminar).

## Cómo ejecutar el proyecto localmente

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir en el navegador: `http://localhost:3000`

## Aprendizajes y Uso de Inteligencia Artificial

* **Arquitectura Cliente-Servidor:** Comprensión de cómo un navegador web (Frontend) envía peticiones HTTP (`GET`, `POST`, `PUT`, `DELETE`) usando `fetch` hacia un servidor Express (Backend) en formato JSON.
* **Control de Versiones con Git y GitHub:** Uso de `.gitignore` para excluir `node_modules` y manejo de commits y ramas desde la terminal de Visual Studio Code.
* **Uso de IA como tutor técnico:** Se utilizó inteligencia artificial para diagnosticar errores de entorno en Windows (políticas de ejecución en PowerShell y nombres de carpetas), estructurar las rutas REST en Express y conectar dinámicamente los formularios HTML con los endpoints del servidor.
