const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// Vẽ thân cây
function drawTree() {
  ctx.beginPath();
  ctx.moveTo(W / 2, H);
  ctx.lineTo(W / 2, H - 200);
  ctx.lineWidth = 16;
  ctx.strokeStyle = "#5a381e";
  ctx.stroke();
  ctx.closePath();
}

// Tạo trái tim
function drawHeart(x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -3, -5, -5, -2);
  ctx.bezierCurveTo(-8, 2, 0, 6, 0, 10);
  ctx.bezierCurveTo(0, 6, 8, 2, 5, -2);
  ctx.bezierCurveTo(3, -5, 0, -3, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

// Danh sách trái tim
let hearts = [];
const colors = ["#ff4d6d", "#ff99ac", "#ffb3c1", "#ffc8dd", "#ff85a1", "#f72585", "#ff69b4", "#ff7b9c", "#f48fb1"];

for (let i = 0; i < 300; i++) {
  hearts.push({
    x: W / 2 + (Math.random() - 0.5) * 300,
    y: H / 2 - Math.random() * 250,
    size: Math.random() * 0.8 + 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    offsetX: (Math.random() - 0.5) * 0.5,
    offsetY: Math.random() * 0.5,
  });
}

function drawHearts() {
  hearts.forEach(h => {
    drawHeart(h.x, h.y, h.size, h.color);
  });
}

// Hiệu ứng gió nhẹ
function animate() {
  ctx.clearRect(0, 0, W, H);
  drawTree();

  hearts.forEach(h => {
    h.x += h.offsetX;
    h.y += Math.sin(h.x / 20) * 0.2;
  });

  drawHearts();
  requestAnimationFrame(animate);
}

drawTree();
animate();
