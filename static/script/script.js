// Hàm vẽ cây tim rơi
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

  // Thân cây
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(canvas.width / 2 - 10, canvas.height / 1.5, 20, 200);

  // Tạo thêm tim
  if (hearts.length < 200) createHeart();

  // Cập nhật vị trí tim
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

// Xử lý phát nhạc khi click
const music = document.getElementById('bg-music');
const clickText = document.getElementById('clickToPlay');

window.addEventListener('click', () => {
  if (music.paused) {
    music.play().then(() => {
      clickText.style.display = 'none';
    }).catch(err => console.log(err));
  }
});
