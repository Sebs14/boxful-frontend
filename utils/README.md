/**
 * AUTENTICACIÓN - Guía de uso
 *
 * Esta carpeta contiene todas las utilidades para manejar la autenticación
 * en el frontend de la aplicación.
 */

////////////////////////////////////////////////////////////////////////////////
// 1. CONFIGURACIÓN DE API
////////////////////////////////////////////////////////////////////////////////

/**
 * Archivo: utils/api.ts
 *
 * Configuración base para las llamadas a la API del backend.
 * Incluye manejo de errores y configuración de headers.
 */

////////////////////////////////////////////////////////////////////////////////
// 2. FUNCIONES DE AUTENTICACIÓN
////////////////////////////////////////////////////////////////////////////////

/**
 * Archivo: utils/auth.ts
 *
 * Contiene las funciones principales para interactuar con los endpoints de auth:
 *
 * - authAPI.login(credentials) - Iniciar sesión
 * - authAPI.register(userData) - Registrar usuario
 * - authAPI.getProfile(token) - Obtener perfil de usuario
 *
 * También incluye utilidades para manejo de tokens:
 *
 * - tokenUtils.setToken(token) - Guardar token
 * - tokenUtils.getToken() - Obtener token
 * - tokenUtils.removeToken() - Eliminar token
 * - tokenUtils.isAuthenticated() - Verificar si está autenticado
 */

////////////////////////////////////////////////////////////////////////////////
// 3. CONTEXTO DE AUTENTICACIÓN
////////////////////////////////////////////////////////////////////////////////

/**
 * Archivo: utils/auth-context.tsx
 *
 * Hook personalizado para manejar el estado de autenticación global.
 *
 * Uso en componentes:
 *
 * ```tsx
 * import { useAuth } from '../utils/auth-context';
 *
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout, isLoading } = useAuth();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   if (!isAuthenticated) {
 *     return <LoginForm />;
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Welcome {user?.name}!</h1>
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   );
 * }
 * ```
 */

////////////////////////////////////////////////////////////////////////////////
// 4. EJEMPLOS DE USO
////////////////////////////////////////////////////////////////////////////////

/**
 * LOGIN:
 *
 * ```tsx
 * const { login } = useAuth();
 *
 * const handleLogin = async () => {
 *   try {
 *     await login('user@example.com', 'password123');
 *     // Usuario autenticado, redirigir...
 *   } catch (error) {
 *     console.error('Login failed:', error.message);
 *   }
 * };
 * ```
 */

/**
 * REGISTER:
 *
 * ```tsx
 * const { register } = useAuth();
 *
 * const handleRegister = async () => {
 *   try {
 *     await register({
 *       email: 'user@example.com',
 *       name: 'Juan',
 *       lastname: 'Pérez',
 *       gender: 'Masculino',
 *       dateOfBirth: '1990-01-01',
 *       phone: '+50377777777',
 *       password: 'password123'
 *     });
 *     // Usuario registrado, mostrar mensaje de éxito...
 *   } catch (error) {
 *     console.error('Registration failed:', error.message);
 *   }
 * };
 * ```
 */

/**
 * GET PROFILE:
 *
 * ```tsx
 * const { getProfile, user } = useAuth();
 *
 * useEffect(() => {
 *   if (isAuthenticated && !user) {
 *     getProfile();
 *   }
 * }, [isAuthenticated, user]);
 * ```
 */

////////////////////////////////////////////////////////////////////////////////
// 5. ENDPOINTS DEL BACKEND
////////////////////////////////////////////////////////////////////////////////

/**
 * POST /auth/register
 * - Registra un nuevo usuario
 * - Body: { email, name, lastname, gender, dateOfBirth, phone, password }
 * - Response: User data without password
 */

/**
 * POST /auth/login
 * - Inicia sesión
 * - Body: { email, password }
 * - Response: { access_token: string }
 */

/**
 * GET /auth/profile
 * - Obtiene el perfil del usuario autenticado
 * - Headers: { Authorization: Bearer <token> }
 * - Response: User profile data
 */

////////////////////////////////////////////////////////////////////////////////
// 6. CONFIGURACIÓN DE ENTORNO
////////////////////////////////////////////////////////////////////////////////

/**
 * Archivo: .env.local
 *
 * NEXT_PUBLIC_API_URL=http://localhost:3000
 *
 * Cambia esta URL cuando despliegues a producción.
 */

////////////////////////////////////////////////////////////////////////////////
// 6. CONFIGURACIÓN DE CORS
////////////////////////////////////////////////////////////////////////////////

/**
 * CORS (Cross-Origin Resource Sharing) está configurado para permitir requests
 * desde el frontend al backend.
 *
 * Orígenes permitidos:
 * - http://localhost:3000 (Backend)
 * - http://localhost:3001 (Frontend típico)
 * - http://localhost:3002 (Frontend alternativo)
 * - http://127.0.0.1:3000
 * - http://127.0.0.1:3001
 * - http://127.0.0.1:3002
 *
 * Headers permitidos:
 * - Content-Type
 * - Authorization
 * - Accept
 * - Origin
 * - X-Requested-With
 * - Access-Control-Request-Method
 * - Access-Control-Request-Headers
 *
 * Para probar CORS:
 * GET /test-cors - Endpoint de prueba
 */

////////////////////////////////////////////////////////////////////////////////
// 7. DEPURACIÓN DE CORS
////////////////////////////////////////////////////////////////////////////////

/**
 * Si tienes problemas con CORS:
 *
 * 1. Verifica que el backend esté corriendo en el puerto correcto (3000)
 * 2. Verifica que el frontend esté apuntando a la URL correcta
 * 3. Revisa la consola del navegador para errores de CORS
 * 4. Usa el componente CorsTest para verificar la conectividad
 * 5. Verifica que no haya firewalls bloqueando las conexiones
 *
 * Comandos útiles:
 * - Backend: yarn start:dev
 * - Frontend: yarn dev
 * - Test CORS: GET http://localhost:3000/test-cors
 */

////////////////////////////////////////////////////////////////////////////////
// 8. NOTAS IMPORTANTES
////////////////////////////////////////////////////////////////////////////////

/**
 * - El AuthProvider debe estar envuelto alrededor de toda la aplicación
 * - Los tokens se almacenan automáticamente en localStorage
 * - Las llamadas a la API incluyen manejo automático de errores
 * - El contexto se inicializa automáticamente al cargar la aplicación
 * - Los formularios ya están integrados con el sistema de autenticación
 */
