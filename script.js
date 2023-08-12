//variables
let todospersonajes=[];
let pagina=1;
let totalPersonajes = document.getElementById('total-personajes');

//====================mostrar personajes en el html=========================//
let $caja=document.getElementById('caja');
let datos=document.getElementById('datodepaginas')
let personajes=document.getElementById('encabezado')


function mostrar(array) {
  $caja.innerHTML='';
  for (let i = 0; i < array.length; i++) {
    $caja.innerHTML += `<div class="card">
    <img src=${array[i].image}>
    <div class="contenido"><h2>Nombre: ${array[i].name}</h2>
    <p>Genero: ${array[i].gender}</p>
    <p>Especie: ${array[i].species}</p>
    <p>Estado: ${array[i].status}</p>
    <p>Origen: ${array[i].origin.name}</p>
    <p>Locacion: ${array[i].location.name}</p>
    <button class='vermas' onclick='redireccion()'>Ver Mas</button>
  </div>`  
  };
  datos.innerHTML=`<p id="datodepaginas">Pagina actual:${pagina}</p>`
  personajes.innerHTML=`<p id="encabezado">Total de personajes: ${array.length}</p>`
};


//==========================fetch de personajes==================================//
function usarfectch(numerodepagina) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${numerodepagina}`)
  .then((data)=>{
  return data.json();
  })
  .then((data)=>{
    todospersonajes=data.results;
    mostrar(todospersonajes);
  });
}
usarfectch(pagina)
//=========================filtros(variables,funciones,eventos)===================//
let $todosb=document.getElementById('todos');
let $mujerb=document.getElementById('mujer');
let $hombreb=document.getElementById('hombre');
let $singenero=document.getElementById('singenero');

function mostrartodo() {
  let resultado=todospersonajes.filter((personaje)=>{
    return todospersonajes;
  })
  mostrar(resultado);
};
function mostrarmujeres() {
  let resultado=todospersonajes.filter((personaje)=>{
    return personaje.gender === 'Female';
  })
  mostrar(resultado);
};
function mostrarhombre() {
  let resultado=todospersonajes.filter((personaje)=>{
    return personaje.gender === 'Male';
  })
  mostrar(resultado);
};
function mostrarsingenero() {
  let resultado=todospersonajes.filter((personaje)=>{
    return personaje.gender === 'Genderless';
  })
  mostrar(resultado);
};

$todosb.addEventListener('click', mostrartodo);
$mujerb.addEventListener('click', mostrarmujeres);
$hombreb.addEventListener('click', mostrarhombre);
$singenero.addEventListener('click', mostrarsingenero);


//===================================paginado (variables,funciones,eventos===================================//
let $siguiente=document.getElementById('siguiente');
let $anterior=document.getElementById('anterior');
let $ultima=document.getElementById('ultima');
let $primera=document.getElementById('primera');

function siguientepagina() {
 pagina++;
 usarfectch(pagina);
 Pagination();
};
function paginaanterior() {
  pagina--;
  usarfectch(pagina);
  Pagination();
  
};
function ultimapagina(){
  pagina=42;
  usarfectch(42); 
  Pagination(); 
};
function primerapagina(){
  pagina=1;
  usarfectch(1);
  Pagination();
};

let Pagination = () => {
  if(pagina === 1){
    $anterior.disabled = true;
    $primera.disabled = true;
  } else {
    $anterior.disabled = false;
    $primera.disabled = false;
  }
  if(pagina === 42 ){
    $siguiente.disabled = true
    $ultima.disabled = true
  } else {
    $siguiente.disabled = false
    $ultima.disabled = false
  }
}

$siguiente.addEventListener('click',siguientepagina)
$anterior.addEventListener('click',paginaanterior)
$ultima.addEventListener('click',ultimapagina)
$primera.addEventListener('click',primerapagina)

//========================================================================================//
//falta funcionalidad de boton ver mas
function redireccion(){
  location.href='vermas.html'
}




