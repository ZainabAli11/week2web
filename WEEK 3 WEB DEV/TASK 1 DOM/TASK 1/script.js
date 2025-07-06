const myDiv = document.getElementById('myDiv');
const paragraphContainer = document.getElementById('paragraphContainer');

let shapeIndex = 0;
const shapes = [
  { borderRadius: "50%" }, // Circle
  { borderRadius: "0%" }, // Square
  { borderRadius: "20px" }, // Rounded rectangle
  { transform: "rotate(45deg)", borderRadius: "0%" }, // Diamond
  { borderRadius: "50% / 30%" }, // Ellipse
  { clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)" } // Hexagon
];

let visibilityState = 0; // 0: visible, 1: medium, 2: hidden
const historyStack = [];

function saveState() {
  historyStack.push({
    html: myDiv.innerHTML,
    style: myDiv.getAttribute("style"),
    classes: [...myDiv.classList],
    paragraphs: paragraphContainer.innerHTML,
    shapeIndex,
    visibilityState,
    borderIndex,
    rotateIndex,
    fontSizeIndex,
    glowIndex
  });
}

function restoreState(state) {
  myDiv.innerHTML = state.html;
  myDiv.setAttribute("style", state.style);
  myDiv.className = "";
  state.classes.forEach(cls => myDiv.classList.add(cls));
  paragraphContainer.innerHTML = state.paragraphs;
  shapeIndex = state.shapeIndex;
  visibilityState = state.visibilityState;
  borderIndex = state.borderIndex;
  rotateIndex = state.rotateIndex;
  fontSizeIndex = state.fontSizeIndex;
  glowIndex = state.glowIndex;
}

// Change Text
document.getElementById('changeTextBtn').addEventListener('click', () => {
  saveState();
  const texts = ["Welcome!", "Nice to see you!", "Stay creative!", "Enjoy the magic!", "Dom Rocks!"];
  myDiv.textContent = texts[Math.floor(Math.random() * texts.length)];
});

// Toggle Shape
document.getElementById('toggleShapeBtn').addEventListener('click', () => {
  saveState();
  myDiv.style.borderRadius = "";
  myDiv.style.transform = "";
  myDiv.style.clipPath = "";

  const shape = shapes[shapeIndex];
  if (shape.borderRadius) myDiv.style.borderRadius = shape.borderRadius;
  if (shape.transform) myDiv.style.transform = shape.transform;
  if (shape.clipPath) myDiv.style.clipPath = shape.clipPath;

  shapeIndex = (shapeIndex + 1) % shapes.length;
});

// Toggle Visibility
document.getElementById('toggleVisibilityBtn').addEventListener('click', () => {
  saveState();
  if (visibilityState === 0) {
    myDiv.style.opacity = "0.5";
    myDiv.style.display = "flex";
    visibilityState = 1;
  } else if (visibilityState === 1) {
    myDiv.style.display = "none";
    visibilityState = 2;
  } else {
    myDiv.style.opacity = "1";
    myDiv.style.display = "flex";
    visibilityState = 0;
  }
});

// Add Paragraph
document.getElementById('addParagraphBtn').addEventListener('click', () => {
  saveState();
  const p = document.createElement('p');
  p.textContent = "Line 1: You can change shapes!\nLine 2: You can add colors!\nLine 3: You can do magic with DOM!";
  paragraphContainer.appendChild(p);
});

// Reset
document.getElementById('resetBtn').addEventListener('click', () => {
  saveState();
  myDiv.style = "";
  myDiv.textContent = "Hello Box";
  paragraphContainer.innerHTML = "";
  shapeIndex = 0;
  visibilityState = 0;
  myDiv.classList.remove("glow");
});

// BG Color
document.getElementById('bgColorBtn').addEventListener('click', () => {
  saveState();
  const colors = ["#ff6f61", "#6a82fb", "#56ab2f", "#ffb347", "#00c6ff"];
  myDiv.style.background = colors[Math.floor(Math.random() * colors.length)];
});

// Border
const borderStyles = [
  "4px solid #ffdd00",
  "5px dashed #ff6f61",
  "3px dotted #00c6ff",
  "6px double #56ab2f",
  ""
];
let borderIndex = 0;

document.getElementById('borderBtn').addEventListener('click', () => {
  saveState();
  myDiv.style.border = borderStyles[borderIndex];
  borderIndex = (borderIndex + 1) % borderStyles.length;
});

// Rotate
const rotateOptions = [
  "rotate(20deg)",
  "rotate(45deg)",
  "rotate(90deg)",
  "rotate(180deg)",
  ""
];
let rotateIndex = 0;

document.getElementById('rotateBtn').addEventListener('click', () => {
  saveState();
  myDiv.style.transform = rotateOptions[rotateIndex];
  rotateIndex = (rotateIndex + 1) % rotateOptions.length;
});

// Scale
document.getElementById('scaleBtn').addEventListener('click', () => {
  saveState();
  myDiv.style.transform = myDiv.style.transform.includes("scale(1.2)") ? "" : "scale(1.2)";
});

// Shadow
document.getElementById('shadowBtn').addEventListener('click', () => {
  saveState();
  myDiv.style.boxShadow = myDiv.style.boxShadow ? "" : "0 20px 40px rgba(255, 255, 255, 0.6)";
});

// Font Size
const fontSizes = ["14px", "18px", "24px", "32px", "40px"];
let fontSizeIndex = 0;

document.getElementById('fontSizeBtn').addEventListener('click', () => {
  saveState();
  myDiv.style.fontSize = fontSizes[fontSizeIndex];
  fontSizeIndex = (fontSizeIndex + 1) % fontSizes.length;
});

// Skew
document.getElementById('skewBtn').addEventListener('click', () => {
  saveState();
  myDiv.style.transform = myDiv.style.transform.includes("skew") ? "" : "skew(10deg, 10deg)";
});

// Flip
document.getElementById('flipBtn').addEventListener('click', () => {
  saveState();
  myDiv.style.transform = myDiv.style.transform.includes("rotateY") ? "" : "rotateY(180deg)";
});

// Glow
const glowColors = [
  "0 0 20px 8px rgba(255, 223, 0, 0.7)", // yellow
  "0 0 20px 8px rgba(0, 255, 255, 0.7)", // cyan
  "0 0 20px 8px rgba(255, 0, 255, 0.7)", // magenta
  "0 0 20px 8px rgba(0, 255, 0, 0.7)",   // green
  "0 0 20px 8px rgba(255, 0, 0, 0.7)"    // red
];
let glowIndex = 0;

document.getElementById('glowBtn').addEventListener('click', () => {
  saveState();
  if (myDiv.classList.contains("glow")) {
    myDiv.classList.remove("glow");
    myDiv.style.boxShadow = "";
  } else {
    myDiv.classList.add("glow");
    myDiv.style.boxShadow = glowColors[glowIndex];
    glowIndex = (glowIndex + 1) % glowColors.length;
  }
});

// Undo
document.getElementById('undoBtn').addEventListener('click', () => {
  if (historyStack.length > 0) {
    const lastState = historyStack.pop();
    restoreState(lastState);
  } else {
    alert("Nothing to undo!");
  }
});
