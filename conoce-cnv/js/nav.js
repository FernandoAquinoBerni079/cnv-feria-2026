
        // ==========================================
        // 1. SISTEMA DE CONTROL DE PESTAÑAS Y NAVEGACIÓN
        // ==========================================
        function switchTab(tabId) {
            // Actuar solo cuando la pestaña existe; no ocultar el contenido por error.
            const targetPanel = document.getElementById(tabId);
            if (!targetPanel || !targetPanel.classList.contains('tab-panel')) return;

            // Ocultar todos los paneles
            const panels = document.querySelectorAll('.tab-panel');
            panels.forEach(panel => panel.classList.remove('active'));

            // Desactivar botones de navegación escritorio
            const navBtns = document.querySelectorAll('.nav-btn');
            navBtns.forEach(btn => btn.classList.remove('active'));

            // Activar el panel seleccionado.
            targetPanel.classList.add('active');

            // Mantener visible el menú de accesos y destacar la sección elegida.
            document.querySelectorAll('.access-grid button[data-tab]').forEach(btn => {
                const selected = btn.dataset.tab === tabId;
                btn.classList.toggle('active', selected);
                if (selected) btn.setAttribute('aria-current', 'page');
                else btn.removeAttribute('aria-current');
            });

            // Marcar botón activo en escritorio
            const activeNavBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
            if (activeNavBtn) {
                activeNavBtn.classList.add('active');
            }

            // Cerrar menú móvil si está abierto
            const drawer = document.getElementById('mobile-drawer');
            if (drawer && drawer.classList.contains('open')) {
                drawer.classList.remove('open');
                document.getElementById('mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
            }

            // Scroll suave hacia arriba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Toggle del Menú Hamburguesa Móvil
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileDrawer = document.getElementById('mobile-drawer');

        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
        });

// Abrir directamente una sección desde otras páginas del sitio.
document.addEventListener("DOMContentLoaded", () => {
 const target = decodeURIComponent(location.hash.slice(1));
 if(target && document.getElementById(target)) switchTab(target);
});
