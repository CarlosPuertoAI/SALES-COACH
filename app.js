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
                analitico: "Entiendo. Si no cambiáis nada hoy, ¿cuánto os costará seguir perdiendo horas en procesos ineficientes? Si {product} se paga solo al ahorraros más de lo que cuesta el servicio, ¿tendría sentido probarlo durante un mes?",
                emocional: "Parece que te preocupa comprometer fondos en {product} sin ver un retorno claro e inmediato. Si estructuramos una prueba piloto de bajo riesgo para que tu equipo valide el valor antes de pagar la cuota completa, ¿estarías dispuesto a considerarlo?",
                agresivo: "Sé que es una decisión importante, pero el verdadero coste es postergar la solución y seguir perdiendo dinero cada día. {product} está diseñado para resolver esta fuga de ingresos de inmediato. Si te garantizo el acompañamiento de nuestro equipo para ver resultados en la primera semana, ¿cerramos el acuerdo hoy?",
                solucionador: "Comprendo la situación de presupuesto. Si miramos vuestros costes actuales en {sector}, ¿cuánto dinero se está yendo en tareas manuales que {product} podría automatizar mañana mismo? Si resolvemos esa ineficiencia y liberamos a tu equipo, ¿abrimos una cuenta piloto esta tarde?"
            },
            {
                title: "Es difícil de integrar con nuestras herramientas actuales",
                analitico: "Es una preocupación lógica. Nuestra API conecta con vuestras herramientas en {sector} de forma automática y en pocos minutos. Si nuestro equipo técnico se encarga de toda la configuración sin coste adicional, ¿agendamos la integración para este jueves?",
                emocional: "Parece que has tenido malas experiencias con software que prometía una integración sencilla y acabó causando problemas al equipo. Si nos comprometemos por escrito a daros soporte en vivo durante la transición hasta que todo funcione al cien por cien, ¿estarías abierto a hacer una prueba?",
                agresivo: "Entiendo, pero posponer la modernización por miedo al cambio operativo solo os dejará atrás frente a vuestra competencia. En {product} nos hacemos cargo de todo el proceso de integración para que tu equipo no pierda ni un minuto. ¿Comenzamos con la migración esta misma semana?",
                solucionador: "¿Qué problemas os causa actualmente tener la información dispersa en diferentes plataformas de {sector}? Si {product} unifica esos datos de forma automática, ¿crees que mejoraría la productividad de tu equipo? ¿Hacemos una llamada de diagnóstico técnico mañana?"
            },
            {
                title: "No tenemos tiempo para aprender a usar una plataforma nueva",
                analitico: "Entiendo el valor de vuestro tiempo. Implementar {product} requiere menos de una hora de configuración y ahorra unas ocho horas semanales a cada miembro del equipo. Si te garantizamos formación personalizada de quince minutos para tu equipo, ¿darías el paso hoy?",
                emocional: "Parece que tu equipo ya está al límite de su capacidad y temes que añadir una nueva tarea les sature aún más. Si planificamos sesiones de formación breves adaptadas a sus horarios para que la transición sea fluida, ¿estarías dispuesto a probarlo?",
                agresivo: "Sé que vais saturados, pero precisamente por eso necesitáis {product}. Si no automatizáis estas tareas hoy, ¿cuándo vais a tener el tiempo para hacerlo? Si te facilito un plan de adopción rápida en tres pasos, ¿activamos vuestra suscripción?",
                solucionador: "¿Cuánto tiempo pierde tu equipo a la semana en procesar tareas manuales que podrían automatizarse con {product}? Si seguimos así, ¿qué coste tendrá esa pérdida de tiempo para vuestro negocio de {sector} a fin de año? ¿Estarías abierto a ver una demo de cinco minutos para evaluar el ahorro?"
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
                analitico: "Entiendo tu preocupación por las tasas de interés. Sin embargo, esperar a que bajen las tasas aumentará la demanda y subirá el precio de este inmueble. Si compras hoy a un precio competitivo y refinancias la hipoteca cuando las tasas bajen, ¿no estarías ganando por partida doble? ¿Hacemos una oferta hoy?",
                emocional: "Parece que sientes incertidumbre financiera y te preocupa tomar una decisión que afecte a tu estabilidad familiar. Si encontramos una opción de financiación con cuotas mensuales blindadas que encajen perfectamente en tu presupuesto actual, ¿estarías dispuesto a reservar la propiedad?",
                agresivo: "Los tipos están altos, pero esperar solo significa pagar más por el mismo metro cuadrado debido a la inflación. El ladrillo en {sector} sigue siendo el activo más seguro para proteger tu capital. Si te aseguro que esta propiedad se revalorizará por encima del coste de la hipoteca, ¿firmamos la reserva hoy?",
                solucionador: "¿Qué coste os supone seguir pagando un alquiler que no construye patrimonio mientras esperáis a que cambie el mercado? Si el valor de esta vivienda sube en los próximos meses, ¿cuánto presupuesto adicional necesitaríais para comprarla? ¿Evaluamos las opciones de financiación ahora?"
            },
            {
                title: "Necesito consultarlo con mi pareja o socio primero",
                analitico: "Es lógico querer compartir la decisión. Si a ti personalmente esta propiedad te convence por completo, ¿qué dudas técnicas o financieras crees que planteará tu socio? Si preparo un dossier financiero detallado con el retorno de inversión para que lo reviséis juntos, ¿nos reunimos mañana a las seis?",
                emocional: "Parece que sientes el peso de tomar una decisión tan importante tú solo y temes que tu pareja no comparta la misma ilusión. Si organizamos una visita privada exclusiva para ambos mañana donde podáis resolver todas las dudas juntos, ¿te parecería una buena idea?",
                agresivo: "Entiendo, pero esta propiedad tiene otras dos visitas hoy y es muy probable que se reserve pronto. Si de verdad te interesa, te sugiero hacer una reserva reembolsable hoy para asegurar la vivienda mientras lo hablas con ellos. ¿Procedemos con la reserva provisional?",
                solucionador: "¿Qué aspectos específicos valorará más tu socio o pareja a la hora de elegir un inmueble en {sector}? Si perdemos esta oportunidad por no tomar la iniciativa a tiempo, ¿cómo afectaría a vuestros planes? ¿Te parece si agendamos una videollamada conjunta de cinco minutos para aclarar sus dudas?"
            },
            {
                title: "La casa me gusta, pero la zona no me convence del todo",
                analitico: "Comprendo tu punto de vista sobre la ubicación. No obstante, los datos de urbanismo muestran que esta zona de {sector} recibirá una inversión importante en infraestructuras que aumentará su valor un quince por ciento en dos años. Si compras ahora a precio bajo antes de la revalorización, ¿no sería una inversión inteligente? ¿Revisamos el plano de desarrollo técnico?",
                emocional: "Parece que te preocupa la seguridad o la tranquilidad de tu familia al cambiar a este nuevo vecindario. Si damos un paseo juntos por la zona para que conozcas los servicios cercanos y hables con algunos vecinos, ¿te ayudaría a tomar una decisión?",
                agresivo: "La distribución y el precio de esta casa son inmejorables, y la zona se está transformando muy rápido. La vivienda se puede revalorizar, pero no puedes cambiar la estructura de una casa que no te guste en otra ubicación. Si te muestro las ventajas de accesibilidad del barrio, ¿estarías listo para dar el paso?",
                solucionador: "¿Qué características indispensables de tu zona ideal echas en falta en esta ubicación? Si buscas esta misma distribución en tu zona preferida, ¿cuánto presupuesto adicional tendrías que invertir? ¿Evaluamos si esta casa compensa esa diferencia de precio?"
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
                analitico: "Entiendo tu preocupación por el valor futuro. Sin embargo, con las restricciones de emisiones en {sector}, los vehículos de combustión tradicionales se depreciarán mucho más rápido. Si este híbrido mantiene su demanda gracias a sus bajas emisiones y ahorro de combustible, ¿no crees que protege mejor tu inversión? ¿Revisamos las proyecciones de depreciación?",
                emocional: "Parece que te preocupa invertir en una tecnología que pueda evolucionar rápido y te deje con un vehículo obsoleto. Si incluimos un contrato de recompra garantizada a los cuatro años para eliminar todo el riesgo de tu parte, ¿estarías dispuesto a avanzar?",
                agresivo: "El valor de reventa futuro es una variable, pero el ahorro real en combustible y mantenimiento que tendrás desde el primer día es un hecho matemático. No dejes que la especulación te impida disfrutar de un coche seguro y eficiente hoy. ¿Comenzamos con el papeleo para la entrega?",
                solucionador: "¿Cuánto gastas actualmente al mes en combustible y reparaciones con tu coche actual? Si calculamos el ahorro directo que te dará la tecnología híbrida de {product}, ¿cuánto dinero habrás recuperado en tres años? ¿Te parece si hacemos la prueba de conducción hoy mismo?"
            },
            {
                title: "Las cuotas mensuales son demasiado elevadas",
                analitico: "Es un factor a tener en cuenta. Si sumamos tu gasto actual en gasolina y el mantenimiento del coche antiguo, verás que la diferencia con la cuota de este modelo nuevo es mínima. Si {product} te evita gastos imprevistos de taller, ¿no se autofinanciaría en gran parte? ¿Hacemos el desglose numérico?",
                emocional: "Parece que asumir este compromiso mensual te genera preocupación por el equilibrio de tu economía familiar. Si reestructuramos la entrada o ampliamos el plazo para lograr una cuota mensual que te dé total tranquilidad, ¿estarías de acuerdo en dar el paso?",
                agresivo: "La seguridad y la tranquilidad al conducir tu nuevo vehículo no son gastos, son inversiones en tu calidad de vida. Una cuota mensual se ajusta, pero la satisfacción de estrenar el coche que realmente quieres es única. ¿Te parece si firmamos la financiación con la cuota adaptada a tu presupuesto?",
                solucionador: "¿Qué impacto tendría en tu día a día si tu vehículo actual sufriera una avería costosa el mes que viene? Si sustituyes esa incertidumbre por una cuota fija que incluye mantenimiento y garantía total, ¿mejoraría tu planificación financiera? ¿Revisamos las opciones de financiación?"
            },
            {
                title: "Tengo que mirar otras opciones antes de decidirme",
                analitico: "Es razonable comparar ofertas en {sector}. Sin embargo, si analizas el nivel de equipamiento, la garantía y el precio especial que te ofrezco hoy, verás que es la opción más eficiente del mercado. Si te mantengo estas condiciones exclusivas solo durante el día de hoy, ¿hacemos la reserva de la unidad?",
                emocional: "Parece que sientes la presión de tomar la decisión final y quieres asegurarte de no estar pasando por alto una opción mejor. ¿Qué detalle en particular necesitas encontrar en otro concesionario para sentir la total certeza de que este modelo es el indicado para ti?",
                agresivo: "Comparar está bien, pero sabes que este es el vehículo que cumple con lo que buscas y que te ha transmitido las mejores sensaciones en la prueba. El tiempo que perderás buscando no compensará la oferta exclusiva que tenemos activa ahora. ¿Reservamos este coche antes de que lo haga otro cliente?",
                solucionador: "¿Qué características del coche son indispensables para tu rutina diaria y cuáles de ellas tiene este modelo? Si al volver a por esta unidad específica ya se ha vendido, ¿cuánto tiempo estarías dispuesto a esperar a que llegue otra igual? ¿Cerramos la reserva reembolsable hoy?"
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
                analitico: "Entiendo que busques seguridad en tu inversión. Ninguna consultoría seria en {sector} puede prometer un resultado exacto debido a las variables del mercado, pero nuestro método tiene un histórico probado de éxito. Si implementamos un plan piloto por fases para medir el retorno inicial con bajo riesgo, ¿estarías dispuesto a comenzar?",
                emocional: "Parece que te preocupa invertir presupuesto en un servicio intangible y tener que justificar la decisión ante el consejo si no se cumplen las expectativas. Si definimos indicadores clave mensuales para que audites nuestro trabajo de forma transparente, ¿te daría la tranquilidad necesaria para arrancar?",
                agresivo: "No hay garantías absolutas en los negocios, pero seguir con los mismos procesos te garantiza el mismo resultado que tienes ahora. El riesgo real no es contratar {product}, sino seguir perdiendo oportunidades de crecimiento cada mes. ¿Firmamos el acuerdo piloto y empezamos a trabajar esta semana?",
                solucionador: "¿Cuánto estimas que está perdiendo tu empresa al mes debido a las ineficiencias operativas que hemos identificado? Si resolvemos estas fugas de rendimiento en el primer trimestre, ¿qué impacto tendría en vuestro beneficio neto? ¿Iniciamos la primera fase de consultoría hoy?"
            },
            {
                title: "Ya trabajamos con otra agencia/proveedor y nos va bien",
                analitico: "Es excelente que contéis con apoyo en {sector}. No obstante, si realizamos una auditoría de rendimiento rápida y sin coste que demuestre que podemos mejorar vuestros resultados actuales en un veinte por ciento con {product}, ¿valdría la pena evaluarlo? ¿Agendamos la sesión de análisis técnico de diez minutos?",
                emocional: "Parece que valoras la lealtad y el buen entendimiento con tu proveedor actual y no quieres generar tensiones innecesarias en el equipo. Si planteamos una colaboración complementaria para un área específica donde ellos no tengan cobertura, ¿estarías abierto a ver los resultados?",
                agresivo: "Trabajar con un proveedor que funciona 'bien' es cómodo, pero te impide alcanzar resultados extraordinarios. Tu competencia buscará optimizar cada porcentaje de ventaja operativa y tú necesitas hacer lo mismo. ¿Te parece si hacemos una prueba comparativa pequeña este mes y dejas que los datos hablen?",
                solucionador: "¿Qué limitaciones o cuellos de botella habéis experimentado con vuestro proveedor actual en los últimos proyectos? Si esas pequeñas ineficiencias continúan, ¿cómo afectarán a vuestros objetivos anuales? ¿Estarías dispuesto a conocer cómo soluciona {product} esos puntos críticos?"
            },
            {
                title: "Vuestra propuesta parece muy genérica para nuestro negocio",
                analitico: "Entiendo tu observación sobre la propuesta inicial de {product}. Este documento preliminar es un marco general, pero si decidimos avanzar, realizaremos dos talleres técnicos para adaptar el plan a las particularidades de tu empresa. ¿Estarías de acuerdo en agendar la primera sesión de personalización para el lunes?",
                emocional: "Parece que sientes que no hemos comprendido del todo las particularidades de tu negocio y temes recibir una solución estandarizada que no encaje con tu equipo. ¿Qué aspectos específicos de vuestro flujo de trabajo en {sector} deberíamos priorizar en el diseño final para darte total seguridad?",
                agresivo: "Las bases de una estrategia sólida son universales, lo que marca la diferencia es la velocidad y calidad de la ejecución. En {product} adaptamos la implementación a tu modelo operativo real en la primera semana de trabajo conjunto. ¿Firmamos el acuerdo marco y definimos los detalles del plan mañana?",
                solucionador: "¿Qué consecuencias tendría para vuestra eficiencia operativa implantar una solución estándar que no respete vuestros procesos internos? Si diseñamos juntos una hoja de ruta adaptada exclusivamente a vuestros objetivos de negocio en {sector}, ¿crees que facilitaría la adopción del equipo? ¿Comenzamos con el diseño?"
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
                analitico: "Entiendo el deseo de optimizar costes. Sin embargo, una póliza básica suele dejar descubiertos riesgos graves que, si ocurren, pueden costar miles de euros de tu bolsillo. Con {product}, por un incremento mínimo mensual en tu cuota, eliminas esa exposición al riesgo por completo. ¿Revisamos la comparativa de coberturas detallada?",
                emocional: "Parece que sientes que las aseguradoras intentan venderte coberturas adicionales que no necesitas solo para incrementar el precio. ¿Qué tendría que suceder en tu situación familiar actual para que consideraras que ampliar vuestra protección en {sector} es una decisión indispensable?",
                agresivo: "Una póliza básica te da una falsa sensación de seguridad, pero el riesgo real aparece cuando ocurre un siniestro no cubierto y debes asumir el coste total. La tranquilidad de tu familia no es un gasto en el que debas ahorrar unos pocos euros al mes. ¿Activamos la cobertura ampliada de {product} hoy?",
                solucionador: "Si sufrieras una baja laboral prolongada o un imprevisto grave que vuestra póliza actual no cubra, ¿de qué recursos dispondrías para mantener vuestro nivel de vida? Si con {product} blindamos vuestros ingresos familiares ante cualquier eventualidad, ¿te daría la tranquilidad que buscas? ¿Hacemos el estudio hoy?"
            },
            {
                title: "No confío en que las aseguradoras paguen cuando pase algo",
                analitico: "Es comprensible dudar dado el historial del sector. En {product} tenemos una tasa de resolución favorable auditada del noventa y ocho por ciento, lo que garantiza el cumplimiento de nuestros contratos. Si redactamos una cláusula clara con las coberturas detalladas sin letra pequeña, ¿estarías dispuesto a formalizar tu póliza?",
                emocional: "Parece que has tenido malas experiencias previas donde te sentiste desamparado al reclamar una cobertura y ahora temes volver a pasar por lo mismo. Si yo me comprometo a ser tu asesor personal directo para gestionar cualquier trámite si algo ocurre, ¿te daría la seguridad necesaria?",
                agresivo: "La desconfianza es normal si compras a través de un contestador automático, pero aquí cuentas con mi respaldo profesional directo y un contrato transparente. Mi trabajo es asegurar que la compañía responda de inmediato cuando lo necesites. ¿Cerramos el acuerdo de la póliza hoy para que estés protegido desde esta noche?",
                solucionador: "¿Qué consecuencias económicas y familiares tendríais que afrontar si ocurre un imprevisto grave en {sector} y no contáis con un respaldo financiero sólido? Si repasamos juntos las garantías legales de este contrato para que compruebes las condiciones de pago, ¿te ayudaría a decidir? ¿Empezamos por ahí?"
            },
            {
                title: "Todavía soy joven y saludable, no necesito esto ahora",
                analitico: "Es excelente que tengas buena salud en este momento. Sin embargo, las compañías en {sector} ofrecen las tarifas más bajas y sin exclusiones médicas precisamente cuando estás sano. Si contratas ahora para congelar esa tarifa económica a largo plazo, ¿no estarías haciendo la jugada más rentable? ¿Calculamos tu cuota preferencial?",
                emocional: "Parece que ves la contratación de un seguro como algo lejano y sientes que destinar dinero a esto hoy es innecesario. ¿Qué circunstancia o antecedente en tu entorno te haría considerar que proteger tu bienestar actual con {product} es una inversión inteligente para tu futuro?",
                agresivo: "La salud no se puede comprar una vez que se ha perdido, y esperar a tener un problema médico solo hará que la póliza sea mucho más cara o que te rechacen. Tomar la decisión hoy es una muestra de responsabilidad y previsión financiera. ¿Dejamos tu cobertura activa para proteger tu futuro?",
                solucionador: "Si sufrieras un accidente imprevisto que requiriera atención médica especializada de inmediato, ¿cuánto tiempo de espera podrías permitirte antes de que afecte a tu trabajo? Si con {product} accedes a los mejores especialistas sin esperas y a bajo coste, ¿no merecería la pena la inversión? ¿Te parece bien?"
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
                analitico: "Es posible encontrar alternativas de bajo coste en internet. Sin embargo, la calidad del material artesanal, la autenticidad y el prestigio de esta firma no se pueden replicar digitalmente. Si esta pieza mantiene o incrementa su valor con los años gracias a su exclusividad, ¿no estarías realizando una inversión segura? ¿Te la empaquetamos?",
                emocional: "Parece que te preocupa pagar un sobreprecio injustificado por la marca en lugar de por el valor real del producto. Si te muestro los detalles del acabado artesanal a mano y te explico el proceso de creación exclusivo de esta pieza, ¿te ayudaría a valorar su autenticidad?",
                agresivo: "Buscar el precio más bajo es para artículos comunes, pero tú estás eligiendo una pieza que proyecta estatus y distinción. La satisfacción de poseer un diseño exclusivo que muy pocos tienen en el mundo no tiene comparación. ¿Te gustaría llevarte esta obra de arte hoy y lucirla con orgullo?",
                solucionador: "Si optas por una imitación más barata en {sector} y se deteriora en pocos meses, ¿qué imagen proyectarás y cuánto habrás gastado al tener que reemplazarla? ¿Qué importancia tiene para ti adquirir una pieza de colección original con garantía de por vida? ¿La preparamos para ti?"
            },
            {
                title: "Solo estoy mirando de momento, no voy a comprar hoy",
                analitico: "Me parece muy bien que aprecies nuestra colección en {sector}. Sin embargo, al ser una edición limitada, solo nos quedan dos piezas disponibles en stock. Si de verdad te interesa, ¿te parecería una buena idea hacer una reserva provisional de veinticuatro horas sin coste para asegurar que no te quedes sin ella?",
                emocional: "Parece que prefieres evitar la presión de una venta inmediata para tomar la decisión con total tranquilidad y sin prisas. ¿Cómo te sentirías si simplemente te probaras la pieza para apreciar la caída del material sobre tu piel sin ningún tipo de compromiso hoy?",
                agresivo: "Ver la colección es un placer, pero cuando encuentras la pieza perfecta que resalta tu estilo, posponer la decisión no tiene sentido. Te has ganado el derecho a disfrutar de este premio por tu esfuerzo personal. ¿La añadimos a tu colección y preparamos la entrega hoy?",
                solucionador: "Si decides esperar y cuando regreses esta pieza de edición limitada ya se ha agotado, ¿cómo te sentirías al haber perdido la oportunidad? Si verificamos la disponibilidad de tu talla en este momento para evitar que te quedes sin ella, ¿te daría mayor tranquilidad? ¿Lo comprobamos?"
            },
            {
                title: "La marca tiene prestigio, pero el precio es desorbitado",
                analitico: "Entiendo que analices la inversión. El valor de este artículo reside en la exclusividad de sus materiales y en las ochenta horas de trabajo de maestros artesanos que requiere cada pieza. Al ser un activo de alta costura, su valor de tasación en {sector} tiende a subir con el tiempo. ¿Quieres que preparemos la compra?",
                emocional: "Parece que te preocupa estar pagando solo por el renombre de la marca en lugar de por la calidad y exclusividad reales de la pieza. ¿Qué aspectos de los materiales, la confección o la garantía del producto necesitarías comprobar para considerar que el precio es adecuado?",
                agresivo: "El precio es elevado porque el estatus y la exclusividad que aporta esta marca son de primer nivel. No estás adquiriendo un simple producto, sino un símbolo del éxito que has alcanzado con tu esfuerzo. ¿Estarías de acuerdo en darte este capricho y comenzar a disfrutarlo desde hoy?",
                solucionador: "¿Qué valor le das a la durabilidad y al prestigio que te acompañará al lucir esta pieza en tus eventos profesionales de {sector}? Si esta adquisición representa un activo que mantendrá su valor a largo plazo, ¿no crees que justifica la inversión? ¿Te parece bien si iniciamos el trámite?"
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
                    analitico: "Entiendo tu tiempo. Si te demuestro en tres minutos cómo {product} ahorra ocho horas semanales a tu equipo en {sector}, ¿tendría sentido agendar una breve llamada de cinco minutos este martes? ¿Qué hora te vendría mejor, por la mañana o por la tarde?",
                    emocional: "Parece que te he llamado en un momento inoportuno y sientes que esto es una interrupción. Si te envío un correo con tres puntos clave para que lo leas en un minuto, ¿estarías abierto a que hablemos brevemente el jueves?",
                    agresivo: "Sé que no tienes tiempo y precisamente por eso te llamo, ya que {product} te va a devolver horas automatizando tus procesos de {sector}. Si no dedicas cinco minutos hoy a solucionar la ineficiencia, seguirás saturado el próximo mes. ¿Agendamos una breve sesión mañana a las nueve?",
                    solucionador: "¿Qué procesos manuales en {sector} le quitan más tiempo a tu equipo actualmente? Si continuáis perdiendo esas horas, ¿cuánto os costará esa ineficiencia a final de año? ¿Estarías dispuesto a tener una demo de cinco minutos para ver cómo {product} lo soluciona?"
                },
                {
                    title: "No me interesa / Ya estoy cubierto",
                    analitico: "Es normal que no te interese si no has visto el rendimiento de {product}. Si te muestro en dos minutos cómo aumentamos la eficiencia en {sector} un treinta por ciento frente a tu proveedor actual, ¿tendría sentido que lo evaluaras? ¿Te parece bien si hacemos una breve llamada de prueba?",
                    emocional: "Parece que estás satisfecho con tu solución en {sector} y sientes que evaluar otra opción es una pérdida de tiempo. ¿Qué tendría que ocurrir con tu proveedor actual para que estuvieras abierto a considerar una alternativa más competitiva?",
                    agresivo: "Entiendo que estés cubierto, pero nuestro objetivo no es cambiar tu proveedor por capricho, sino mejorar tus resultados operativos. Si conformarte con lo que tienes te hace perder margen frente a tu competencia, ¿no deberíamos retar esos números? ¿Hacemos una prueba rápida de rendimiento de {product} esta semana?",
                    solucionador: "¿Qué limitaciones o cuellos de botella habéis notado en vuestro servicio actual de {sector}? Si esas ineficiencias se mantienen durante los próximos seis meses, ¿cuánto presupuesto estimas que se perderá? ¿Estarías dispuesto a ver cómo {product} resuelve esos problemas en minutos?"
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
    { text: "No vendas. Ayuda.", author: "Leyenda del Cierre" },
    { text: "A la gente no le gusta que le vendan, pero les encanta comprar.", author: "Experto en Confianza" },
    { text: "Puedes conseguir todo lo que quieres en la vida si ayudas a suficientes personas a conseguir lo que ellas quieren.", author: "Leyenda del Cierre" },
    { text: "Enfoca cada cliente con la idea de ayudarle a resolver un problema o alcanzar una meta, no de venderle un producto.", author: "Mentor Consultivo" },
    { text: "La gente no compra por razones lógicas. Compra por razones emocionales.", author: "Leyenda del Cierre" },
    { text: "Cuando trates con personas, recuerda que no tratas con criaturas de lógica, sino con criaturas de emoción.", author: "Líder en Relaciones Humanas" },
    { text: "La venta es esencialmente una transferencia de sentimientos.", author: "Leyenda del Cierre" },
    { text: "Si le agradas a la gente, te escucharán. Si confían en ti, harán negocios contigo.", author: "Leyenda del Cierre" },
    { text: "Demuestra que tu producto es la mejor opción para tu cliente, no el precio más bajo.", author: "Mentor Consultivo" },
    { text: "Como regla general, la persona que hace las preguntas tiene el control.", author: "Mentor Consultivo" },
    { text: "Cada objeción no es un rechazo, es una petición de más información.", author: "Leyenda del Cierre" },
    { text: "Haz un cliente, no una venta.", author: "Maestra del Servicio" },
    { text: "Si no estás cuidando a tu cliente, tu competencia lo hará.", author: "Consultor de Retención" },
    { text: "Las ventas dependen de la actitud del vendedor, no de la actitud del cliente.", author: "Estratega de Actitud Mental" },
    { text: "El seguimiento no es una fase del proceso de ventas, es el proceso en sí.", author: "Experto en Confianza" },
    { text: "Nunca bajes tu meta; aumenta tus acciones.", author: "Mentor de Urgencia" },
    { text: "Nunca bajes tu precio, añade valor.", author: "Mentor de Urgencia" },
    { text: "Las ventas son la transferencia de emoción. Y la emoción que transfieres es la de certeza.", author: "Estratega de la Persuasión" },
    { text: "La mejor forma de vender algo es no vender nada. Gana primero el respeto y la confianza de tu prospecto.", author: "Estratega de la Persuasión" },
    { text: "Si le das a la gente un 'por qué' lo suficientemente bueno, siempre encontrarán el 'cómo'.", author: "Estratega de la Persuasión" },
    { text: "La negociación no es un acto de batalla, es un proceso de descubrimiento.", author: "Negociador del FBI" },
    { text: "Las personas parecen estar más motivadas por la idea de perder algo que por la idea de ganar algo de igual valor.", author: "Científico de la Influencia" },
    { text: "Cada vez que decepcionas a un prospecto, decepcionas a 250 potenciales recomendados más.", author: "Cerrador de Récord Mundial" },
    { text: "El obstáculo es lo que ves cuando apartas los ojos de tu objetivo.", author: "Líder Industrial" },
    { text: "No vendas un producto, vende soluciones a problemas reales.", author: "Estratega de Negocios" },
    { text: "A los clientes no les importa tu producto, les importan sus propios problemas.", author: "Mentora de Ventas Complejas" },
    { text: "El consumidor no es tonto; respeta su inteligencia y dile la verdad.", author: "Padre de la Publicidad" },
    { text: "Presta atención a cada persona; todos llevan un cartel invisible que dice: Hazme sentir importante.", author: "Líder de Motivación Humana" },
    { text: "Quien aprende a estar en desacuerdo sin ser desagradable descubre el gran secreto de la negociación.", author: "Negociador del FBI" },
    { text: "En una llamada o contacto inicial no vendes tu producto; estás vendiendo una conversación.", author: "Maestro del Contacto Frío" },
    { text: "No celebres el cierre de una venta; celebra la apertura de una relación comercial.", author: "Consultora de Comunicación" },
    { text: "El éxito en las ventas viene de hacer preguntas correctas, no de tener todas las respuestas.", author: "Creador del Modelo SPIN" },
    { text: "La regla de oro de las ventas: habla menos y escucha más.", author: "Mentor Consultivo" },
    { text: "Tus clientes más descontentos son tu mayor fuente de aprendizaje.", author: "Fundador de Software" }
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
    { text: "La repetición es la madre de la maestría.", author: "Mentor de Crecimiento" },
    { text: "Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito.", author: "Filósofo Clásico" },
    { text: "No temo al hombre que ha practicado 10,000 patadas una vez, sino al que ha practicado una patada 10,000 veces.", author: "Maestro del Enfoque" },
    { text: "La repetición es la madre del aprendizaje, el padre de la acción, lo que la convierte en el arquitecto del éxito.", author: "Leyenda del Cierre" },
    { text: "Cualquier cosa que practiques repetidamente se convertirá en un nuevo hábito de pensamiento y acción.", author: "Mentor Consultivo" },
    { text: "La clave para dominar cualquier habilidad es la repetición constante hasta que se convierta en una segunda naturaleza.", author: "Cerrador de Récord Mundial" },
    { text: "La práctica no hace la perfección. Solo la práctica perfecta hace la perfección.", author: "Líder de Consistencia y Esfuerzo" },
    { text: "El conocimiento no es poder hasta que se aplica y se practica repetidamente.", author: "Líder en Relaciones Humanas" }
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

function getMentorWisdom(tab, objectionTitle) {
    const title = (objectionTitle || "").toLowerCase();
    
    // Categorize objection by keywords
    const isPrice = title.includes("caro") || title.includes("presupuesto") || title.includes("dinero") || title.includes("cuota") || title.includes("precio") || title.includes("gastar") || title.includes("gastas") || title.includes("coste") || title.includes("euros");
    const isTimeOrDecision = title.includes("tiempo") || title.includes("pareja") || title.includes("socio") || title.includes("mirar") || title.includes("hoy") || title.includes("decidir") || title.includes("momento") || title.includes("esperar");
    const isTechnicalOrTrust = title.includes("integrar") || title.includes("zona") || title.includes("eléctrico") || title.includes("similar") || title.includes("proveedor") || title.includes("genérica") || title.includes("garantizar") || title.includes("aseguradoras") || title.includes("confío") || title.includes("saludable") || title.includes("marca");

    switch(tab) {
        case "agresivo":
            if (isPrice) {
                return `<strong>💥 Mentor de Cierre Directo:</strong> "¡Nunca rebajes el precio! Si dicen que es caro, multiplícales el valor en su mente. Muéstrales que el coste real de no resolver su problema hoy es 10 veces mayor que el precio de tu producto."<br><br><strong>🐺 Experto en Persuasión Rápida:</strong> "Utiliza el tono de certeza absoluta. Un cliente te dirá que no tiene presupuesto para probar tu resolución, pero si le demuestras certeza absoluta en el producto y en ti, el dinero aparecerá mágicamente."`;
            }
            if (isTimeOrDecision) {
                return `<strong>💥 Mentor de Cierre Directo:</strong> "Quien te pide tiempo te está regalando una excusa. El tiempo es el cementerio de las ventas. Compromételos a decidir hoy haciendo ver que posponer la decisión es un gasto innecesario."<br><br><strong>🐺 Experto en Persuasión Rápida:</strong> "Si dicen que deben consultarlo, es porque no confían en ti al 100%. Vuelve a la línea recta, genera más certeza y di: 'Entiendo perfectamente, pero déjeme decirle por qué esto tiene sentido ahora mismo'."`;
            }
            return `<strong>💥 Mentor de Cierre Directo:</strong> "El éxito es tu deber, tu obligación y tu responsabilidad. Si crees en tu producto al 100%, es tu obligación moral insistir y empujar al cliente a tomar la decisión de compra correcta."<br><br><strong>🐺 Experto en Persuasión Rápida:</strong> "Cada objeción es una oportunidad para reencuadrar la certeza del cliente. Controla la conversación y llévalos paso a paso por la línea recta hacia el cierre."`;
            
        case "emocional":
            if (isPrice) {
                return `<strong>🧡 Mentor de Alineación Emocional:</strong> "El dinero solo representa seguridad o estatus. Descubre qué necesidad humana está insatisfecha. Transmite absoluta paz mental y hazles ver que esta compra es su mayor alivio financiero."<br><br><strong>🤝 Líder de Relaciones Humanas:</strong> "Elogia su prudencia. Di: 'Aprecio enormemente que vigile tanto sus finanzas. Precisamente por esa mentalidad analítica y cuidadosa, este producto es idóneo para usted porque le evitará pérdidas'."`;
            }
            if (isTimeOrDecision) {
                return `<strong>🧡 Mentor de Alineación Emocional:</strong> "La indecisión es el resultado del miedo al fracaso o al dolor. Cambia su enfoque mental de 'qué pasa si me equivoco' a 'cuánto sufriré si me quedo igual'. Guíalos con calma hacia su futuro deseado."<br><br><strong>🤝 Líder de Relaciones Humanas:</strong> "Consigue que digan 'sí, sí' desde el principio. Busca puntos comunes de acuerdo y evita discutir. Haz que sientan que la idea de tomar acción hoy ha nacido de ellos."`;
            }
            return `<strong>🧡 Mentor de Alineación Emocional:</strong> "Para influir en alguien, debes saber qué es lo que ya influye en ellos. Adáptate a su mapa del mundo, iguala su ritmo y responde desde el amor y el deseo genuino de ayudar."<br><br><strong>🤝 Líder de Relaciones Humanas:</strong> "La única manera de ganar una discusión es evitándola. Escucha con respeto total, muestra empatía táctica y haz que la otra persona se sienta valorada e importante."`;

        case "analitico":
            if (isPrice) {
                return `<strong>📊 Arquitecto de Ofertas Irresistibles:</strong> "Si el precio es un problema, tu oferta no tiene suficiente valor. Aumenta drásticamente los bonus, reduce su esfuerzo de implementación y garantiza el resultado por contrato. Haz que decir no sea una tontería."<br><br><strong>📋 Experto en Consultoría Lógica:</strong> "Usa preguntas de Implicación. No justifiques el precio lógicamente. Haz preguntas como: ¿Cuánto presupuesto estimas que se está fugando mensualmente si sigues con el sistema actual? Deja que el cliente haga los cálculos."`;
            }
            if (isTimeOrDecision) {
                return `<strong>📊 Arquitecto de Ofertas Irresistibles:</strong> "El coste de oportunidad es lo que arruina a las empresas. Demuéstrales que esperar 3 meses para implementar esto les costará el triple en pérdidas de productividad. La inacción tiene un precio exacto."<br><br><strong>📋 Experto en Consultoría Lógica:</strong> "Haz preguntas de Necesidad de Recompensa. ¿Cómo afectaría a tu reporte de final de trimestre si automatizas este flujo hoy en lugar de postergarlo? Permite que visualicen el retorno de la inversión de inmediato."`;
            }
            return `<strong>📊 Arquitecto de Ofertas Irresistibles:</strong> "La fricción mata los negocios. Diseña una garantía de inversión o un periodo de prueba tan sólido que el cliente sienta que todo el riesgo lo asumes tú. El riesgo percibido debe ser cero."<br><br><strong>📋 Experto en Consultoría Lógica:</strong> "Los compradores lógicos odian las tácticas de venta agresivas. Usa preguntas de Situación y de Problema para que ellos solos lleguen a la conclusión racional de que te necesitan."`;

        case "solucionador":
            if (isPrice) {
                return `<strong>🐍 Campeón de Mentalidad Implacable:</strong> "La objeción del coste es solo un obstáculo en tu camino al campeonato. No te frustres, estúdiala. Busca el ángulo donde la inversión elimine su dolor y ejecuta sin titubeos."<br><br><strong>🛠️ Mentor de Venta Consultiva:</strong> "Conviértete en un consultor de negocios y un solucionador de problemas. Si tu cliente entiende que tu producto es la cura exacta a su dolor operativo principal, el precio se vuelve secundario."`;
            }
            if (isTimeOrDecision) {
                return `<strong>🏀 Estratega de Resiliencia Deportiva:</strong> "He fallado más de 9000 tiros en mi carrera y por eso he tenido éxito. No tomar una decisión por miedo a fallar es el verdadero fracaso. Empuja al cliente a dar el tiro ganador hoy."<br><br><strong>🏈 Líder de Consistencia y Esfuerzo:</strong> "El compromiso individual es lo que hace funcionar a un equipo. Mantén un seguimiento implacable y consistente. La disciplina y la entrega al detalle cierran contratos."`;
            }
            return `<strong>🐍 Campeón de Mentalidad Implacable:</strong> "Mamba Mentality es preparación obsesiva. Si estudias a tu cliente y sus debilidades operativas antes de la llamada, ninguna objeción te pillará desprevenido. Sabrás exactamente qué recetar."<br><br><strong>🛠️ Mentor de Venta Consultiva:</strong> "No vendas un producto, vende una nueva perspectiva y un futuro mejor. Escucha el 70% del tiempo con curiosidad genuina, diagnostica el problema y ofrece la solución óptima."`;
    }
    return "Selecciona una objeción para ver la sabiduría de los mentores.";
}

function getEmpathyRadar(tab, objectionTitle) {
    const title = (objectionTitle || "").toLowerCase();
    
    // Categorize objection by keywords
    const isPrice = title.includes("caro") || title.includes("presupuesto") || title.includes("dinero") || title.includes("cuota") || title.includes("precio") || title.includes("gastar") || title.includes("gastas") || title.includes("coste") || title.includes("euros");
    const isTimeOrDecision = title.includes("tiempo") || title.includes("pareja") || title.includes("socio") || title.includes("mirar") || title.includes("hoy") || title.includes("decidir") || title.includes("momento") || title.includes("esperar");
    
    let subEmotion = "";
    let mentalThought = "";
    let emotionalLever = "";

    if (isPrice) {
        subEmotion = "Miedo a la pérdida financiera y arrepentimiento de compra.";
        mentalThought = '"No quiero tirar el dinero ni parecer tonto si esto no funciona. ¿De verdad vale lo que me están cobrando o me están estafando?"';
        if (tab === "agresivo") {
            emotionalLever = "Usa su instinto de estatus. Demuestra que no tomar la decisión es la verdadera pérdida de dinero, convirtiendo el precio en una insignificancia en comparación con el coste de su inacción.";
        } else if (tab === "emocional") {
            emotionalLever = "Valida su prudencia para desactivar sus defensas. Muéstrale que esta inversión es, en realidad, el camino seguro para lograr la paz mental y la protección de su negocio/familia.";
        } else if (tab === "analitico") {
            emotionalLever = "Satisface su necesidad de certeza lógica. Desglosa los números objetivamente para demostrar el retorno de inversión (ROI) y traslada todo el riesgo hacia ti con garantías sólidas.";
        } else {
            emotionalLever = "Enfócate en el dolor del cuello de botella actual. Si demuestras que tu solución erradica por completo su principal problema operativo, el precio pasará a ser una decisión secundaria.";
        }
    } else if (isTimeOrDecision) {
        subEmotion = "Abrumamiento operativo y miedo al cambio o al conflicto interpersonal.";
        mentalThought = '"Estoy saturado y no tengo energía para implementar algo nuevo. Además, si a mi socio/pareja no le gusta, tendré problemas."';
        if (tab === "agresivo") {
            emotionalLever = "Corta la procrastinación con urgencia. Hazle ver que posponer la decisión es una decisión activa de seguir perdiendo tiempo y que nunca habrá un momento ideal.";
        } else if (tab === "emocional") {
            emotionalLever = "Reduce el estrés y el miedo al cambio ofreciéndote como su aliado. Haz que se visualice acompañado y apoyado personalmente durante todo el proceso.";
        } else if (tab === "analitico") {
            emotionalLever = "Demuestra matemáticamente el coste de oportunidad diario de seguir igual. Convierte la indecisión en una pérdida de capital medible para forzar el análisis racional.";
        } else {
            emotionalLever = "Diagnostica su cansancio. Ofrece un plan de implementación ultrarrápido y asume el trabajo pesado para demostrar que comprar esto liberará su tiempo de inmediato.";
        }
    } else {
        // Technical, Trust or Quality
        subEmotion = "Escepticismo defensivo y desconfianza en las promesas comerciales.";
        mentalThought = '"Ya he oído promesas similares antes y terminaron fallando. ¿Qué me garantiza que esta vez será diferente o que funcionará con mis sistemas?"';
        if (tab === "agresivo") {
            emotionalLever = "Muestra una seguridad arrolladora. Desafía sus prejuicios con asertividad y demuéstrale que la complacencia con sistemas obsoletos es más peligrosa que dar el paso.";
        } else if (tab === "emocional") {
            emotionalLever = "Crea un espacio seguro de validación. Escucha sus malas experiencias anteriores, empatiza profundamente con su desconfianza y construye un puente de lealtad personal.";
        } else if (tab === "analitico") {
            emotionalLever = "Utiliza especificaciones, datos duros y certificaciones. Permite que audite tu solución y neutraliza su desconfianza mediante hechos fríos y demostraciones objetivas.";
        } else {
            emotionalLever = "Actúa como un médico especialista. Haz preguntas profundas para diagnosticar la incompatibilidad exacta y prescribe la integración a medida como la cura definitiva.";
        }
    }

    return `
        <strong>⚡ Emoción Subyacente:</strong> ${subEmotion}<br>
        <strong>💭 Pensamiento Interno:</strong> ${mentalThought}<br>
        <strong>🎯 Palanca de Cierre:</strong> ${emotionalLever}
    `;
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

    // Update Empathy Radar
    const radarAgresivo = document.getElementById("empathy-radar-agresivo-text");
    const radarEmocional = document.getElementById("empathy-radar-emocional-text");
    const radarAnalitico = document.getElementById("empathy-radar-analitico-text");
    const radarSolucionador = document.getElementById("empathy-radar-solucionador-text");

    if (radarAgresivo) radarAgresivo.innerHTML = getEmpathyRadar("agresivo", obj.title);
    if (radarEmocional) radarEmocional.innerHTML = getEmpathyRadar("emocional", obj.title);
    if (radarAnalitico) radarAnalitico.innerHTML = getEmpathyRadar("analitico", obj.title);
    if (radarSolucionador) radarSolucionador.innerHTML = getEmpathyRadar("solucionador", obj.title);

    // Update Mentor Wisdom
    const wisdomAgresivo = document.getElementById("mentor-wisdom-agresivo-text");
    const wisdomEmocional = document.getElementById("mentor-wisdom-emocional-text");
    const wisdomAnalitico = document.getElementById("mentor-wisdom-analitico-text");
    const wisdomSolucionador = document.getElementById("mentor-wisdom-solucionador-text");

    if (wisdomAgresivo) wisdomAgresivo.innerHTML = getMentorWisdom("agresivo", obj.title);
    if (wisdomEmocional) wisdomEmocional.innerHTML = getMentorWisdom("emocional", obj.title);
    if (wisdomAnalitico) wisdomAnalitico.innerHTML = getMentorWisdom("analitico", obj.title);
    if (wisdomSolucionador) wisdomSolucionador.innerHTML = getMentorWisdom("solucionador", obj.title);
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
