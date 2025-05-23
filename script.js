const mapa = document.getElementById("mapa-inner");
const mapaContainer = document.getElementById("mapa");
const marcadores = document.querySelectorAll(".marcador");
const painelFixo = document.getElementById("painel-fixo");
const voltarBtn = document.getElementById("voltar-btn");
const vinheta = document.getElementById("vinheta");

const infoArea = document.getElementById("info-area");
const infoTransito = document.getElementById("info-transito");
const infoClima = document.getElementById("info-clima");
const infoUmidade = document.getElementById("info-umidade");
const infoTemp = document.getElementById("info-temp");
const infoSensacao = document.getElementById("info-sensacao");
const infoVento = document.getElementById("info-vento");

const dados = {
  // Los Santos
  "Ganton": {
    transito: "Crítico", clima: "Ensolarado", umidade: "55%", temp: "32°C", sensacao: "35°C", vento: "8 km/h"
  },
  "Idlewood": {
    transito: "Congestionado", clima: "Nublado", umidade: "65%", temp: "28°C", sensacao: "30°C", vento: "12 km/h"
  },
  "Jefferson": {
    transito: "Moderado", clima: "Limpo", umidade: "50%", temp: "30°C", sensacao: "32°C", vento: "10 km/h"
  },
  "East Los Santos": {
    transito: "Intenso", clima: "Parcial nublado", umidade: "60%", temp: "29°C", sensacao: "31°C", vento: "15 km/h"
  },
  "Market Station": {
    transito: "Crítico", clima: "Chuvoso", umidade: "80%", temp: "25°C", sensacao: "26°C", vento: "20 km/h"
  },
  "Rodeo": {
    transito: "Lento", clima: "Ensolarado", umidade: "45%", temp: "33°C", sensacao: "35°C", vento: "5 km/h"
  },
  "Vinewood": {
    transito: "Moderado", clima: "Limpo", umidade: "40%", temp: "31°C", sensacao: "33°C", vento: "7 km/h"
  },
  "Pershing Square": {
    transito: "Intenso", clima: "Nublado", umidade: "70%", temp: "27°C", sensacao: "29°C", vento: "18 km/h"
  },
  
  // Aeroportos
  "Aeroporto de Los Santos": {
    transito: "Intenso", clima: "Neblina", umidade: "85%", temp: "23°C", sensacao: "24°C", vento: "14 km/h"
  },
  "Aeroporto de Las Venturas": {
    transito: "Fluido", clima: "Ensolarado", umidade: "30%", temp: "36°C", sensacao: "38°C", vento: "10 km/h"
  },
  "Aeroporto de San Fierro": {
    transito: "Moderado", clima: "Neblina", umidade: "75%", temp: "21°C", sensacao: "22°C", vento: "15 km/h"
  },
  
  // San Fierro
  "Downtown San Fierro": {
    transito: "Congestionado", clima: "Neblina", umidade: "75%", temp: "20°C", sensacao: "21°C", vento: "18 km/h"
  },
  "Garcia": {
    transito: "Fluido", clima: "Chuvoso", umidade: "90%", temp: "19°C", sensacao: "18°C", vento: "22 km/h"
  },
  "Doherty": {
    transito: "Lento", clima: "Nublado", umidade: "80%", temp: "22°C", sensacao: "23°C", vento: "15 km/h"
  },
  
  // Las Venturas
  "The Strip": {
    transito: "Intenso", clima: "Limpo", umidade: "40%", temp: "35°C", sensacao: "37°C", vento: "5 km/h"
  },
  "Redsands East": {
    transito: "Moderado", clima: "Ensolarado", umidade: "35%", temp: "34°C", sensacao: "36°C", vento: "8 km/h"
  },
  "Redsands West": {
    transito: "Fluido", clima: "Limpo", umidade: "30%", temp: "36°C", sensacao: "38°C", vento: "6 km/h"
  },
  
  // Áreas Rurais
  "Angel Pine": {
    transito: "Fluido", clima: "Chuvoso", umidade: "90%", temp: "18°C", sensacao: "16°C", vento: "25 km/h"
  },
  "Palomino Creek": {
    transito: "Fluido", clima: "Nublado", umidade: "75%", temp: "20°C", sensacao: "19°C", vento: "20 km/h"
  },
  "Blueberry": {
    transito: "Fluido", clima: "Parcial nublado", umidade: "60%", temp: "25°C", sensacao: "26°C", vento: "15 km/h"
  },
  "Dillimore": {
    transito: "Fluido", clima: "Limpo", umidade: "50%", temp: "28°C", sensacao: "30°C", vento: "12 km/h"
  },
  
  // Pontos de Interesse
  "Mount Chiliad": {
    transito: "Fluido", clima: "Nevando", umidade: "95%", temp: "-2°C", sensacao: "-5°C", vento: "40 km/h"
  },
  "Area 69": {
    transito: "Restrito", clima: "Seco", umidade: "20%", temp: "38°C", sensacao: "40°C", vento: "12 km/h"
  },
  "Sherman Dam": {
    transito: "Fluido", clima: "Chuvoso", umidade: "85%", temp: "17°C", sensacao: "15°C", vento: "30 km/h"
  }
};

// Adiciona tooltips aos marcadores
marcadores.forEach(marcador => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = marcador.getAttribute('data-area');
  marcador.appendChild(tooltip);
  
  marcador.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
  });
  
  marcador.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
});

// Configura eventos de clique nos marcadores
marcadores.forEach(marcador => {
  marcador.addEventListener("click", (e) => {
    const rect = mapaContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    mapa.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    mapa.classList.add("zoom");
    vinheta.style.display = "block";
    voltarBtn.style.display = "block";

    const area = marcador.getAttribute("data-area");
    const info = dados[area];
    if (info) {
      infoArea.textContent = area;
      infoTransito.textContent = info.transito;
      infoTransito.setAttribute('data-status', info.transito);
      infoClima.textContent = info.clima;
      infoUmidade.textContent = info.umidade;
      infoTemp.textContent = info.temp;
      infoSensacao.textContent = info.sensacao;
      infoVento.textContent = info.vento;
      
      if (info.transito.toLowerCase().includes("crítico") || info.transito.toLowerCase().includes("congestionado")) {
        marcador.classList.add("critico");
      }
    }

    marcadores.forEach(m => m.style.display = "none");
    marcador.style.display = "block";
  });
});

// Configura botão de voltar
voltarBtn.addEventListener("click", () => {
  mapa.classList.remove("zoom");
  vinheta.style.display = "none";
  voltarBtn.style.display = "none";
  marcadores.forEach(m => {
    m.style.display = "block";
    m.classList.remove("critico");
  });

  // Limpar painel
  infoArea.textContent = "---";
  infoTransito.textContent = "---";
  infoTransito.removeAttribute('data-status');
  infoClima.textContent = "---";
  infoUmidade.textContent = "---";
  infoTemp.textContent = "---";
  infoSensacao.textContent = "---";
  infoVento.textContent = "---";
});

// Atualiza relógio
function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  const segundos = agora.getSeconds().toString().padStart(2, '0');
  const dia = agora.getDate().toString().padStart(2, '0');
  const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
  const ano = agora.getFullYear();
  
  document.getElementById('hora-atual').textContent = `${horas}:${minutos}:${segundos}`;
  document.getElementById('data-atual').textContent = `${dia}/${mes}/${ano}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();