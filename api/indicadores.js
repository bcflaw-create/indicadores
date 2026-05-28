export default async function handler(req, res) {
  try {
    const token = 'e9207d9c1ec3c285cf47adab3834b77cf748226564aba656f188514ebc86d579';
    
    // Llamar a la API correcta de Banxico con el token
    const response = await fetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent('https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CF373&sector=6&locale=es&token=' + token)}`,      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Banxico error: ${response.status}`);
    }

    const data = await response.json();
    
    // Si viene en formato de Banxico con estructura anidada
    let indicadores = [];
    if (data.d && data.d.Indicadores) {
      indicadores = data.d.Indicadores.map(ind => ({
        nombre: ind.Titulo || ind.titulo,
        valor: parseFloat(ind.Datos[0].Dato),
        unidad: ind.Unidad || ind.unidad,
        fecha: ind.Datos[0].Fecha
      }));
    } else if (data.Indicadores) {
      indicadores = data.Indicadores.map(ind => ({
        nombre: ind.Titulo,
        valor: parseFloat(ind.Datos[0].Dato),
        unidad: ind.Unidad,
        fecha: ind.Datos[0].Fecha
      }));
    } else if (Array.isArray(data)) {
      indicadores = data.map(ind => ({
        nombre: ind.nombre || ind.Titulo,
        valor: parseFloat(ind.valor || ind.Dato),
        unidad: ind.unidad || ind.Unidad,
        fecha: new Date().toISOString()
      }));
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json({ indicadores });
    
  } catch (error) {
    console.error('Error:', error);
    
    // Fallback solo si Banxico falla
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json({
      indicadores: [
        {nombre:'Dólar DOF',valor:17.3793,unidad:'MXN',fecha:new Date().toISOString()},
        {nombre:'INPC',valor:145.67,unidad:'Puntos',fecha:new Date().toISOString()},
        {nombre:'Inflación',valor:2.43,unidad:'%',fecha:new Date().toISOString()},
        {nombre:'UDIs',valor:8.835488,unidad:'MXN',fecha:new Date().toISOString()},
        {nombre:'TIIE 28 Días',valor:4.98,unidad:'%',fecha:new Date().toISOString()}
      ]
    });
  }
}
