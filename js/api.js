const API_BASE_URL = "http://localhost:1337";
const API_URL = `${API_BASE_URL}/api`;
const FALLBACK_IMAGE = "https://via.placeholder.com/800x500?text=JETA";

function normalizeApiItem(item) {
    return item?.attributes ? { id: item.id, ...item.attributes } : item;
}

function getApiImageUrl(image) {
    const media = Array.isArray(image) ? image[0] : image;
    const file = media?.data || media;
    const attributes = file?.attributes || file;
    const url = attributes?.formats?.medium?.url || attributes?.formats?.small?.url || attributes?.url;

    if (!url) return FALLBACK_IMAGE;
    if (/^https?:\/\//i.test(url)) return url;
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

async function fetchApiCollection(endpoint, { pageSize = 100 } = {}) {
    const separator = endpoint.includes("?") ? "&" : "?";
    const items = [];
    let page = 1;
    let pageCount = 1;

    do {
        const response = await fetch(`${API_URL}/${endpoint}${separator}populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
        if (!response.ok) throw new Error(`API request failed (${response.status})`);

        const result = await response.json();
        if (!Array.isArray(result.data)) throw new Error("The API returned an invalid collection.");
        items.push(...result.data.map(normalizeApiItem));
        pageCount = result.meta?.pagination?.pageCount || 1;
        page += 1;
    } while (page <= pageCount);

    return items;
}

function showApiMessage(container, message) {
    container.innerHTML = `<div class="col-12"><p class="text-center text-muted" role="status">${escapeHtml(message)}</p></div>`;
}
