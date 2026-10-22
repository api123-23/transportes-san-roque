// Los viajes se guardan en el celular (localStorage), asi funciona sin señal.
// En la version real se sincronizarian con una base de datos cuando vuelve internet.

const CLAVE = "viajes-san-roque";

function leerViajes() {
  const datos = localStorage.getItem(CLAVE);
  if (datos) {
    return JSON.parse(datos);
  }
  // datos de ejemplo para que el panel no arranque vacio
  return [
    { fecha: "2026-10-20", chofer: "Carlos Gómez", camion: "AB 123 CD - Scania", origen: "Malagueño", destino: "Rosario", km: 410, litros: 150, problema: "" },
    { fecha: "2026-10-21", chofer: "Martín Ruiz", camion: "AC 456 EF - Mercedes", origen: "Malagueño", destino: "Villa María", km: 160, litros: 60, problema: "Ruido en el freno trasero" },
    { fecha: "2026-10-21", chofer: "Diego Sosa", camion: "AD 789 GH - Iveco", origen: "Córdoba", destino: "Río Cuarto", km: 215, litros: 0, problema: "" }
  ];
}

function guardarViajes(viajes) {
  localStorage.setItem(CLAVE, JSON.stringify(viajes));
}

// ---------- Pantalla del chofer ----------
function iniciarFormulario() {
  const form = document.getElementById("form-viaje");
  const check = document.getElementById("hayProblema");
  const campoProblema = document.getElementById("campo-problema");
  const mensaje = document.getElementById("mensaje");

  document.getElementById("fecha").valueAsDate = new Date();

  check.addEventListener("change", function () {
    campoProblema.classList.toggle("oculto", !check.checked);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const kmInicio = Number(document.getElementById("kmInicio").value);
    const kmFinal = Number(document.getElementById("kmFinal").value);

    if (kmFinal < kmInicio) {
      mensaje.style.color = "#c62828";
      mensaje.textContent = "El km final no puede ser menor que el inicial";
      return;
    }

    const viaje = {
      fecha: document.getElementById("fecha").value,
      chofer: document.getElementById("chofer").value,
      camion: document.getElementById("camion").value,
      origen: document.getElementById("origen").value,
      destino: document.getElementById("destino").value,
      km: kmFinal - kmInicio,
      litros: Number(document.getElementById("litros").value),
      problema: check.checked ? document.getElementById("problema").value : ""
    };

    const viajes = leerViajes();
    viajes.push(viaje);
    guardarViajes(viajes);

    form.reset();
    document.getElementById("fecha").valueAsDate = new Date();
    campoProblema.classList.add("oculto");
    mensaje.style.color = "#2e7d32";
    mensaje.textContent = "Viaje guardado ✔";
  });
}

// ---------- Panel del encargado ----------
function iniciarPanel() {
  const filtro = document.getElementById("filtro-camion");
  const viajes = leerViajes();

  const camiones = [...new Set(viajes.map(v => v.camion))];
  camiones.forEach(function (c) {
    const op = document.createElement("option");
    op.textContent = c;
    filtro.appendChild(op);
  });

  filtro.addEventListener("change", function () {
    mostrar(viajes, filtro.value);
  });

  mostrar(viajes, "");
}

function mostrar(viajes, camion) {
  const lista = camion ? viajes.filter(v => v.camion === camion) : viajes;
  const tabla = document.getElementById("tabla-viajes");
  tabla.innerHTML = "";

  lista
    .slice()
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .forEach(function (v) {
      const fila = document.createElement("tr");
      if (v.problema) fila.className = "con-problema";
      [v.fecha, v.chofer, v.camion, v.origen + " → " + v.destino, v.km, v.litros, v.problema || "-"]
        .forEach(function (dato) {
          const td = document.createElement("td");
          td.textContent = dato;
          fila.appendChild(td);
        });
      tabla.appendChild(fila);
    });

  document.getElementById("total-viajes").textContent = lista.length;
  document.getElementById("total-km").textContent = lista.reduce((suma, v) => suma + v.km, 0);
  const conProblema = new Set(lista.filter(v => v.problema).map(v => v.camion));
  document.getElementById("total-problemas").textContent = conProblema.size;
}
