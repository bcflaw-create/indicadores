export default async function handler(req, res) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Indicadores</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:sans-serif;background:#fff;padding:15px}
h2{color:#16a085;font-size:1.2rem;margin-bottom:12px;text-align:center}
.indicators{display:flex;gap:10px;overflow-x:auto;padding:5px 0}
.item{flex:0 0 auto;background:#f8f9fa;padding:10px 12px;border-radius:6px;text-align:center;border-left:3px solid #16a085;min-width:110px}
.label{font-size:0.7rem;color:#16a085;font-weight:700;text-transform:uppercase}
.value{font-size:1.4rem;color:#2c3e50;font-weight:800;margin:3px 0}
.unit{font-size:0.8rem;color:#666}
</style>
</head>
<body>
<h2>📊 Indicadores Financieros</h2>
<div class="indicators" id="c"></div>
<script>
async function l(){try{const r=await fetch('/api/indicadores');const d=await r.json();let h='';d.indicadores.forEach(i=>{h+=\`<div class="item"><div class="label">\${i.nombre}</div><div class="value">\${parseFloat(i.valor).toFixed(2)}</div><div class="unit">\${i.unidad}</div></div>\`});document.getElementById('c').innerHTML=h}catch(e){}}
l();setInterval(l,3600000);
</script>
</body>
</html>`;
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.send(html);
}
