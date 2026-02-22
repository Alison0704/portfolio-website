async function includeHTML(container = document) {
  const elements = container.querySelectorAll("[data-include]");
  for (const el of elements) {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (response.ok) {
        el.innerHTML = await response.text();
        el.removeAttribute("data-include");
        await includeHTML(el); // Process nested includes
      }
    } catch (err) {
      console.error(`Error loading ${file}:`, err);
    }
  }
}
document.addEventListener("DOMContentLoaded", () => includeHTML());
