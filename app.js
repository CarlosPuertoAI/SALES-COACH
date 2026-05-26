/* ==========================================================================
   SalesQuest - Main Application Logic (ES6 Vanilla JS)
   ========================================================================== */

// 1. Database Definitions
const SECTORS = [
    {
        id: "saas",
        name: "Tecnología / SaaS",
        emoji: "💻",
        objections: [
            {
                title: "Es muy caro / No hay presupuesto disponible",
                racional: "Entiendo que el coste es un factor clave. Sin embargo, si miramos las métricas, implementar {product} reduce el coste operativo de tu equipo en un 25%. Eso significa que la plataforma se autofinancia en los primeros 3 meses de uso. ¿Hacemos un análisis detallado del retorno de inversión estimado para tu caso?",
                emocional: "Sé que comprometer presupuesto en tecnología genera estrés por miedo a no rentabilizarlo. Con {product}, no estás adquiriendo un software, sino la tranquilidad de que tu equipo dejará de perder tiempo en tareas repetitivas y podrá enfocarse en lo que de verdad os hace crecer. ¿Te gustaría sentir esa liberación operativa?",
                redireccion: "Si el presupuesto no fuera un obstáculo ahora mismo, ¿consideras que {product} es la solución idónea para solucionar vuestros cuellos de botella?"
            },
            {
                title: "Es difícil de integrar con nuestras herramientas actuales",
                racional: "Nuestra API y los conectores nativos están diseñados para integrarse en menos de 2 horas con vuestro ecosistema actual. Además, nuestro equipo de soporte técnico se encarga de la migración de datos sin coste adicional. ¿Qué herramientas específicas utilizáis hoy en día?",
                emocional: "El miedo a que una nueva herramienta rompa vuestro flujo de trabajo actual y cree caos en el equipo es totalmente comprensible. Por eso, os acompañamos de la mano durante la primera semana. Queremos que el cambio sea una transición fluida y sin fricciones, no una fuente de frustración.",
                redireccion: "Si te demostramos técnicamente que la integración se realiza con éxito en una mañana, ¿sería este el momento adecuado para dar el paso?"
            },
            {
                title: "No tenemos tiempo para aprender a usar una plataforma nueva",
                racional: "La curva de aprendizaje de {product} es de solo 30 minutos gracias a nuestra interfaz intuitiva y guías interactivas. El tiempo invertido en la capacitación se compensa con creces al ahorrar 8 horas de trabajo manual por empleado cada semana desde el primer día.",
                emocional: "Sé perfectamente lo saturado que está vuestro equipo. Introducir otra tarea puede verse como una carga. Pero mira esto como una inversión en salud laboral: sacrificar 30 minutos hoy para aliviar la presión diaria y darles un respiro durante el resto del año.",
                redireccion: "Si nos encargamos nosotros de capacitar a tu equipo de forma personalizada en una sesión de 20 minutos, ¿le darías luz verde?"
            }
        ]
    },
    {
        id: "realestate",
        name: "Inmobiliaria",
        emoji: "🏡",
        objections: [
            {
                title: "Los tipos de interés y las hipotecas están muy altos ahora",
                racional: "Los tipos fluctúan, pero el precio del suelo en esta zona sube un 6% anual. Si compras ahora, aseguras la vivienda a su precio actual. Más adelante, cuando los tipos bajen, siempre podrás refinanciar tu hipoteca con el banco. Esperar solo hará que pagues más por el inmueble.",
                emocional: "Comprar una casa es el proyecto de vida más importante y es normal sentir vértigo ante las noticias financieras. Pero la seguridad de tener tu propio hogar, ver crecer a tu familia en este espacio y dejar de tirar dinero en alquileres es una tranquilidad que los tipos de interés no pueden medir.",
                redireccion: "Si logramos negociar una rebaja en el precio final que compense el impacto de la cuota mensual del banco, ¿estarías dispuesto a reservar?"
            },
            {
                title: "Necesito consultarlo con mi pareja o socio primero",
                racional: "Me parece excelente. Comprar un inmueble requiere consenso. Te propongo que agendemos una videollamada de 10 minutos mañana mismo con tu pareja/socio para resolver sus dudas técnicas directamente sobre los planos y el dossier financiero.",
                emocional: "Es fundamental que las personas importantes de tu vida estén tan entusiasmadas como tú con este proyecto. No quiero que sientas la presión de tener que explicarles todos los detalles tú solo. Hagamos una visita conjunta para que sientan la misma buena energía al entrar por esa puerta.",
                redireccion: "Entiendo. Aparte de la opinión de tu pareja/socio, ¿hay algún detalle de la propiedad que a ti personalmente no te acabe de convencer?"
            },
            {
                title: "La casa me gusta, pero la zona no me convence del todo",
                racional: "Esta zona está dentro del plan de desarrollo municipal 2026. Hay proyectada una nueva línea de metro y un parque comercial a 500 metros. Comprar hoy aquí es adquirir a precio de barrio en desarrollo para vender a precio de zona premium en 3 años.",
                emocional: "El entorno donde vas a pasear por las tardes y la seguridad del barrio definen tu calidad de vida. Te invito a tomar un café aquí cerca al atardecer para que sientas el ambiente vecinal y la paz que se respira fuera del bullicio del centro. Te sorprenderá.",
                redireccion: "Si te muestro otra opción similar en una zona con las características que buscas, pero con un precio ligeramente superior, ¿la evaluarías?"
            }
        ]
    },
    {
        id: "auto",
        name: "Automoción",
        emoji: "🚗",
        objections: [
            {
                title: "El coche eléctrico/híbrido perderá mucho valor de reventa",
                racional: "La depreciación de los vehículos electrificados se ha estabilizado gracias al aumento de la demanda de segunda mano y las normativas medioambientales. Además, el ahorro de combustible y mantenimiento anual compensa con creces cualquier diferencial futuro.",
                emocional: "Entiendo la incertidumbre ante tecnologías nuevas. Pero la sensación de conducir sabiendo que estás protegido contra futuras restricciones de tráfico en las ciudades y el silencio en carretera te darán una experiencia de viaje inigualable y libre de culpas.",
                redireccion: "Si te ofrecemos una opción de renting o financiación flexible que te garantice el valor mínimo de recompra del coche en 4 años, ¿te daría tranquilidad para firmar?"
            },
            {
                title: "Las cuotas mensuales son demasiado elevadas",
                racional: "Si calculamos el gasto que haces actualmente en combustible, seguro y reparaciones de tu coche antiguo, verás que esa cantidad cubre más del 60% de la cuota de este modelo nuevo, el cual no te dará averías y consume la mitad.",
                emocional: "Sé que comprometerse con un pago mensual genera tensión. Queremos que disfrutes de estrenar coche sin ahogarte. Por eso, prefiero que configuremos un plan de entrada flexible para que la cuota final se adapte a tu comodidad diaria y conduzcas sin preocupaciones.",
                redireccion: "Si logramos ajustar el plazo o la entrada para bajar la cuota mensual en 60€, ¿estarías listo para formalizar el pedido hoy?"
            },
            {
                title: "Tengo que mirar otras opciones antes de decidirme",
                racional: "Comparar es lógico. No obstante, las promociones actuales de fábrica y la disponibilidad de este color específico vencen este fin de semana. Si reservas hoy, congelamos el precio y tienes 14 días de desistimiento total con devolución del depósito.",
                emocional: "Un coche nuevo es una ilusión enorme y quieres estar seguro de elegir el mejor. Pero cuando te sientas al volante de este modelo, sientes la calidad de los acabados y lo cómodo que viajas, sabes que es el coche que quieres lucir con orgullo. No lo dejes escapar.",
                redireccion: "Para ahorrarte visitas a otros concesionarios, ¿qué característica o precio estás buscando comparar exactamente para ayudarte a resolverlo aquí?"
            }
        ]
    },
    {
        id: "b2b",
        name: "Servicios B2B / Consultoría",
        emoji: "👔",
        objections: [
            {
                title: "No podéis garantizarnos un ROI exacto por contrato",
                racional: "En servicios profesionales, los factores externos influyen. Sin embargo, nuestro histórico con más de 40 clientes en tu sector muestra un retorno medio del inversión de 3:1. Establecemos KPIs mensuales auditables para que puedas pausar el servicio si no cumplimos los objetivos.",
                emocional: "Es razonable temer a contratar un servicio intangible y sentir que arriesgas tu reputación interna. Nosotros nos tomamos tu negocio como propio. Si a ti no te va bien, a nosotros tampoco. Queremos construir una relación de confianza donde sientas el respaldo de un socio estratégico.",
                redireccion: "Si estructuramos el contrato con un primer mes piloto de menor coste para validar la metodología y la química de trabajo, ¿empezamos?"
            },
            {
                title: "Ya trabajamos con otra agencia/proveedor y nos va bien",
                racional: "Nos alegra que estéis cubiertos. No obstante, muchos de nuestros clientes actuales también estaban conformes con su proveedor anterior hasta que vieron que nuestra metodología especializada incrementaba la captación de leads en un 40% adicional. ¿Hacemos una auditoría gratuita de tu estado actual?",
                emocional: "La lealtad a un proveedor que cumple es un valor excelente. No venimos a romper esa relación, sino a retar tus resultados. Mereces saber si estás dejando dinero sobre la mesa por comodidad. Permitirnos hacer una prueba te dará la certeza de estar tomando la mejor decisión.",
                redireccion: "Si te demostramos en un informe de 5 páginas dónde estás perdiendo optimizaciones que tu agencia actual no está viendo, ¿nos darías una oportunidad?"
            },
            {
                title: "Vuestra propuesta parece muy genérica para nuestro negocio",
                racional: "Entiendo tu percepción. La propuesta comercial inicial esboza el marco general. Tras la aprobación, realizamos 3 sesiones de inmersión profunda con tu equipo para redactar el libro de ruta personalizado y exclusivo para tus procesos.",
                emocional: "Sé que tu negocio tiene particularidades únicas y odias las plantillas estándar que venden humo. Tienes toda la razón. Nuestra prioridad es escucharte y adaptarnos a tu ADN. Hagamos un taller de diseño conjunto de 30 minutos para tallar la solución a tu medida.",
                redireccion: "Si definimos juntos los tres desafíos específicos de tu empresa e incorporamos las soluciones exactas en la propuesta final, ¿estarías conforme?"
            }
        ]
    },
    {
        id: "finance",
        name: "Seguros y Finanzas",
        emoji: "🛡️",
        objections: [
            {
                title: "Ya tengo una póliza básica y no quiero gastar más",
                racional: "Una póliza básica cubre emergencias menores, pero el 80% de las quiebras familiares por salud ocurren por falta de cobertura de tratamientos crónicos o invalidez temporal. Aumentar tu cobertura un 15% hoy te protege contra pérdidas del 100% de tu patrimonio.",
                emocional: "La póliza básica te da el papel, pero no la paz mental real. Lo que estás comprando con esta ampliación es la tranquilidad absoluta de saber que, si mañana ocurre un imprevisto grave, tus hijos tendrán el mejor cuidado médico disponible y tu hogar estará a salvo.",
                redireccion: "Si revisamos tu póliza actual y encontramos coberturas duplicadas que podamos eliminar para mejorar tu protección sin aumentar apenas el gasto, ¿lo hacemos?"
            },
            {
                title: "No confío en que las aseguradoras paguen cuando pase algo",
                racional: "Esta compañía está regulada por la Dirección General de Seguros y contamos con un índice de resolución de siniestros favorable del 98.4%. Todo queda estipulado en condiciones generales transparentes sin letra pequeña. Te muestro las cláusulas de exclusión explícitas.",
                emocional: "Comprendo perfectamente tu desconfianza; el sector financiero a veces parece frío y evasivo. Por eso, mi trabajo no acaba con la venta. Yo seré tu gestor personal y la persona que dará la cara por ti ante la compañía si llega el momento de reclamar. No estarás solo frente a un contestador automático.",
                redireccion: "Si adjuntamos un documento aclaratorio firmado que resuma en lenguaje sencillo exactamente qué casos están cubiertos al 100%, ¿te sentirías seguro?"
            },
            {
                title: "Todavía soy joven y saludable, no necesito esto ahora",
                racional: "Contratar un seguro de salud o vida a tu edad garantiza una prima mensual muy baja para siempre y evita exclusiones por enfermedades preexistentes que puedas desarrollar en el futuro. Esperar a tener problemas de salud hará que el seguro sea el doble de caro o que te rechacen.",
                emocional: "La juventud y la buena salud son tus mayores tesoros. Cuidar de tu futuro ahora que todo va bien es un acto de amor propio y responsabilidad hacia las personas que dependen de ti. Te permite vivir al máximo con la tranquilidad de tener una red de seguridad invisible bajo tus pies.",
                redireccion: "Si diseñamos un plan de aportaciones mínimo que puedas ir escalando a medida que crezca tu carrera profesional, ¿lo dejamos activo?"
            }
        ]
    },
    {
        id: "luxury",
        name: "Comercio de Lujo / High-ticket",
        emoji: "💎",
        objections: [
            {
                title: "Puedo encontrar un producto similar online más barato",
                racional: "Es posible encontrar réplicas o gamas inferiores. Sin embargo, la calidad del cuero italiano, el ensamblado artesanal y la garantía de autenticidad de esta pieza aseguran una vida útil de décadas. Los productos baratos acaban costando el triple al tener que reemplazarse continuamente.",
                emocional: "Hay una gran diferencia entre adquirir un objeto funcional y poseer una obra de arte. Esta pieza representa artesanía, exclusividad e historia. Llevarla contigo no es solo vestir un accesorio, es proyectar tu aprecio por el detalle, el diseño y la excelencia que te diferencian del resto.",
                redireccion: "Si valoras la calidad y durabilidad por encima del precio inmediato, ¿estás de acuerdo en que esta es la mejor inversión estética para ti?"
            },
            {
                title: "Solo estoy mirando de momento, no voy a comprar hoy",
                racional: "Me parece estupendo. Disfruta de la colección. Te comento que de esta edición limitada solo han llegado 2 unidades a nuestra boutique. Si te interesa, puedo reservártela durante 24 horas sin compromiso para que tomes la decisión en casa.",
                emocional: "Nuestros clientes suelen venir a mirar y terminan enamorándose de la energía de nuestras piezas. Probarse este modelo no te compromete a nada. Permítete sentir el tacto del material sobre tu piel; a veces, los objetos eligen a las personas cuando es el momento oportuno.",
                redireccion: "Si te muestro la pieza estrella de nuestra colección privada que acaba de llegar hoy y que muy pocas personas han visto aún, ¿te gustaría probártela?"
            },
            {
                title: "La marca tiene prestigio, pero el precio es desorbitado",
                racional: "El precio refleja la escasez de los materiales y las más de 80 horas de trabajo manual invertidas por nuestros maestros artesanos. Además, las piezas de esta marca incrementan su valor de tasación un 5% anual en el mercado de subastas, convirtiéndose en un activo coleccionable.",
                emocional: "Entiendo que el precio llame la atención. Pero el verdadero lujo no radica en la etiqueta, sino en la experiencia de exclusividad: saber que posees algo que muy pocos en el mundo pueden tener. Es un premio a tu trayectoria y un legado que perdurará por generaciones.",
                redireccion: "Si consideramos este artículo como una inversión patrimonial que mantendrá su valor e historia a lo largo del tiempo, ¿lo sumamos a tu colección?"
            }
        ]
    }
];

