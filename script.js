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
    <h2>Nombre: ${array[i].name}</h2>
    <p>Genero: ${array[i].gender}</p>
    <p>Especie: ${array[i].species}</p>
    <p>Estado: ${array[i].status}</p>
    <p>Origen: ${array[i].origin.name}</p>
    <p>Locacion: ${array[i].location.name}</p>
    <div class="vermas"><button onclick="verMasDetalles(todospersonajes[${i}])">Ver Mas</button></div>
  </div>`  
  };
  datos.innerHTML=`<p id="datodepaginas">Página actual:${pagina}</p>`
  personajes.innerHTML=`<p id="encabezado">Total de personajes: ${array.length}</p>`
};

function verMasDetalles(personaje) {
  alert(`Detalles de ${personaje.name}:\n\nEspecie: ${personaje.species}\nGenero: ${personaje.gender}\nOrigen: ${personaje.origin.name}\nURL: ${personaje.url}\nCreado: ${personaje.created}\nEpisodio: ${personaje.episode}`);
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


// ============================= paginado (variables,funciones,eventos) =============================== //

let $siguiente = document.getElementById('siguiente');
let $anterior = document.getElementById('anterior');
let $ultima = document.getElementById('ultima');
let $primera = document.getElementById('primera');

function actualizarBotonesPaginado() {
  if (pagina === 1) {
    $anterior.disabled = true;
    $primera.disabled = true;
  } else {
    $anterior.disabled = false;
    $primera.disabled = false;
  }

  if (pagina === 42) {
    $siguiente.disabled = true;
    $ultima.disabled = true;
  } else {
    $siguiente.disabled = false;
    $ultima.disabled = false;
  }
}
function siguientepagina() {
  if (pagina === 42) {
    return;
  }

  pagina++;
  window.scrollTo({ top: 0, behavior: 'smooth' })
  usarfectch(pagina);
  actualizarBotonesPaginado();
}
function paginaanterior() {
  if (pagina === 1) {
    return;
  }
  pagina--;
  window.scrollTo({ top: 0, behavior: 'smooth' })
  usarfectch(pagina);
  actualizarBotonesPaginado();
}

function ultimapagina() {
  pagina = 42;
  window.scrollTo({ top: 0, behavior: 'smooth' })
  usarfectch(pagina);
  actualizarBotonesPaginado();
}
function primerapagina() {
  pagina = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' })
  usarfectch(pagina);
  actualizarBotonesPaginado();
}


$siguiente.addEventListener('click', siguientepagina);
$anterior.addEventListener('click', paginaanterior);
$ultima.addEventListener('click', ultimapagina);
$primera.addEventListener('click', primerapagina);

actualizarBotonesPaginado();







