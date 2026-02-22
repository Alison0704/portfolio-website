function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.addEventListener("DOMContentLoaded", async function () {
  await includeHTML(); // Wait for all HTML to be included first

  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  const projectSearch = document.getElementById("projectSearch");
  const projectCards = document.querySelectorAll(".project-card");
  const projectFilterButtons = document.querySelectorAll(".project-filter");
  let activeTagFilter = "";

  function revealSite() {
    loader.classList.add("hidden");
    content.classList.add("visible");
  }

  function applyProjectFilters() {
    const searchValue = projectSearch
      ? projectSearch.value.trim().toLowerCase()
      : "";

    projectCards.forEach(function (card) {
      const cardContainer = card.closest(".col-md-6");
      if (!cardContainer) {
        return;
      }

      const cardText = card.textContent.toLowerCase();
      const cardTag = cardContainer.dataset.projectTag || "";
      const matchesSearch = cardText.includes(searchValue);
      const matchesTag = !activeTagFilter || cardTag === activeTagFilter;

      cardContainer.style.display = matchesSearch && matchesTag ? "" : "none";
    });
  }

  if (projectSearch && projectCards.length > 0) {
    projectSearch.addEventListener("input", applyProjectFilters);
  }

  if (projectFilterButtons.length > 0 && projectCards.length > 0) {
    projectFilterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const selectedTag = button.dataset.filter || "";

        activeTagFilter = activeTagFilter === selectedTag ? "" : selectedTag;

        projectFilterButtons.forEach(function (filterButton) {
          const isActive = filterButton.dataset.filter === activeTagFilter;
          filterButton.classList.toggle("btn-primary", isActive);
          filterButton.classList.toggle("btn-outline-primary", !isActive);
        });

        applyProjectFilters();
      });
    });
  }

  setTimeout(revealSite, 1500);
});

async function includeHTML(container = document) {
  const elements = container.querySelectorAll("[data-include]");
  for (const el of elements) {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (response.ok) {
        el.innerHTML = await response.text();
        el.removeAttribute("data-include"); // Clean up
        await includeHTML(el); // Process nested includes
      }
    } catch (err) {
      console.error(`Error loading ${file}:`, err);
    }
  }
}