const PROFILES = {
    analitico: {
        name: "El Analítico",
        emoji: "🧙‍♂️",
        desc: "Guiado por los datos, la precisión y la reducción al mínimo del riesgo. Detesta las promesas exageradas y necesita pruebas lógicas para justificar su decisión de compra.",
        fear: "Tomar una decisión incorrecta que le haga perder dinero o eficiencia, afectando su credibilidad.",
        lever: "Seguridad, Garantías escritas y Datos de Retorno de Inversión (ROI)."
    },
    directo: {
        name: "El Directo",
        emoji: "🦁",
        desc: "Enfocado en resultados, estatus y control. Valora la eficiencia y el ahorro de tiempo por encima de todo. Odia las charlas largas y los rodeos; quiere saber qué ganará.",
        fear: "Perder el control del proceso, malgastar su tiempo en reuniones estériles o quedarse rezagado frente a su competencia.",
        lever: "Estatus, Ventaja Competitiva y Ahorro de Tiempo."
    },
    relacional: {
        name: "El Relacional",
        emoji: "🤝",
        desc: "Guiado por la confianza, la empatía y la conexión humana. Necesita sentir que le agradas y que estarás allí para apoyarle después de la firma del contrato.",
        fear: "El conflicto interpersonal, sentirse abandonado tras la compra o tomar una decisión que afecte negativamente a su equipo.",
        lever: "Soporte Personalizado, Comunidad y Paz Mental."
    },
    impulsivo: {
        name: "El Impulsivo/Innovador",
        emoji: "🚀",
        desc: "Atraído por la novedad, las tendencias vanguardistas y el prestigio de ser el primero. Se mueve por el entusiasmo y el miedo a perderse la última tendencia (FOMO).",
        fear: "Ser percibido como tradicional o desactualizado, perder oportunidades exclusivas o quedarse estancado en procesos obsoletos.",
        lever: "Exclusividad, Primicia y Miedo a perder la oportunidad (FOMO)."
    }
};

