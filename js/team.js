const BASE_URL = "http://localhost:1337";

async function loadTeam() {

    try {

        const response = await fetch(`${BASE_URL}/api/teams?populate=*`);

        const result = await response.json();

        const container = document.getElementById("team-container");

        container.innerHTML = "";

        result.data.forEach(member => {

            let imageUrl =
                "https://via.placeholder.com/400x400?text=No+Image";

            if (
                member.Image &&
                member.Image.url
            ) {
                imageUrl = BASE_URL + member.Image.url;
            }

            container.innerHTML += `
                <div class="col-lg-3 col-md-6 wow fadeInUp">

                    <div class="team-item">

                        <div class="position-relative overflow-hidden">

                            <img
                                class="img-fluid"
                                src="${imageUrl}"
                                alt="${member.Teamname}"
                            >

                        </div>

                        <div class="bg-light text-center p-4">

                            <h5 class="fw-bold mb-0">
                                ${member.Teamname}
                            </h5>

                            <small>
                                ${member.Position}
                            </small>

                        </div>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error("Error loading team:", error);

    }

}

loadTeam();