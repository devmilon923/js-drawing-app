// Get the canvas element and its context
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to fill the viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to track drawing state
let isDrawing = false;

// Default stroke color and width
let strokeColor = "#000000"; // Default color is black
let lineWidth = 2; // Default line width

// Function to handle the start of drawing
function startDrawing(event) {
  isDrawing = true; // Start drawing
  ctx.beginPath(); // Begin a new path
  const { offsetX, offsetY } = getEventPosition(event); // Get the current position
  ctx.moveTo(offsetX, offsetY); // Move to the starting point
}

// Function to handle the end of drawing
function stopDrawing() {
  isDrawing = false; // Stop drawing
}

// Function to handle drawing on the canvas
function draw(event) {
  if (isDrawing) {
    const { offsetX, offsetY } = getEventPosition(event); // Get the current position
    ctx.lineTo(offsetX, offsetY); // Draw a line to the new position
    ctx.stroke(); // Render the line
  }
}

// Function to get event position, accounting for touch events
function getEventPosition(event) {
  if (event.touches && event.touches.length > 0) {
    // Handle touch events
    return {
      offsetX: event.touches[0].clientX - canvas.offsetLeft,
      offsetY: event.touches[0].clientY - canvas.offsetTop,
    };
  } else {
    // Handle mouse events
    return {
      offsetX: event.offsetX,
      offsetY: event.offsetY,
    };
  }
}

// Event listeners for mouse events
canvas.addEventListener("mousedown", startDrawing); // Start drawing on mouse down
canvas.addEventListener("mouseup", stopDrawing); // Stop drawing on mouse up
canvas.addEventListener("mousemove", draw); // Draw on mouse move

// Event listeners for touch events
canvas.addEventListener("touchstart", (event) => {
  event.preventDefault(); // Prevent scrolling while drawing
  startDrawing(event); // Start drawing on touch start
});
canvas.addEventListener("touchend", stopDrawing); // Stop drawing on touch end
canvas.addEventListener("touchmove", (event) => {
  event.preventDefault(); // Prevent scrolling while drawing
  draw(event); // Draw on touch move
});

// Reset the canvas when the reset button is clicked
document.getElementById("resetButton").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
});

// Change the stroke color based on the color picker input
document.getElementById("colorPicker").addEventListener("input", (event) => {
  strokeColor = event.target.value; // Update the stroke color
  ctx.strokeStyle = strokeColor; // Apply the new stroke color
});
document.getElementById("line").addEventListener("input", (event) => {
  lineWidth = event.target.value; // Update the stroke color
  ctx.lineWidth = lineWidth; // Apply the new stroke color
});

// Save the canvas content as an image when the save button is clicked
document.getElementById("saveButton").addEventListener("click", () => {
  const imageUrl = canvas.toDataURL("image/png"); // Get the image data URL
  const link = document.createElement("a"); // Create a link element
  link.href = imageUrl; // Set the link's href to the image URL
  link.download = "drawing.png"; // Set the download attribute with a default filename
  link.click(); // Trigger the download
});

// Initialize stroke style
ctx.strokeStyle = strokeColor; // Set the initial stroke color
ctx.lineWidth = lineWidth; // Set the line width
ctx.lineCap = "round"; // Round the ends of lines
// ctx.strokeStyle = lineWidth;
