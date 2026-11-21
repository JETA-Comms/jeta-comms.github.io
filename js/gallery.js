const GALLERY_PROJECT_IMAGES = {
    "BANK APPLICATION": "https://res.cloudinary.com/dwxkypnxa/image/upload/v1721755131/CFWD1_idlzdg.png",
    "FRONTEND WEBSITE DESIGN": "https://res.cloudinary.com/dwxkypnxa/image/upload/v1721755176/obazele-success-project_dh3nx5.png",
    "VIRTUAL PET HAMSTER": "https://res.cloudinary.com/dwxkypnxa/image/upload/v1721755174/SCRATCH_jygepy.jpg"
};

function richTextToParagraphs(value) {
    if (!Array.isArray(value)) {
        const text = String(value ?? "").trim();
        return text ? `<p>${escapeHtml(text)}</p>` : "";
    }

    return value.map(block => {
        const text = (block.children || [])
            .map(child => child.text || "")
            .join("")
            .trim();
        return text ? `<p>${escapeHtml(text)}</p>` : "";
    }).join("");
}

async function loadGallery() {
    const container = document.getElementById("gallery-container");
    if (!container) return;

    try {
        const projects = await fetchApiCollection("galleries");
        if (!projects.length) return showApiMessage(container, "Gallery projects will be added soon.");

        container.innerHTML = projects.map((project, index) => {
            const title = project.ProjectName || project.Title || project.title || "JETA Project";
            const author = project.ProjectBy || "";
            const course = project.Course || "";
            const description = richTextToParagraphs(project.Description);
            const functionality = richTextToParagraphs(project.Functionality);
            const image = project.Photo || project.Image;
            const fallbackImage = GALLERY_PROJECT_IMAGES[title.trim().toUpperCase()];
            const imageUrl = image ? getApiImageUrl(image) : (fallbackImage || FALLBACK_IMAGE);
            const cardClass = index % 2 === 0 ? "cards-reverse" : "cards";
            const year = project.Year || project.year || "";

            return `<article class="${cardClass} gallery-card"${year ? ` data-year="${escapeHtml(year)}"` : ""}>
                <div class="cardp">
                    <p>PROJECT NAME: ${escapeHtml(title)}</p>
                    ${author ? `<p>PROJECT BY: ${escapeHtml(author)}</p>` : ""}
                    ${course ? `<p>COURSE: ${escapeHtml(course)}</p>` : ""}
                    ${description ? `<h5><strong>DESCRIPTION:</strong></h5>${description}` : ""}
                    ${functionality ? `<h5><strong>Functionality:</strong></h5>${functionality}` : ""}
                </div>
                <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}" loading="lazy">
            </article>`;
        }).join("");
    } catch (error) {
        console.error("Error loading gallery:", error);
        showApiMessage(container, "Gallery projects are temporarily unavailable.");
    }
}

loadGallery();