const QUIZ_QUESTIONS = [
    {
        question: "¿Cómo reacciona tu cliente cuando sale a relucir el tema económico o el precio?",
        options: [
            { text: "Pide un desglose exacto de costes, pregunta por el ROI o solicita informes de datos adicionales.", profile: "analitico" },
            { text: "Va directo al grano, presiona para conseguir un descuento agresivo y quiere cerrar rápido la llamada.", profile: "directo" },
            { text: "Se nota algo incómodo pero se enfoca en si el servicio incluye soporte o si le ayudaremos en el proceso.", profile: "relacional" },
            { text: "Le emociona el valor percibido del producto y pregunta si es la versión más premium o si incluye extras exclusivos.", profile: "impulsivo" }
        ]
    },
    {
        question: "¿Cuál es el estilo de comunicación dominante de tu prospecto?",
        options: [
            { text: "Preciso, analítico, hace muchas preguntas técnicas, habla en un tono pausado y mide sus palabras.", profile: "analitico" },
            { text: "Cortante, directo, te interrumpe para ir a lo importante, su voz es enérgica y tiene prisa.", profile: "directo" },
            { text: "Amable, sonriente, cuenta anécdotas personales, busca la validación mutua y habla de su equipo.", profile: "relacional" },
            { text: "Entusiasta, gesticula mucho, usa palabras de moda, habla rápido y se emociona fácilmente con las ideas.", profile: "impulsivo" }
        ]
    },
    {
        question: "Por lo que has percibido, ¿cuál parece ser el mayor temor o reticencia de esta persona?",
        options: [
            { text: "Equivocarse de herramienta y tener que dar explicaciones de una mala inversión a su directiva/socios.", profile: "analitico" },
            { text: "Quedarse atrás respecto a sus competidores o perder el control operativo de su departamento.", profile: "directo" },
            { text: "Quedarse solo con un manual de instrucciones sin saber cómo aplicar el producto en su día a día.", profile: "relacional" },
            { text: "Perder la oportunidad de ser pionero en usar esta solución en su zona geográfica o mercado.", profile: "impulsivo" }
        ]
    }
];

