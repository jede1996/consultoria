particlesJS("particles-js",
    {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00c8ff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 180,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    }
);

// --- 2. Funcionalidad de Cambio de Modo Oscuro/Claro (Funcionando con Bootstrap 5.3 data-bs-theme) ---
const themeToggleButton = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggleButton.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-bs-theme', newTheme);
});

// --- 3. Manejo de Formularios (POST a path genérico y Notificaciones) ---

// Función para mostrar notificación personalizada (estilo oscuro)
function showCustomNotification(message, isSuccess = true) {
    const container = document.getElementById('notification-container');
    const alertType = isSuccess ? 'alert-success' : 'alert-danger';
    const icon = isSuccess ? '✅' : '❌';
    const alertHtml = `
                <div class="alert ${alertType} alert-dismissible fade show glass-card" role="alert">
                    ${icon} ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
    container.insertAdjacentHTML('beforeend', alertHtml);
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        const alert = container.querySelector('.alert');
        if (alert) new bootstrap.Alert(alert).close();
    }, 5000);
}

// Manejador de envío para ambos formularios (usando fetch para simular POST)
const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formId = event.target.id;
    // Simulamos el envío a un path genérico "/api/contact"
    console.log(`Enviando datos del formulario ${formId} a /api/contact`);

    try {
        // Simulación de una llamada POST exitosa
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(new FormData(event.target))),
        });

        if (response.ok || response.status === 404) { // Asumimos que 404 es esperado si el path no existe
            showCustomNotification('¡Datos enviados con éxito! Pronto nos pondremos en contacto.', true);
            // Ocultar modal después del envío (requiere Bootstrap JS)
            const modalId = formId === 'formBasico' ? '#modalBasico' : '#modalCompleto';
            const modalInstance = bootstrap.Modal.getInstance(document.querySelector(modalId));
            if (modalInstance) modalInstance.hide();
            event.target.reset(); // Resetear formulario
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        showCustomNotification('Hubo un error al enviar los datos. Inténtalo de nuevo.', false);
    }
};

document.getElementById('formBasico').addEventListener('submit', handleFormSubmit);
document.getElementById('formCompleto').addEventListener('submit', handleFormSubmit);