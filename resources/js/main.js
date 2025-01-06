let is24Hour = true;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    let timeString;

    if (!is24Hour) {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        timeString = `${hours}:${minutes} <span class="period">${period}</span>`;
    } else {
        hours = String(hours).padStart(2, '0');
        timeString = `${hours}:${minutes}`;
    }

    document.getElementById('clock').innerHTML = timeString;
}

// Toggle del formato horario
const formatToggle = document.querySelector('.format-toggle');

formatToggle.addEventListener('click', () => {
    is24Hour = !is24Hour;
    formatToggle.textContent = is24Hour ? '12h' : '24h';
    updateClock();
    
    // Guardar preferencia en localStorage
    localStorage.setItem('is24Hour', is24Hour);
});

// Cargar preferencia guardada
function loadSavedFormat() {
    const savedFormat = localStorage.getItem('is24Hour');
    if (savedFormat !== null) {
        is24Hour = savedFormat === 'true';
        formatToggle.textContent = is24Hour ? '12h' : '24h';
    }
}

// Actualizar color del botón cuando cambie el fondo
function updateButtonColor() {
    const bgColor = getComputedStyle(document.body).backgroundColor;
    const rgb = bgColor.match(/\d+/g);
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    formatToggle.style.color = brightness > 128 ? '#000000' : '#ffffff';
    formatToggle.style.background = brightness > 128 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
}

// Agregar al evento de cambio de color de fondo
document.getElementById('bgColor').addEventListener('input', (e) => {
    const color = e.target.value;
    document.body.style.backgroundColor = color;
    localStorage.setItem('bgColor', color);
    updateButtonColor();
});

// Inicialización
loadSavedFormat();
updateClock();
updateButtonColor();
setInterval(updateClock, 1000);

// Función para cargar los colores guardados
function loadSavedColors() {
    const savedClockColor = localStorage.getItem('clockColor') || '#e74c3c';
    const savedBgColor = localStorage.getItem('bgColor') || '#1a1a1a';

    // Aplicar colores guardados
    document.getElementById('clock').style.color = savedClockColor;
    document.body.style.backgroundColor = savedBgColor;
    
    // Actualizar los inputs de color
    document.getElementById('clockColor').value = savedClockColor;
    document.getElementById('bgColor').value = savedBgColor;
}

// Agregar funciones para cambiar y guardar colores
document.getElementById('clockColor').addEventListener('input', (e) => {
    const color = e.target.value;
    document.getElementById('clock').style.color = color;
    localStorage.setItem('clockColor', color);
});

document.getElementById('bgColor').addEventListener('input', (e) => {
    const color = e.target.value;
    document.body.style.backgroundColor = color;
    localStorage.setItem('bgColor', color);
});

// Cargar colores guardados al iniciar
loadSavedColors();

// Función para ajustar el color del ícono según el fondo
function updateIconColor() {
    const bgColor = getComputedStyle(document.body).backgroundColor;
    const rgb = bgColor.match(/\d+/g);
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    const iconColor = brightness > 128 ? '#000000' : '#ffffff';
    document.querySelector('.settings-icon path').style.fill = iconColor;
}

// Toggle del menú de controles
const settingsIcon = document.querySelector('.settings-icon');
const controls = document.querySelector('.controls');

settingsIcon.addEventListener('click', () => {
    const isVisible = controls.style.display === 'flex';
    controls.style.display = isVisible ? 'none' : 'flex';
    settingsIcon.classList.toggle('active');
});

// Actualizar color del ícono cuando cambie el fondo
document.getElementById('bgColor').addEventListener('input', (e) => {
    const color = e.target.value;
    document.body.style.backgroundColor = color;
    localStorage.setItem('bgColor', color);
    updateIconColor();
});

// Actualizar color del ícono al cargar
window.addEventListener('load', updateIconColor);