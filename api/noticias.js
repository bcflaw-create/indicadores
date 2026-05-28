export default async function handler(req, res) {
  try {
    // Llamar a tu PHP que obtiene noticias del XML sumario del DOF
    const response = await fetch('https://bcflaw.mx/noticias.php');
    
    if (!response.ok) {
      throw new Error(`PHP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.json(data);
    
  } catch (error) {
    console.error('Error:', error.message);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Fallback: noticias del DOF
    return res.json({
      noticias: [
        {
          titulo: 'Últimas Disposiciones del DOF',
          descripcion: 'Consulta el Diario Oficial de la Federación para información actualizada',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx'
        },
        {
          titulo: 'Sumario del Diario Oficial',
          descripcion: 'Información actualizada diariamente sobre disposiciones y decretos',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx/sumario.xml'
        },
        {
          titulo: 'Normativa Vigente',
          descripcion: 'Disposiciones en materia fiscal, laboral y corporativa',
          fecha: new Date().toISOString(),
          fuente: 'DOF',
          url: 'https://www.dof.gob.mx'
        }
      ]
    });
  }
}
