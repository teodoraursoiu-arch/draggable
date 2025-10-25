<div
  id="drop-zone"
  style="width:160px;height:160px;border:2px dashed #aaa;position:absolute;top:320px;left:100px;text-align:center;line-height:160px;color:#666;transition:all 0.2s ease;">
  Drop here
</div>

<script>
// ===== CONFIG =====
const draggableId = 'my-draggable-image'; // <-- Replace with your image's ID
const linkUrl = 'https://www.sugiproject.com';

const dropZone = document.getElementById('drop-zone');
const draggable = document.getElementById(draggableId);

if (!draggable) {
  console.warn(`No element found with ID "${draggableId}"`);
}

// ===== HELPER: check overlap =====
function isOverlapping(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.right < bRect.left ||
    aRect.left > bRect.right ||
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom
  );
}

// ===== OBSERVE POSITION =====
// Use requestAnimationFrame to check position continuously
let snapped = false;

function checkPosition() {
  if (snapped) return;

  if (draggable && isOverlapping(draggable, dropZone)) {
    snapped = true;

    // Snap the image into the drop zone
    const zoneRect = dropZone.getBoundingClientRect();
    const imgRect = draggable.getBoundingClientRect();

    draggable.style.position = 'absolute';
    draggable.style.left = `${zoneRect.left + window.scrollX + (zoneRect.width - imgRect.width)/2}px`;
    draggable.style.top = `${zoneRect.top + window.scrollY + (zoneRect.height - imgRect.height)/2}px`;
    draggable.style.cursor = 'pointer';

    // Make clickable
    draggable.onclick = () => {
      window.location.href = linkUrl;
    };

    // Visual feedback
    dropZone.style.borderColor = '#29e';
    dropZone.style.color = '#29e';
    dropZone.innerText = 'Click the image!';
  } else {
    requestAnimationFrame(checkPosition);
  }
}

// Start checking
requestAnimationFrame(checkPosition);
</script>
