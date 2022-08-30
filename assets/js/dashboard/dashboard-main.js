(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Sidebar toggle
   */
  if (select(".toggle-sidebar-btn")) {
    on("click", ".toggle-sidebar-btn", function (e) {
      select("body").classList.toggle("toggle-sidebar");
    });
  }

  /**
   * Search bar toggle
   */
  if (select(".search-bar-toggle")) {
    on("click", ".search-bar-toggle", function (e) {
      select(".search-bar").classList.toggle("search-bar-show");
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);



  /**
   * Full Calendar Code
   */
  document.addEventListener("DOMContentLoaded", function () {
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      events: [
        {
          id: "a",
          title: "FORWARD// Fall 2022",
          content: "hello world",
          start: "2022-08-08",
          end: "2022-08-10",

          backgroundColor: "#e7f6df",
          textColor: "black",
          borderColor: "#e7f6df",
          message: "Lecture",
        },
      ],
      eventDidMount: function (info) {
        // If a description exists add as second line to title

        if (info) {
          const a = info.el.getElementsByClassName("fc-event-title");
          a[0].innerHTML = `
                            <b>${info.event.title}</b><br>
                            <span style="white-space: normal;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </span>
                           `;
        }
      },

      headerToolbar: {
        left: "prev,title,next",
        right: "timeGridDay,dayGridWeek,dayGridMonth",
      },
    });

    calendar.render();
  });
})();
