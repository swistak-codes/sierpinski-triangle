import "./styles.css";

document.getElementById("app").innerHTML = `
<canvas id="canvas" width="500" height="500"></canvas>
<div>
  Głębokość rekursji: <input type="number" id="depth" min="0" max="8" step="1" value="3" />
</div>
`;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.strokeStyle = "black";
context.lineWidth = 1;

const depthInput = document.getElementById("depth");
let depth = parseInt(depthInput.value);

function countPoint(point1, point2) {
  return [(point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2];
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawTriangle(A, B, C) {
  context.fillStyle = `rgb(${random(0, 256)},${random(0, 256)},${random(
    0,
    256
  )})`;
  context.beginPath();
  context.moveTo(...A);
  context.lineTo(...B);
  context.lineTo(...C);
  context.lineTo(...A);
  context.fill();
  context.stroke();
}

function sierpinski(A, B, C, iteration) {
  if (iteration === 0) {
    drawTriangle(A, B, C);
  } else {
    sierpinski(A, countPoint(A, C), countPoint(A, B), iteration - 1);
    sierpinski(countPoint(A, B), countPoint(B, C), B, iteration - 1);
    sierpinski(countPoint(A, C), countPoint(B, C), C, iteration - 1);
  }
}

function draw() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const size = Math.min(width, height) - 100;
  const middle = [width / 2, height / 2];

  const A = [middle[0] - size / 2, middle[1] + size / 2];
  const B = [middle[0] + size / 2, middle[1] + size / 2];
  const C = [middle[0], middle[1] - size / 2];

  context.clearRect(0, 0, canvas.width, canvas.height);
  sierpinski(A, B, C, depth);
}

depthInput.onchange = (e) => {
  depth = parseInt(e.target.value);
  draw();
};
draw();
