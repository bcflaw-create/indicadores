export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.banxico.org.mx/ws/WS_Indicadores/Indicadores', {
      headers: {'Bmx-Api-Key': 'de4b0afeef5eaea41dc0a0e86e8dc8d3'}
    });
    
    if (!response.ok) throw new Error('Banxico error');
    
    const data = await response.json();
    const indicadores = data.Indicadores.map(ind => ({
      nombre: ind.Titulo,
      valor: parseFloat(ind.Datos[0].Dato),
      unidad: ind.Unidad,
      fecha: new Date(ind.Datos[0].Fecha + 'T00:00:00').toISOString()
    }));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.json({ indicadores });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
