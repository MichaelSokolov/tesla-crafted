document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".tesla-referral-banner");
  const footer = document.querySelector("footer");

  if (!banner || !footer) return;

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight && rect.bottom >= 0;
  }

  // Check if we're on the home page
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html" ||
    window.location.pathname.endsWith("/");

  // Function to handle scroll events
  function handleScroll() {
    if (isInViewport(footer)) {
      // Switch to footer-sticky when footer is visible
      banner.classList.add("footer-sticky");
      banner.classList.remove("sticky");
    } else {
      // Keep banner fixed at bottom otherwise
      banner.classList.remove("footer-sticky");
      banner.classList.add("sticky");
    }
  }

  if (isHomePage) {
    // On home page, position banner above footer
    banner.classList.remove("sticky");
    banner.classList.remove("footer-sticky");
    banner.classList.add("home-banner");
    banner.style.display = "block";
    // Position the banner before the footer
    footer.parentNode.insertBefore(banner, footer);
  } else {
    // For non-home pages, implement sticky behavior
    window.addEventListener("scroll", handleScroll);
    banner.classList.add("sticky");
    handleScroll();
  }

  // Override the existing handleStickyBanner function if it exists
  if (typeof window.handleStickyBanner === "function") {
    window.handleStickyBanner = function () {
      if (!isHomePage) {
        handleScroll();
      }
    };
  }
});
