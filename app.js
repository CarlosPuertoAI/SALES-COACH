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
                analitico: "Entiendo que el coste es un factor clave, pero déjame hacerte una pregunta. Si este software te ahorrara un 25% de costes y te trajera el doble de clientes, ¿se autofinanciaría solo? Claro que sí. A nivel de escala de 1 a 10, ¿cómo de útil ves la idea? Si confías en mí, nos encargaremos de que el retorno de inversión supere cualquier cuota. Hagamos la prueba.",
                emocional: "Parece que te preocupa comprometer fondos sin tener la absoluta certeza del retorno. ¿Cómo podríamos estructurar esto para que no suponga un riesgo para tu presupuesto mensual? ¿Qué tendría que pasar para que esta inversión fuera una decisión obvia para tu directiva?",
                agresivo: "¡Tienes toda la razón, es una inversión importante! Y precisamente por eso debes hacerlo. El dinero va y viene, pero el tiempo que pierde tu equipo no se recupera. El verdadero coste no es la cuota de {product}, sino seguir perdiendo miles de euros en ineficiencias. Vamos a firmar y a empezar hoy mismo.",
                solucionador: "¿Qué impacto tiene en vuestra facturación que el equipo pierda 10 horas semanales en procesos manuales? Si no solucionáis esa ineficiencia hoy, ¿cuánto presupuesto habréis desperdiciado de aquí a final de año? ¿Cómo ayudaría a vuestros objetivos liberar ese tiempo con {product}?"
            },
            {
                title: "Es difícil de integrar con nuestras herramientas actuales",
                analitico: "Comprendo el temor a la integración, pero déjame decirte algo: nuestro software está diseñado para conectarse con un clic. Si te garantizo que mi equipo técnico hará la migración en menos de 2 horas sin interrumpir tus operaciones, y asumo yo toda la responsabilidad de que funcione al 100%, ¿estarías dispuesto a dar el paso?",
                emocional: "Parece que has tenido malas experiencias previas con integraciones de software que causaron caos en tu equipo. ¿Cómo afectaría a tus operaciones que la transición se hiciera de forma totalmente transparente? ¿Qué te preocupa en particular de conectar {product}?",
                agresivo: "¡Totalmente de acuerdo, da pereza pensar en cambiar de sistemas! Pero la comodidad es el enemigo del crecimiento. Si evitas este cambio por miedo a la integración, te quedarás estancado con procesos obsoletos mientras tu competencia avanza. Nosotros nos encargamos de todo. ¡Hagámoslo!",
                solucionador: "¿Qué problemas operativos os causa actualmente tener la información fragmentada en herramientas que no se comunican? Si esta dificultad de integración os impide escalar, ¿qué coste tiene para la empresa a largo plazo? ¿Cómo cambiaría la eficiencia del equipo si unificáramos todo?"
            },
            {
                title: "No tenemos tiempo para aprender a usar una plataforma nueva",
                analitico: "Entiendo perfectamente, el tiempo es oro. Pero hagamos números: tardarás 30 minutos en aprender a usar {product}, y a cambio ahorrarás 8 horas semanales para siempre. Si la idea tiene sentido y confías en que te daremos formación personalizada VIP interactiva, ¿empezamos ya?",
                emocional: "Parece que el equipo ya está al límite de su capacidad operativa y temes sobrecargarlos. ¿Cómo podemos planificar la capacitación para que no interfiera en su día a día? ¿Qué apoyo por nuestra parte te daría la tranquilidad de que será sencillo?",
                agresivo: "¡Estoy de acuerdo, no hay tiempo! Y por eso mismo necesitas {product}. Si no tienes tiempo hoy, ¿cuándo lo vas a tener? ¿El año que viene cuando estéis aún más saturados? Compra tiempo automatizando tareas hoy mismo. Empecemos de una vez.",
                solucionador: "¿Cuánto tiempo dedica actualmente tu equipo a tareas repetitivas que podrían automatizarse? Si continúan con este ritmo de trabajo sin herramientas modernas, ¿qué impacto tendrá en la moral del equipo y en vuestro crecimiento? ¿Cómo os beneficiaría liberar un día completo a la semana por empleado?"
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
                analitico: "Entiendo perfectamente, pero déjame hacerte una pregunta. Si esperas a que bajen los tipos, la demanda subirá y esta casa costará un 10% más. Si compras ahora al precio de hoy y refinancias la hipoteca más adelante, ¿no estarías ganando por partida doble? La propiedad es perfecta, confía en mí y cerremos el trato.",
                emocional: "Parece que sientes incertidumbre por el panorama financiero y temes tomar una decisión precipitada. ¿Cómo tendría que ser la oferta para que te sintieras cómodo comprando en el mercado actual? ¿Qué pasaría si esperas y los precios de la zona siguen subiendo?",
                agresivo: "¡Totalmente de acuerdo, los tipos están altos! Pero nunca habrá un momento perfecto para comprar. El mejor momento fue hace 10 años, el segundo mejor es hoy. La inflación se come tu dinero en el banco; el ladrillo es el activo más seguro. Vamos a reservar la casa antes de que se la quede otro comprador.",
                solucionador: "¿Qué coste mensual extra os supone seguir pagando un alquiler que no construye patrimonio? Si los precios de los inmuebles en esta zona suben un 6% anual, ¿cuánto os costará esta misma casa si decidís esperar dos años? ¿Qué seguridad os aportaría tener vuestra vivienda en propiedad ya?"
            },
            {
                title: "Necesito consultarlo con mi pareja o socio primero",
                analitico: "Me parece una excelente idea, la familia y los socios son lo primero. Pero déjame preguntarte: a ti personalmente, ¿te entusiasma la casa? Si la respuesta es un 10, déjame acompañarte mañana a presentársela de forma profesional para que entiendan la gran oportunidad técnica y financiera que es. ¿Te parece bien a las 6?",
                emocional: "Parece que no quieres asumir la responsabilidad de esta decisión tú solo por miedo a que tu pareja o socio no comparta tu visión. ¿Cómo reaccionarían si les presentáramos un dossier detallado con el retorno de inversión y las ventajas de la zona? ¿Qué dudas crees que plantearán?",
                agresivo: "¡Por supuesto, consúltalo! Pero sé honesto: si a ti te encanta, ellos confiarán en tu criterio. Si esperas a mañana para decidir, esta propiedad ya no estará en el mercado porque hay tres visitas programadas para esta tarde. Toma la iniciativa, reserva ahora y si a tu pareja no le gusta, te devuelvo el depósito.",
                solucionador: "¿Qué inconvenientes surgirían si perdemos esta vivienda por no tomar una decisión a tiempo? Si tu pareja o socio tuvieran que ver el inmueble hoy, ¿qué aspectos valorarían más? ¿Cómo ayudaría a la negociación que hagamos una visita conjunta mañana?"
            },
            {
                title: "La casa me gusta, pero la zona no me convence del todo",
                analitico: "Entiendo tu duda con la zona, pero analicemos los datos objetivos. Este barrio está en el plan de desarrollo municipal con una nueva línea de metro y un parque comercial a 500 metros. Comprar hoy aquí es comprar barato para ver cómo se revaloriza tu vivienda un 20% en 3 años. Confía en mí, es una jugada maestra.",
                emocional: "Parece que te preocupa la seguridad o la calidad de vida de tu familia al cambiar de entorno. ¿Qué servicios o características de la zona son indispensables para ti? ¿Cómo afectaría a tu día a día que el barrio mejore sus conexiones el próximo año?",
                agresivo: "¡Tienes razón, la zona es diferente a la que tenías en mente! Pero la casa es espectacular y el precio es inmejorable. La zona se puede adaptar y crecer, de hecho se está revalorizando rapidísimo. No dejes escapar la casa de tus sueños por un prejuicio de ubicación. Vamos a firmar.",
                solucionador: "¿Qué limitaciones encontráis en vuestro barrio actual que esta casa sí solucione? Si buscáis una casa con estas características en vuestra zona preferida, ¿cuánto presupuesto adicional tendríais que invertir? ¿Cómo compensa esta vivienda esa diferencia?"
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
                analitico: "Entiendo el temor a la depreciación, pero déjame hacerte una pregunta. Con las restricciones ambientales que vienen, ¿qué valor de reventa crees que tendrá un coche diésel en 5 años? Cero. Este híbrido conserva su valor por normativa de emisiones. Confía en mí, estás protegiendo tu inversión de cara al futuro.",
                emocional: "Parece que te preocupa comprar una tecnología que pueda quedar obsoleta rápidamente y te haga perder dinero. ¿Cómo podríamos estructurar la compra para garantizarte un valor mínimo de recompra firmado? ¿Qué te haría sentir totalmente seguro?",
                agresivo: "¡Estoy de acuerdo, da miedo la devaluación! Pero compras un coche para disfrutarlo, no para venderlo mañana. El ahorro en combustible y mantenimiento que vas a tener cada mes compensa con creces cualquier depreciación futura. Llévatelo hoy y empieza a disfrutar de la conducción del futuro.",
                solucionador: "¿Cuánto gastas actualmente en combustible y averías con tu coche antiguo? Si sigues con él, ¿qué restricciones de circulación te afectarán pronto en tu ciudad? ¿Cómo cambiaría tu tranquilidad diaria saber que este modelo híbrido tiene acceso libre ilimitado?"
            },
            {
                title: "Las cuotas mensuales son demasiado elevadas",
                analitico: "Entiendo que la cuota llame la atención, pero hagamos cuentas claras. Si sumas lo que gastas hoy en gasolina y reparaciones de tu coche viejo, verás que supera la cuota de este modelo nuevo que no consume casi nada y tiene garantía total. En realidad, el coche se paga solo. Confía en mí, es un negocio redondo.",
                emocional: "Parece que comprometer esa cantidad mensual te genera estrés por miedo a desajustar tus finanzas familiares. ¿Qué importe mensual se adaptaría con total comodidad a tus gastos actuales? ¿Cómo podríamos ajustar la entrada para lograrlo?",
                agresivo: "¡Tienes toda la razón, es dinero! Pero mereces conducir un coche seguro, fiable y moderno. No reduzcas tus sueños al tamaño de una cuota; incrementa tu comodidad y seguridad. Ajustemos el plazo a tu medida, pero no renuncies al coche que de verdad quieres. Vamos a tramitar la financiación.",
                solucionador: "¿Qué problemas te causaría que tu coche actual sufriera una avería grave el próximo mes? Si tuvieras que gastar 2000€ de golpe en reparaciones, ¿cómo afectaría a tu presupuesto? ¿Cómo te ayudaría tener una cuota fija que incluya mantenimiento y garantía?"
            },
            {
                title: "Tengo que mirar otras opciones antes de decidirme",
                analitico: "Es lógico que quieras comparar. Pero déjame preguntarte: si evaluamos la seguridad de este modelo, el equipamiento y la oferta de financiación que te acabo de hacer, ¿no es exactamente el coche que buscas? Si cerramos la reserva hoy, te aseguro este precio de fábrica exclusivo. Confía en mí, no encontrarás nada mejor.",
                emocional: "Parece que sientes la presión de tomar una decisión final y quieres asegurarte de no estar pasando por alto una mejor opción. ¿Qué características o precios específicos necesitas encontrar en otros concesionarios para convencerte de que este es tu coche?",
                agresivo: "¡Por supuesto, compara! Pero sabes perfectamente que este es el coche que te ha hecho sonreír al conducirlo. El tiempo que vas a perder yendo a otros concesionarios vale más que cualquier pequeña diferencia que encuentres. Reserva hoy, y si encuentras algo mejor en 48 horas, te devuelvo la reserva. ¡Hagámoslo!",
                solucionador: "¿Qué riesgos corres si dejas pasar esta unidad específica con este color y equipamiento que tanto te gusta? Si cuando decidas volver el coche ya se ha vendido, ¿cuánto tiempo tardaríamos en pedir otro a fábrica? ¿Cómo afectaría eso a tus planes de viaje?"
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
                analitico: "Entiendo tu postura, pero seamos realistas: nadie serio en consultoría puede garantizar variables de mercado externas. Lo que sí te garantizo, y por eso nuestro histórico muestra un retorno medio de 3:1, es que pondremos a tus servicios la metodología exacta de {product}. Si confías en nuestra experiencia y en mi equipo, los resultados llegarán. Empecemos con un piloto auditado.",
                emocional: "Parece que temes contratar un servicio intangible y que los resultados no justifiquen la inversión ante tu directiva. ¿Cómo podríamos definir KPIs intermedios para que puedas medir y controlar el avance del proyecto mes a mes? ¿Qué te daría tranquilidad?",
                agresivo: "¡Estoy de acuerdo, no hay garantías en esta vida! Pero el riesgo real no es contratar a {product}, sino seguir con los mismos procesos mediocres que tenéis hoy. Si no haces nada, tu ROI garantizado es del 0%. Vamos a firmar, a comprometernos al 100% y a hacer que los resultados sucedan.",
                solucionador: "¿Qué coste tiene para la empresa mantener la fuga de eficiencia que detectamos en vuestra auditoría? Si no solucionáis este problema en los próximos 6 meses, ¿cómo afectará a vuestra cuota de mercado? ¿Cómo cambiarían vuestros números si logramos solucionar esto?"
            },
            {
                title: "Ya trabajamos con otra agencia/proveedor y nos va bien",
                analitico: "Me alegro de que estéis cubiertos, pero déjame hacerte una pregunta. Si te demuestro con una auditoría gratuita de 5 minutos que vuestro proveedor actual os está dejando un 20% de rendimiento sobre la mesa que nosotros sí podemos capturar con {product}, ¿no tendrías la obligación profesional de evaluarlo? Confía en mí, hagamos la auditoría.",
                emocional: "Parece que valoras la lealtad con tu proveedor actual y no quieres generar conflictos ni molestias cambiando de agencia. ¿Qué tendría que ofrecer {product} para que valiera la pena considerar una prueba complementaria sin romper con ellos?",
                agresivo: "¡Excelente que os vaya bien! Pero 'bien' es el enemigo de 'extraordinario'. No te conformes con resultados aceptables cuando puedes tener un crecimiento del 40% con {product}. Te propongo que nos des un proyecto pequeño piloto y compares directamente los resultados. Que ganen los mejores. Firmemos el piloto.",
                solucionador: "¿Qué limitaciones habéis notado últimamente con vuestro proveedor en cuanto a tiempos de respuesta o innovación? Si esas pequeñas carencias se mantienen a largo plazo, ¿cómo afectará a vuestros proyectos clave? ¿De qué manera os ayudaría contar con nuestro soporte especializado?"
            },
            {
                title: "Vuestra propuesta parece muy genérica para nuestro negocio",
                analitico: "Entiendo perfectamente tu percepción. La propuesta inicial es un marco de trabajo estándar. Pero si confías en nuestra metodología y le damos luz verde hoy, realizaremos 3 sesiones de inmersión profunda con tu equipo para tallar a medida vuestro libro de ruta operativo exclusivo. Hagamos la primera sesión esta semana.",
                emocional: "Parece que sientes que no hemos comprendido del todo las particularidades únicas de tu negocio y temes recibir un servicio enlatado. ¿Qué elementos críticos o desafíos específicos de tu día a día deberíamos incorporar para que sea perfecta?",
                agresivo: "¡Tienes razón, a simple vista puede parecer genérica! Pero las bases del crecimiento comercial son universales, lo que cambia es la ejecución. Y en ejecución somos los más agresivos y profesionales del mercado. Empecemos a trabajar y verás cómo adaptamos cada detalle a tu ADN operativo. Firmemos aquí.",
                solucionador: "¿Qué consecuencias tiene para vuestro equipo de ventas utilizar herramientas generales no adaptadas? Si vuestros procesos siguen sin una personalización real, ¿cuántas ventas estimas que se perderán? ¿Cómo mejoraría el cierre si diseñamos este flujo juntos?"
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
                analitico: "Entiendo el deseo de ahorrar, pero déjame hacerte una pregunta seria. Si mañana sufres un imprevisto grave y tu póliza básica no cubre el tratamiento, ¿de dónde saldrán los 50.000€ necesarios? De tus ahorros de toda la vida. Por solo un 15% más de cuota con {product}, eliminas el riesgo al 100%. Confía en mí, es lo inteligente.",
                emocional: "Parece que sientes que las compañías de seguros intentan venderte coberturas innecesarias solo para cobrarte más. ¿Qué tendría que pasar en tu situación familiar para que consideraras que ampliar la protección es una prioridad real?",
                agresivo: "¡Estoy de acuerdo, a nadie le gusta gastar en seguros! Pero un seguro no es un gasto, es una protección patrimonial. Si no quieres gastar 20€ más al mes hoy, ¿cómo vas a afrontar una emergencia médica o familiar de miles de euros mañana? Aseguremos tu tranquilidad hoy mismo.",
                solucionador: "¿Qué ocurriría con la estabilidad económica de tu familia si tuvieras una baja laboral prolongada no cubierta por tu póliza básica? Si tus ingresos se reducen a la mitad, ¿cómo afrontarías la hipoteca? ¿Qué valor tiene para ti saber que estarás cubierto al 100%?"
            },
            {
                title: "No confío en que las aseguradoras paguen cuando pase algo",
                analitico: "Entiendo tu desconfianza, hay mucha mala reputación ahí fuera. Pero déjame darte un dato objetivo: {product} tiene un índice de resolución favorable del 98.4% auditado. Además, si confías en mí, yo seré tu gestor personal y quien pelee por tus derechos ante cualquier siniestro. Tienes mi palabra de que responderemos.",
                emocional: "Parece que has tenido malas experiencias con aseguradoras que se desentendieron en el momento de la verdad y te sientes desprotegido. ¿Cómo podríamos documentar y firmar las cláusulas de exclusión para que no tengas ninguna duda de lo que cubre?",
                agresivo: "¡Tienes toda la razón del mundo en desconfiar, el sector a veces abusa! Y precisamente por eso estoy yo aquí. Yo no soy un contestador automático; soy tu asesor y daré la cara por ti si pasa algo. No te vendo un papel, te vendo mi respaldo profesional 24/7. Dejemos la póliza activa hoy.",
                solucionador: "¿Qué impacto tendría en tu bienestar y en el de los tuyos tener que costear un siniestro de tu bolsillo por no contar con un contrato claro? Si surge un problema, ¿cómo afectará a tu salud mental no tener a quién acudir? ¿Cómo te ayudaría contar con mi asesoría directa?"
            },
            {
                title: "Todavía soy joven y saludable, no necesito esto ahora",
                analitico: "Es fantástico que tengas buena salud, y ojalá dure siempre. Pero déjame preguntarte una cosa: ¿cuándo crees que las aseguradoras aceptan dar primas ultra baratas sin exclusiones médicas? Ahora que estás sano. Esperar a enfermarte hará que te cueste el triple o que te rechacen. Confía en mí, el momento de contratar es hoy.",
                emocional: "Parece que ves el seguro de salud como algo lejano para personas mayores y sientes que contratarlo ahora es tirar el dinero. ¿Qué tendría que ocurrir para que consideraras que proteger tu salud actual es una inversión inteligente a largo plazo?",
                agresivo: "¡Totalmente de acuerdo, estás en tu mejor momento! Y por eso debes blindarlo. La salud no se compra cuando se pierde. Contratar hoy te garantiza una tarifa bajísima para toda la vida. Sé responsable con tu futuro y deja tu red de seguridad lista desde hoy.",
                solucionador: "Si tuvieras un accidente o lesión deportiva que requiriera cirugía inmediata, ¿cuánto tiempo tendrías que esperar en la sanidad pública para ser operado? ¿Cómo afectaría esa espera a tu trabajo o carrera? ¿Cómo te beneficiaría tener acceso a especialistas en 24 horas?"
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
                analitico: "Es posible encontrar imitaciones o gamas bajas online. Pero hagamos una reflexión: ¿se puede replicar el tacto de este cuero italiano, la costura artesanal a mano y la garantía de autenticidad de esta firma? Jamás. Esta pieza es única. Confía en tu buen criterio, mereces poseer el original.",
                emocional: "Parece que sientes el precio de este artículo tiene un sobrecoste injustificado en comparación con alternativas del mercado. ¿Qué detalles de la confección o de la experiencia de compra son indispensables para que valores esta pieza como una inversión justificada?",
                agresivo: "¡Estoy de acuerdo, hay de todo online! Pero tú no eres una persona que busque lo más barato. Si buscas precio, compras online; si buscas estatus, exclusividad e historia, adquieres esta pieza. El lujo no se compara con la gama baja. Llévate esta obra de arte y lúcela con orgullo.",
                solucionador: "Si adquieres una alternativa barata online y se deteriora en unos meses, ¿qué imagen proyectarás y cuánto habrás gastado al tener que reemplazarla? ¿Qué valor tiene para ti la durabilidad de una pieza de coleccionista que incrementa su valor con los años?"
            },
            {
                title: "Solo estoy mirando de momento, no voy a comprar hoy",
                analitico: "Me parece perfecto, la colección es para admirarla. Pero déjame comentarte un secreto de confianza: de esta edición exclusiva solo han llegado 2 piezas a nuestra boutique. Si de verdad te fascina, déjame reservártela 24 horas sin compromiso para que no la pierdas. ¿Te parece una buena idea?",
                emocional: "Parece que temes sentir la presión de una venta inmediata y prefieres evaluar la decisión con calma y sin agobios. ¿Cómo te sentirías si simplemente te probaras la pieza para apreciar la caída del material sobre tu piel, sin ningún tipo de compromiso hoy?",
                agresivo: "¡Me parece estupendo que mires! Pero sé sincero: cuando encuentras algo que te queda perfecto y te hace sentir extraordinario, esperar no tiene sentido. La vida es demasiado corta para posponer los premios que te has ganado con tu esfuerzo. Vamos a prepararte el paquete.",
                solucionador: "¿Qué ocurriría si al volver a por esta pieza específica de edición limitada ya se hubiera agotado en toda Europa? ¿Cuánto lamentarías no haber tomado la decisión cuando la tenías en tus manos? ¿Cómo te sentirás cuando salgas de la boutique con ella hoy?"
            },
            {
                title: "La marca tiene prestigio, pero el precio es desorbitado",
                analitico: "Entiendo que el precio llame la atención de entrada. Pero analicemos lo que hay detrás: materiales nobles exclusivos y más de 80 horas de trabajo de maestros artesanos de primer nivel. Además, las piezas de esta firma suben de valor de tasación un 5% anual. No es un gasto, es una inversión patrimonial líquida. Confía en mí, es una decisión brillante.",
                emocional: "Parece que te preocupa estar pagando solo por el logotipo de la marca en lugar de por el valor intrínseco real del producto. ¿Qué elementos de calidad, garantía o exclusividad tendrían que destacar en esta pieza para que consideres que el precio es adecuado?",
                agresivo: "¡Totalmente de acuerdo, es un precio de nivel! Pero el prestigio no es gratis. Compras esta marca porque representa el éxito que has alcanzado en tu carrera. El precio es secundario comparado con la satisfacción de poseer algo que muy pocos pueden permitirse en el mundo. Hagámoslo tuyo.",
                solucionador: "Si eliges una opción común sin el prestigio de esta marca, ¿cómo afectará a tu imagen en los eventos clave de tu sector? Si esta pieza representa un activo que mantendrá o incrementará su valor con el tiempo, ¿cuánto te costará dejar pasar esta oportunidad de inversión estética?"
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
            leadType: "", // "cold" or "warm"
            previousFilters: [], // Array of filters completed
            onboardingStep: 1, // Onboarding wizard step
            xp: 0,
            level: 1,
            completedStages: [], // Node identifiers that are completed
            currentObjectionIndex: 0,
            activeTab: "agresivo",
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
                
                // MIGRACIÓN: Si el usuario tiene "stage-1" de la sesión anterior (cuando onboarding marcaba "stage-1" como completado),
                // lo eliminamos de completedStages y lo reemplazamos por "onboarding-complete" para que la Etapa 1
                // empiece limpia y jugable, pero mantenga el acceso al dashboard.
                if (this.state.completedStages.includes("stage-1") && !this.state.completedStages.includes("onboarding-complete")) {
                    this.state.completedStages = this.state.completedStages.filter(s => s !== "stage-1");
                    this.state.completedStages.push("onboarding-complete");
                }
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
            leadType: "",
            previousFilters: [],
            onboardingStep: 1,
            xp: 0,
            level: 1,
            completedStages: [],
            currentObjectionIndex: 0,
            activeTab: "agresivo",
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
        
        // Restaurar estado visual del Wizard
        resetOnboardingWizardUI();
        
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
        
        let list = [];
        // Si es Lead Frío, añadimos las 2 objeciones universales de prospección al inicio
        if (this.state.leadType === "cold") {
            list = [
                {
                    title: "No tengo tiempo / Envíame un correo",
                    analitico: "Entiendo perfectamente que estés ocupado, todos lo estamos. Pero déjame hacerte una pregunta rápida: si te demuestro en solo 3 minutos cómo {product} puede ahorrarle a tu equipo hasta 8 horas semanales, ¿no merecería la pena tener una breve charla de 5 minutos el martes? Confía en mí, valdrá cada segundo.",
                    emocional: "Parece que te pilló en un momento muy complicado de tu jornada y sientes que esta llamada es una distracción molesta. ¿Cuándo sería un momento menos inoportuno para enviarte un resumen de 3 puntos por correo y hablar muy brevemente después?",
                    agresivo: "¡Estoy de acuerdo contigo, no tienes tiempo! Y precisamente por eso me alegro de haberte localizado, porque {product} te va a devolver ese tiempo automatizando tus procesos. Si no tienes 5 minutos hoy para solucionar esto, seguirás saturado el mes que viene. Vamos a agendar 5 minutos mañana a las 9.",
                    solucionador: "¿Qué tareas operativas te están quitando más tiempo en tu día a día actualmente? Si sigues dedicando horas a esos procesos manuales, ¿qué proyectos estratégicos estás dejando de lado? ¿Cómo aliviaría tu agenda mensual automatizar todo eso?"
                },
                {
                    title: "No me interesa / Ya estoy cubierto",
                    analitico: "Es comprensible que de entrada digas que no te interesa algo de lo que aún no has visto el rendimiento real. Pero hagamos una cosa: si te muestro en un gráfico de 2 minutos cómo {product} aumenta la eficiencia en tu sector un 30% en comparación con lo que estás usando hoy, ¿no sería negligente no mirarlo? Confía en mí, hagamos la llamada rápida.",
                    emocional: "Parece que estás muy satisfecho con tu solución actual y sientes que cambiar o evaluar otra alternativa es una pérdida de tiempo innecesaria. ¿Qué tendría que pasar con tu proveedor actual para que te plantearas buscar una alternativa más competitiva?",
                    agresivo: "¡Tienes toda la razón, ya estás cubierto! Y me alegro por ello. Pero mi trabajo no es sustituir a tu proveedor actual por capricho, sino retar vuestros resultados. Si te conformas con estar bien, estás dejando dinero sobre la mesa que tu competencia sí aprovechará. Hagamos una prueba comparativa rápida hoy.",
                    solucionador: "¿Qué limitaciones o costes ocultos habéis detectado con vuestro proveedor actual en los últimos meses? Si esas pequeñas ineficiencias se acumulan en el próximo año, ¿qué impacto económico tendrán en vuestra facturación? ¿Cómo solucionaría eso contar con {product}?"
                }
            ];
        }
        
        return [...list, ...sector.objections, ...this.state.customObjections];
    }

    get currentObjection() {
        const objections = this.currentObjections;
        return objections[this.state.currentObjectionIndex] || null;
    }
}

