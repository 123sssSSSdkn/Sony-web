// netlify/functions/proxy.js
exports.handler = async (event) => {
    const url = event.queryStringParameters.url;
    
    if (!url) {
        return {
            statusCode: 400,
            body: 'Missing URL parameter'
        };
    }
    
    try {
        const response = await fetch(url);
        const data = await response.text();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/vnd.apple.mpegurl',
                'Access-Control-Allow-Origin': '*'
            },
            body: data
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Error fetching stream'
        };
    }
};
