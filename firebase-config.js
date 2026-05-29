// Configuración de Firebase para SalesQuest
// Reemplaza estas credenciales con las de tu proyecto en la consola de Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyCfhSFBkuaT-dyuEpjP5f1ed34f81PfdWs",
    authDomain: "sales-coach-758ff.firebaseapp.com",
    projectId: "sales-coach-758ff",
    storageBucket: "sales-coach-758ff.firebasestorage.app",
    messagingSenderId: "732031011503",
    appId: "1:732031011503:web:2b1d2c30a7273cc5dae25a",
    measurementId: "G-3MVDJ8DMQZ"
};

let auth = null;
let db = null;
let firebaseEnabled = false;

try {
    if (typeof firebase !== 'undefined') {
        // Verificar si se han reemplazado las credenciales por defecto
        const hasCredentials = firebaseConfig.apiKey && 
                               firebaseConfig.apiKey !== "YOUR_API_KEY" && 
                               firebaseConfig.projectId !== "YOUR_PROJECT_ID";
        
        if (hasCredentials) {
            firebase.initializeApp(firebaseConfig);
            auth = firebase.auth();
            db = firebase.firestore();
            
            // Habilitar persistencia offline si está disponible
            db.enablePersistence().catch(err => {
                if (err.code == 'failed-precondition') {
                    console.warn("La persistencia offline falló: Múltiples pestañas abiertas.");
                } else if (err.code == 'unimplemented') {
                    console.warn("La persistencia offline no está soportada por este navegador.");
                }
            });
            
            firebaseEnabled = true;
            console.log("🔥 Firebase inicializado con éxito. Características de comunidad y mapa en la nube activadas.");
        } else {
            console.warn("⚠️ Firebase: Las credenciales en 'firebase-config.js' no han sido configuradas. Usando MODO DEMO LOCAL para el Chat y Mapa.");
        }
    } else {
        console.warn("⚠️ Firebase: Scripts CDN no detectados. Usando MODO DEMO LOCAL.");
    }
} catch (error) {
    console.error("❌ Error al inicializar Firebase:", error);
}
