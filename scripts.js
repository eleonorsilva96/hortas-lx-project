//open the clicked accordion and close all opened accordions
const allAccordionTitles = document.querySelectorAll(".accordionTitle");

allAccordionTitles.forEach((accordionTitle) => {
  accordionTitle.addEventListener("click", () => {
    if (accordionTitle.classList.contains("is-open")) {
      
      accordionTitle.classList.remove("is-open");
      
      //rotate the arrow down
      accordionTitle.querySelector(".arrow").classList.remove("rotate-up");
      
    } else {
      const accordionTitlesOpened = document.querySelectorAll(".is-open");

      accordionTitlesOpened.forEach((accordionTitleOpen) => {
        accordionTitleOpen.classList.remove("is-open");
        accordionTitleOpen.querySelector(".arrow").classList.remove("rotate-up");
      });
      
      accordionTitle.classList.add("is-open");

      //rotate the arrow up
      accordionTitle.querySelector(".arrow").classList.add("rotate-up");
       
    }
  });
});

//Resize volunteer's illustration between different devices
//Remove or add the arrows on the team slider or news slider between different devices
const mediaQuery = window.matchMedia("(max-width: 479px)");
const svgElements = document.querySelectorAll(".volunteer-svg");
const splideSlider = document.querySelectorAll(".splide-slider");
const testimonialsSlider = document.getElementById("testimonials-carousel");

function updateSVG(e) {
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

function addSplideCarousel() {
  new Splide("#logos-carousel", {
    type: "loop",
    pagination: false,
    focus: "center",
    arrows: false,
    autoScroll: {
      speed: 2.5,
      pauseOnHover: false,
    },
    drag: false,
  }).mount(window.splide.Extensions); //for the autoScroll plugin to work
}

function addSplideSlider() {
  splideSlider.forEach((slider) => {
      new Splide(slider, {
        mediaQuery:'min',
        breakpoints: {
          0: {
            arrows: false,
            drag: slider.getAttribute("id") === "testimonials-carousel" ? false : true,
          },
          576: {
            arrows: false,
            drag: slider.getAttribute("id") === "testimonials-carousel" ? false : true,
          },
          768: {
            arrows: false,
            drag: slider.getAttribute("id") === "testimonials-carousel" ? false : true,
          },
          991: {
            arrows: slider.getAttribute("id") === "testimonials-carousel" ? false : true,
            drag: false
          },
        }
        
      }).mount();
    }
  );
}

function handleMobileChange(e) {
  updateSVG(e);
}

// When the device resolution changes between mobile and desktop, adjust the size of the volunteer's illustration
mediaQuery.addEventListener("change", handleMobileChange);

// Initial check to check whether the device is in mobile or desktop mode 
handleMobileChange(mediaQuery);

document.addEventListener(
  "DOMContentLoaded",
  addSplideCarousel
);

document.addEventListener(
  "DOMContentLoaded",
  addSplideSlider
);


// Remove or add a fade effect when scrolling the text on the service cards
const servicesProjectDiv = document.getElementById("services-project");
const boxAcreditar = document.getElementById("box-acreditar-text");
const boxAgir = document.getElementById("box-agir-text");
const boxEvoluir = document.getElementById("box-evoluir-text");
const boxGerminar = document.getElementById("box-germinar-text");

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

function checkWhichBoxIs(box) {
  let classList = Array.from(box);
  filterClassList = classList.filter((className) => {
    switch (className) {
      case "box-acreditar":
        addScrollEventListener(boxAcreditar);
        break;
      case "box-agir":
        addScrollEventListener(boxAgir);
        break;
      case "box-evoluir":
        addScrollEventListener(boxEvoluir);
        break;
      case "box-germinar":
        addScrollEventListener(boxGerminar);
        break;
    }
  });
}

servicesProjectDiv.addEventListener("mouseover", (e) => {
  checkWhichBoxIs(e.target.classList);
});
