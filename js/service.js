async function loadServices() {
    const container = document.getElementById("service-container");
    if (!container) return;

    try {
        const services = await fetchApiCollection("services");
        if (!services.length) return showApiMessage(container, "Services will be added soon.");

        container.innerHTML = services.map(service => {
            const title = service.Title || service.Name || service.ServiceName || service.title || "JETA Service";
            const description = service.Description || service.description || "";
            return `<article class="col-md-6 col-lg-4">
                <div class="service-card h-100">
                    <img src="${escapeHtml(getApiImageUrl(service.Photo || service.Image))}" alt="${escapeHtml(title)}" loading="lazy">
                    <div class="p-4">
                        <h3 class="h5 fw-bold">${escapeHtml(title)}</h3>
                        ${description ? `<p class="mb-0">${escapeHtml(description)}</p>` : ""}
                    </div>
                </div>
            </article>`;
        }).join("");
    } catch (error) {
        console.error("Error loading services:", error);
        showApiMessage(container, "Services are temporarily unavailable.");
    }
}

loadServices();
