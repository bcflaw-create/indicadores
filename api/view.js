export default async function handler(req, res) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Indicadores</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',sans-serif;background:#fff;padding:12px}
.wrapper{overflow:hidden}
.carousel{display:flex;animation:scroll 30s linear infinite;width:fit-content}
.carousel:hover{animation-play-state:paused}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.card{flex:0 0 150px;background:#f8f9fa;padding:12px;margin:0 8px;border-radius:8px;border-left:4px solid #16a085;text-align:center;font-size:0.9rem}
.label{color:#16a085;font-weight:700;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}
.value{color:#2c3e50;font-weight:800;font-size:1.3rem;margin-bottom:2px}
.unit{color:#666;font-size:0.75rem;margin-bottom:3px}
.date{color:#999;font-size:0.7rem;border-top:1px solid #e1e4e8;padding-top:3px;margin-top:3px}
</style>
</head>
<body>
<div class="wrapper">
<div class="carousel" id="c"></div>
</div>
<script>
async function l(){try{const r=await fetch('/api/indicadores');const d=await r.json();let h='';d.indicadores.forEach(i=>{h+=\`<div class="card"><div class="label">\${i.nombre}</div><div class="value">\${parseFloat(i.valor).toFixed(2)}</div><div class="unit">\${i.unidad}</div><div class="date">\${new Date(i.fecha).toLocaleDateString('es-MX')}</div></div>\`});document.getElementById('c').innerHTML=h+h}catch(e){}}
l();setInterval(l,3600000);
</script>
</body>
</html>`;
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.send(html);
}
