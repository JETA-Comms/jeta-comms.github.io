async function loadGallery() {
    const container = document.getElementById("gallery-container");
    if (!container) return;

    try {
        const projects = await fetchApiCollection("gallerys");
        if (!projects.length) return showApiMessage(container, "Gallery projects will be added soon.");

        container.innerHTML = projects.map(project => {
            const title = project.Title || project.title || project.ProjectName || project.Name || "JETA Project";
            const author = project.ProjectBy || project.Author || project.Student || "";
            const course = project.Course || "";
            const description = project.Description || project.description || "";
            return `<article class="gallery-card">
                <img src="${escapeHtml(getApiImageUrl(project.Photo || project.Image))}" alt="${escapeHtml(title)}" loading="lazy">
                <div class="gallery-card-content">
                    <h2>${escapeHtml(title)}</h2>
                    ${author ? `<p><strong>Project by:</strong> ${escapeHtml(author)}</p>` : ""}
                    ${course ? `<p><strong>Course:</strong> ${escapeHtml(course)}</p>` : ""}
                    ${description ? `<p>${escapeHtml(description)}</p>` : ""}
                </div>
            </article>`;
        }).join("");
    } catch (error) {
        console.error("Error loading gallery:", error);
        showApiMessage(container, "Gallery projects are temporarily unavailable.");
    }
}

loadGallery();
