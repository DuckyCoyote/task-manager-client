# 📝 Gestión de Tareas - Cliente Angular

Una aplicación moderna de gestión de tareas construida con Angular 19 que incluye autenticación de usuarios, gestión de tareas y filtros inteligentes.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Autenticación completa**: Registro, login y logout de usuarios
- **Gestión de tareas**: Crear, editar, completar y eliminar tareas
- **Filtros inteligentes**: Filtrar tareas por estado (todas, pendientes, completadas)
- **Interfaz responsive**: Diseño adaptable para dispositivos móviles y escritorio
- **Server-Side Rendering (SSR)**: Renderizado del lado del servidor para mejor SEO

### 🎨 Características de UI/UX
- **Diseño moderno**: Interfaz limpia y profesional
- **Animaciones suaves**: Transiciones fluidas entre estados
- **Contadores en tiempo real**: Visualización dinámica del número de tareas
- **Estados visuales**: Diferenciación clara entre tareas pendientes y completadas
- **Confirmaciones**: Diálogos de confirmación para acciones destructivas

## 🛠️ Tecnologías Utilizadas

- **Framework**: Angular 19
- **Lenguaje**: TypeScript
- **Estilos**: CSS3 con variables personalizadas
- **HTTP Client**: Angular HttpClient
- **Formularios**: Angular Reactive Forms
- **Enrutamiento**: Angular Router
- **SSR**: Angular Universal
- **Servidor**: Express.js (para SSR)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── login/                 # Componente de inicio de sesión
│   │   ├── register/              # Componente de registro
│   │   └── task-manager/          # Componente principal de gestión de tareas
│   ├── guards/
│   │   └── auth.guard.ts          # Guard de autenticación
│   ├── interceptors/
│   │   └── auth.interceptor.ts    # Interceptor para tokens JWT
│   ├── models/
│   │   ├── task.model.ts          # Modelo de tarea
│   │   └── user.model.ts          # Modelo de usuario
│   ├── services/
│   │   ├── auth.service.ts        # Servicio de autenticación
│   │   └── task.service.ts        # Servicio de gestión de tareas
│   ├── app.component.*            # Componente raíz
│   ├── app.config.*               # Configuración de la aplicación
│   └── app.routes.ts              # Configuración de rutas
├── styles.css                     # Estilos globales
├── main.ts                        # Punto de entrada de la aplicación
└── server.ts                      # Configuración del servidor SSR
```

## 🔧 Configuración e Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (versión 8 o superior)
- Angular CLI (`npm install -g @angular/cli`)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd client
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar la API**
   - Asegúrate de que el servidor backend esté ejecutándose en `http://localhost:4000/api/v1`
   - Si necesitas cambiar la URL, edita la constante `API_BASE` en:
     - `src/app/services/auth.service.ts`
     - `src/app/services/task.service.ts`

### Ejecución

#### Modo Desarrollo
```bash
npm start
# o
ng serve
```
La aplicación estará disponible en `http://localhost:4200`

#### Modo Producción (con SSR)
```bash
npm run build
npm run serve:ssr:client
```

#### Modo SPA (sin SSR)
```bash
ng build --configuration=spa
```

## 🔐 Autenticación

### Registro de Usuario
- **Ruta**: `/register`
- **Campos**: Nombre, email, contraseña, confirmación de contraseña
- **Validaciones**: Email válido, contraseñas coincidentes

### Inicio de Sesión
- **Ruta**: `/login`
- **Campos**: Email, contraseña
- **Token**: Se almacena en localStorage del navegador

### Protección de Rutas
- Las rutas protegidas requieren autenticación
- Redirección automática a `/login` si no está autenticado
- Guard compatible con SSR

## 📋 Gestión de Tareas

### Crear Tarea
- **Campos**: Título (requerido), descripción (opcional), estado
- **Estados**: Pendiente, Completado

### Filtrar Tareas
- **Todas**: Muestra todas las tareas
- **Pendientes**: Solo tareas pendientes
- **Completadas**: Solo tareas completadas
- **Contadores**: Número de tareas en cada categoría

### Acciones de Tarea
- **Cambiar estado**: Toggle entre pendiente/completado
- **Eliminar**: Con confirmación previa
- **Editar**: Actualización en tiempo real

## 🎨 Estilos y Diseño

### Sistema de Diseño
- **Colores principales**: Azul (#007bff), Verde (#28a745), Rojo (#dc3545)
- **Tipografía**: System fonts stack para mejor rendimiento
- **Grid**: CSS Grid y Flexbox para layouts responsive
- **Componentes**: Cards, botones, formularios con estilos consistentes

### Responsive Design
- **Breakpoints**: 768px (tablet), 480px (móvil)
- **Adaptaciones**: Formularios en columna, botones de filtro apilados
- **Touch-friendly**: Botones y elementos táctiles optimizados

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia servidor de desarrollo
npm run build          # Construye para producción
npm run watch          # Construye en modo watch
npm test               # Ejecuta pruebas unitarias

# SSR
npm run serve:ssr:client  # Sirve la aplicación con SSR
```

## 🐛 Solución de Problemas

### Error "document is not defined"
- **Causa**: Código que accede a APIs del navegador durante SSR
- **Solución**: Ya implementada con verificaciones `isPlatformBrowser()`

### Error de CORS
- **Causa**: Política de CORS del servidor backend
- **Solución**: Configurar CORS en el servidor para permitir `http://localhost:4200`

### Token no persiste
- **Causa**: LocalStorage no disponible o problemas de SSR
- **Solución**: Verificar que `isPlatformBrowser()` esté implementado

## 🔮 Próximas Características

- [ ] **Fechas límite**: Agregar fechas de vencimiento a las tareas
- [ ] **Categorías**: Organizar tareas por categorías o etiquetas
- [ ] **Búsqueda**: Búsqueda en tiempo real por título/descripción
- [ ] **Notificaciones**: Notificaciones push para recordatorios
- [ ] **Modo offline**: Sincronización cuando vuelva la conexión
- [ ] **Temas**: Modo oscuro/claro
- [ ] **Compartir**: Compartir listas de tareas entre usuarios

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

**Desarrollado con ❤️ usando Angular 19**
