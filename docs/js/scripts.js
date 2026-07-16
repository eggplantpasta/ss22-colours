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
ulElements.forEach(function(ulElement) {
  // Get all the list item elements within the unordered list
  var liElements = ulElement.querySelectorAll('li');

  // Iterate over each list item element and add the click event listener
  liElements.forEach(function(liElement) {
    liElement.addEventListener('click', changeSVGColor);
  });
});