// 2. Application State Class
class SalesQuest {
    constructor() {
        this.state = {
            productName: "",
            sectorId: "",
            xp: 0,
            level: 1,
            completedStages: [], // Node identifiers that are completed
            currentObjectionIndex: 0,
            activeTab: "racional",
            quizIndex: 0,
            quizAnswers: [],
            customObjections: [],
            detectedProfileId: ""
        };
        
        this.loadState();
    }

    // Save and Load State with localStorage
    loadState() {
        const saved = localStorage.getItem("salesquest_state");
        if (saved) {
            try {
                this.state = { ...this.state, ...JSON.parse(saved) };
            } catch (e) {
                console.error("Error al cargar el estado guardado", e);
            }
        }
    }

    saveState() {
        localStorage.setItem("salesquest_state", JSON.stringify(this.state));
        this.updateHeaderStats();
    }

    resetState() {
        localStorage.removeItem("salesquest_state");
        this.state = {
            productName: "",
            sectorId: "",
            xp: 0,
            level: 1,
            completedStages: [],
            currentObjectionIndex: 0,
            activeTab: "racional",
            quizIndex: 0,
            quizAnswers: [],
            customObjections: [],
            detectedProfileId: ""
        };
        
        // Ocultar cabecera y menú de navegación
        const headerEl = document.getElementById("app-header");
        const navEl = document.getElementById("app-nav");
        if (headerEl) headerEl.classList.add("hidden");
        if (navEl) navEl.classList.add("hidden");
        
        // Limpiar el campo de texto del producto
        const productInput = document.getElementById("product-name");
        if (productInput) productInput.value = "";
        
        // Regenerar la cuadrícula de sectores (para quitar la selección anterior)
        renderSectorSelectionGrid();
        
        this.saveState();
        this.navigateTo("onboarding");
    }

    // Gamification Methods
    addXP(amount) {
        this.state.xp += amount;
        
        // Simple Level Up logic (Every 100 XP is a level)
        const oldLevel = this.state.level;
        this.state.level = Math.floor(this.state.xp / 100) + 1;
        
        this.saveState();

        if (this.state.level > oldLevel) {
            this.showCelebrationModal(`¡Subiste al Nivel ${this.state.level}! 🎉`, `Has ganado ${amount} XP. Tu rango de vendedor ha aumentado. ¡Sigue así!`, [
                { emoji: "🏆", name: "Cerrador Junior" }
            ]);
        }
    }

    // State Getters
    get currentSector() {
        return SECTORS.find(s => s.id === this.state.sectorId);
    }

    get currentObjections() {
        const sector = this.currentSector;
        if (!sector) return [];
        return [...sector.objections, ...this.state.customObjections];
    }

    get currentObjection() {
        const objections = this.currentObjections;
        return objections[this.state.currentObjectionIndex] || null;
    }
}

// 3. UI and DOM Manager
const app = new SalesQuest();

document.addEventListener("DOMContentLoaded", () => {
    initUI();
});

function initUI() {
    renderSectorSelectionGrid();
    setupEventListeners();
    
    // Auto navigation based on state
    if (app.state.sectorId && app.state.productName) {
        document.getElementById("app-header").classList.remove("hidden");
        document.getElementById("app-nav").classList.remove("hidden");
        app.updateHeaderStats();
        navigateTo("roadmap");
    } else {
        navigateTo("onboarding");
    }
}

