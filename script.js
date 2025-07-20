document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar")
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const logoIcon = document.querySelector(".logo-icon")

  function ultraForceNavbarToTop() {
    const html = document.documentElement
    const body = document.body
    const navbar = document.querySelector(".navbar")

    if (html) {
      html.style.cssText = `
        margin: 0 !important;
        padding: 0 !important;
        scroll-behavior: smooth !important;
      `
    }

    if (body) {
      body.style.cssText = `
        margin: 0 !important;
        padding: 0 !important;
        font-family: "Inter", sans-serif !important;
        line-height: 1.6 !important;
        color: #1f2937 !important;
        background-color: #ffffff !important;
        overflow-x: hidden !important;
      `
    }

    if (navbar) {
      navbar.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        height: 75px !important;
        z-index: 2147483647 !important;
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
        backdrop-filter: blur(10px) !important;
        display: flex !important;
        align-items: center !important;
        transition: all 0.4s ease !important;
      `
    }

    const mainContent = document.querySelector(".main-content")
    if (mainContent) {
      mainContent.style.cssText = `
        margin-top: 75px !important;
        position: relative !important;
        width: 100% !important;
      `
    }
  }

  ultraForceNavbarToTop()
  window.addEventListener("resize", ultraForceNavbarToTop)
  window.addEventListener("orientationchange", ultraForceNavbarToTop)

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      navToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
      document.body.classList.toggle("body-no-scroll")
      createRippleEffect(navToggle)
    })
  }

  function createRippleEffect(element) {
    const ripple = document.createElement("span")
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = "50%"
    ripple.style.top = "50%"
    ripple.style.transform = "translate(-50%, -50%)"
    ripple.classList.add("ripple")

    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(16, 185, 129, 0.3)"
    ripple.style.animation = "ripple-animation 0.6s ease-out"
    ripple.style.pointerEvents = "none"

    element.style.position = "relative"
    element.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple-animation {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
      document.body.classList.remove("body-no-scroll")
    })
  })

  document.addEventListener("click", (e) => {
    if (navToggle && navMenu && navbar && !navbar.contains(e.target)) {
      if (navMenu.classList.contains("active")) {
        navToggle.classList.remove("active")
        navMenu.classList.remove("active")
        document.body.classList.remove("body-no-scroll")
      }
    }
  })

  window.addEventListener("resize", () => {
    document.body.classList.remove("body-no-scroll")
  })

  window.addEventListener("orientationchange", () => {
    document.body.classList.remove("body-no-scroll")
  })

  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 75
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`)

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        if (correspondingLink && !correspondingLink.classList.contains("active")) {
          correspondingLink.classList.add("active")
        }
      }
    })
  }

  function updateNavbarEffects() {
    const scrolled = window.scrollY > 50
    if (navbar) {
      if (scrolled) {
        navbar.style.background = "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)"
        navbar.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)"
        navbar.style.backdropFilter = "blur(20px)"
      } else {
        navbar.style.background = "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
        navbar.style.backdropFilter = "blur(10px)"
      }
    }
  }

  function animateOnScroll() {
    const elements = document.querySelectorAll("[data-aos]")
    const windowHeight = window.innerHeight

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = elementTop < windowHeight - 100

      if (elementVisible && !element.classList.contains("aos-animate")) {
        element.classList.add("aos-animate")
      }
    })
  }

  let ticking = false
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveLink()
        updateNavbarEffects()
        animateOnScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", onScroll)

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const targetSection = document.querySelector(href)
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 75
          smoothScrollTo(offsetTop, 800)
        }
      }
    })
  })

  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  if (logoIcon) {
    logoIcon.addEventListener("mouseenter", function () {
      this.style.animation = "none"
      this.style.transform = "scale(1.1) rotate(10deg)"
    })

    logoIcon.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.animation = "logoFloat 3s ease-in-out infinite"
    })
  }

  // Avoid scroll jump on mobile by preserving position
  let scrollLock = false
  document.addEventListener("touchmove", () => {
    scrollLock = true
  })
  setTimeout(() => {
    scrollLock = false
  }, 1200)

  updateActiveLink()
  updateNavbarEffects()
  animateOnScroll()

  // Optional: fade in body
  setTimeout(() => {
    document.body.style.opacity = "1"
    document.body.style.transform = "translateY(0)"
  }, 100)
})
