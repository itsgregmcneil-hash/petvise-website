// PetVise + Crisp (auto-start, no local UI)
//
// This version:
// - Removes local buttons and inputs
// - Immediately starts live chat for every visitor
// - Uses Crisp embedded chatbox inside your page

const CRISP_WEBSITE_ID = "17b789a4-81ae-47f3-8110-50c2306c5090";

function crispEmbedUrl(websiteId) {
  return `https://go.crisp.chat/chat/embed/?website_id=${encodeURIComponent(websiteId)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("petvise-crisp-iframe");
  if (!iframe) return;

  iframe.src = crispEmbedUrl(CRISP_WEBSITE_ID);
});
