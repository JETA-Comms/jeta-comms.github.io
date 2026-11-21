const SERVICE_GROUPS = [
    { field: "Training", containerId: "training-services" },
    { field: "BasicICTServices", containerId: "basic-ict-services" },
    { field: "ICTConsultancyServices", containerId: "ict-consultancy-services" }
];

async function loadServices() {
    const containers = SERVICE_GROUPS
        .map(group => ({ ...group, container: document.getElementById(group.containerId) }))
        .filter(group => group.container);
    if (!containers.length) return;

    try {
        const services = await fetchApiCollection("services");
        containers.forEach(({ field, container }) => {
            const values = [...new Set(services
                .map(service => String(service[field] ?? "").trim())
                .filter(Boolean))];

            container.innerHTML = values.length
                ? values.map(value => `<p>${escapeHtml(value)}</p>`).join("")
                : '<p class="text-muted">More services will be added soon.</p>';
        });
    } catch (error) {
        console.error("Error loading services:", error);
        containers.forEach(({ container }) => {
            container.innerHTML = '<p class="text-muted" role="status">Services are temporarily unavailable.</p>';
        });
    }
}

loadServices();
