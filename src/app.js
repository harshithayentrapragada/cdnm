/* global React, ReactDOM */

(function () {
  "use strict";

  function byId(id) {
    return document.getElementById(id);
  }

  function setRole(role, hideModal) {
    document.body.setAttribute("data-role", role);

    var modal = byId("roleModal");
    var roleSwitch = byId("roleSwitch");

    if (hideModal && modal) {
      modal.classList.add("hidden");
    }

    if (roleSwitch) {
      roleSwitch.textContent = role === "user" ? "Researcher" : "Developer";
    }
  }

  window.selectRole = function (role) {
    setRole(role, true);
  };

  function initTheme() {
    var toggle = byId("themeToggle");

    if (!toggle) {
      return;
    }

    function renderThemeButton(isDark) {
      toggle.innerHTML = isDark
        ? "<span>&#9790;</span> <span>Dark</span>"
        : "<span>&#9788;</span> <span>Light</span>";
      toggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    var saved = localStorage.getItem("theme");
    var isDark = saved === "dark";

    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    renderThemeButton(isDark);

    toggle.addEventListener("click", function () {
      var nextDark =
        document.documentElement.getAttribute("data-theme") !== "dark";
      if (nextDark) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      }
      renderThemeButton(nextDark);
    });
  }

  function initPortal() {
    var roleModal = byId("roleModal");
    var roleSwitch = byId("roleSwitch");

    // Clear stale role state so reloads always reopen the default selector.
    document.body.removeAttribute("data-role");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("userRole");

    if (roleModal) {
      roleModal.classList.remove("hidden");
    }

    if (roleSwitch && roleModal) {
      roleSwitch.addEventListener("click", function () {
        roleModal.classList.remove("hidden");
      });
    }

    initTheme();
    initNavigation();
    initFeedbackModal();
    initSearch();
  }

  function initFeedbackModal() {
    var modal = byId("feedbackModal");
    var form = byId("feedbackForm");
    var cancel = byId("feedbackCancel");
    var type = byId("feedbackType");
    var title = byId("feedbackModalTitle");

    if (!modal || !form || !cancel || !type || !title) {
      return;
    }

    function closeFeedbackModal() {
      modal.classList.add("hidden");
    }

    function openFeedbackModal(feedbackType) {
      type.value = feedbackType;
      title.textContent =
        feedbackType === "improvement" ? "Suggest Improvement" : "Submit Feedback";
      modal.classList.remove("hidden");
    }

    document.querySelectorAll(".js-feedback-modal").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        // Keep feedback actions on-page and open the modal instead of changing sections.
        openFeedbackModal(button.getAttribute("data-feedback-type") || "feedback");
      });
    });

    cancel.addEventListener("click", closeFeedbackModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeFeedbackModal();
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Feedback submitted. Thank you!");
      form.reset();
      closeFeedbackModal();
    });
  }

  function initNavigation() {
    var allSections = Array.prototype.slice.call(document.querySelectorAll(".section"));
    var quickAccess = document.querySelector(".quick-access");
    var announcementsWrapper = byId("announcements-wrapper");
    var allNavLinks = Array.prototype.slice.call(
      document.querySelectorAll(".nav__link, .nav__sublink")
    );
    var sidebar = byId("sidebar");
    var mainEl = document.querySelector(".main");
    var sidebarToggle = byId("sidebarToggle");

    var sectionGroups = {
      intro: "Start Here",
      resources: "Start Here",
      "download-data": "How Do I...",
      faqs: "How Do I...",
      "fair-data": "How Do I...",
      access: "How Do I...",
      usage: "How Do I...",
      "panel-overview": "How Do I...",
      "panel-dictionary": "How Do I...",
      "panel-explorer": "How Do I...",
      "panel-query": "How Do I...",
      "panel-workspace": "How Do I...",
      "panel-profile": "How Do I...",
      "panel-notebooks": "Start Here",
      architecture: "Technical Details",
      "api-reference": "Technical Details",
      "data-model": "Technical Details",
      "data-submission": "Technical Details",
      infrastructure: "Technical Details",
      tools: "Technical Details",
      help: "Help & Support",
      "help-docs": "Help & Support",
      contacts: "Help & Support",
      feedback: "Help & Support",
      status: "Help & Support"
    };

    var sectionTitles = {};
    allSections.forEach(function (section) {
      var title = section.querySelector(".section__title");

      if (title) {
        sectionTitles[section.id] = title.textContent;
      }
    });

    function getSubTitle(el) {
      var title = el.querySelector(
        ".card__title, .resource-card__title, .subsection__title, h3, h4"
      );
      return title ? title.textContent : el.id || "";
    }

    function resetSectionDisplay() {
      document.querySelectorAll(".section [style]").forEach(function (el) {
        el.style.display = "";
        el.style.gridColumn = "";
      });
    }

    function isolateSubElement(targetId) {
      var target = byId(targetId);

      if (!target) {
        return null;
      }

      var parentSection = target.closest(".section");

      if (!parentSection) {
        return null;
      }

      parentSection.classList.add("active-section");
      Array.prototype.slice.call(parentSection.children).forEach(function (child) {
        if (child.classList.contains("section__header")) {
          return;
        }

        if (child.id === targetId || child.contains(target) || child === target) {
          child.style.display = "";

          if (
            child.classList.contains("card-grid") ||
            child.classList.contains("resource-grid") ||
            child.classList.contains("steps-grid")
          ) {
            Array.prototype.slice.call(child.children).forEach(function (card) {
              if (card.id === targetId || card.contains(target) || card === target) {
                card.style.display = "";
                card.style.gridColumn = "1 / -1";
              } else {
                card.style.display = "none";
              }
            });
          }
        } else {
          child.style.display = "none";
        }
      });

      return parentSection;
    }

    function updateBreadcrumb(parentSection, breadcrumbParentTitle, breadcrumbTitle) {
      var breadcrumb = byId("breadcrumb");

      if (!breadcrumb || !parentSection) {
        return;
      }

      var sectionId = parentSection.id;
      var group = sectionGroups[sectionId] || "";
      var html =
        '<span class="breadcrumb__link" onclick="window.showSection(\'intro\')">' +
        "Home</span>";

      if (group) {
        html +=
          '<span class="breadcrumb__sep">&rsaquo;</span><span class="breadcrumb__link">' +
          group +
          "</span>";
      }

      if (breadcrumbParentTitle) {
        html +=
          '<span class="breadcrumb__sep">&rsaquo;</span>' +
          '<span class="breadcrumb__link" onclick="window.showSection(\'' +
          sectionId +
          "')\">" +
          breadcrumbParentTitle +
          "</span>";
      }

      html +=
        '<span class="breadcrumb__sep">&rsaquo;</span><span class="breadcrumb__current">' +
        breadcrumbTitle +
        "</span>";
      breadcrumb.innerHTML = html;
    }

    function isReloadNavigation() {
      var navigation = performance.getEntriesByType("navigation")[0];
      return navigation && navigation.type === "reload";
    }

    function showSection(targetId, replaceHistory) {
      resetSectionDisplay();
      document.querySelectorAll(".back-to-parent").forEach(function (button) {
        button.remove();
      });
      allSections.forEach(function (section) {
        section.classList.remove("active-section");
      });

      if (quickAccess) {
        quickAccess.classList.remove("active-section");
      }

      if (announcementsWrapper) {
        announcementsWrapper.classList.toggle("active-section", targetId === "intro");
      }

      if (!targetId) {
        return;
      }

      var target = byId(targetId);

      if (!target) {
        return;
      }

      var parentSection = null;
      var breadcrumbTitle = "";
      var breadcrumbParentTitle = "";
      var isSubContent = false;

      if (target.classList.contains("section")) {
        target.classList.add("active-section");
        parentSection = target;
        breadcrumbTitle = sectionTitles[target.id] || target.id;
      } else {
        parentSection = isolateSubElement(targetId);
        breadcrumbParentTitle = parentSection ? sectionTitles[parentSection.id] || "" : "";
        breadcrumbTitle = getSubTitle(target) || targetId;
        isSubContent = true;
      }

      if (targetId === "intro" && quickAccess) {
        quickAccess.classList.add("active-section");
      }

      if (isSubContent && parentSection) {
        var backButton = document.createElement("button");
        backButton.className = "back-to-parent";
        backButton.innerHTML =
          '<span class="back-to-parent__arrow">&larr;</span> Back to ' +
          (sectionTitles[parentSection.id] || "section");
        backButton.onclick = function () {
          showSection(parentSection.id);
        };
        var header = parentSection.querySelector(".section__header");

        if (header && header.nextSibling) {
          header.parentNode.insertBefore(backButton, header.nextSibling);
        }
      }

      updateBreadcrumb(parentSection, breadcrumbParentTitle, breadcrumbTitle);

      if (mainEl) {
        mainEl.scrollTop = 0;
      }

      window.scrollTo({ top: 0, behavior: "auto" });

      allNavLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      var activeLink = document.querySelector(
        '.nav__link[href="#' + targetId + '"], .nav__sublink[href="#' + targetId + '"]'
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }

      if (window.location.hash !== "#" + targetId) {
        // Use pushState for user navigation so browser back/forward buttons track state.
        history[replaceHistory ? "replaceState" : "pushState"](null, "", "#" + targetId);
      }
    }

    window.showSection = showSection;

    document.querySelectorAll(".nav__group-label").forEach(function (label) {
      label.addEventListener("click", function () {
        label.parentElement.classList.toggle("collapsed");
      });
    });

    document.querySelectorAll(".nav__link").forEach(function (link) {
      var next = link.nextElementSibling;
      if (next && next.classList.contains("nav__sublink")) {
        link.classList.add("has-children");
      }
      link.addEventListener("click", function (event) {
        event.preventDefault();
        if (link.classList.contains("has-children")) {
          link.classList.toggle("collapsed");
          var el = link.nextElementSibling;
          while (el && el.classList.contains("nav__sublink")) {
            el.style.display = link.classList.contains("collapsed") ? "none" : "block";
            el = el.nextElementSibling;
          }
          return;
        }
        var href = link.getAttribute("href");

        if (href && href !== "#") {
          showSection(href.replace("#", ""));
        }
      });
    });

    document.querySelectorAll(".nav__sublink").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var href = link.getAttribute("href");

        if (href && href !== "#") {
          showSection(href.replace("#", ""));
        }
      });
    });

    document.querySelectorAll(".section a[href^='#']").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        if (href && href !== "#") {
          event.preventDefault();
          showSection(href.replace("#", ""));
        }
      });
    });

    if (sidebarToggle && sidebar && mainEl) {
      sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        mainEl.classList.toggle("sidebar-hidden");
        var footer = byId("portalFooter");

        if (footer) {
          footer.style.marginLeft = sidebar.classList.contains("collapsed")
            ? "0"
            : "var(--sidebar-width)";
        }
      });
    }

    var announcementsEl = byId("announcements");
    var announcementsToggle = byId("announcementsToggle");
    if (announcementsEl && announcementsToggle) {
      announcementsToggle.addEventListener("click", function () {
        announcementsEl.classList.toggle("collapsed");
        var button = announcementsToggle.querySelector(".announcements__toggle");

        if (button) {
          button.textContent = announcementsEl.classList.contains("collapsed")
            ? "Show"
            : "Hide";
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      var activeTag = document.activeElement ? document.activeElement.tagName : "";
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "b" &&
        sidebarToggle
      ) {
        event.preventDefault();
        sidebarToggle.click();
      }
      if (event.key === "/" && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        var searchInput = byId("searchInput");
        if (searchInput) {
          event.preventDefault();
          searchInput.focus();
        }
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d") {
        var themeToggle = byId("themeToggle");
        if (themeToggle) {
          event.preventDefault();
          themeToggle.click();
        }
      }
      if (event.key === "Escape") {
        var panel = byId("searchPanel");
        var input = byId("searchInput");

        if (panel && panel.classList.contains("open")) {
          panel.classList.remove("open");

          if (mainEl) {
            mainEl.classList.remove("search-open");
          }

          if (input) {
            input.value = "";
          }
        }
      }
    });

    function updateChecklistProgress() {
      var items = document.querySelectorAll(".checklist__item");
      var done = document.querySelectorAll(".checklist__item.done");
      var progress = byId("checklistProgress");
      var pct = items.length ? Math.round((done.length / items.length) * 100) : 0;

      if (progress) {
        progress.style.width = pct + "%";
      }
    }

    window.toggleCheck = function (item) {
      item.classList.toggle("done");
      var state = {};
      document.querySelectorAll(".checklist__item").forEach(function (checkItem) {
        state[checkItem.getAttribute("data-check")] = checkItem.classList.contains("done");
      });
      localStorage.setItem("checklistState", JSON.stringify(state));
      updateChecklistProgress();
    };

    var savedChecklist = JSON.parse(localStorage.getItem("checklistState") || "{}");
    document.querySelectorAll(".checklist__item").forEach(function (item) {
      if (savedChecklist[item.getAttribute("data-check")]) {
        item.classList.add("done");
      }
    });
    updateChecklistProgress();

    window.addEventListener("popstate", function () {
      var historyId = window.location.hash ? window.location.hash.replace("#", "") : "intro";
      // Render popped history entries without adding duplicate entries back onto the stack.
      showSection(byId(historyId) ? historyId : "intro", true);
    });

    var initialId = !isReloadNavigation() && window.location.hash
      ? window.location.hash.replace("#", "")
      : "intro";
    // On reload, force the default section; normal navigation still manages history.
    showSection(byId(initialId) ? initialId : "intro", true);
  }

  function initSearch() {
    var input = byId("searchInput");
    var panel = byId("searchPanel");
    var resultsContainer = byId("searchResults");
    var countEl = byId("searchCount");
    var closeBtn = byId("searchPanelClose");
    var mainEl = document.querySelector(".main");

    if (!input || !panel || !resultsContainer || !countEl) {
      return;
    }

    var detailedResults = [];
    var activeIndex = 0;

    function openPanel() {
      panel.classList.add("open");

      if (mainEl) {
        mainEl.classList.add("search-open");
      }
    }

    function closePanel() {
      panel.classList.remove("open");

      if (mainEl) {
        mainEl.classList.remove("search-open");
      }

      input.value = "";
      detailedResults = [];
      activeIndex = 0;
      resultsContainer.innerHTML =
        '<div class="search-panel__empty">Type to search across all sections...</div>';
      countEl.textContent = "0 results";
    }

    function escapeRegExp(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function getSnippet(el, query) {
      var text = el.textContent || "";
      var lower = text.toLowerCase();
      var index = lower.indexOf(query);

      if (index === -1) {
        return "";
      }

      var start = Math.max(0, index - 40);
      var end = Math.min(text.length, index + query.length + 80);
      var snippet =
        (start > 0 ? "..." : "") +
        text.substring(start, end).trim() +
        (end < text.length ? "..." : "");
      return snippet.replace(new RegExp("(" + escapeRegExp(query) + ")", "gi"), "<mark>$1</mark>");
    }

    function getTitle(section) {
      var title = section.querySelector(".section__title");
      return title ? title.textContent : section.id;
    }

    function getBadge(section) {
      var badge = section.querySelector(".section__badge");
      return badge ? badge.textContent : "";
    }

    function setActive(index) {
      activeIndex = index;
      resultsContainer.querySelectorAll(".search-result").forEach(function (result, resultIndex) {
        result.classList.toggle("active", resultIndex === index);
      });

      var item = detailedResults[index];
      if (item && item.parentSection && window.showSection) {
        window.showSection(item.parentSection.id);
        if (item.el !== item.parentSection) {
          setTimeout(function () {
            item.el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    }

    function buildResults(query) {
      resultsContainer.innerHTML = "";
      detailedResults = [];

      document.querySelectorAll("section").forEach(function (section) {
        if (!section.textContent.toLowerCase().includes(query)) {
          return;
        }

        var sectionTitle = getTitle(section);
        var sectionBadge = getBadge(section);
        var cards = section.querySelectorAll(
          ".card, .resource-card, .step, .subsection, .service-item, .doc-block, .contact-card"
        );
        var added = false;

        cards.forEach(function (card) {
          if (!card.textContent.toLowerCase().includes(query)) {
            return;
          }

          added = true;
          var title = card.querySelector(
            ".card__title, .resource-card__title, .step__title, .subsection__title, " +
              ".service-item__title, h4, .contact-card__name"
          );
          detailedResults.push({
            el: card,
            parentSection: section,
            title: title ? title.textContent : sectionTitle,
            badge: sectionBadge,
            snippet: getSnippet(card, query)
          });
        });

        if (!added) {
          detailedResults.push({
            el: section,
            parentSection: section,
            title: sectionTitle,
            badge: sectionBadge,
            snippet: getSnippet(section, query)
          });
        }
      });

      countEl.textContent =
        detailedResults.length + " result" + (detailedResults.length !== 1 ? "s" : "");

      if (!detailedResults.length) {
        resultsContainer.innerHTML = '<div class="search-panel__empty">No results found</div>';
        return;
      }

      detailedResults.forEach(function (item, index) {
        var result = document.createElement("div");
        result.className = "search-result" + (index === 0 ? " active" : "");
        result.innerHTML =
          (item.badge ? '<div class="search-result__badge">' + item.badge + "</div>" : "") +
          '<div class="search-result__title">' + item.title + "</div>" +
          '<div class="search-result__snippet">' + item.snippet + "</div>";
        result.addEventListener("click", function () {
          setActive(index);
        });
        resultsContainer.appendChild(result);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closePanel);
    }

    input.addEventListener("input", function () {
      var value = input.value.toLowerCase().trim();
      activeIndex = 0;
      if (!value) {
        closePanel();
        return;
      }
      openPanel();
      buildResults(value);
    });

    input.addEventListener("keydown", function (event) {
      if (!detailedResults.length) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        setActive(activeIndex);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive(Math.min(activeIndex + 1, detailedResults.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(Math.max(activeIndex - 1, 0));
      }
    });
  }

  function App() {
    React.useEffect(function () {
      initPortal();
    }, []);

    return React.createElement("div", {
      className: "portal-app",
      dangerouslySetInnerHTML: { __html: window.PORTAL_MARKUP || "" }
    });
  }

  ReactDOM.createRoot(byId("root")).render(React.createElement(App));
})();
