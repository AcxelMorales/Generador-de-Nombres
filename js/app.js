"use strict";

// ********************************************* Variables ***********************************************
// <form>
const form = document.getElementById("generar-nombre");
form.addEventListener("submit", cargarNombres);

// ********************************************* Clases **************************************************
class Interfaz {
  sendError(mensaje, tipo) {
    const div = document.createElement("div");
    div.classList.add(tipo, "g");
    div.innerHTML = mensaje;
    form.insertBefore(div, document.querySelector(".row"));

    setTimeout(() => {
      document.querySelector(".g").remove();
    }, 3000);
  }
}

// ********************************************+ eventlisteners *******************************************
function cargarNombres(e) {
  e.preventDefault();
  const ui = new Interfaz();

  // leer los datos del <form>
  const origen = document.getElementById("origen");
  const origenSeleccionado = origen.options[origen.selectedIndex].value;

  const genero = document.getElementById("genero");
  const generoSeleccionado = genero.options[genero.selectedIndex].value;

  const cantidad = document.getElementById("numero").value;

  let url = "";
  url += "http://uinames.com/api/?";

  if (origenSeleccionado !== "") {
    url += `region=${origenSeleccionado}&`;
  } else {
    ui.sendError("Seleccione una región para mayor presición", "error");
  }

  if (generoSeleccionado !== "") {
    url += `gender=${generoSeleccionado}&`;
  } else {
    ui.sendError("Seleccione un genero para mayor presición", "error");
  }

  if (cantidad < "5") {
    url += `amount=${cantidad}&`;
  }

  console.log(url);

  // Fetch API
  fetch(url)
    .then(response => response.json())
    .then(data => {

      console.log(data);
      let html = "<h2>Nombres generados</h2>";
      html += '<ul class="lista">';

      data.forEach(element => {
        html += 
            `
            <li>${element.name}</li>
            `;
      });

      html += "</ul>";

      document.getElementById("resultado").innerHTML = html;
    })
    .catch(err => console.log(err));

  /*
    // Ajax
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = () => {

        if (xhr.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);
            
            let html = '<h2>Nombres generados</h2>';
            html += '<ul class="lista">';

            respuesta.forEach(element => {
                html += `
                    <li>${element.name}</li>
                `;
            });

            html += '</ul>';

            document.getElementById('resultado').innerHTML = html;
        }
    }

    xhr.send();
    */
}
