/* JIM · datos y funciones compartidas por login, registro y portal.
   Hoy guarda todo en localStorage (solo en este navegador).
   Para producción, reemplaza load() y save() por llamadas a tu servidor/base de datos. */
const $=s=>document.querySelector(s),
E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=new Date().toISOString().slice(0,10),
COP=n=>(n||0).toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});
const RN={admin:'Administrador',inspector:'Inspector',tecnico:'Técnico'};
let db;

function load(){
  try{db=JSON.parse(localStorage.getItem('jim'))}catch(e){}
  if(!db)db={
    u:[
      {n:'Administrador JIM',e:'admin@jim.co',p:'admin123',r:'admin',paid:0},
      {n:'Carlos Inspector',e:'inspector@jim.co',p:'1234',r:'inspector',paid:0},
      {n:'Tomás Técnico',e:'tecnico@jim.co',p:'1234',r:'tecnico',paid:0}
    ],
    v:[
      {id:1,c:'María Gómez',a:'Cra 27 #45-10, Bucaramanga',t:'3001234567',d:today,to:'inspector@jim.co',fee:60000,s:'pendiente'},
      {id:2,c:'Edificio Los Pinos',a:'Calle 36 #20-15, Bucaramanga',t:'3109876543',d:today,to:'tecnico@jim.co',fee:45000,s:'pendiente'}
    ]};
}
function save(){
  try{localStorage.setItem('jim',JSON.stringify(db))}
  catch(e){alert('No hay espacio para guardar. Usa fotos más livianas.')}
}
const U=e=>db.u.find(x=>x.e===e), V=id=>db.v.find(x=>x.id==id);

/* Sesión: se guarda solo el correo del usuario conectado */
function sesion(){try{return U(localStorage.getItem('jim_sesion'))||null}catch(e){return null}}
function iniciar(u){try{localStorage.setItem('jim_sesion',u.e)}catch(e){}}
function cerrar(){try{localStorage.removeItem('jim_sesion')}catch(e){}location.href='login.html'}

load();
