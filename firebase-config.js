// Configuración de Firebase para SalesQuest
// Reemplaza estas credenciales con las de tu proyecto en la consola de Firebase.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