// Onboarding: Sector Grid Render
function renderSectorSelectionGrid() {
    const grid = document.getElementById("sector-grid");
    grid.innerHTML = "";
    
    SECTORS.forEach(sector => {
        const card = document.createElement("div");
        card.className = `sector-card ${app.state.sectorId === sector.id ? 'selected' : ''}`;
        card.dataset.id = sector.id;
        card.innerHTML = `
            <span class="sector-emoji">${sector.emoji}</span>
            <h3>${sector.name}</h3>
        `;
        
        card.addEventListener("click", () => {
            document.querySelectorAll(".sector-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            app.state.sectorId = sector.id;
        });
        
        grid.appendChild(card);
    });
}

// Global Navigation Router
function navigateTo(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach(view => {
        view.classList.add("hidden");
        view.classList.remove("active");
    });
    
    // Show target view
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
        targetView.classList.remove("hidden");
        targetView.classList.add("active");
    }

    // Update bottom nav active classes
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
        if (item.dataset.view === viewId) {
            item.classList.add("active");
        }
    });

    // Execute view-specific loaders
    if (viewId === "roadmap") {
        renderRoadmap();
    } else if (viewId === "objections") {
        renderObjections();
    } else if (viewId === "profiler") {
        resetProfilerQuiz();
    } else if (viewId === "closing") {
        renderClosing();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Header Stats Renderer
SalesQuest.prototype.updateHeaderStats = function() {
    const xpCounter = document.getElementById("xp-counter");
    const lvlIndicator = document.getElementById("level-indicator");
    const headerSector = document.getElementById("header-sector");
    
    if (xpCounter) xpCounter.innerText = this.state.xp;
    if (lvlIndicator) {
        let title = "Novato";
        if (this.state.level >= 2) title = "Negociador";
        if (this.state.level >= 3) title = "Cerrador Elite";
        if (this.state.level >= 4) title = "Master de Ventas";
        lvlIndicator.innerText = `Nivel ${this.state.level} (${title})`;
    }
    if (headerSector && this.currentSector) {
        headerSector.innerText = `${this.currentSector.emoji} ${this.currentSector.name}`;
    }
};

// Event Listeners Binder
function setupEventListeners() {
    // Onboarding Form Submit
    const onboardingForm = document.getElementById("onboarding-form");
    if (onboardingForm) {
        onboardingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const productInput = document.getElementById("product-name");
            
            if (!app.state.sectorId) {
                alert("Por favor, selecciona un sector comercial para continuar.");
                return;
            }
            
            app.state.productName = productInput.value.trim();
            app.state.completedStages = ["stage-1"]; // Unlock stage 1 automatically
            app.addXP(20); // 20 initial onboarding XP
            
            document.getElementById("app-header").classList.remove("hidden");
            document.getElementById("app-nav").classList.remove("hidden");
            app.updateHeaderStats();
            
            showCelebrationModal(
                "¡Ruta Creada! 🚀", 
                `Tu ruta de aprendizaje de ventas para "${app.state.productName}" está lista. Ganas +20 XP por iniciar.`,
                [{ emoji: "🗺️", name: "Iniciador" }]
            );
            
            navigateTo("roadmap");
        });
    }

    // Bottom Navigation Buttons Click
    document.querySelectorAll(".nav-item").forEach(button => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.view);
        });
    });

    // Objection Tab Switches
    document.querySelectorAll(".tab-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const tabId = button.dataset.tab;
            app.state.activeTab = tabId;
            
            document.querySelectorAll(".tab-content").forEach(content => {
                content.classList.remove("active");
            });
            document.getElementById(`tab-${tabId}`).classList.add("active");
        });
    });

    // Solve/Practice Objection Action
    const solveBtn = document.getElementById("solve-objection-btn");
    if (solveBtn) {
        solveBtn.addEventListener("click", () => {
            const stageKey = `objection-${app.state.currentObjectionIndex}`;
            if (!app.state.completedStages.includes(stageKey)) {
                app.state.completedStages.push(stageKey);
                app.addXP(30);
                
                // Add stage 4 (Objections) to completed roadmap
                if (!app.state.completedStages.includes("stage-4")) {
                    app.state.completedStages.push("stage-4");
                }
                
                showCelebrationModal(
                    "¡Objeción Superada! 🧠", 
                    "Has practicado esta objeción con éxito. Sumas +30 XP a tu perfil.",
                    [{ emoji: "🛡️", name: "Dilemas Domados" }]
                );
                
                renderRoadmap();
                renderObjections(); // Refresh list to reflect checkmarks
            } else {
                alert("Ya has ganado XP por practicar esta objeción. ¡Sigue probando con otras!");
            }
        });
    }

    // Custom Objection Input
    const customObjBtn = document.getElementById("custom-objection-btn");
    if (customObjBtn) {
        customObjBtn.addEventListener("click", addCustomObjection);
    }
    const customObjInput = document.getElementById("custom-objection-input");
    if (customObjInput) {
        customObjInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") addCustomObjection();
        });
    }

    // Modal Close Action
    const modalClose = document.getElementById("modal-close-btn");
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            document.getElementById("celebration-modal").classList.add("hidden");
        });
    }

    // Close Roadmap Complete Reward Action
    const completeRoadmapBtn = document.getElementById("complete-roadmap-btn");
    if (completeRoadmapBtn) {
        completeRoadmapBtn.addEventListener("click", () => {
            if (!app.state.completedStages.includes("stage-5")) {
                app.state.completedStages.push("stage-5");
                app.addXP(100);
                showCelebrationModal(
                    "🏆 ¡Cierre de Ruta Exitoso!",
                    `¡Enhorabuena! Has dominado el ciclo completo de venta y cierre para "${app.state.productName}". Sumas +100 XP extra.`,
                    [{ emoji: "👑", name: "Gran Maestro" }]
                );
                navigateTo("roadmap");
            } else {
                alert("¡Felicidades! Ya habías completado esta ruta anteriormente. Puedes seguir refinando tus cierres.");
            }
        });
    }

    // Reset settings action
    const resetBtn = document.getElementById("reset-profile-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres reiniciar tu configuración? Se borrará tu producto, sector y progreso de XP.")) {
                app.resetState();
            }
        });
    }
}

// Action: Custom Objection Creation
function addCustomObjection() {
    const input = document.getElementById("custom-objection-input");
    const text = input.value.trim();
    
    if (!text) return;
    
    // Dynamic generated responses based on simple heuristics
    const newObjection = {
        title: `"${text}"`,
        racional: `Entiendo perfectamente que "${text}" sea un punto importante. Si analizamos la estructura del retorno de inversión de {product}, verás que precisamente este elemento está optimizado para rentabilizar cada céntimo. ¿Vemos una simulación de costes?`,
        emocional: `Es completamente normal sentir incertidumbre ante "${text}". Al final del día, tu tranquilidad es lo primero. Con {product}, te aseguras un socio que resolverá ese reto específico, permitiéndote descansar sin ese estrés de fondo.`,
        redireccion: `Si logramos resolver esta preocupación sobre "${text}" a tu entera satisfacción, ¿habría algún otro inconveniente para comenzar hoy?`
    };
    
    app.state.customObjections.push(newObjection);
    app.state.currentObjectionIndex = app.currentObjections.length - 1;
    input.value = "";
    app.saveState();
    
    renderObjections();
}

