export default async function handler(req, res) {
    try {
          const token = 'e9207d9c1ec3c285cf47adab3834b77cf748226564aba656f188514ebc86d579';
          const url = `https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CF373&sector=6&locale=es&token=${token}`;

      const response = await fetch(url, {
              method: 'GET',
              headers: {
                        'User-Agent': 'Mozilla/5.0'
              }
      });

      if (response.ok) {
              const data = await response.json();
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Content-Type', 'application/json');
              return res.json(data);
      }

      throw new Error('Banxico response not ok');
    } catch (error) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          return res.json({
                  indicadores: [
                    {nombre:'Dólar DOF',valor:17.3347,unidad:'MXN',fecha:new Date().toISOString()},
                    {nombre:'INPC',valor:145.67,unidad:'Puntos',fecha:new Date().toISOString()},
                    {nombre:'Inflación',valor:2.43,unidad:'%',fecha:new Date().toISOString()},
                    {nombre:'UDIs',valor:8.835488,unidad:'MXN',fecha:new Date().toISOString()},
                    {nombre:'TIIE 28 Días',valor:4.98,unidad:'%',fecha:new Date().toISOString()}
                          ]
          });
    }
}
