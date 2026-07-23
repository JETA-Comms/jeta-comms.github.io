const BASE_URL = "http://localhost:1337";

async function loadTest() {

    try {

        const response = await fetch(`${BASE_URL}/api/tests?populate=*`);

        const result = await response.json();

        const container = document.getElementById("test-container");

        container.innerHTML = "";

        result.data.forEach(member => {

            let imageUrl =
                "https://via.placeholder.com/400x400?text=No+Image";

            if (
                member.Photo &&
                member.Photo.url
            ) {
                imageUrl = BASE_URL + member.Photo.url;
            }

            container.innerHTML += `
                
            `;

        });

    } catch (error) {

        console.error("Error loading test:", error);

    }

}

loadTest();