// 4. Component: Roadmap Renderer (Duolingo Style Zigzag)
function renderRoadmap() {
    const path = document.getElementById("roadmap-path");
    if (!path) return;
    
    path.innerHTML = "";
    
    // Core Stages definition
    const stages = [
        { id: "stage-1", title: "1. Conexión & Rapport", emoji: "🤝", desc: "Crea confianza al instante" },
        { id: "stage-2", title: "2. Descubrimiento", emoji: "🔎", desc: "Encuentra el dolor del cliente" },
        { id: "stage-3", title: "3. El Pitch de Oro", emoji: "⚡", desc: "Presenta el valor real" },
        { id: "stage-4", title: "4. Manejo de Objeciones", emoji: "🛡️", desc: "Respuestas automáticas" },
        { id: "stage-5", title: "5. Perfilado & Cierre", emoji: "🎯", desc: "Genera el Cierre Emocional" }
    ];
    
    stages.forEach((stage, idx) => {
        const node = document.createElement("div");
        node.className = "roadmap-node";
        
        // Determine node status
        let status = "locked";
        
        // Stage 1 is always unlocked. Others unlock if the previous is completed.
        if (idx === 0) {
            status = app.state.completedStages.includes(stage.id) ? "completed" : "active";
        } else {
            const prevStage = stages[idx - 1];
            const prevCompleted = app.state.completedStages.includes(prevStage.id);
            
            if (prevCompleted) {
                status = app.state.completedStages.includes(stage.id) ? "completed" : "active";
            } else {
                status = "locked";
            }
        }
        
        node.classList.add(status);
        
        // Inner checkmark representation
        const checkmark = status === "completed" ? '<div class="node-checkmark">✓</div>' : '';
        const lockIcon = status === "locked" ? '<span class="lock-emoji">🔒</span>' : stage.emoji;
        
        node.innerHTML = `
            <div class="node-wrapper" data-id="${stage.id}" data-status="${status}">
                <div class="node-circle">
                    ${checkmark}
                    <span>${lockIcon}</span>
                </div>
                <div class="node-info">
                    <h4>${stage.title}</h4>
                    <p>${stage.desc}</p>
                </div>
            </div>
        `;
        
        // Interactive Node Action
        node.querySelector(".node-wrapper").addEventListener("click", () => {
            if (status === "locked") {
                alert("¡Esta sección está bloqueada! Completa las etapas anteriores para avanzar.");
                return;
            }
            
            // Interaction logic per node click
            if (stage.id === "stage-4") {
                navigateTo("objections");
            } else if (stage.id === "stage-5") {
                navigateTo("profiler");
            } else {
                // Interactive Mini-challenge for Stages 1, 2, 3
                if (status === "active") {
                    handleMiniChallenge(stage.id, stage.title);
                } else {
                    alert(`Ya has completado la etapa de "${stage.title}". Puedes seguir repasando.`);
                }
            }
        });
        
        path.appendChild(node);
    });
}

// Action: Interactive Mini-challenges for roadmap exploration
function handleMiniChallenge(stageId, stageTitle) {
    let question = "";
    let options = [];
    let tip = "";

    if (stageId === "stage-1") {
        question = "Entras en una llamada con un prospecto de tu sector y parece distante. ¿Cómo inicias la conversación?";
        options = [
            { text: "Vas directo a presentar las especificaciones y precio de tu producto.", correct: false, reason: "Incorrecto. Ir directo al precio ahuyenta al cliente sin antes conectar." },
            { text: "Le saludas cordialmente, preguntas cómo está y haces un comentario positivo y sincero sobre su empresa o una noticia reciente de su sector.", correct: true, reason: "¡Excelente! Crear rapport rompe la barrera defensiva del comprador inicial." }
        ];
        tip = "El cerebro busca confianza antes de escuchar lógica.";
    } else if (stageId === "stage-2") {
        question = "Para conocer los dolores reales del cliente, ¿cuál es la mejor estrategia de descubrimiento?";
        options = [
            { text: "Hablar el 80% del tiempo describiendo los beneficios generales de tu oferta.", correct: false, reason: "Incorrecto. Si hablas tú, no descubres sus necesidades." },
            { text: "Hacer preguntas abiertas como '¿Cuál es el principal cuello de botella que frena tu facturación hoy?' y escuchar activamente.", correct: true, reason: "¡Perfecto! La regla de oro es: Escucha el 70%, habla el 30%." }
        ];
        tip = "El cliente te dará las pistas de cómo venderle si le dejas hablar.";
    } else if (stageId === "stage-3") {
        question = "Al presentar la propuesta de tu producto/servicio, ¿cómo debes estructurar el mensaje?";
        options = [
            { text: "Enfocar el discurso en cómo las características específicas solucionan directamente el dolor que te comentó en la etapa de descubrimiento.", correct: true, reason: "¡Exacto! Adapta tu discurso exclusivamente a lo que el cliente necesita solucionar." },
            { text: "Enumerar todas las funciones técnicas en orden alfabético para demostrar la complejidad técnica del producto.", correct: false, reason: "Incorrecto. Demasiadas características abruman al cerebro del comprador." }
        ];
        tip = "No vendas características, vende el puente al estado ideal de tu cliente.";
    }

    // Render a quick prompt modal (simulated through JS alert confirm workflow for simplicity, or customized flow)
    const promptText = `${stageTitle.toUpperCase()}\n\nReto rápido:\n${question}\n\nOpciones:\n1. ${options[0].text}\n2. ${options[1].text}`;
    const answer = prompt(promptText + "\n\nResponde escribiendo 1 o 2:");
    
    if (answer === "1" || answer === "2") {
        const selected = options[parseInt(answer) - 1];
        alert(selected.reason + "\n\nTip: " + tip);
        
        if (selected.correct) {
            app.state.completedStages.push(stageId);
            app.addXP(20);
            showCelebrationModal(
                "¡Etapa Completada! 🌟", 
                `Has dominado el concepto clave de "${stageTitle}". Sumas +20 XP.`,
                [{ emoji: "🎓", name: "Conceptos Claros" }]
            );
            renderRoadmap();
        }
    } else {
        alert("Reto cancelado. Puedes completarlo cuando estés listo.");
    }
}

