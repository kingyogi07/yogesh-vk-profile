// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let cx = 0, cy = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

function animateCursor() {
  cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
  rx += (cx - rx) * 0.12; ry += (cy - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    ring.style.width = '60px'; ring.style.height = '60px';
    ring.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    ring.style.width = '40px'; ring.style.height = '40px';
    ring.style.borderColor = 'var(--accent)';
  });
});

// Intersection observer for fade-up animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Profile image fallback logic
const img = document.getElementById('profileImg');
const placeholder = document.getElementById('imgPlaceholder');
if (img) {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  });
  // If src is empty or a local path, show placeholder immediately
  if (!img.src || img.src.startsWith('file://') || img.src === window.location.href) {
    img.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  }
}
