// === Hiệu ứng tim rơi ===
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
const colors = ['#ff99cc', '#ff6699', '#ff3366', '#ff66b2', '#ff4d88'];

function createHeart() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const size = Math.random() * 4 + 2;
  const speed = Math.random() * 1 + 0.5;
  const color = colors[Math.floor(Math.random() * colors.length)];
  hearts.push({ x, y, size, speed, color });
}

function drawHeart(x, y, size, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  ctx.fillStyle = color;
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (hearts.length < 150) createHeart();

  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    h.y += h.speed;
    h.x += Math.sin(h.y / 20) * 0.5;

    drawHeart(h.x, h.y, h.size, h.color);

    if (h.y > canvas.height) {
      hearts.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}
animate();

// === Xử lý phát nhạc + trình chiếu ảnh ===
document.getElementById('clickToPlay').addEventListener('click', function() {
  const audio = document.getElementById('audio');
  const img = document.getElementById('slide');

  audio.play(); // Phát nhạc

  const totalImages = 8;
  let current = 1;
  img.classList.add('active');

  setInterval(() => {
    current++;
    if (current > totalImages) current = 1;

    img.classList.remove('active');
    setTimeout(() => {
      img.src = `/static/style/anh${current}.jpg`;
      img.classList.add('active');
    }, 500);
  }, 10000);
});
