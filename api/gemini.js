export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ 
            error: 'GEMINI_API_KEY no está configurada en el servidor. Por favor, añádela en las variables de entorno de tu proyecto en el panel de Vercel.' 
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const requestedModel = req.body.model || 'gemini-2.5-flash';
    const bodyCopy = { ...req.body };
    delete bodyCopy.model;

    const fallbacks = [requestedModel, 'gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-2.5-flash-lite'];
    const uniqueModels = [...new Set(fallbacks)];

    let lastError = null;
    let successResponse = null;
    let responseStatus = 200;

    for (const model of uniqueModels) {
        const modelName = model.startsWith('models/') ? model.substring(7) : model;
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyCopy)
            });

            const data = await response.json();
            responseStatus = response.status;

            if (response.ok) {
                successResponse = data;
                break;
            } else {
                console.warn(`Model ${modelName} returned status ${responseStatus}:`, data);
                lastError = data.error?.message || data.error || `HTTP ${responseStatus}`;
            }
        } catch (error) {
            console.error(`Error calling model ${modelName}:`, error);
            lastError = error.message;
        }
    }

    if (successResponse) {
        return res.status(responseStatus).json(successResponse);
    } else {
        return res.status(responseStatus || 500).json({
            error: `Fallo al conectar con Gemini API (probados todos los modelos de respaldo): ${lastError}`
        });
    }
}
