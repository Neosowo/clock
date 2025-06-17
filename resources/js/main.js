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
    console.log('Script main.js cargado y DOMContentLoaded disparado.');
    const clockElement = document.getElementById('clock');
    const countdownTextElement = document.querySelector('.countdown-text');
    const paraleloInput = document.getElementById('paraleloInput');
    const startButton = document.getElementById('startButton');
    const infoTextElement = document.getElementById('infoText');
    const errorMessageElement = document.getElementById('errorMessage');
    const paraleloModal = document.getElementById('paraleloModal');

    console.log('Elemento paraleloModal:', paraleloModal);

    let countdownInterval;

    const franjasData = [
        // FRANCIA 1: 8h30-10h00
        { aula: 'A001', paralelo: 'ING35', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A002', paralelo: 'ING1', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A003', paralelo: 'ING2', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A004', paralelo: 'ING3', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A005', paralelo: 'ING4', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A006', paralelo: 'ING5', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A102', paralelo: 'ING6', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A103', paralelo: 'ING7', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A104', paralelo: 'ING8', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A105', paralelo: 'ING9', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A106', paralelo: 'ING38', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A107', paralelo: 'ING11', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A108', paralelo: 'ING12', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A110', paralelo: 'ING13', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A112', paralelo: 'ING22', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A201', paralelo: 'ING16', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A202', paralelo: 'ING17', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A203', paralelo: 'ING18', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A204', paralelo: 'ING19', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A205', paralelo: 'ING10', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A206', paralelo: 'ING20', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A207', paralelo: 'ING21', franja: 'FRANJA 1', time_end: '10:00' },
        { aula: 'A208', paralelo: 'ING14', franja: 'FRANJA 1', time_end: '10:00' },
        // FRANCIA 2: 11h00-12h30
        { aula: 'A001', paralelo: 'ING36', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A002', paralelo: 'EDC2', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A003', paralelo: 'ING37', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A004', paralelo: 'EDC7', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A005', paralelo: 'ING15', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A006', paralelo: 'EDC3', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A102', paralelo: 'EDC4', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A103', paralelo: 'ING32', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A104', paralelo: 'ING33', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A105', paralelo: 'EDC5', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A106', paralelo: 'EDC1', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A107', paralelo: 'EDC6', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A108', paralelo: 'ING23', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A110', paralelo: 'ING24', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A111', paralelo: 'ING34', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A112', paralelo: 'ING31', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A201', paralelo: 'ING39 (Apellidos A-L)', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A202', paralelo: 'ING39 (Apellidos M-Z)', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A203', paralelo: 'ING27', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A204', paralelo: 'ING28', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A205', paralelo: 'ING26', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A206', paralelo: 'ING29', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A207', paralelo: 'ING30', franja: 'FRANJA 2', time_end: '12:30' },
        { aula: 'A208', paralelo: 'ING25', franja: 'FRANJA 2', time_end: '12:30' },
    ];

    // Show the modal when the page loads
    paraleloModal.classList.add('show');
    console.log('Clase "show" añadida al modal.');

    startButton.addEventListener('click', () => {
        const inputParalelo = paraleloInput.value.trim();
        infoTextElement.style.display = 'none';
        errorMessageElement.style.display = 'none';

        if (!inputParalelo) {
            errorMessageElement.textContent = 'Por favor, ingresa un paralelo.';
            errorMessageElement.style.display = 'block';
            return;
        }

        const matchedFranja = franjasData.find(item => item.paralelo.toLowerCase() === inputParalelo.toLowerCase());

        if (matchedFranja) {
            paraleloModal.classList.remove('show'); // Hide the modal on success

            const now = new Date();
            const [hours, minutes] = matchedFranja.time_end.split(':').map(Number);
            const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

            // If the target time has already passed today, set it for tomorrow
            if (targetDate.getTime() < now.getTime()) {
                targetDate.setDate(targetDate.getDate() + 1);
            }

            infoTextElement.textContent = `Aula: ${matchedFranja.aula}, Franja: ${matchedFranja.franja}`;
            infoTextElement.style.display = 'block';

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
        } else {
            errorMessageElement.textContent = 'Paralelo no encontrado. Por favor, verifica tu entrada.';
            errorMessageElement.style.display = 'block';
        }
    });

    // Initial display of the clock (before countdown starts)
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Update current time display every second if no countdown is active
    setInterval(updateClock, 1000);
    updateClock(); // Call once immediately to avoid delay
});