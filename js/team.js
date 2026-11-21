async function loadTeam() {
    const containers = [...document.querySelectorAll("[data-team-list]")];
    if (!containers.length) return;

    try {
        const members = await fetchApiCollection("teams");
        containers.forEach(container => {
            const featuredOrder = ["joy", "oluwagbenga", "blessing", "oluwabukola"];
            const visibleMembers = container.dataset.teamFeatured === "true"
                ? featuredOrder
                    .map(keyword => members.find(member =>
                        String(member.Teamname || member.Name || member.name || "")
                            .trim()
                            .toLowerCase()
                            .includes(keyword)
                    ))
                    .filter(Boolean)
                : members;
            if (!visibleMembers.length) {
                showApiMessage(container, "Team members will be added soon.");
                return;
            }

            container.innerHTML = visibleMembers.map(member => {
                const name = member.Teamname || member.Name || member.name || "JETA Team Member";
                const role = member.Position || member.position || member.Role || member.role || "";
                return `<div class="col-6 col-md-4 col-lg-3 wow fadeInUp">
                    <div class="team-item h-100">
                        <div class="team-image"><img src="${escapeHtml(getApiImageUrl(member.Image || member.Photo))}" alt="${escapeHtml(name)}" loading="lazy"></div>
                        <div class="bg-light text-center p-3 team-info">
                            <h5 class="fw-bold mb-2">${escapeHtml(name)}</h5>
                            <small>${escapeHtml(role)}</small>
                        </div>
                    </div>
                </div>`;
            }).join("");
        });
    } catch (error) {
        console.error("Error loading team:", error);
        containers.forEach(container => showApiMessage(container, "Team information is temporarily unavailable."));
    }
}

loadTeam();
