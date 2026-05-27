/* ==========================================================================
   SalesQuest - Main Application Logic (ES6 Vanilla JS)
   ========================================================================== */

const CARLOS_SYSTEM_PROMPT = `Eres Carlos un closer de ventas con 30 años de experiencia 
en {sector}. No eres un bot — eres una persona real que 
ha cerrado miles de ventas y sabe leer a la gente.

QUIÉN ERES:
Mezcla de Chris Voss, Alex Hormozi y el mejor vendedor 
que hayas conocido en tu vida. Eres directo pero humano. 
Tienes sentido del humor cuando la situación lo permite. 
Sabes cuándo presionar y cuándo callarte. Y sobre todo — 
escuchas de verdad.

CONTEXTO COMPLETO DE ESTA CONVERSACIÓN:
- Sector: {sector}
- Producto: {producto}
- Temperatura del lead: {temperatura}
- Perfil detectado del cliente: {perfil}
- Todo lo que ha dicho el cliente hasta ahora: {historial_completo}
- Lo que acaba de decir ahora: {objecion_actual}
- Enfoque que prefiere el vendedor: {enfoque}

CÓMO PIENSAS ANTES DE RESPONDER:
Antes de hablar, te haces estas preguntas internamente:

1. ¿Qué está sintiendo realmente este cliente ahora mismo?
2. ¿Esta objeción es real o es una cortina de humo?
3. ¿Qué dijo antes que conecta con lo que dice ahora?
4. ¿Qué necesita escuchar — no lo que quiere escuchar?
5. ¿Es momento de presionar, de escuchar o de hacer una pregunta?

PATRONES QUE RECONOCES:

Si repite objeciones similares → hay un miedo profundo no dicho.
Responde: "Noto que volvemos al mismo punto. ¿Qué es lo que 
realmente te preocupa de tomar esta decisión?"

Si la objeción es precio después de haber mostrado interés → 
es excusa, no objeción real.
Responde desde el valor, no desde el precio.

Si es la primera objeción → no cierres todavía, diagnostica primero.

Si lleva 3+ objeciones → el dolor no es suficiente todavía o 
hay un bloqueador externo. Pregunta por él directamente.

Si el cliente pregunta algo en vez de objetar → señal de interés.
Responde brevemente y devuelve una pregunta de cierre.

CÓMO HABLAS:
- Frases cortas. Nunca más de 4.
- Sin jerga corporativa. Sin "sinergia", "valor añadido", "solución integral"
- Con pausas implícitas — cada frase tiene peso propio
- A veces una sola pregunta es más poderosa que un párrafo entero
- Cuando algo es incómodo para el cliente, no lo evitas — lo nombras
- Usas el silencio como herramienta: terminas con una pregunta 
  y esperas. No llenas el silencio.

EJEMPLOS DE CÓMO SUENAS:

❌ Robótico:
"Entiendo perfectamente que el precio puede parecer elevado 
en un primer momento, pero si analizamos el retorno de 
inversión veremos que..."

✅ Humano:
"¿Caro comparado con qué? Porque seguir como estás 
también tiene un precio — solo que nadie te lo manda 
en factura. ¿Cuánto te está costando este problema ahora?"

❌ Robótico:
"Es completamente normal querer consultarlo. Le recomiendo 
que hable con su pareja y me contacte cuando hayan tomado 
una decisión conjunta."

✅ Humano:
"Por supuesto. ¿Qué crees que te va a decir? 
Porque si hay una duda detrás de esa respuesta, 
prefiero que la hablemos ahora."

❌ Robótico:
"Comprendo su situación. Muchos clientes en su posición 
han encontrado que nuestra solución..."

✅ Humano:
"Espera — antes de seguir. ¿Qué es lo que más te frena 
realmente? Porque no parece que sea el precio."

REGLAS ABSOLUTAS:
- NUNCA repitas la objeción textualmente
- NUNCA uses signos de exclamación
- NUNCA empieces con "Entiendo que..." ni "Es normal que..."
- NUNCA des una respuesta de más de 4 frases
- NUNCA ignores lo que dijo antes — conecta siempre con el historial
- NUNCA suenes a plantilla — cada respuesta es única para este cliente
- Si tu respuesta podría servir para cualquier cliente, es mala. 
  Reescríbelo para este cliente específico.

FORMATO DE RESPUESTA:
Solo el guión. Sin explicaciones, sin títulos, sin comillas, 
sin "Aquí tienes tu respuesta:". 
Directamente las frases que dice el vendedor.
Como si ya estuvieras en la llamada.`;