// Onboarding Wizard UI Controllers
function updateWizardUI() {
    const step = app.state.onboardingStep;
    
    // Hide all step slides
    document.querySelectorAll(".onboarding-step-slide").forEach(slide => {
        slide.classList.add("hidden");
    });
    
    // Show current slide
    const currentSlide = document.getElementById(`ob-step-${step}`);
    if (currentSlide) {
        currentSlide.classList.remove("hidden");
        
        // Update badge text dynamically based on leadType
        const badge = currentSlide.querySelector(".badge-promo");
        if (badge && step > 1) {
            const total = app.state.leadType === "cold" ? 2 : 3;
            badge.textContent = `Paso ${step - 1} de ${total}`;
        }
    }
    
    // Update progress bar
    const progressContainer = document.querySelector(".quiz-progress-bar");
    const progress = document.getElementById("onboarding-progress");
    if (step === 1) {
        if (progressContainer) progressContainer.style.display = "none";
    } else {
        if (progressContainer) progressContainer.style.display = "block";
        if (progress) {
            const total = app.state.leadType === "cold" ? 2 : 3;
            const currentStep = step - 1; // 1, 2, 3
            const pct = (currentStep / total) * 100;
            progress.style.width = `${pct}%`;
        }
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById("ob-prev-btn");
    const nextBtn = document.getElementById("ob-next-btn");
    
    if (prevBtn) {
        if (step === 1) {
            prevBtn.classList.add("hidden");
        } else {
            prevBtn.classList.remove("hidden");
        }
    }
    
    if (nextBtn) {
        const lastStep = app.state.leadType === "cold" ? 3 : 4;
        if (step < lastStep) {
            nextBtn.classList.add("hidden");
        } else {
            nextBtn.classList.remove("hidden");
            nextBtn.innerHTML = `<span>Comenzar mi Ruta 🚀</span>`;
        }
    }

    // Highlight selections for step 3
    if (step === 3) {
        const coldCard = document.getElementById("lead-cold-card");
        const warmCard = document.getElementById("lead-warm-card");
        if (coldCard && warmCard) {
            if (app.state.leadType === "cold") {
                coldCard.classList.add("selected");
                warmCard.classList.remove("selected");
            } else if (app.state.leadType === "warm") {
                warmCard.classList.add("selected");
                coldCard.classList.remove("selected");
            } else {
                coldCard.classList.remove("selected");
                warmCard.classList.remove("selected");
            }
        }
    }

    // Highlight selections for step 4
    if (step === 4) {
        document.querySelectorAll("#filters-options-container .quiz-option").forEach(opt => {
            const val = opt.dataset.val;
            if (app.state.previousFilters.includes(val)) {
                opt.classList.add("selected");
            } else {
                opt.classList.remove("selected");
            }
        });
    }
}

function resetOnboardingWizardUI() {
    app.state.onboardingStep = 1;
    
    const progressContainer = document.querySelector(".quiz-progress-bar");
    if (progressContainer) progressContainer.style.display = "none";
    const progress = document.getElementById("onboarding-progress");
    if (progress) progress.style.width = "0%";
    
    document.querySelectorAll(".onboarding-step-slide").forEach((slide, idx) => {
        if (idx === 0) {
            slide.classList.remove("hidden");
        } else {
            slide.classList.add("hidden");
        }
    });
    
    const coldCard = document.getElementById("lead-cold-card");
    const warmCard = document.getElementById("lead-warm-card");
    if (coldCard) coldCard.classList.remove("selected");
    if (warmCard) warmCard.classList.remove("selected");
    
    document.querySelectorAll("#filters-options-container .quiz-option").forEach(opt => {
        opt.classList.remove("selected");
    });
    
    document.querySelectorAll("#sector-grid .sector-card").forEach(card => {
        card.classList.remove("selected");
    });
    
    const prevBtn = document.getElementById("ob-prev-btn");
    const nextBtn = document.getElementById("ob-next-btn");
    if (prevBtn) prevBtn.classList.add("hidden");
    if (nextBtn) nextBtn.classList.add("hidden");
}

// 3. UI and DOM Manager
const app = new SalesQuest();

document.addEventListener("DOMContentLoaded", () => {
    initUI();
});

const SALES_QUOTES = [
    { text: "No vendas. Ayuda.", author: "Zig Ziglar" },
    { text: "A la gente no le gusta que le vendan, pero les encanta comprar.", author: "Jeffrey Gitomer" },
    { text: "Puedes conseguir todo lo que quieres en la vida si ayudas a suficientes personas a conseguir lo que ellas quieren.", author: "Zig Ziglar" },
    { text: "Enfoca cada cliente con la idea de ayudarle a resolver un problema o alcanzar una meta, no de venderle un producto.", author: "Brian Tracy" },
    { text: "La gente no compra por razones lógicas. Compra por razones emocionales.", author: "Zig Ziglar" },
    { text: "Cuando trates con personas, recuerda que no tratas con criaturas de lógica, sino con criaturas de emoción.", author: "Dale Carnegie" },
    { text: "La venta es esencialmente una transferencia de sentimientos.", author: "Zig Ziglar" },
    { text: "Si le agradas a la gente, te escucharán. Si confían en ti, harán negocios contigo.", author: "Zig Ziglar" },
    { text: "Demuestra que tu producto es la mejor opción para tu cliente, no el precio más bajo.", author: "Brian Tracy" },
    { text: "Como regla general, la persona que hace las preguntas tiene el control.", author: "Brian Tracy" },
    { text: "Cada objeción no es un rechazo, es una petición de más información.", author: "Zig Ziglar" },
    { text: "Haz un cliente, no una venta.", author: "Katherine Barchetti" },
    { text: "Si no estás cuidando a tu cliente, tu competencia lo hará.", author: "Bob Hooey" },
    { text: "Las ventas dependen de la actitud del vendedor, no de la actitud del cliente.", author: "W. Clement Stone" },
    { text: "El seguimiento no es una fase del proceso de ventas, es el proceso en sí.", author: "Jeffrey Gitomer" },
    { text: "Nunca bajes tu meta; aumenta tus acciones.", author: "Grant Cardone" },
    { text: "Nunca bajes tu precio, añade valor.", author: "Grant Cardone" },
    { text: "Las ventas son la transferencia de emoción. Y la emoción que transfieres es la de certeza.", author: "Jordan Belfort" },
    { text: "La mejor forma de vender algo es no vender nada. Gana primero el respeto y la confianza de tu prospecto.", author: "Jordan Belfort" },
    { text: "Si le das a la gente un 'por qué' lo suficientemente bueno, siempre encontrarán el 'cómo'.", author: "Jordan Belfort" },
    { text: "La negociación no es un acto de batalla, es un proceso de descubrimiento.", author: "Chris Voss" },
    { text: "Las personas parecen estar más motivadas por la idea de perder algo que por la idea de ganar algo de igual valor.", author: "Robert Cialdini" },
    { text: "Cada vez que decepcionas a un prospecto, decepcionas a 250 potenciales recomendados más.", author: "Joe Girard" },
    { text: "El obstáculo es lo que ves cuando apartas los ojos de tu objetivo.", author: "Henry Ford" },
    { text: "No vendas un producto, vende soluciones a problemas reales.", author: "Mark Cuban" },
    { text: "A los clientes no les importa tu producto, les importan sus propios problemas.", author: "Jill Konrath" },
    { text: "El consumidor no es tonto; respeta su inteligencia y dile la verdad.", author: "David Ogilvy" },
    { text: "Presta atención a cada persona; todos llevan un cartel invisible que dice: Hazme sentir importante.", author: "Mary Kay Ash" },
    { text: "Quien aprende a estar en desacuerdo sin ser desagradable descubre el gran secreto de la negociación.", author: "Chris Voss" },
    { text: "En una llamada o contacto inicial no vendes tu producto; estás vendiendo una conversación.", author: "Art Sobczak" },
    { text: "No celebres el cierre de una venta; celebra la apertura de una relación comercial.", author: "Patricia Fripp" },
    { text: "El éxito en las ventas viene de hacer preguntas correctas, no de tener todas las respuestas.", author: "Neil Rackham" },
    { text: "La regla de oro de las ventas: habla menos y escucha más.", author: "Brian Tracy" },
    { text: "Tus clientes más descontentos son tu mayor fuente de aprendizaje.", author: "Bill Gates" }
];

function startQuoteRotation() {
    const quoteEl = document.getElementById("sales-quote");
    const welcomeQuoteEl = document.getElementById("welcome-quote");
    
    if (!quoteEl && !welcomeQuoteEl) return;
    
    // Choose a random quote to display initially
    let currentIndex = Math.floor(Math.random() * SALES_QUOTES.length);
    
    if (quoteEl) {
        const initialQuote = SALES_QUOTES[currentIndex];
        quoteEl.innerHTML = `"${initialQuote.text}" — <strong>${initialQuote.author}</strong>`;
    }
    
    if (welcomeQuoteEl) {
        const initialWelcomeQuote = SALES_QUOTES[(currentIndex + 3) % SALES_QUOTES.length];
        welcomeQuoteEl.innerHTML = `"${initialWelcomeQuote.text}" — <strong>${initialWelcomeQuote.author}</strong>`;
    }
    
    setInterval(() => {
        if (quoteEl) quoteEl.style.opacity = 0;
        if (welcomeQuoteEl) welcomeQuoteEl.style.opacity = 0;
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % SALES_QUOTES.length;
            
            if (quoteEl) {
                const quote = SALES_QUOTES[currentIndex];
                quoteEl.innerHTML = `"${quote.text}" — <strong>${quote.author}</strong>`;
                quoteEl.style.opacity = 1;
            }
            
            if (welcomeQuoteEl) {
                const quoteWelcome = SALES_QUOTES[(currentIndex + 3) % SALES_QUOTES.length];
                welcomeQuoteEl.innerHTML = `"${quoteWelcome.text}" — <strong>${quoteWelcome.author}</strong>`;
                welcomeQuoteEl.style.opacity = 1;
            }
        }, 500);
    }, 8000);
}

