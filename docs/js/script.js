function changeSVGColor(event) {
  var clickedElement = event.currentTarget;
  var className = clickedElement.parentNode.className;
  var bgColor = window.getComputedStyle(clickedElement).backgroundColor;
  var svgElement = document.querySelector(`path.${className}`);
  svgElement.style.fill = bgColor;
}

// Get all the unordered list elements on the page
var ulElements = document.querySelectorAll('ul');

// Iterate over each unordered list element
ulElements.forEach(function (ulElement) {
  // Get all the list item elements within the unordered list
  var liElements = ulElement.querySelectorAll('li');

  // Iterate over each list item element and add the click event listener
  liElements.forEach(function (liElement) {
    liElement.addEventListener('click', changeSVGColor);
  });
});

function updateThemeButtonLabel() {
  const button = document.querySelector(".toggle-button");
  if (!button) return;
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");

  button.classList.remove("theme-light", "theme-dark", "theme-system");

  switch (currentTheme) {
    case "light":
      button.classList.add("theme-light");
      button.setAttribute("aria-label", "Light theme");
      break;

    case "dark":
      button.classList.add("theme-dark");
      button.setAttribute("aria-label", "Dark theme");
      break;

    default:
      button.classList.add("theme-system");
      button.setAttribute("aria-label", "System theme");
      break;
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');

  switch (currentTheme) {
    case 'light':
      html.setAttribute('data-theme', 'dark');
      break;

    case 'dark':
      html.removeAttribute('data-theme'); // Use system preference
      break;

    default:
      html.setAttribute('data-theme', 'light');
      break;
  }

  updateThemeButtonLabel();
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".toggle-button");
  if (button) {
    button.addEventListener("click", toggleTheme);
    updateThemeButtonLabel();
  }
});