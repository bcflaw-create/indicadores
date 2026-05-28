export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Obtener tipo de indicador del query
    const { tipo } = req.query;
    
    // SF43718 = Tipo de cambio (default)
    const codigoIndicador = tipo || 'SF43718';
    
    const url = `https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=${codigoIndicador}&formato=json`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.status(200).json({
      exito: true,
      timestamp: new Date().toISOString(),
      fuente: 'Banxico',
      indicador: codigoIndicador,
      datos: data
    });
    
  } catch (error) {
    res.status(500).json({ 
      exito: false,
      error: error.message,
timestamp: new Date().toISOString()    });
  }
}