const PROMPTS = {
    agresivo: CARLOS_SYSTEM_PROMPT,
    emocional: CARLOS_SYSTEM_PROMPT,
    analitico: CARLOS_SYSTEM_PROMPT,
    solucionador: CARLOS_SYSTEM_PROMPT
};

// 1. Database Definitions
const SECTORS = [
    {
        id: "saas",
        name: "Tecnología / SaaS",
        emoji: "💻",
        objections: [
            {
                title: "Es muy caro / No hay presupuesto disponible",
                analitico: "Si este software te cuesta mil euros pero te ahorra tres mil en tiempo y optimización, ¿sigue siendo caro? No es un gasto, es una decisión matemática básica. ¿Te parece si miramos los números y juzgas por ti mismo?",
                emocional: "Dime algo: ¿el presupuesto es el problema real, o es que no tienes la total certeza de que esto os va a dar resultado? Si te demuestro que el equipo ahorra tiempo desde el primer día y asumo yo el riesgo inicial, ¿estarías dispuesto a probarlo?",
                agresivo: "Claro que es caro. Si fuera barato, cualquiera lo tendría y no marcaría la diferencia en tu negocio. La pregunta no es el precio, sino si quieres seguir perdiendo horas y dinero con sistemas obsoletos. ¿Hacemos el alta y empezamos a recuperar tu inversión hoy?",
                solucionador: "Si no cambiáis nada hoy, ¿cuánto presupuesto estimas que se seguirá perdiendo en procesos manuales este trimestre? Si eliminamos esa ineficiencia esta semana, ¿avanzamos con la prueba piloto?"
            },
            {
                title: "Es difícil de integrar con nuestras herramientas actuales",
                analitico: "Nuestra API conecta con vuestro ecosistema actual en pocos clics de forma automática. Si te garantizo por escrito compatibilidad absoluta desde el primer día, ¿estarías listo para avanzar?",
                emocional: "Sé que da pereza pensar en cambiar de sistemas y que a veces da dolores de cabeza. Si asumo la responsabilidad por contrato de que la transición sea limpia y sin fricciones, ¿nos darías el beneficio de la duda?",
                agresivo: "Ningún cambio es cómodo, pero quedarse atrás por miedo a la integración os costará mucho más. Nuestro equipo técnico se encarga de todo el proceso en dos horas sin parar vuestras operaciones. ¿Comenzamos con la migración este jueves?",
                solucionador: "¿Qué problemas operativos os causa tener la información fragmentada hoy en día? Si {product} unifica vuestros datos de inmediato, ¿crees que el equipo trabajará mejor? ¿Hacemos una llamada técnica rápida de cinco minutos?"
            },
            {
                title: "No tenemos tiempo para aprender a usar una plataforma nueva",
                analitico: "Aprender a usar {product} lleva quince minutos y te ahorra ocho horas semanales para siempre. La rentabilidad del tiempo es obvia. ¿Activamos vuestro acceso para que empecéis a ahorrar tiempo desde mañana?",
                emocional: "Parece que el equipo está al límite y temes sobrecargarlos con más tareas. Si nos encargamos de darles una formación en vivo personalizada de diez minutos adaptada a sus horarios para que la transición sea fluida, ¿estarías más tranquilo para dar el paso?",
                agresivo: "Si no tienes tiempo hoy para automatizar, ¿cuándo lo vas a tener? Seguirás igual de saturado el mes que viene si no tomas el control ahora. ¿Dejamos la cuenta activa y te enviamos la guía rápida de tres pasos?",
                solucionador: "¿Cuánto tiempo pierde tu equipo a la semana en tareas repetitivas? Si eliminamos esa carga administrativa, ¿cuánto margen ganaríais para proyectos importantes? ¿Agendamos una breve demo guiada de cinco minutos?"
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
                analitico: "Miremos los números objetivos: la inflación se come tu dinero en el banco, mientras que el ladrillo se revaloriza cada año. Aunque el tipo de interés sea del cinco por ciento, estás construyendo tu propio patrimonio en lugar de pagar el de otro. ¿Nos sentamos a revisar el plan de amortización?",
                emocional: "La hipoteca se puede renegociar con el banco en el futuro, pero esta casa en esta ubicación no se va a repetir. Si la cuota mensual se ajusta a lo que gastas hoy de alquiler, ¿dejarías escapar el hogar de tu familia por esperar un porcentaje? ¿Hacemos una oferta provisional?",
                agresivo: "Los tipos están altos, pero el precio de esta casa es el mejor que vas a encontrar. Si esperas a que las tasas bajen, la demanda se disparará y el precio del ladrillo subirá un diez por ciento. Compra al precio de hoy y refinancias mañana, ¿tiene sentido la estrategia?",
                solucionador: "Si sigues pagando alquiler mientras esperáis a que bajen los tipos, ¿cuánto dinero habrás perdido en dos años sin construir ningún activo? ¿No sería mejor adquirir la propiedad ya y subrogar la hipoteca más adelante? ¿Evaluamos las opciones financieras?"
            },
            {
                title: "Necesito consultarlo con mi pareja o socio primero",
                analitico: "Si os presento un desglose financiero claro y la rentabilidad del inmueble para que podáis tomar una decisión basada en datos lógicos, ¿crees que facilitará la conversación? ¿Te preparo el dossier técnico ahora?",
                emocional: "Es una decisión familiar importante y debéis estar de acuerdo. Si preparamos una visita privada mañana a las seis para que tu pareja pueda sentir el espacio y resolver todas sus dudas conmigo, ¿os vendría bien esa hora?",
                agresivo: "Por supuesto, consúltalo. Pero sé honesto: si a ti te encanta, ellos van a confiar en tu criterio. Si esperamos a mañana, esta casa se habrá vendido porque tenemos tres visitas esta tarde. ¿Hacemos una reserva reembolsable hoy para asegurar la vivienda mientras lo hablas?",
                solucionador: "¿Cuáles son los puntos críticos que tu pareja o socio valorará más en esta propiedad? Si organizamos una llamada de cinco minutos para aclarar esos temas directamente con ellos, ¿crees que ayudaría a tomar la decisión?"
            },
            {
                title: "La casa me gusta, pero la zona no me convence del todo",
                analitico: "Los datos de desarrollo municipal muestran una nueva línea de transporte y zonas verdes planificadas a pocos metros. Esto revalorizará el inmueble un quince por ciento a corto plazo. ¿Revisamos el informe urbanístico para ver el potencial real?",
                emocional: "Te preocupa la seguridad y el entorno donde va a crecer tu familia, lo entiendo perfectamente. Si damos un paseo rápido por los alrededores para que veas los parques, colegios y hables con algún vecino, ¿te daría más tranquilidad?",
                agresivo: "La casa es espectacular y el precio es inmejorable, pero la ubicación no la puedes cambiar. Ahora bien, esta zona está en pleno plan de desarrollo y su valor subirá rápido en dos años. Si compras barato hoy en un barrio al alza, ¿no estarías haciendo una jugada brillante? ¿Reservamos la vivienda?",
                solucionador: "¿Qué servicios o características específicas de tu barrio ideal echas en falta aquí? Si buscamos este mismo nivel de vivienda en tu zona preferida, ¿cuánto presupuesto adicional tendrías que invertir? ¿Hacemos la comparativa?"
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
                analitico: "El ahorro mensual en combustible y mantenimiento compensa con creces cualquier depreciación teórica futura. Hagamos números: si ahorras cien euros al mes en gasolina, son casi cinco mil euros en cuatro años. ¿Comenzamos con la reserva de la unidad?",
                emocional: "Si estructuramos la operación con un sistema de multi-opción para que decidas si te lo quedas, lo devuelves o lo cambias al terminar el contrato, ¿te daría la tranquilidad de no arriesgar tu capital? ¿Hacemos la prueba?",
                agresivo: "Los de combustión perderán aún más valor debido a las restricciones que vienen. Este modelo híbrido mantiene su demanda y te asegura libre acceso a la ciudad. Si te garantizo el valor mínimo de recompra por contrato a los cuatro años, ¿hacemos el pedido hoy?",
                solucionador: "¿Cuánto gastas al mes en combustible y reparaciones con tu vehículo actual? Si sustituimos ese gasto por el ahorro del híbrido, ¿cuánto dinero estarías recuperando cada mes? ¿Hacemos una prueba de conducción esta tarde?"
            },
            {
                title: "Las cuotas mensuales son demasiado elevadas",
                analitico: "Si calculas la cuota diaria, verás que equivale a tomar un par de cafés al día por tener un coche con garantía total y cero problemas de taller. Es una inversión en tu tranquilidad diaria. ¿Te parece si hacemos la simulación con diferentes plazos?",
                emocional: "Asumir un pago mensual alto genera estrés, lo sé. Si ajustamos el pago inicial o la cuota final para que el recibo mensual encaje perfectamente en tus gastos actuales sin agobios, ¿darías el paso con este modelo?",
                agresivo: "La calidad, seguridad y fiabilidad tienen un precio. No reduzcas tu comodidad por una cuota, mejor adaptemos el plazo financiero a tu medida para que conduzcas el coche que de verdad quieres. ¿Procedemos a calcular la financiación a tu medida?",
                solucionador: "Si tu coche actual sufre una avería grave el próximo mes, ¿cuánto te costará repararlo de golpe? Con esta cuota fija tienes todo incluido y te olvidas de imprevistos. ¿Revisamos las opciones financieras para optimizar el pago?"
            },
            {
                title: "Tengo que mirar otras opciones antes de decidirme",
                analitico: "Si analizas la relación entre equipamiento, seguridad y la oferta de financiación que tenemos activa hoy, verás que no hay alternativa comparable en {sector}. Si dejas una reserva reembolsable hoy, aseguras este precio exclusivo mientras lo piensas. ¿Hacemos el depósito?",
                emocional: "Es una decisión importante y quieres estar seguro de no equivocarte. ¿Qué equipamiento o precio específico necesitas encontrar en otros vehículos para convencerte de que este es el tuyo? ¿Lo configuramos juntos?",
                agresivo: "Compara lo que quieras, pero sabes que este modelo te ha hecho sonreír al conducirlo. El tiempo que vas a perder yendo a otros concesionarios vale más que cualquier pequeña diferencia que puedas encontrar. ¿Reservamos esta unidad antes de que se la quede otro comprador?",
                solucionador: "¿Qué características de este modelo son indispensables para tu rutina diaria? Si al volver el coche ya se ha vendido, ¿cuánto tiempo estarías dispuesto a esperar a que llegue otra unidad igual de fábrica? ¿Cerramos la reserva hoy?"
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
                analitico: "Nuestro histórico muestra un retorno medio de tres a uno en los primeros seis meses. Si invertimos diez mil y recuperamos treinta mil, la lógica de negocio es clara. ¿Tiene sentido que iniciemos la primera fase de análisis técnico esta semana?",
                emocional: "Parece que te preocupa contratar un servicio y tener que justificar una mala inversión ante tu junta. Si definimos métricas de éxito y KPIs mensuales para que audites nuestro trabajo de forma transparente, ¿te daría la seguridad necesaria para empezar?",
                agresivo: "Nadie serio en consultoría de {sector} te va a garantizar un retorno de inversión exacto debido a las variables del mercado. Lo que sí te garantizo es nuestro método y el histórico de resultados con clientes similares. ¿Firmamos el piloto por fases y empezamos a mejorar tus números esta semana?",
                solucionador: "¿Qué coste mensual tiene para vuestra empresa mantener la fuga de eficiencia que detectamos en la auditoría? Si no solucionamos ese problema hoy, ¿cuánto dinero habréis desperdiciado a fin de año? ¿Comenzamos con la fase de diagnóstico?"
            },
            {
                title: "Ya trabajamos con otra agencia/proveedor y nos va bien",
                analitico: "Si realizamos una auditoría rápida de diez minutos sin coste que demuestre que podemos mejorar el rendimiento actual un veinte por ciento con {product}, ¿no tendrías la obligación profesional de evaluarlo? ¿Agendamos la llamada de análisis técnico?",
                emocional: "Sé que valoras la lealtad con tu proveedor actual y no quieres generar tensiones innecesarias. Si planteamos una colaboración complementaria para un área específica donde ellos no tengan cobertura, ¿estarías dispuesto a ver la diferencia?",
                agresivo: "Ir 'bien' es el enemigo de ir excelente. Tu competencia no se va a conformar con un rendimiento aceptable y tú tampoco deberías hacerlo. Te propongo que nos des un proyecto piloto pequeño para comparar resultados directamente. ¿Comenzamos con el contrato del piloto?",
                solucionador: "¿Qué limitaciones o plazos de entrega incumplidos habéis detectado con vuestro proveedor en los últimos meses? Si esas ineficiencias se continúan a largo plazo, ¿cómo afectarán a vuestros proyectos clave? ¿Probamos nuestro soporte especializado?"
            },
            {
                title: "Vuestra propuesta parece muy genérica para nuestro negocio",
                analitico: "Este borrador es solo el marco de trabajo. Si decidimos avanzar hoy, el primer paso será realizar dos talleres técnicos de inmersión para tallar a medida vuestra hoja de ruta. ¿Te parece si agendamos la primera sesión para el lunes?",
                emocional: "Te preocupa recibir una solución enlatada que no entienda las particularidades de tu equipo, lo comprendo perfectamente. ¿Qué aspectos específicos de vuestro flujo de trabajo en {sector} deberíamos priorizar en el diseño final para darte total tranquilidad? ¿Lo definimos ahora?",
                agresivo: "Las bases de una estrategia sólida en {sector} son universales, lo que cambia es la velocidad y calidad de la ejecución. En {product} adaptamos la implementación a tu modelo operativo real en la primera semana de trabajo. ¿Firmamos el acuerdo marco y definimos los detalles del plan mañana?",
                solucionador: "¿Qué consecuencias tendría para vuestra eficiencia operativa implantar una solución que no respete vuestros procesos internos? Si diseñamos juntos un flujo adaptado a vuestros objetivos de negocio, ¿crees que facilitaría el trabajo de tu equipo? ¿Comenzamos?"
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
                analitico: "Por solo un diez por ciento más de cuota con {product}, eliminas el noventa por ciento de los riesgos financieros a los que estás expuesto. La relación coste-beneficio es incuestionable. ¿Revisamos la comparativa de coberturas detallada para que veas la diferencia?",
                emocional: "Te preocupa gastar dinero en coberturas que tal vez nunca uses, lo entiendo. Pero si mañana ocurre un imprevisto grave, ¿cómo afectaría a tus planes familiares tener que costearlo tú solo? ¿No sería mejor transferir ese riesgo hoy?",
                agresivo: "Una póliza básica te da una falsa sensación de seguridad, pero el riesgo real aparece cuando ocurre un siniestro no cubierto y debes pagar miles de euros de tu bolsillo. La tranquilidad de tu familia no es algo en lo que debas escatimar unos pocos euros al mes. ¿Dejamos activa la cobertura ampliada hoy?",
                solucionador: "Si sufrieras una baja laboral prolongada y tus ingresos se reduceran a la mitad, ¿de qué recursos dispondrías para pagar la hipoteca? Con esta póliza blindamos tus ingresos familiares ante cualquier eventualidad. ¿Hacemos el estudio de viabilidad esta tarde?"
            },
            {
                title: "No confío en que las aseguradoras paguen cuando pase algo",
                analitico: "{product} cuenta con un índice de resolución favorable del noventa y ocho por ciento auditado por organismos reguladores de {sector}. Si redactamos una cláusula clara con las coberturas detalladas y firmadas, ¿estarías dispuesto a formalizar tu póliza?",
                emocional: "Parece que has tenido malas experiencias previas y te preocupa sentirte desamparado al reclamar una cobertura. Si yo me comprometo a ser tu asesor personal directo para realizar cualquier trámite si algo ocurre, ¿te daría la seguridad necesaria?",
                agresivo: "La desconfianza es normal si compras a través de un contestador automático, pero aquí cuentas con mi respaldo profesional directo y un contrato transparente sin letra pequeña. Mi trabajo es asegurar que la compañía responda de inmediato cuando lo necesites. ¿Cerramos el acuerdo de la póliza hoy?",
                solucionador: "¿Qué consecuencias económicas tendrías que afrontar si ocurre un siniestro grave y no cuentas con un respaldo financiero sólido? Si repasamos juntos las garantías legales de este contrato para que compruebes las condiciones de pago, ¿te ayudaría a decidir? ¿Empezamos por ahí?"
            },
            {
                title: "Todavía soy joven y saludable, no necesito esto ahora",
                analitico: "Las aseguradoras ofrecen las tarifas más bajas y sin exclusiones médicas precisamente cuando estás sano. Esperar a enfermarte hará que te cueste el triple. ¿Hacemos el cálculo de tu tarifa preferencial congelada a largo plazo?",
                emocional: "Ahora que estás sano y fuerte sientes que contratar un seguro es tirar el dinero, lo comprendo. Pero, ¿qué pasaría si un accidente deportivo te obliga a parar y tu trabajo se ve afectado? ¿No prefieres tener una red de seguridad desde ya?",
                agresivo: "La salud no se puede comprar una vez que se ha perdido, y esperar a tener un problema médico solo hará que la póliza sea mucho más cara o que te rechacen. Contratar hoy es una muestra de previsión financiera inteligente. ¿Dejamos tu cobertura activa para proteger tu futuro?",
                solucionador: "Si sufrieras una lesión imprevista que requiriera cirugía inmediata, ¿cuánto tiempo de espera podrías permitirte en la sanidad pública? Si con {product} accedes a especialistas privados en veinticuatro horas, ¿no merecería la pena la inversión? ¿Te parece bien?"
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
                analitico: "Esta pieza de edición limitada mantiene e incrementa su valor de tasación un cinco por ciento anual debido a su escasez. No es un gasto efímero, es un activo estético tangible. ¿Quieres que preparemos la compra como inversión patrimonial?",
                emocional: "Te preocupa pagar un sobreprecio injustificado por la marca en lugar de por el valor real del producto. Si aprecias el tacto de este cuero italiano y la costura artesanal hecha a mano, verás que la diferencia es abismal. ¿Te gustaría probártela de nuevo?",
                agresivo: "Claro que hay cosas más baratas online, pero tú no buscas lo común. Aquí estás adquiriendo estatus, costura artesanal y la autenticidad de una pieza de colección original. El lujo no se compara con la gama baja. ¿Te la empaquetamos para que la disfrutes hoy?",
                solucionador: "Si optas por una imitación más barata en {sector} y se deteriora en pocos meses, ¿qué imagen proyectarás y cuánto habrás gastado al tener que reemplazarla? Adquirir la pieza original te garantiza durabilidad de por vida. ¿La preparamos para ti?"
            },
            {
                title: "Solo estoy mirando de momento, no voy a comprar hoy",
                analitico: "Al ser una edición limitada en {sector}, solo nos quedan dos piezas disponibles en stock europeo. Si de verdad te interesa, podemos hacer una reserva provisional de veinticuatro horas sin coste para asegurar que no te quedes sin ella. ¿Te parece una buena idea?",
                emocional: "La colección es para admirarla sin presiones, tómate tu tiempo. Pero si te pruebas la pieza simplemente para apreciar la caída del material sobre tu piel, sin compromiso hoy, ¿te parecería una buena experiencia?",
                agresivo: "Mirar es un placer, pero cuando encuentras la pieza perfecta que resalta tu estilo, posponer la decisión no tiene sentido. Te has ganado el derecho a disfrutar de este premio por tu esfuerzo personal. ¿La añadimos a tu colección y preparamos la entrega hoy?",
                solucionador: "Si decides esperar y cuando regreses esta pieza de edición limitada ya se ha agotado, ¿cómo te sentirías al haber perdido la oportunidad? Si verificamos la disponibilidad de tu talla en este momento para evitar que te quedes sin ella, ¿lo comprobamos?"
            },
            {
                title: "La marca tiene prestigio, pero el precio es desorbitado",
                analitico: "La escasez de producción y el coste de los materiales nobles justifican el valor de mercado de esta pieza. Además, su valor de tasación tiende a subir a largo plazo. ¿Quieres que preparemos la compra?",
                emocional: "Te preocupa estar pagando solo por el renombre de la marca en lugar de por la calidad y exclusividad reales de la pieza. Si te muestro el proceso de confección artesanal que lleva más de ochenta horas de trabajo, ¿te ayudaría a valorar su coste?",
                agresivo: "El precio es elevado porque el prestigio y la exclusividad que aporta esta marca son de primer nivel. No estás adquiriendo un simple producto, sino un símbolo del éxito que has alcanzado en tu carrera. ¿Estarías de acuerdo en darte este capricho hoy?",
                solucionador: "¿Qué valor le das al prestigio que te acompañará al lucir esta pieza en tus eventos profesionales de {sector}? Si esta adquisición representa un activo que mantendrá su valor a largo plazo, ¿no crees que justifica la inversión? ¿Iniciamos el trámite?"
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
                    analitico: "Si te demuestro en tres minutos cómo {product} ahorra ocho horas semanales a tu equipo en {sector}, ¿tendría sentido agendar una breve llamada de cinco minutos este martes? ¿Qué hora te vendría mejor, por la mañana o por la tarde?",
                    emocional: "Parece que te he llamado en un momento inoportuno y sientes que esto es una interrupción. Si te envío un correo con tres puntos clave para que lo leas en un minuto, ¿estarías abierto a que hablemos brevemente el jueves?",
                    agresivo: "Sé que no tienes tiempo y precisamente por eso te llamo, ya que {product} te va a devolver horas automatizando tus procesos de {sector}. Si no dedicas cinco minutos hoy a solucionar la ineficiencia, seguirás saturado el próximo mes. ¿Agendamos una breve sesión mañana a las nueve?",
                    solucionador: "¿Qué procesos manuales en {sector} le quitan más tiempo a tu equipo actualmente? Si continuáis perdiendo esas horas, ¿cuánto os costará esa ineficiencia a final de año? ¿Estarías dispuesto a tener una demo de cinco minutos para ver cómo {product} lo soluciona?"
                },
                {
                    title: "No me interesa / Ya estoy cubierto",
                    analitico: "Es lógico no mostrar interés si no has visto el rendimiento de {product}. Si te muestro en dos minutos cómo aumentamos la eficiencia en {sector} un treinta por ciento frente a tu proveedor actual, ¿tendría sentido que lo evaluaras? ¿Te parece bien si hacemos una breve llamada de prueba?",
                    emocional: "Parece que estás satisfecho con tu solución en {sector} y sientes que evaluar otra opción es una pérdida de tiempo. ¿Qué tendría que ocurrir con tu proveedor actual para que estuvieras abierto a considerar una alternativa más competitiva?",
                    agresivo: "Estar cubierto está bien, pero nuestro objetivo no es cambiar tu proveedor por capricho, sino mejorar tus resultados operativos. Si conformarte con lo que tienes te hace perder margen frente a tu competencia, ¿no deberíamos retar esos números? ¿Hacemos una prueba rápida de rendimiento de {product} esta semana?",
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
    { text: "El seguimiento no es una fase del proceso de ventas, es el proceso en sí.", author: "Grant Cardone" },
    { text: "Nunca bajes tu meta; aumenta tus acciones.", author: "Grant Cardone" },
    { text: "Nunca bajes tu precio, añade valor.", author: "Grant Cardone" },
    { text: "Las ventas son la transferencia de emoción. Y la emoción que transfieres es la de certeza.", author: "Jordan Belfort" },
    { text: "La mejor forma de vender algo es no vender nada. Gana primero el respeto y la confianza de tu prospecto.", author: "Jordan Belfort" },
    { text: "Si le das a la gente un 'por qué' lo suficientemente bueno, siempre encontrarán el 'cómo'.", author: "Jordan Belfort" },
    { text: "La negociación no es un acto de batalla, es un proceso de descubrimiento.", author: "Chris Voss" },
    { text: "Las personas parecen estar más motivadas por la idea de perder algo que por la idea de ganar algo de igual valor.", author: "Robert Cialdini" },
    { text: "Cada vez que decepcionas a un prospecto, decepcionas a 250 potenciales recomendados más.", author: "Joe Girard" },
    { text: "El obstáculo es lo que ves cuando apartas los ojos de tu objetivo.", author: "Henry Ford" },
    { text: "No vendas un producto, vende soluciones a problemas reales.", author: "Brian Tracy" },
    { text: "A los clientes no les importa tu producto, les importan sus propios problemas.", author: "Kathy Sierra" },
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

    // Gemini API Key Input handler
    const geminiApiKeyInput = document.getElementById("gemini-api-key-input");
    if (geminiApiKeyInput) {
        geminiApiKeyInput.value = localStorage.getItem("gemini_api_key") || "";
        geminiApiKeyInput.addEventListener("input", (e) => {
            localStorage.setItem("gemini_api_key", e.target.value.trim());
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
        analitico: `Si el obstáculo es "${text}", miremos la rentabilidad real de {product}. Los números muestran que recuperas la inversión en tres meses con total garantía técnica por contrato. ¿Qué necesitas ver hoy para que hagamos la prueba piloto?`,
        emocional: `Si la preocupación principal es "${text}", mi compromiso es acompañarte a ti y a tu equipo en cada paso de la transición. No estarás solo con un manual de {product}, sino con soporte directo por videollamada siempre que lo necesites. ¿Te parece bien si agendamos una breve llamada de inducción el lunes?`,
        agresivo: `Si dejas que "${text}" te detenga hoy, seguirás con el mismo problema el próximo mes y perdiendo margen frente a tu competencia. En {sector} la inacción es lo que realmente sale caro, no la solución. ¿Qué correo dejamos registrado para activar tu cuenta ahora mismo?`,
        solucionador: `Si "${text}" es el inconveniente actual, miremos cómo resolver la raíz del problema de forma inmediata. ¿Cuánto os está costando operativamente no solucionar esto esta semana? ¿Comenzamos con la fase de diagnóstico de cinco minutos?`
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
    // Synchronize Gemini API Key input
    const geminiApiKeyInput = document.getElementById("gemini-api-key-input");
    if (geminiApiKeyInput) {
        geminiApiKeyInput.value = localStorage.getItem("gemini_api_key") || "";
    }

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

// 11. Utility: Generate response with Gemini API
SalesQuest.prototype.generateAI = async function(profileId) {
    const apiKey = localStorage.getItem("gemini_api_key") || "";
    if (!apiKey) {
        alert("Por favor, introduce tu Clave Gemini API en el campo 'Clave Gemini' en la barra de configuración.");
        return;
    }

    const obj = this.currentObjection;
    if (!obj) {
        alert("Por favor, selecciona una objeción de la lista primero.");
        return;
    }

    const button = document.getElementById(`btn-gen-ai-${profileId}`);
    const scriptEl = document.getElementById(`script-${profileId}-text`);
    if (!button || !scriptEl) return;

    // Set loading state
    button.classList.add("loading");
    const originalBtnText = button.innerHTML;
    button.innerHTML = "<span>Pensando... 🧠</span>";
    const originalScriptText = scriptEl.innerText;
    scriptEl.innerText = "Generando respuesta táctica con Inteligencia Artificial...";

    try {
        // Collect Call Context variables
        const sector = this.currentSector ? this.currentSector.name : "Ventas";
        const temperatura = this.state.leadType === "cold" ? "Frío" : "Caliente";
        
        // Map filter IDs to readable text
        const filterNamesMap = {
            referral: "Recomendado por un cliente existente",
            filter_call: "Llamada de filtro/calificación completada",
            download: "Dossier de producto descargado",
            ad: "Registrado desde anuncio publicitario"
        };
        const filtrosStr = this.state.previousFilters && this.state.previousFilters.length > 0
            ? this.state.previousFilters.map(f => filterNamesMap[f] || f).join(", ")
            : "Ninguno";
            
        const perfil = this.state.detectedProfileId 
            ? (PROFILES[this.state.detectedProfileId] ? PROFILES[this.state.detectedProfileId].name : "No perfilado")
            : "No perfilado aún";
            
        // Objections history: list objections practiced so far
        const completedObjections = this.state.completedStages
            .filter(s => s.startsWith("objection-"))
            .map(s => {
                const idx = parseInt(s.replace("objection-", ""), 10);
                const o = this.currentObjections[idx];
                return o ? o.title : null;
            })
            .filter(Boolean);
            
        // Construct full conversation history
        let historialCompleto = "";
        if (temperatura === "Caliente") {
            historialCompleto += `Llamada con un lead caliente. Contactos y filtros anteriores: ${filtrosStr}. `;
        } else {
            historialCompleto += "Llamada fría inicial (primer contacto). ";
        }
        if (completedObjections.length > 0) {
            historialCompleto += `El cliente ha planteado y superado las siguientes objeciones anteriormente en esta llamada: ${completedObjections.join(", ")}.`;
        } else {
            historialCompleto += "No se han planteado objeciones anteriores en esta conversación.";
        }
        
        const objecionActual = obj.title;

        // Map active closing style
        const enfoquesMap = {
            agresivo: "Agresivo (Cierre Directo, asertividad y alta convicción)",
            emocional: "Emocional (Rapport Táctico, empatía profunda de Chris Voss)",
            analitico: "Analítico (McKinsey, lógica, números y eliminación de riesgo)",
            solucionador: "Solucionador (Consultivo de dolor, enfoque médico)"
        };
        const enfoque = enfoquesMap[profileId] || profileId;

        // Build the system prompt using templates from global PROMPTS
        const promptTemplate = PROMPTS[profileId];
        if (!promptTemplate) {
            throw new Error(`Perfil de prompt no encontrado: ${profileId}`);
        }

        const prompt = promptTemplate
            .replace(/{sector}/g, sector)
            .replace(/{producto}/g, this.state.productName || "nuestro servicio")
            .replace(/{temperatura}/g, temperatura)
            .replace(/{perfil}/g, perfil)
            .replace(/{historial_completo}/g, historialCompleto)
            .replace(/{objecion_actual}/g, objecionActual)
            .replace(/{enfoque}/g, enfoque);

        // Make Gemini API call (Gemini 1.5 Flash model)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 300
                }
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        let aiResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiResult) {
            throw new Error("La IA no devolvió ningún contenido. Verifica tu API Key.");
        }

        // Clean quotes and markdown from AI response
        aiResult = aiResult.trim()
            .replace(/^["'«`]+/, "")
            .replace(/["'»`]+$/, "")
            .trim();

        // Inject the product/sector variables if Gemini returned them unresolved
        aiResult = aiResult
            .replace(/{producto}/g, this.state.productName || "nuestro servicio")
            .replace(/{product}/g, this.state.productName || "nuestro servicio")
            .replace(/{sector}/g, sector);

        scriptEl.innerText = aiResult;
    } catch (error) {
        console.error("Gemini API Error:", error);
        alert(`Error al generar con IA: ${error.message}`);
        scriptEl.innerText = originalScriptText;
    } finally {
        button.classList.remove("loading");
        button.innerHTML = originalBtnText;
    }
};
