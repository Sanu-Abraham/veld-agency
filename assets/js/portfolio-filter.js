// ================================
// VELD - PORTFOLIO FILTER JS
// ================================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active from all
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    portfolioItems.forEach(item => {
      if (filterValue === "all") {
        item.classList.remove("hide");
      } else {
        if (item.classList.contains(filterValue)) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      }
    });
  });
});