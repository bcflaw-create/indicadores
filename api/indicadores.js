export default async function handler(req, res) {
  try {
    // Llamar directamente a tu PHP que ya funciona
    const response = await fetch('https://bcflaw.mx/indicadores.php');
    
    if (!response.ok) {
      throw new Error(`PHP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json(data);
    
  } catch (error) {
    console.error('Error:', error.message);
    
    // Fallback si el PHP no responde
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json({
      indicadores: [
        { nombre: 'Dólar DOF', valor: 17.3793, unidad: 'MXN', fecha: new Date().toISOString() },
        { nombre: 'INPC', valor: 145.67, unidad: 'Puntos', fecha: new Date().toISOString() },
        { nombre: 'Inflación', valor: 2.43, unidad: '%', fecha: new Date().toISOString() },
        { nombre: 'UDIs', valor: 8.835488, unidad: 'MXN', fecha: new Date().toISOString() },
        { nombre: 'TIIE 28 Días', valor: 4.98, unidad: '%', fecha: new Date().toISOString() }
      ],
      source: 'fallback',
      error: error.message
    });
  }
}
