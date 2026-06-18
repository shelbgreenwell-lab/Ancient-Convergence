let entries = [];
let activeFilter = "All";

async function loadEntries() {
  const response = await fetch("Data/Timeline.json");
  entries = await response.json();
  render();
}

function render() {
  const timeline = document.getElementById("timeline");
  const search = document.getElementById("search").value.toLowerCase();

  timeline.innerHTML = "";

  entries
    .filter(entry => activeFilter === "All" || entry.category === activeFilter)
    .filter(entry =>
      entry.title.toLowerCase().includes(search) ||
      entry.summary.toLowerCase().includes(search) ||
      entry.category.toLowerCase().includes(search)
    )
    .forEach((entry, index) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${entry.title}</h2>
        <div class="meta">${entry.date} &bull; ${entry.category}</div>
        <div class="summary">${entry.summary}</div>
        <button onclick="toggleDetails(${index})">Read More</button>
        <div class="details" id="details-${index}">
          <p><strong>Key Figures:</strong> ${entry.figures.join(", ")}</p>
          <p><strong>Related Texts / Themes:</strong></p>
          ${entry.related.map(item => `<span class="tag">${item}</span>`).join("")}
          <p><strong>Confidence:</strong> ${entry.confidence}</p>
        </div>
      `;

      timeline.appendChild(card);
    });
}

function setFilter(filter, btn) {
  activeFilter = filter;
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  render();
}

function toggleDetails(index) {
  document.getElementById(`details-${index}`).classList.toggle("open");
}

document.getElementById("search").addEventListener("input", render);

loadEntries();