// 5. Component: Objection Simulator UI
function renderObjections() {
    const listContainer = document.getElementById("objection-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";
    
    const objections = app.currentObjections;
    
    if (objections.length === 0) {
        listContainer.innerHTML = "<p class='text-muted'>No hay objeciones configuradas para este sector.</p>";
        return;
    }
    
    objections.forEach((obj, index) => {
        const btn = document.createElement("button");
        
        // Display a checkmark indicator if the objection has been practiced
        const isPracticed = app.state.completedStages.includes(`objection-${index}`);
        const checkPrefix = isPracticed ? "✓ " : "";
        
        btn.className = `objection-item ${app.state.currentObjectionIndex === index ? 'active' : ''}`;
        btn.innerText = `${checkPrefix}${obj.title}`;
        
        btn.addEventListener("click", () => {
            app.state.currentObjectionIndex = index;
            app.saveState();
            
            // Highlight active in UI list
            document.querySelectorAll(".objection-item").forEach(item => item.classList.remove("active"));
            btn.classList.add("active");
            
            updateActiveObjectionDisplay();
        });
        
        listContainer.appendChild(btn);
    });
    
    updateActiveObjectionDisplay();
}

function updateActiveObjectionDisplay() {
    const obj = app.currentObjection;
    const titleEl = document.getElementById("current-objection-title");
    
    if (!obj) {
        if (titleEl) titleEl.innerText = "Selecciona una objeción de la lista";
        return;
    }
    
    if (titleEl) titleEl.innerText = obj.title;
    
    // Compile templates replacing {product}, {sector} variables
    const compile = (template) => {
        return template
            .replace(/{product}/g, app.state.productName || "nuestro servicio")
            .replace(/{sector}/g, app.currentSector ? app.currentSector.name : "tu sector");
    };

    document.getElementById("script-racional-text").innerText = compile(obj.racional);
    document.getElementById("script-emocional-text").innerText = compile(obj.emocional);
    document.getElementById("script-redireccion-text").innerText = compile(obj.redireccion);
}

// 6. Component: Client Profiler Quiz
function resetProfilerQuiz() {
    app.state.quizIndex = 0;
    app.state.quizAnswers = [];
    app.state.detectedProfileId = "";
    
    document.getElementById("profiler-quiz-container").classList.remove("hidden");
    document.getElementById("profiler-result-container").classList.add("hidden");
    
    renderQuizSlide();
}

function renderQuizSlide() {
    const container = document.getElementById("quiz-slide");
    const progress = document.getElementById("quiz-progress");
    
    if (!container) return;
    
    const qData = QUIZ_QUESTIONS[app.state.quizIndex];
    
    // Calculate percentage progress
    const pct = ((app.state.quizIndex + 1) / QUIZ_QUESTIONS.length) * 100;
    if (progress) progress.style.width = `${pct}%`;
    
    let optionsHtml = "";
    qData.options.forEach((opt, idx) => {
        optionsHtml += `
            <button class="quiz-option" data-idx="${idx}">
                ${opt.text}
            </button>
        `;
    });
    
    container.innerHTML = `
        <h3>${qData.question}</h3>
        <div class="quiz-options">
            ${optionsHtml}
        </div>
    `;
    
    // Add click events to options
    container.querySelectorAll(".quiz-option").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.idx);
            btn.classList.add("selected");
            
            // Store selected profile key
            app.state.quizAnswers.push(qData.options[idx].profile);
            
            setTimeout(() => {
                nextQuizSlide();
            }, 300);
        });
    });
}

function nextQuizSlide() {
    app.state.quizIndex++;
    if (app.state.quizIndex < QUIZ_QUESTIONS.length) {
        renderQuizSlide();
    } else {
        calculateProfileResults();
    }
}

function calculateProfileResults() {
    // Count frequencies of each profile key
    const counts = {};
    app.state.quizAnswers.forEach(profileKey => {
        counts[profileKey] = (counts[profileKey] || 0) + 1;
    });
    
    // Find key with highest frequency
    let bestProfile = "analitico"; // Default fallback
    let maxCount = 0;
    
    Object.keys(counts).forEach(key => {
        if (counts[key] > maxCount) {
            maxCount = counts[key];
            bestProfile = key;
        }
    });
    
    app.state.detectedProfileId = bestProfile;
    app.saveState();
    
    renderProfileResult();
}

function renderProfileResult() {
    const quizBox = document.getElementById("profiler-quiz-container");
    const resultBox = document.getElementById("profiler-result-container");
    
    if (quizBox) quizBox.classList.add("hidden");
    if (resultBox) resultBox.classList.remove("hidden");
    
    const profile = PROFILES[app.state.detectedProfileId];
    
    document.getElementById("result-emoji").innerText = profile.emoji;
    document.getElementById("result-title").innerText = profile.name;
    document.getElementById("result-desc").innerText = profile.desc;
    document.getElementById("result-fear").innerText = profile.fear;
    document.getElementById("result-lever").innerText = profile.lever;
    
    const closingBtn = document.getElementById("go-to-closing-btn");
    if (closingBtn) {
        // Clear previous event listener
        const newBtn = closingBtn.cloneNode(true);
        closingBtn.parentNode.replaceChild(newBtn, closingBtn);
        
        newBtn.addEventListener("click", () => {
            navigateTo("closing");
        });
    }
}

