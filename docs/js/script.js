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

function getSwatchData(swatch) {
  return {
    swatchVar: swatch.style.getPropertyValue("--swatch").trim(),
    tooltip: swatch.getAttribute("data-tooltip") || ""
  };
}

function applySwatchData(targetSwatch, swatchData) {
  targetSwatch.style.setProperty("--swatch", swatchData.swatchVar);
  targetSwatch.setAttribute("data-tooltip", swatchData.tooltip);
}

function copySwatchDataToClipboard(swatchData) {
  if (!navigator.clipboard || !navigator.clipboard.writeText) return;

  const text = `--swatch: ${swatchData.swatchVar}\ndata-tooltip: ${swatchData.tooltip}`;
  navigator.clipboard.writeText(text).catch(() => {
    // Ignore clipboard failures (for example, insecure context).
  });
}

function initializeSchemeBuilder() {
  const sourceSwatches = document.querySelectorAll(".colour-chart .colour-swatch");
  const targetSwatches = document.querySelectorAll(".colour-scheme .colour-swatch");
  const statusText = document.querySelector(".scheme-status");

  if (!sourceSwatches.length || !targetSwatches.length) return;

  let selectedSourceSwatch = null;
  let selectedSourceData = null;

  sourceSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      if (selectedSourceSwatch) {
        selectedSourceSwatch.classList.remove("is-selected-source");
      }

      selectedSourceSwatch = swatch;
      selectedSourceData = getSwatchData(swatch);
      selectedSourceSwatch.classList.add("is-selected-source");

      copySwatchDataToClipboard(selectedSourceData);

      if (statusText) {
        statusText.textContent = `Selected ${selectedSourceData.tooltip}. Click a swatch above to apply it.`;
      }
    });
  });

  targetSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      if (!selectedSourceData) {
        if (statusText) {
          statusText.textContent = "Pick a colour below first, then click a swatch above.";
        }
        return;
      }

      applySwatchData(swatch, selectedSourceData);
      copySwatchDataToClipboard(selectedSourceData);

      if (statusText) {
        statusText.textContent = `Applied ${selectedSourceData.tooltip} to this scheme swatch.`;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".toggle-button");
  if (button) {
    button.addEventListener("click", toggleTheme);
    updateThemeButtonLabel();
  }

  initializeSchemeBuilder();
});