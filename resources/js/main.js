// Función principal del temporizador
function updateCountdown() {
    const now = new Date();
    // Initial target time (default to 11:00 AM if no parallel is set)
    let targetHour = 11;
    let targetMinute = 0;

    const savedParallel = localStorage.getItem('selectedParallel');
    if (savedParallel) {
        const schedule = {
            'A': { targetHour: 10, targetMinute: 0 }, // Assuming 10:00 for FRNJA 1 for A
            'B': { targetHour: 12, targetMinute: 30 }, // Assuming 12:30 for FRNJA 2 for B
            'C': { targetHour: 10, targetMinute: 0 }, // Assuming 10:00 for FRNJA 1 for C
            'D': { targetHour: 12, targetMinute: 30 }, // Assuming 12:30 for FRNJA 2 for D
            // Add more parallels as needed based on the image provided
        };

        const parallelData = schedule[savedParallel.toUpperCase()];
        if (parallelData) {
            targetHour = parallelData.targetHour;
            targetMinute = parallelData.targetMinute;
        }
    }

    const targetTime = new Date();
    targetTime.setHours(targetHour, targetMinute, 0, 0); 

    // If target time has passed for today, set it for tomorrow
    if (now.getTime() > targetTime.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const diff = targetTime - now;
    
    // If countdown finishes, display 00:00:00 and clear interval
    if (diff <= 0) {
        document.getElementById('clock').textContent = '00:00:00';
        clearInterval(window.countdownInterval);
        return;
    }

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

// Update every second
window.countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Update immediately on load

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
    const configButton = document.getElementById('configButton');
    const configModal = document.getElementById('configModal');
    const closeButton = document.querySelector('.close-button');
    const parallelInput = document.getElementById('parallelInput');
    const saveParallelBtn = document.getElementById('saveParallelBtn');
    const infoMessage = document.getElementById('infoMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Function to show modal
    function showModal() {
        configModal.style.display = 'flex';
        setTimeout(() => configModal.classList.add('show'), 10);
    }

    // Function to hide modal
    function hideModal() {
        configModal.classList.remove('show');
        setTimeout(() => configModal.style.display = 'none', 300);
        errorMessage.style.display = 'none';
        infoMessage.style.display = 'none';
    }

    // Event listeners for modal
    if (configButton) {
        configButton.addEventListener('click', showModal);
    }
    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    // Handle saving parallel
    if (saveParallelBtn) {
        saveParallelBtn.addEventListener('click', () => {
            const parallel = parallelInput.value.trim().toUpperCase();
            const schedule = {
                'A': { targetHour: 10, targetMinute: 0 }, 
                'B': { targetHour: 12, targetMinute: 30 }, 
                'C': { targetHour: 10, targetMinute: 0 }, 
                'D': { targetHour: 12, targetMinute: 30 }, 
            };

            if (schedule[parallel]) {
                localStorage.setItem('selectedParallel', parallel);
                infoMessage.textContent = `Horario configurado para el paralelo ${parallel}.`;
                infoMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                updateCountdown(); // Update countdown with new parallel
                setTimeout(hideModal, 1500); // Hide modal after a short delay
            } else {
                errorMessage.textContent = 'Paralelo no encontrado. Inténtalo de nuevo.';
                errorMessage.style.display = 'block';
                infoMessage.style.display = 'none';
            }
        });
    }

    // Load saved parallel on page load and update countdown text
    const savedParallel = localStorage.getItem('selectedParallel');
    if (savedParallel) {
        const schedule = {
            'A': { targetHour: 10, targetMinute: 0 }, 
            'B': { targetHour: 12, targetMinute: 30 }, 
            'C': { targetHour: 10, targetMinute: 0 }, 
            'D': { targetHour: 12, targetMinute: 30 }, 
        };
        const parallelData = schedule[savedParallel.toUpperCase()];
        if (parallelData) {
            document.querySelector('.countdown-text').textContent = `la lg me detona en: ${savedParallel.toUpperCase()}`; 
        }
    }
    updateCountdown();
});