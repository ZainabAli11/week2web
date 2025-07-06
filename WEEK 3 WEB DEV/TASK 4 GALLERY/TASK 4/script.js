const images = [
  "pics/n1.png", "pics/n2.png", "pics/n3.png", "pics/n4.png", "pics/n5.png",
  "pics/n6.png", "pics/n7.png", "pics/n8.png", "pics/n9.png", "pics/n10.png"
];

const carousel   = document.getElementById("carousel");
const overlayBox = document.getElementById("overlay");
const prevBtn    = document.getElementById("prevBtn");
const nextBtn    = document.getElementById("nextBtn");
const toggleBtn  = document.getElementById("themeToggle");

let current = 2;
let isTransitioning = false;

function buildRow() {
  carousel.innerHTML = "";
  for (let off = -2; off <= 2; off++) {
    const index = (current + off + images.length) % images.length;
    const img = document.createElement("img");
    img.src = images[index];
    if (off === 0) img.classList.add("active");
    img.style.transform = `translateX(${off * 22}%)`; // Reduced spacing
    img.addEventListener("click", () => zoom(img.src));
    carousel.appendChild(img);
  }
}

function slideTo(newIndex, direction) {
  if (isTransitioning) return;
  isTransitioning = true;

  const slideDistance = direction === "next" ? -22 : 22; // Match reduced spacing
  const imgs = carousel.querySelectorAll("img");
  imgs.forEach(img => {
    img.style.transition = "transform 0.4s ease-in-out";
    const currentTransform = parseFloat(img.style.transform.replace("translateX(", "").replace("%)", ""));
    img.style.transform = `translateX(${currentTransform + slideDistance}%)`;
  });

  setTimeout(() => {
    imgs.forEach(img => {
      img.style.transition = "none";
    });
    current = newIndex;
    buildRow();
    isTransitioning = false;
  }, 400);
}

prevBtn.onclick = () => slideTo((current - 1 + images.length) % images.length, "prev");
nextBtn.onclick = () => slideTo((current + 1) % images.length, "next");

function zoom(src) {
  overlayBox.innerHTML = `<img src="${src}">`;
  overlayBox.style.display = "flex";
}
overlayBox.onclick = () => (overlayBox.style.display = "none");

toggleBtn.onclick = () => document.body.classList.toggle("dark");

buildRow();