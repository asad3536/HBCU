/**
 * JS Main File
 */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  
  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector("#header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("sticked");
        if (nextElement) nextElement.classList.add("sticked-header-offset");
      } else {
        selectHeader.classList.remove("sticked");
        if (nextElement) nextElement.classList.remove("sticked-header-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    document.addEventListener("scroll", headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll("#navbar a");

  function navbarlinksActive() {
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector(".mobile-nav-show");
  const mobileNavHide = document.querySelector(".mobile-nav-hide");

  document.querySelectorAll(".mobile-nav-toggle").forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navbar a").forEach((navbarlink) => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

  navDropdowns.forEach((el) => {
    el.addEventListener("click", function (event) {
      if (document.querySelector(".mobile-nav-active")) {
        event.preventDefault();
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("dropdown-active");

        let dropDownIndicator = this.querySelector(".dropdown-indicator");
        dropDownIndicator.classList.toggle("bi-chevron-up");
        dropDownIndicator.classList.toggle("bi-chevron-down");
      }
    });
  });


  //DOM elements
  const DOMstrings = {
    stepsBtnClass: "multisteps-form__progress-btn",
    stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
    stepsBar: document.querySelector(".multisteps-form__progress"),
    stepsForm: document.querySelector(".multisteps-form__form"),
    stepsFormTextareas: document.querySelectorAll(".multisteps-form__textarea"),
    stepFormPanelClass: "multisteps-form__panel",
    stepFormPanels: document.querySelectorAll(".multisteps-form__panel"),
    stepPrevBtnClass: "js-btn-prev",
    stepNextBtnClass: "js-btn-next",
  }; //remove class from a set of items

  const removeClasses = (elemSet, className) => {
    elemSet.forEach((elem) => {
      elem.classList.remove(className);
    });
  }; //return exect parent node of the element

  const findParent = (elem, parentClass) => {
    let currentNode = elem;

    while (!currentNode.classList.contains(parentClass)) {
      currentNode = currentNode.parentNode;
    }

    return currentNode;
  }; //get active button step number

  const getActiveStep = (elem) => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
  }; //set all steps before clicked (and clicked too) to active

  const setActiveStep = (activeStepNum) => {
    //remove active state from all the state
    removeClasses(DOMstrings.stepsBtns, "js-active"); //set picked items to active

    DOMstrings.stepsBtns.forEach((elem, index) => {
      if (index <= activeStepNum) {
        elem.classList.add("js-active");
      }
    });
  }; //get active panel

  const getActivePanel = () => {
    let activePanel;
    DOMstrings.stepFormPanels.forEach((elem) => {
      if (elem.classList.contains("js-active")) {
        activePanel = elem;
      }
    });
    return activePanel;
  }; //open active panel (and close unactive panels)

  const setActivePanel = (activePanelNum) => {
    //remove active class from all the panels
    removeClasses(DOMstrings.stepFormPanels, "js-active"); //show active panel

    DOMstrings.stepFormPanels.forEach((elem, index) => {
      if (index === activePanelNum) {
        elem.classList.add("js-active");
        setFormHeight(elem);
      }
    });
  }; //set form height equal to current panel height

  const formHeight = (activePanel) => {
    const activePanelHeight = activePanel.offsetHeight;
    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
  };

  const setFormHeight = () => {
    const activePanel = getActivePanel();
    formHeight(activePanel);
  }; //STEPS BAR CLICK FUNCTION

  DOMstrings.stepsBar.addEventListener("click", (e) => {
    //check if click target is a step button
    const eventTarget = e.target;

    if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
      return;
    } //get active button step number

    const activeStep = getActiveStep(eventTarget); //set all steps before clicked (and clicked too) to active

    setActiveStep(activeStep); //open active panel

    setActivePanel(activeStep);
  }); //PREV/NEXT BTNS CLICK

  DOMstrings.stepsForm.addEventListener("click", (e) => {
    const eventTarget = e.target; //check if we clicked on `PREV` or NEXT` buttons

    if (
      !(
        eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) ||
        eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)
      )
    ) {
      return;
    } //find active panel

    const activePanel = findParent(
      eventTarget,
      `${DOMstrings.stepFormPanelClass}`
    );
    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(
      activePanel
    ); //set active step and active panel onclick

    if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
      activePanelNum--;
    } else {
      activePanelNum++;
    }

    setActiveStep(activePanelNum);
    setActivePanel(activePanelNum);
  }); //SETTING PROPER FORM HEIGHT ONLOAD

  window.addEventListener("load", setFormHeight, false); //SETTING PROPER FORM HEIGHT ONRESIZE

  window.addEventListener("resize", setFormHeight, false); //changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)

  const setAnimationType = (newType) => {
    DOMstrings.stepFormPanels.forEach((elem) => {
      elem.dataset.animation = newType;
    });
  }; //selector onchange - changing animation

  const animationSelect = document.querySelector(".pick-animation__select");
  animationSelect.addEventListener("change", () => {
    const newAnimationType = animationSelect.value;
    setAnimationType(newAnimationType);
  });
});

/**
 * Swiper Slider
 * Update of secondary numeric pagination
 * @this {object}  - swiper instance
 */
function updSwiperNumericPagination() {
  this.el.querySelector(".swiper-counter").innerHTML =
    '<span class="count">' +
    (this.realIndex + 1) +
    '</span>/<span class="total">' +
    this.el.slidesQuantity +
    "</span>";
}


  document.querySelectorAll(".swiper-container").forEach(function (node) {
    // Getting slides quantity before slider clones them
    node.slidesQuantity = node.querySelectorAll(".swiper-slide").length;

    // Swiper initialization
    new Swiper(node, {
      speed: 1000,
      autoplay: { delay: 1000 },
      pagination: { el: ".swiper-custom-pagination" },
      on: {
        // Secondary pagination is update after initialization and after slide change
        init: updSwiperNumericPagination,
        slideChange: updSwiperNumericPagination,
      },
      //  Navigation arrows

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });



// Swiper 2 Landing Page

 new Swiper('.slides-2', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay:true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 40
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 60
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 200
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }
});

// Swiper 3 Landing Page
new Swiper('.slides-3', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 60
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 80
    },
    992: {
      slidesPerView: 6,
      spaceBetween: 20
    }
  }
});

window.onscroll = function () {
  let header = document.getElementById("header");
  if (window.scrollY > 1) {
    header.classList.add("scrolled-header");
  } else {
    header.classList.remove("scrolled-header");
  }
};

/**
 * Initiate glightbox
 */
const glightbox = GLightbox({
  selector: ".glightbox",
});
