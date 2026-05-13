document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Toggle for Mobile
    const openSidebar = document.getElementById("open-sidebar");
    const closeSidebar = document.getElementById("close-sidebar");
    const sidebar = document.getElementById("sidebar");

    if (openSidebar && sidebar) {
        openSidebar.addEventListener("click", () => {
            sidebar.classList.add("active");
        });
    }

    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    }

    // Initialize Charts if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#0f62fe';
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim() || '#00e676';
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#9ca3af';
        const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim() || '#e0e5eb';

        Chart.defaults.color = textColor;
        Chart.defaults.font.family = "'Inter', sans-serif";

        // Volume Chart
        const volCtx = document.getElementById('volumeChart');
        if (volCtx) {
            new Chart(volCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Requests',
                        data: [120, 190, 150, 220],
                        borderColor: primaryColor,
                        backgroundColor: 'rgba(15, 98, 254, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false, color: borderColor } },
                        y: { grid: { color: borderColor }, beginAtZero: true }
                    }
                }
            });
        }

        // Type Chart
        const typeCtx = document.getElementById('typeChart');
        if (typeCtx) {
            new Chart(typeCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Access', 'Erasure', 'Portability', 'Rectification'],
                    datasets: [{
                        data: [45, 30, 15, 10],
                        backgroundColor: [
                            primaryColor,
                            secondaryColor,
                            '#f59e0b',
                            '#8b5cf6'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }
    }
});
