// Función principal del temporizador
function updateCountdown() {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(11, 0, 0, 0); // 11:00 AM

    // Si ya pasó la hora objetivo, mostrar 00:00:00
    if (now > targetTime) {
        document.getElementById('clock').textContent = '00:00:00';
        return;
    }

    const diff = targetTime - now;
    
    // Calcular horas, minutos y segundos
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Formatear el tiempo con ceros a la izquierda
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Actualizar el reloj
    document.getElementById('clock').textContent = 
        `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Actualizar inmediatamente al cargar

// Controles de color
const clockColor = document.getElementById('clockColor');
const bgColor = document.getElementById('bgColor');

clockColor.addEventListener('input', (e) => {
    document.getElementById('clock').style.color = e.target.value;
});

bgColor.addEventListener('input', (e) => {
    document.body.style.backgroundColor = e.target.value;
});

/* Código comentado del engranaje y otras funcionalidades
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
}

// Función para cargar los colores guardados
function loadSavedColors() {
    const savedClockColor = localStorage.getItem('clockColor') || ' #fcca52 ';
    const savedBgColor = localStorage.getItem('bgColor') || '#13131b';

    // Aplicar colores guardados
    document.getElementById('clock').style.color = savedClockColor;
    document.body.style.backgroundColor = savedBgColor;
    
    // Actualizar los inputs de color
    document.getElementById('clockColor').value = savedClockColor;
    document.getElementById('bgColor').value = savedBgColor;
}

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

// Sistema de auto-ocultamiento
let inactivityTimer;
let isHidden = false;

function hideControls() {
    if (!isHidden) {
        isHidden = true;
        formatToggle.style.opacity = '0.1';
        settingsIcon.style.opacity = '0.1';
        if (controls.style.display === 'flex') {
            controls.style.opacity = '0.1';
        }
    }
}

function showControls() {
    if (isHidden) {
        isHidden = false;
        formatToggle.style.opacity = '1';
        settingsIcon.style.opacity = '1';
        if (controls.style.display === 'flex') {
            controls.style.opacity = '1';
        }
    }
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    showControls();
    inactivityTimer = setTimeout(hideControls, 5000); // 5 segundos
}

// Eventos para detectar actividad
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('mousedown', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('touchstart', resetInactivityTimer);
document.addEventListener('touchmove', resetInactivityTimer);

// Iniciar el timer
resetInactivityTimer();

// Añadir transiciones suaves en CSS
formatToggle.style.transition = 'opacity 0.3s ease';
settingsIcon.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
controls.style.transition = 'opacity 0.3s ease';
*/

document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('clock');
    const countdownTextElement = document.querySelector('.countdown-text');

    let countdownInterval;

    function startCountdown() {
        const now = new Date();
        const targetDate = new Date();
        targetDate.setHours(11, 0, 0, 0); // Set target to 11:00 AM

        // If the target time has already passed today, set it for tomorrow
        if (targetDate.getTime() < now.getTime()) {
            targetDate.setDate(targetDate.getDate() + 1);
        }

        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeLeft = targetDate.getTime() - currentTime;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                clockElement.textContent = '00:00:00';
                countdownTextElement.textContent = '¡Tiempo terminado!';
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Format for display (add days if > 0)
            let timeString = '';
            if (days > 0) {
                timeString += `${days.toString().padStart(2, '0')}:`;
            }
            timeString += `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            clockElement.textContent = timeString;
        }, 1000);
    }

    startCountdown(); // Start the countdown immediately on page load
});