// 7. Component: Emotional Closer Screen
function renderClosing() {
    const summaryProduct = document.getElementById("summary-product");
    const summaryProfile = document.getElementById("summary-profile");
    const summaryObjection = document.getElementById("summary-objection");
    const leverTag = document.getElementById("closing-lever-tag");
    const scriptText = document.getElementById("closing-script-text");
    const whyText = document.getElementById("closing-why-text");
    
    const profileId = app.state.detectedProfileId || "analitico";
    const profile = PROFILES[profileId];
    const objection = app.currentObjection || { title: "Duda general" };
    
    if (summaryProduct) summaryProduct.innerText = app.state.productName;
    if (summaryProfile) summaryProfile.innerText = `${profile.emoji} ${profile.name}`;
    if (summaryObjection) summaryObjection.innerText = objection.title;
    if (leverTag) leverTag.innerText = `Palanca: ${profile.lever}`;
    
    // Generate Custom Script based on client profile template
    let template = "";
    let explanation = "";
    
    if (profileId === "analitico") {
        template = `Entiendo perfectamente tu postura. Con {product}, no estamos buscando que tomes una decisión precipitada el día de hoy.\n\nLo que te propongo es que analicemos juntos nuestra auditoría de integración técnica que demuestra un índice de estabilidad del 99.9% y un retorno de inversión promedio de X meses. Para tu total seguridad, todo esto queda respaldado por una garantía contractual de satisfacción de 30 días, lo que reduce el riesgo financiero de tu empresa a cero.\n\n¿Te parecería bien si nuestro analista configura un entorno de pruebas mañana mismo para que puedas validar los datos con tu propio equipo técnico?`;
        explanation = "Este cierre apela al miedo a equivocarse del Analítico. Le ofrece datos concretos, un proceso libre de presiones ('no decidas hoy mismo') y elimina el riesgo mediante una garantía auditable, haciéndole sentir en control racional de la operación.";
    } else if (profileId === "directo") {
        template = `Valoro mucho tu tiempo y sé que tu objetivo es optimizar los resultados operativos de tu departamento lo antes posible.\n\n{product} está diseñado precisamente para líderes de vuestro sector que no quieren perder el tiempo en gestiones lentas y buscan recortar un 20% de ineficiencia competitiva esta misma semana. Al dar el paso hoy, te garantizas estar un paso por delante de tus competidores principales y agilizar los procesos de tu equipo.\n\nVamos a iniciar con el plan de despliegue rápido. ¿Qué correo de facturación dejamos registrado para activar las licencias hoy mismo y no perder ni un día de tracción?`;
        explanation = "El Directo valora el control, el tiempo y el estatus competitivo. Este cierre corta los rodeos, le sitúa como un líder vanguardista con poder de decisión y le empuja a la acción inmediata utilizando la urgencia de no perder tracción.";
    } else if (profileId === "relacional") {
        template = `Entiendo muy bien de dónde viene tu inquietud. Para nosotros, tu tranquilidad y la de tu equipo es la prioridad número uno.\n\nSi decides confiar en nosotros, yo personalmente estaré a cargo del plan de acompañamiento junto con nuestro especialista asignado 24/7. No te vamos a dejar un manual PDF y desaparecer; nos encargaremos de formar a tu equipo paso a paso y resolveremos cada duda en videollamada siempre que lo necesites. En {product} no buscamos clientes, buscamos socios a largo plazo.\n\n¿Te parece bien si agendamos nuestra sesión de inducción conjunta para el próximo lunes a primera hora para que conozcas al equipo técnico que te apoyará?`;
        explanation = "El Relacional busca soporte, conexión humana y paz mental. Este cierre le asegura que habrá un gestor asignado guiándole en todo momento, quitándole la presión de sentirse solo ante una mala implementación técnica.";
    } else if (profileId === "impulsivo") {
        template = `¡Totalmente de acuerdo! En un mercado que evoluciona a esta velocidad, el mayor riesgo es quedarse estancado haciendo lo mismo de siempre.\n\nCon {product}, estás posicionando a tu marca como un referente innovador en tu área. De hecho, esta campaña de acceso exclusivo a la nueva versión que te he mostrado solo está disponible para los primeros 5 clientes de esta semana, y a esta hora solo nos quedan 2 accesos de primicia comercial.\n\nSi tomamos la decisión ahora, asegurarás los bonus de lanzamiento y la exclusividad territorial frente a tus rivales. ¿Le damos luz verde antes de que se agote la oferta?`;
        explanation = "El Impulsivo/Innovador se mueve por la excitación, las tendencias y el miedo a perderse algo (FOMO). Este cierre enfatiza la primicia, la escasez de vacantes disponibles y el estatus exclusivo de pertenecer al círculo inicial de adoptantes.";
    }
    
    // Inject Product and Sector parameters
    const finalScript = template
        .replace(/{product}/g, app.state.productName || "nuestro producto")
        .replace(/{sector}/g, app.currentSector ? app.currentSector.name : "tu sector");
        
    if (scriptText) scriptText.innerText = finalScript;
    if (whyText) whyText.innerText = explanation;
}

// 8. Utility: Copy to Clipboard API
SalesQuest.prototype.copyToClipboard = function(elementId) {
    const text = document.getElementById(elementId).innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        alert("¡Guión copiado al portapapeles! Listo para enviar.");
    }).catch(err => {
        console.error("Error al copiar texto: ", err);
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("¡Guión copiado al portapapeles!");
    });
};

// 10. Utility: Speech Synthesis (Text to Speech)
SalesQuest.prototype.speakText = function(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.innerText;
    
    // Toggle speaking state
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        // Reset all play icons
        document.querySelectorAll('.btn-speak').forEach(btn => {
            btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
        });
        return;
    }
    
    if (!text || text.includes("Selecciona una") || text.includes("Cargando tu")) {
        alert("Por favor, selecciona una objeción válida primero.");
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95; // Slightly slower for clear pronunciation
    utterance.pitch = 1.0;
    
    // Find trigger button and toggle its visual icon to pause
    const buttons = document.querySelectorAll(`button[onclick*="'${elementId}'"]`);
    buttons.forEach(btn => {
        if (btn.classList.contains('btn-speak')) {
            btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`; // Pause bars
        }
    });
    
    utterance.onend = () => {
        buttons.forEach(btn => {
            if (btn.classList.contains('btn-speak')) {
                btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`; // Speaker icon
            }
        });
    };
    
    utterance.onerror = () => {
        buttons.forEach(btn => {
            if (btn.classList.contains('btn-speak')) {
                btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
            }
        });
    };
    
    window.speechSynthesis.speak(utterance);
};

// 9. Component: Celebrations Popups
function showCelebrationModal(title, desc, badges = []) {
    const modal = document.getElementById("celebration-modal");
    const titleEl = document.getElementById("modal-title");
    const descEl = document.getElementById("modal-desc");
    const badgesEl = document.getElementById("modal-badges");
    
    if (!modal) return;
    
    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = desc;
    
    if (badgesEl) {
        badgesEl.innerHTML = "";
        badges.forEach(b => {
            const badge = document.createElement("div");
            badge.className = "badge-item";
            badge.innerHTML = `
                <span class="badge-icon">${b.emoji}</span>
                <span>${b.name}</span>
            `;
            badgesEl.appendChild(badge);
        });
    }
    
    modal.classList.remove("hidden");
}