function initUI() {
    renderSectorSelectionGrid();
    setupEventListeners();
    startQuoteRotation();
    
    // Auto navigation based on state
    if (app.state.completedStages.includes("onboarding-complete")) {
        document.getElementById("app-header").classList.remove("hidden");
        document.getElementById("app-nav").classList.remove("hidden");
        app.updateHeaderStats();
        navigateTo("dashboard");
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
            
            // Auto advance to next step after a tiny delay
            setTimeout(() => {
                const nextBtn = document.getElementById("ob-next-btn");
                if (nextBtn) nextBtn.click();
            }, 250);
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
    // Onboarding Wizard: Temperature selection
    const coldCard = document.getElementById("lead-cold-card");
    const warmCard = document.getElementById("lead-warm-card");
    if (coldCard && warmCard) {
        coldCard.addEventListener("click", () => {
            coldCard.classList.add("selected");
            warmCard.classList.remove("selected");
            app.state.leadType = "cold";
            app.state.previousFilters = []; // Reset filters if switched to cold
            
            // Auto complete/advance after a tiny delay
            setTimeout(() => {
                const nextBtn = document.getElementById("ob-next-btn");
                if (nextBtn) nextBtn.click();
            }, 250);
        });
        
        warmCard.addEventListener("click", () => {
            warmCard.classList.add("selected");
            coldCard.classList.remove("selected");
            app.state.leadType = "warm";
            
            // Auto advance to next step after a tiny delay
            setTimeout(() => {
                const nextBtn = document.getElementById("ob-next-btn");
                if (nextBtn) nextBtn.click();
            }, 250);
        });
    }

    // Onboarding Wizard: Previous Filters Selection (Multiple)
    const filterOptions = document.querySelectorAll("#filters-options-container .quiz-option");
    filterOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            const val = opt.dataset.val;
            if (opt.classList.contains("selected")) {
                opt.classList.remove("selected");
                app.state.previousFilters = app.state.previousFilters.filter(f => f !== val);
            } else {
                opt.classList.add("selected");
                if (!app.state.previousFilters.includes(val)) {
                    app.state.previousFilters.push(val);
                }
            }
        });
    });

    // Onboarding Wizard: Navigation Buttons
    const prevBtn = document.getElementById("ob-prev-btn");
    const nextBtn = document.getElementById("ob-next-btn");
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const step = app.state.onboardingStep;
            
            const completeOnboarding = () => {
                const sectorObj = SECTORS.find(s => s.id === app.state.sectorId);
                const sectorName = sectorObj ? sectorObj.name : "tu sector";
                app.state.productName = sectorName; // Respaldo para plantillas
                
                if (!app.state.completedStages.includes("onboarding-complete")) {
                    app.state.completedStages.push("onboarding-complete");
                }
                app.addXP(20);
                
                document.getElementById("app-header").classList.remove("hidden");
                document.getElementById("app-nav").classList.remove("hidden");
                app.updateHeaderStats();
                
                showCelebrationModal(
                    "¡Ruta Creada! 🚀", 
                    `Tu ruta de aprendizaje de ventas para "${sectorName}" (${app.state.leadType === 'cold' ? 'Lead Frío' : 'Lead Caliente'}) está lista. Ganas +20 XP.`,
                    [{ emoji: "🗺️", name: "Iniciador" }]
                );
                
                navigateTo("dashboard");
            };
            
            if (step === 2) {
                if (!app.state.sectorId) {
                    alert("Por favor, selecciona un sector comercial.");
                    return;
                }
                app.state.onboardingStep = 3;
                updateWizardUI();
            } 
            else if (step === 3) {
                if (!app.state.leadType) {
                    alert("Por favor, selecciona si es un Lead Frío o Caliente.");
                    return;
                }
                
                // Si es frío, completamos aquí la ruta de inmediato
                if (app.state.leadType === "cold") {
                    completeOnboarding();
                } else {
                    app.state.onboardingStep = 4;
                    updateWizardUI();
                }
            } 
            else if (step === 4) {
                completeOnboarding();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            const step = app.state.onboardingStep;
            if (step > 1) {
                app.state.onboardingStep = step - 1;
            }
            updateWizardUI();
        });
    }

    // Bottom Navigation Buttons Click
    document.querySelectorAll(".nav-item").forEach(button => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.view);
        });
    });

    // Dashboard Cards Action
    const dbCardRoadmap = document.getElementById("db-card-roadmap");
    if (dbCardRoadmap) {
        dbCardRoadmap.addEventListener("click", () => {
            navigateTo("roadmap");
        });
    }
    const dbCardCopilot = document.getElementById("db-card-copilot");
    if (dbCardCopilot) {
        dbCardCopilot.addEventListener("click", () => {
            navigateTo("objections");
        });
    }

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

    // Copilot Configuration: Sector Select
    const copilotSectorSelect = document.getElementById("copilot-sector-select");
    if (copilotSectorSelect) {
        copilotSectorSelect.addEventListener("change", (e) => {
            app.state.sectorId = e.target.value;
            
            // Also update the global product name to match new sector name
            const sectorObj = SECTORS.find(s => s.id === app.state.sectorId);
            if (sectorObj) {
                app.state.productName = sectorObj.name;
            }
            
            app.state.currentObjectionIndex = 0; // Reset active objection index
            app.saveState();
            renderObjections();
        });
    }

    // Copilot Configuration: Lead Type Toggles
    const copilotLeadCold = document.getElementById("copilot-lead-cold");
    const copilotLeadWarm = document.getElementById("copilot-lead-warm");
    if (copilotLeadCold && copilotLeadWarm) {
        copilotLeadCold.addEventListener("click", () => {
            app.state.leadType = "cold";
            app.state.previousFilters = [];
            app.state.currentObjectionIndex = 0;
            app.saveState();
            renderObjections();
        });
        copilotLeadWarm.addEventListener("click", () => {
            app.state.leadType = "warm";
            app.state.currentObjectionIndex = 0;
            app.saveState();
            renderObjections();
        });
    }

    // Solve/Practice Objection Action
    const solveBtn = document.getElementById("solve-objection-btn");
    if (solveBtn) {
        solveBtn.addEventListener("click", () => {
            const stageKey = `objection-${app.state.currentObjectionIndex}`;
            if (!app.state.completedStages.includes(stageKey)) {
                app.state.completedStages.push(stageKey);
                app.addXP(30);
                
                // Add stage 7 (Objections) to completed roadmap
                if (!app.state.completedStages.includes("stage-7")) {
                    app.state.completedStages.push("stage-7");
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

    // Challenge Modal Close Action
    const challengeClose = document.getElementById("challenge-close-btn");
    if (challengeClose) {
        challengeClose.addEventListener("click", () => {
            document.getElementById("challenge-modal").classList.add("hidden");
        });
    }

    // Close Roadmap Complete Reward Action
    const completeRoadmapBtn = document.getElementById("complete-roadmap-btn");
    if (completeRoadmapBtn) {
        completeRoadmapBtn.addEventListener("click", () => {
            if (!app.state.completedStages.includes("stage-8")) {
                app.state.completedStages.push("stage-8");
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

    // Start Onboarding button on Welcome Screen
    const startBtn = document.getElementById("ob-start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            app.state.onboardingStep = 2;
            updateWizardUI();
        });
    }

    // Header Back to Onboarding / Reconfigure button
    const backToOnboardingBtn = document.getElementById("back-to-onboarding-btn");
    if (backToOnboardingBtn) {
        backToOnboardingBtn.addEventListener("click", () => {
            app.state.onboardingStep = 1;
            
            // Hide app header and navigation
            const headerEl = document.getElementById("app-header");
            const navEl = document.getElementById("app-nav");
            if (headerEl) headerEl.classList.add("hidden");
            if (navEl) navEl.classList.add("hidden");
            
            // Update UI and navigate to onboarding view
            updateWizardUI();
            navigateTo("onboarding");
        });
    }
}

// Action: Custom Objection Creation
function addCustomObjection() {
    const input = document.getElementById("custom-objection-input");
    const text = input.value.trim();
    
    if (!text) return;
    
    // Dynamic generated responses based on simple heuristics representing the 4 profiles
    const newObjection = {
        title: `"${text}"`,
        analitico: `Entiendo perfectamente que "${text}" sea tu mayor preocupación ahora mismo, y es una duda muy razonable. Pero déjame hacerte una pregunta seria: si eliminamos ese obstáculo sobre "${text}" y te demuestro que el ROI de {product} multiplica por tres tu inversión inicial, ¿estarías dispuesto a trabajar conmigo? Confía en mí, nos encargaremos personalmente de que sea un éxito rotundo. ¿Cerramos los detalles técnicos hoy?`,
        emocional: `Parece que te preocupa mucho el impacto de "${text}" en tus operaciones y temes que sea un problema difícil de solucionar. ¿Cómo crees que podríamos abordar "${text}" para que te sientas totalmente cómodo dando el paso? ¿Qué opción ves viable por nuestra parte?`,
        agresivo: `¡Estoy 100% de acuerdo contigo en que "${text}" es un punto crítico! Pero no dejes que "${text}" sea la excusa para quedarte estancado. El verdadero coste es la inacción y seguir perdiendo tracción comercial cada día. Vamos a dejar firmado el acuerdo de {product} hoy mismo y resolveremos "${text}" sobre la marcha con nuestro equipo técnico.`,
        solucionador: `¿Qué problemas concretos os genera "${text}" en vuestra actividad diaria en {sector}? Si no solucionáis la causa raíz detrás de "${text}", ¿cuánto dinero y tiempo habréis perdido en los próximos 12 meses? ¿De qué forma mejoraría vuestra rentabilidad si resolvemos esto de una vez con {product}?`
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
    
    // Core Stages definition (8 modules mapped to 14 core sales competencies)
    const stages = [
        { id: "stage-1", title: "1. Mentalidad & Preparación de Acero", emoji: "🧠", desc: "Forja resiliencia, psicología y preparación previa" },
        { id: "stage-2", title: "2. Sintonía & Diálogo Activo", emoji: "🗣️", desc: "Conecta en su sintonía y evita monólogos" },
        { id: "stage-3", title: "3. Descubrimiento del Dolor", emoji: "🔎", desc: "Identifica el motor real de compra" },
        { id: "stage-4", title: "4. El Reencuadre & Visión", emoji: "🔄", desc: "Enseña una nueva perspectiva comercial" },
        { id: "stage-5", title: "5. Adaptación & Deseo", emoji: "🔥", desc: "Ajusta tu discurso y enciende la emoción" },
        { id: "stage-6", title: "6. La Oferta Irresistible", emoji: "💎", desc: "Reduce fricción y maximiza valor percibido" },
        { id: "stage-7", title: "7. Copiloto de Objeciones", emoji: "🛡️", desc: "Usa el asistente en vivo para rebatir objeciones" },
        { id: "stage-8", title: "8. Perfilado & Cierre de Oro", emoji: "🎯", desc: "Genera el guión final adaptado al cliente" }
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
            if (stage.id === "stage-7") {
                navigateTo("objections");
            } else if (stage.id === "stage-8") {
                navigateTo("profiler");
            } else {
                // Interactive Mini-challenge for Stages 1 to 6
                if (status === "active") {
                    handleMiniChallenge(stage.id, stage.title, false);
                } else {
                    handleMiniChallenge(stage.id, stage.title, true);
                }
            }
        });
        
        path.appendChild(node);
    });
}

const REPETITION_QUOTES = [
    { text: "La repetición es la madre de la maestría.", author: "Tony Robbins" },
    { text: "Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito.", author: "Aristóteles" },
    { text: "No temo al hombre que ha practicado 10,000 patadas una vez, sino al que ha practicado una patada 10,000 veces.", author: "Bruce Lee" },
    { text: "La repetición es la madre del aprendizaje, el padre de la acción, lo que la convierte en el arquitecto del éxito.", author: "Zig Ziglar" },
    { text: "Cualquier cosa que practiques repetidamente se convertirá en un nuevo hábito de pensamiento y acción.", author: "Brian Tracy" },
    { text: "La clave para dominar cualquier habilidad es la repetición constante hasta que se convierta en una segunda naturaleza.", author: "Joe Girard" },
    { text: "La práctica no hace la perfección. Solo la práctica perfecta hace la perfección.", author: "Vince Lombardi" },
    { text: "El conocimiento no es poder hasta que se aplica y se practica repetidamente.", author: "Dale Carnegie" }
];

// Action: Interactive Mini-challenges for roadmap exploration
function handleMiniChallenge(stageId, stageTitle, isReview = false) {
    let question = "";
    let options = [];
    let tip = "";
    let theory = "";

    if (stageId === "stage-1") {
        theory = "<strong>🧠 Mentalidad & Preparación:</strong> La venta de alto nivel no empieza en el producto, sino en la psicología del vendedor. La clave es adoptar un estado de curiosidad genuina: en lugar de presionarte para 'cerrar una venta', prepárate investigando brevemente al prospecto para ver sinceramente si puedes aportarle valor y resolver su dolor de cabeza. Esto reduce la ansiedad y elimina la actitud de vendedor desesperado.";
        question = "Estás a punto de iniciar una jornada de llamadas de ventas en frío. Tu mente empieza a dudar y temes el rechazo. ¿Cuál es la preparación y mentalidad correcta antes de marcar?";
        options = [
            { text: "Te mentalizas en que debes cerrar a todos a toda costa para ser exitoso, y empiezas a llamar sin investigar a los leads para ahorrar tiempo.", correct: false, reason: "Incorrecto. Esta mentalidad de desesperación se transmite y saltarse la investigación te hace sonar genérico." },
            { text: "Adoptas una mentalidad de curiosidad genuina (quieres ver si puedes ayudarles) e investigas brevemente a cada empresa para personalizar el ángulo de entrada.", correct: true, reason: "¡Excelente! La curiosidad genuina reduce la presión y la preparación previa te posiciona como un profesional valioso." }
        ];
        tip = "La venta empieza en tu mente: busca entender antes de intentar ser entendido.";
    } else if (stageId === "stage-2") {
        theory = "<strong>🗣️ Sintonía & Diálogo Activo:</strong> Para conectar con un cliente potencial, debes evitar los monólogos de presentación y lograr una conversación bidireccional de calidad. Aplica la regla del 70/30: escucha activamente el 70% del tiempo y habla el 30%. Sintoniza tu ritmo y tono de voz con los del cliente (técnica de espejamiento) para generar confianza instantánea y responder con precisión.";
        question = "Comienzas la llamada y el cliente te dice: 'Hola, sí, dime rápido qué quieres'. ¿Cómo manejas la conversación para evitar un monólogo técnico y conectar en su misma sintonía?";
        options = [
            { text: "Igualas sutilmente su ritmo y tono de voz (espejamiento) para transmitir urgencia respetuosa, respondes brevemente y le devuelves el control con una pregunta abierta para iniciar un diálogo bidireccional.", correct: true, reason: "¡Perfecto! El tono y el diálogo interactivo desarman las defensas. La regla es: habla el 30%, escucha el 70%." },
            { text: "Aprovechas que te dio la palabra para recitar de golpe todo tu discurso de ventas de 3 minutos sin pausar, para que conozca todas las características de tu producto.", correct: false, reason: "Incorrecto. Los monólogos largos aburren al prospecto y destruyen cualquier posibilidad de conexión humana." }
        ];
        tip = "Quien hace las preguntas correctas controla la conversación. Escucha activamente.";
    } else if (stageId === "stage-3") {
        theory = "<strong>🔎 Descubrimiento del Dolor:</strong> Las personas compran por sus propias razones (emocionales), no por las tuyas (lógicas). En las ventas B2B, no hay transacción si no hay dolor u oportunidad clara. En lugar de atacar a su proveedor actual o vender características, haz preguntas de contraste que ayuden al cliente a identificar por sí mismo sus principales cuellos de botella.";
        question = "El cliente te dice: 'Actualmente estamos bien con nuestro proveedor de software'. ¿Cómo descubres si hay un dolor real o motor de compra latente bajo esa aparente tranquilidad?";
        options = [
            { text: "Le dices que tu software es mucho mejor y más barato que el de su proveedor actual y le insistes en hacer una demo.", correct: false, reason: "Incorrecto. Atacar al proveedor actual genera reactancia defensiva en el cliente por haber tomado esa decisión." },
            { text: "Validación empática: 'Entiendo, cambiar de proveedor es un dolor de cabeza. Si tuviera que elegir una sola cosa que le gustaría que fuera un 10% más rápida o simple con ellos, ¿cuál sería?'", correct: true, reason: "¡Brillante! Esta pregunta de contraste indirecto revela fricciones operativas ocultas sin confrontar." }
        ];
        tip = "No hay venta sin dolor. Si no duele, no hay motivación para cambiar de estado.";
    } else if (stageId === "stage-4") {
        theory = "<strong>🔄 El Reencuadre & Visión:</strong> Los mejores vendedores del mundo no repiten las bondades de un producto; enseñan una nueva perspectiva comercial. Ayuda al cliente a ver un problema en su negocio desde un ángulo que no había considerado antes (Challenger Sale) y pinta con claridad el puente hacia su futuro ideal, en lugar de vender las especificaciones técnicas actuales.";
        question = "En lugar de limitarte a enumerar los beneficios de tu producto, quieres reencuadrar la visión del cliente. ¿Cómo le enseñas una nueva perspectiva del problema (Challenger Sale)?";
        options = [
            { text: "Presentas datos del sector que demuestran un riesgo invisible que su empresa está corriendo hoy: 'La mayoría de empresas de su sector pierden un 15% de margen por X. ¿Cómo se protegen de esto?'", correct: true, reason: "¡Excelente! Enseñar una nueva perspectiva comercial despierta interés intelectual y te posiciona como un consultor de confianza." },
            { text: "Le dices que tu producto tiene inteligencia artificial integrada y le describes detalladamente cómo funciona el algoritmo de tu plataforma.", correct: false, reason: "Incorrecto. Vender características técnicas no cambia la perspectiva del cliente sobre su propio negocio." }
        ];
        tip = "No vendas el producto; vende una nueva forma de ver y resolver su dolor de cabeza.";
    } else if (stageId === "stage-5") {
        theory = "<strong>🔥 Adaptación & Deseo:</strong> Cada cliente procesa la información de forma diferente según su tipo de personalidad. Para generar deseo y emoción, debes adaptar tu vocabulario al instante: usa datos cuantitativos para perfiles Analíticos y ve directo al grano centrado en velocidad y resultados para perfiles Directos. El deseo nace al contrastar su frustración presente con la solución de su dolor.";
        question = "Identificas que tu interlocutor es un perfil sumamente directo y enfocado en resultados rápidos (comprador Directo). ¿Cómo adaptas tu discurso y generas deseo y emoción?";
        options = [
            { text: "Le explicas la historia de fundación de tu empresa y el ambiente de soporte familiar y cercano que ofreces a largo plazo.", correct: false, reason: "Incorrecto. El perfil Directo se impacienta con las historias de soporte y relaciones personales al inicio." },
            { text: "Vas al grano, enfocas la presentación en el impacto financiero, reducción de tiempos muertos y metas competitivas, usando contrastes claros.", correct: true, reason: "¡Espectacular! Adaptar el lenguaje al perfil psicológico del cliente enciende sus disparadores de deseo emocional." }
        ];
        tip = "El deseo se genera mostrando el contraste entre el dolor actual y el placer del futuro deseado.";
    } else if (stageId === "stage-6") {
        theory = "<strong>💎 La Oferta Irresistible:</strong> Según los principios de la ecuación de valor, una oferta es irresistible cuando maximiza la probabilidad del resultado deseado por el cliente, minimizando tanto el tiempo de entrega como el esfuerzo y fricción necesarios por su parte, sumado a una clara garantía que retire todo el riesgo de su decisión.";
        question = "Llega el momento de presentar la oferta. ¿Cómo la estructuras para que se perciba como una propuesta irresistible basada en la ecuación de valor de los mejores del mundo?";
        options = [
            { text: "Presentas el resultado final deseado garantizado, minimizando el tiempo para conseguirlo y reduciendo el esfuerzo requerido con garantías claras de devolución de riesgo.", correct: true, reason: "¡Extraordinario! Valor = (Resultado Deseado * Certeza) / (Tiempo de Entrega * Esfuerzo/Sacrificio). Cuanto menor sea el esfuerzo y tiempo, mayor es el valor percibido." },
            { text: "Dices el precio total, describes las 40 horas de formación que el cliente tendrá que pasar para aprender a usarlo y añades que no se aceptan devoluciones.", correct: false, reason: "Incorrecto. Exigir mucho esfuerzo/tiempo y transferir todo el riesgo al cliente destruye el valor percibido." }
        ];
        tip = "Una oferta irresistible elimina el miedo al fracaso del cliente y acelera la toma de decisión.";
    }

    // Get elements
    const modal = document.getElementById("challenge-modal");
    const titleEl = document.getElementById("challenge-title");
    const theoryEl = document.getElementById("challenge-theory");
    const reviewQuoteEl = document.getElementById("challenge-review-quote");
    const questionEl = document.getElementById("challenge-question");
    const optionsContainer = document.getElementById("challenge-options");
    const feedbackBox = document.getElementById("challenge-feedback-box");

    if (!modal || !titleEl || !questionEl || !optionsContainer || !feedbackBox) return;

    // Reset feedback box
    feedbackBox.classList.add("hidden");
    feedbackBox.innerText = "";

    // Handle review motivational quote
    if (isReview && reviewQuoteEl) {
        const randIndex = Math.floor(Math.random() * REPETITION_QUOTES.length);
        const quote = REPETITION_QUOTES[randIndex];
        reviewQuoteEl.innerHTML = `<strong>💡 Repaso de Maestría:</strong> "${quote.text}" — <em>${quote.author}</em>`;
        reviewQuoteEl.classList.remove("hidden");
    } else if (reviewQuoteEl) {
        reviewQuoteEl.classList.add("hidden");
    }

    // Set texts
    titleEl.innerText = isReview ? `${stageTitle} (Repaso)` : stageTitle;
    if (theoryEl) theoryEl.innerHTML = theory;
    questionEl.innerText = question;

    // Render options
    optionsContainer.innerHTML = "";
    options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.innerText = `${idx + 1}. ${opt.text}`;
        
        btn.addEventListener("click", () => {
            // Disable options
            optionsContainer.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
            btn.classList.add("selected");
            
            // Show feedback
            feedbackBox.innerText = `${opt.reason}\n\nConsejo: ${tip}`;
            feedbackBox.classList.remove("hidden");
            
            if (opt.correct) {
                // Style success feedback
                feedbackBox.style.background = "rgba(16, 185, 129, 0.05)";
                feedbackBox.style.borderColor = "rgba(16, 185, 129, 0.2)";
                feedbackBox.style.color = "#10b981";
                
                if (isReview) {
                    // Review mode transition (no duplicate XP)
                    setTimeout(() => {
                        modal.classList.add("hidden");
                        showCelebrationModal(
                            "¡Excelente Repaso! 🔁", 
                            "La repetición constante graba el conocimiento en tu subconsciente. ¡Sigue repasando para alcanzar la maestría!",
                            [{ emoji: "🔄", name: "Repetición Diaria" }]
                        );
                    }, 2000);
                } else {
                    // Add stage to completed
                    if (!app.state.completedStages.includes(stageId)) {
                        app.state.completedStages.push(stageId);
                        app.addXP(20);
                    }
                    
                    setTimeout(() => {
                        modal.classList.add("hidden");
                        showCelebrationModal(
                            "¡Etapa Completada! 🌟", 
                            `Has dominado el concepto clave de "${stageTitle}". Sumas +20 XP.`,
                            [{ emoji: "🎓", name: "Conceptos Claros" }]
                        );
                        renderRoadmap();
                    }, 2000);
                }
            } else {
                // Style error feedback
                feedbackBox.style.background = "rgba(239, 68, 68, 0.05)";
                feedbackBox.style.borderColor = "rgba(239, 68, 68, 0.2)";
                feedbackBox.style.color = "#ef4444";
                
                // Enable options again to let them retry
                setTimeout(() => {
                    optionsContainer.querySelectorAll(".quiz-option").forEach(b => {
                        b.disabled = false;
                        b.classList.remove("selected");
                    });
                    feedbackBox.classList.add("hidden");
                }, 2500);
            }
        });
        
        optionsContainer.appendChild(btn);
    });

    // Show modal
    modal.classList.remove("hidden");
}

// 5. Component: Objection Simulator UI
function renderObjections() {
    // Synchronize quick filters config bar
    const sectorSelect = document.getElementById("copilot-sector-select");
    if (sectorSelect) {
        if (sectorSelect.options.length === 0) {
            SECTORS.forEach(s => {
                const opt = document.createElement("option");
                opt.value = s.id;
                opt.innerText = `${s.emoji} ${s.name}`;
                sectorSelect.appendChild(opt);
            });
        }
        sectorSelect.value = app.state.sectorId;
    }
    const coldBtn = document.getElementById("copilot-lead-cold");
    const warmBtn = document.getElementById("copilot-lead-warm");
    if (coldBtn && warmBtn) {
        if (app.state.leadType === "cold") {
            coldBtn.classList.add("active");
            warmBtn.classList.remove("active");
        } else {
            warmBtn.classList.add("active");
            coldBtn.classList.remove("active");
        }
    }

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
    
    // Set the correct active tab in the DOM according to the state
    const activeTab = app.state.activeTab || "agresivo";
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.tab === activeTab) {
            btn.classList.add("active");
        }
    });
    document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.remove("active");
        if (content.id === `tab-${activeTab}`) {
            content.classList.add("active");
        }
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
        if (!template) return "";
        return template
            .replace(/{product}/g, app.state.productName || "nuestro servicio")
            .replace(/{sector}/g, app.currentSector ? app.currentSector.name : "tu sector");
    };

    const scriptAgresivo = document.getElementById("script-agresivo-text");
    const scriptEmocional = document.getElementById("script-emocional-text");
    const scriptAnalitico = document.getElementById("script-analitico-text");
    const scriptSolucionador = document.getElementById("script-solucionador-text");

    if (scriptAgresivo) scriptAgresivo.innerText = compile(obj.agresivo);
    if (scriptEmocional) scriptEmocional.innerText = compile(obj.emocional);
    if (scriptAnalitico) scriptAnalitico.innerText = compile(obj.analitico);
    if (scriptSolucionador) scriptSolucionador.innerText = compile(obj.solucionador);
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
    
    // Generate context phrase based on leadType and previousFilters
    let contextPhrase = "";
    if (app.state.leadType === "cold") {
        contextPhrase = "Como es la primera vez que conversamos y aún nos estamos conociendo, quiero darte total tranquilidad. ";
    } else {
        const filters = app.state.previousFilters || [];
        if (filters.includes("referral")) {
            contextPhrase = "Teniendo en cuenta que vienes recomendado por un cliente nuestro que ya está teniendo excelentes resultados, ";
        } else if (filters.includes("filter_call")) {
            contextPhrase = "Retomando lo que analizamos en nuestra anterior llamada de descubrimiento sobre los cuellos de botella de tu negocio, ";
        } else if (filters.includes("download")) {
            contextPhrase = "Dado que ya tuviste la oportunidad de revisar el material y dossier de {product} que te descargaste, ";
        } else if (filters.includes("ad")) {
            contextPhrase = "Teniendo en cuenta tu interés inicial al registrarte en nuestra campaña sobre {product}, ";
        } else {
            contextPhrase = "Teniendo en cuenta el interés que has mostrado previamente en nuestra solución, ";
        }
    }

    // Generate Custom Script based on client profile template
    let template = "";
    let explanation = "";
    
    if (profileId === "analitico") {
        template = `{context}con {product} no estamos buscando que tomes una decisión precipitada el día de hoy.\n\nLo que te propongo es que analicemos juntos nuestra auditoría de integración técnica que demuestra un índice de estabilidad del 99.9% y un retorno de inversión promedio de X meses. Para tu total seguridad, todo esto queda respaldado por una garantía contractual de satisfacción de 30 días, lo que reduce el riesgo financiero de tu empresa a cero.\n\n¿Te parecería bien si nuestro analista configura un entorno de pruebas mañana mismo para que puedas validar los datos con tu propio equipo técnico?`;
        explanation = "Este cierre apela al miedo a equivocarse del Analítico. Le ofrece datos concretos, un proceso libre de presiones ('no decidas hoy mismo') y elimina el riesgo mediante una garantía auditable, haciéndole sentir en control racional de la operación.";
    } else if (profileId === "directo") {
        template = `{context}sé que tu objetivo es optimizar los resultados operativos de tu departamento lo antes posible.\n\n{product} está diseñado precisamente para líderes de vuestro sector que no quieren perder el tiempo en gestiones lentas y buscan recortar un 20% de ineficiencia competitiva esta misma semana. Al dar el paso hoy, te garantizaras estar un paso por delante de tus competidores principales y agilizar los procesos de tu equipo.\n\nVamos a iniciar con el plan de despliegue rápido. ¿Qué correo de facturación dejamos registrado para activar las licencias hoy mismo y no perder ni un día de tracción?`;
        explanation = "El Directo valora el control, el tiempo y el estatus competitivo. Este cierre corta los rodeos, le sitúa como un líder vanguardista con poder de decisión y le empuja a la acción inmediata utilizando la urgencia de no perder tracción.";
    } else if (profileId === "relacional") {
        template = `{context}para nosotros, tu tranquilidad y la de tu equipo es la prioridad número uno.\n\nSi decides confiar en nosotros, yo personalmente estaré a cargo del plan de acompañamiento junto con nuestro especialista asignado 24/7. No te vamos a dejar un manual PDF y desaparecer; nos encargaremos de formar a tu equipo paso a paso y resolveremos cada duda en videollamada siempre que lo necesites. En {product} no buscamos clientes, buscamos socios a largo plazo.\n\n¿Te parece bien si agendamos nuestra sesión de inducción conjunta para el próximo lunes a primera hora para que conozcas al equipo técnico que te apoyará?`;
        explanation = "El Relacional busca soporte, conexión humana y paz mental. Este cierre le asegura que habrá un gestor asignado guiándole en todo momento, quitándole la presión de sentirse solo ante una mala implementación técnica.";
    } else if (profileId === "impulsivo") {
        template = `{context}con {product} estarás posicionando a tu marca como un referente innovador en tu área.\n\nDe hecho, esta campaña de acceso exclusivo a la nueva versión que te he mostrado solo está disponible para los primeros 5 clientes de esta semana, y a esta hora solo nos quedan 2 accesos de primicia comercial.\n\nSi tomamos la decisión ahora, asegurarás los bonus de lanzamiento y la exclusividad territorial frente a tus rivales. ¿Le damos luz verde antes de que se agote la oferta?`;
        explanation = "El Impulsivo/Innovador se mueve por la excitación, las tendencias y el miedo a perderse algo (FOMO). Este cierre enfatiza la primicia, la escasez de vacantes disponibles y el estatus exclusivo de pertenecer al círculo inicial de adoptantes.";
    }
    
    // Inject Product and Sector parameters
    const finalScript = template
        .replace(/{context}/g, contextPhrase)
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
