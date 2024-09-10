const accordionTitles = document.querySelectorAll(".accordionTitle");

accordionTitles.forEach((accordionTitle) => {
  accordionTitle.addEventListener("click", () => {
    if (accordionTitle.classList.contains("is-open")) {
      //close accordion and rotate the arrow down
      accordionTitle.classList.remove("is-open");

      accordionTitle.querySelector(".arrow").classList.remove("rotate-up");
    } else {
      const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");

      accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
        //close accordion opened and rotate the arrow down
        accordionTitleWithIsOpen.classList.remove("is-open");
        accordionTitleWithIsOpen
          .querySelector(".arrow")
          .classList.remove("rotate-up");
      });

      accordionTitle.classList.add("is-open");

      //open accordion and rotate the arrow up
      accordionTitle.querySelector(".arrow").classList.add("rotate-up");
    }
  });
});

//Access volunteer svg to change width and height when matches desktop view

//Store current viewport width
const mediaQuery = window.matchMedia("(max-width: 479px)");

function handleMobileChange(e) {
  const svgElements = document.querySelectorAll(".volunteer-svg");

  if (e.matches) {
    // Media query matches (viewport width <= 479px)
    svgElements.forEach((svg) => {
      svg.setAttribute("width", "500");
      svg.setAttribute("height", "450");
    });
    console.log("Mobile!");
  } else {
    // Media query does not match (viewport width > 479px)
    svgElements.forEach((svg) => {
      svg.setAttribute("width", "800");
      svg.setAttribute("height", "600");
    });
    console.log("Desktop!");
  }
}

// Add event listener using addEventListener
mediaQuery.addEventListener("change", handleMobileChange);

// Perform an initial check of the media query state
handleMobileChange(mediaQuery);

// Remove or add a fade effect when scrolling the text on the service cards
const servicesProjectDiv = document.getElementById("services-project");
let elementDetected;
let getElementDetected;

function isReachedBottom(element) {
  return (
    element.scrollHeight - Math.round(element.scrollTop) <= element.clientHeight
  );
}

function checkIfScrollBottomWasReached(element) {
  if (isReachedBottom(element)) {
    element.classList.remove("gradient");
  } else {
    element.classList.add("gradient");
  }
}

function addScrollEventListener(scrollElement) {
  scrollElement.addEventListener("scroll", () => {
    checkIfScrollBottomWasReached(scrollElement);
  });
}

servicesProjectDiv.addEventListener("mouseover", (e) => {
  elementDetected = e.target.id;
  getElementDetected = document.getElementById(`${elementDetected}`);
  addScrollEventListener(getElementDetected);
});
