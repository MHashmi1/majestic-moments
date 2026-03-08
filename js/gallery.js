// GALLERY.JS - Gallery & Lightbox

// Gallery image data
const galleryImages = [
  {
    thumb: "images/gallery/thumbs/img1.jpg",
    full: "images/gallery/full/img1.jpg",
    alt: "Beautiful blue and gold balloon decoration setup"
  },
  {
    thumb: "images/gallery/thumbs/img2.jpg",
    full: "images/gallery/full/img2.jpg",
    alt: "Elegant table setting with golden accents"
  },
  {
    thumb: "images/gallery/thumbs/img3.jpg",
    full: "images/gallery/full/img3.jpg",
    alt: "Decorative candle centerpiece arrangement"
  },
  {
    thumb: "images/gallery/thumbs/img4.jpg",
    full: "images/gallery/full/img4.jpg",
    alt: "Stunning event decoration with balloons"
  },
  {
    thumb: "images/gallery/thumbs/img5.jpg",
    full: "images/gallery/full/img5.jpg",
    alt: "Beautiful party setup with decorative elements"
  },
  {
    thumb: "images/gallery/thumbs/img6.jpg",
    full: "images/gallery/full/img6.jpg",
    alt: "Elegant table decoration with flowers"
  },
  {
    thumb: "images/gallery/thumbs/img7.jpg",
    full: "images/gallery/full/img7.jpg",
    alt: "Creative balloon arrangement for special event"
  },
  {
    thumb: "images/gallery/thumbs/img8.jpg",
    full: "images/gallery/full/img8.jpg",
    alt: "Sophisticated table setting with premium decor"
  },
  {
    thumb: "images/gallery/thumbs/img9.jpg",
    full: "images/gallery/full/img9.jpg",
    alt: "Festive party decoration setup"
  },
  {
    thumb: "images/gallery/thumbs/img10.jpg",
    full: "images/gallery/full/img10.jpg",
    alt: "Luxurious event decor with elegant touches"
  },
  {
    thumb: "images/gallery/thumbs/img11.jpg",
    full: "images/gallery/full/img11.jpg",
    alt: "Professional catering and decoration display"
  }
];

document.addEventListener("DOMContentLoaded", function () {

  const galleryGrid = document.getElementById("galleryGrid");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let currentImageIndex = 0;

  // RENDER GALLERY
  function renderGallery() {

    galleryImages.forEach((image, index) => {

      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.dataset.index = index;

      const img = document.createElement("img");
      img.src = image.thumb;
      img.alt = image.alt;
      img.loading = "lazy";

      galleryItem.appendChild(img);
      galleryGrid.appendChild(galleryItem);

      galleryItem.addEventListener("click", function () {
        openLightbox(index);
      });

    });

  }

  // LIGHTBOX FUNCTIONS

  function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateLightboxImage() {

    const image = galleryImages[currentImageIndex];

    lightboxImage.src = image.full;
    lightboxImage.alt = image.alt;

    lightboxCounter.textContent =
      `${currentImageIndex + 1} / ${galleryImages.length}`;

  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
  }

  function showPrevImage() {
    currentImageIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  }

  // BUTTON EVENTS

  if (lightboxClose)
    lightboxClose.addEventListener("click", closeLightbox);

  if (lightboxPrev)
    lightboxPrev.addEventListener("click", showPrevImage);

  if (lightboxNext)
    lightboxNext.addEventListener("click", showNextImage);

  // CLOSE ON BACKGROUND CLICK

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // KEYBOARD NAVIGATION

  document.addEventListener("keydown", function (e) {

    if (!lightbox.classList.contains("active")) return;

    switch (e.key) {

      case "Escape":
        closeLightbox();
        break;

      case "ArrowLeft":
        showPrevImage();
        break;

      case "ArrowRight":
        showNextImage();
        break;

    }

  });

  // SWIPE SUPPORT (MOBILE)

  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {

    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {

      if (diff > 0) {
        showNextImage();
      } else {
        showPrevImage();
      }

    }

  }

  // INTERSECTION OBSERVER (FADE IN)

  const imageObserverOptions = {
    threshold: 0.1,
    rootMargin: "50px"
  };

  const imageObserver = new IntersectionObserver(function (entries) {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const galleryItem = entry.target;

        galleryItem.style.opacity = "1";
        galleryItem.style.transform = "translateY(0)";

        imageObserver.unobserve(galleryItem);

      }

    });

  }, imageObserverOptions);

  function observeGalleryItems() {

    const items = document.querySelectorAll(".gallery-item");

    items.forEach(item => {

      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

      imageObserver.observe(item);

    });

  }

  // INITIALIZE

  renderGallery();
  observeGalleryItems();

});