// CONFIG: Update these IDs to match your elements
const draggableId = 'my-draggable-image'; // your existing draggable element
const dropZoneId = 'drop-zone';           // the target drop zone
const linkUrl = 'https://www.sugiproject.com';

// Grab elements
const draggable = document.getElementById(draggableId);
const dropZone = document.getElementById(dropZoneId);

if (!draggable || !dropZone) {
  console.warn('Draggable element or drop zone not found.');
}

let snapped = false;

// HELPER: Check if draggable overlaps drop zone
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

// POLLING LOOP: Detect when draggable is over the drop zone
function checkPosition() {
  if (!snapped && isOverlapping(draggable, dropZone)) {
    snapped = true;

    // Snap into center of drop zone
    const zoneRect = dropZone.getBoundingClientRect();
    const imgRect = draggable.getBoundingClientRect();

    draggable.style.position = 'absolute';
    draggable.style.left = `${zoneRect.left + window.scrollX + (zoneRect.width - imgRect.width)/2}px`;
    draggable.style.top = `${zoneRect.top + window.scrollY + (zoneRect.height - imgRect.height)/2}px`;
    draggable.style.cursor = 'pointer';

    // Make it clickable
    draggable.onclick = () => { window.location.href = linkUrl; };

    // Optional: visual feedback
    dropZone.style.borderColor = '#29e';
    dropZone.style.color = '#29e';
    dropZone.innerText = 'Click the image!';
  } else if (!snapped) {
    requestAnimationFrame(checkPosition);
  }
}

// Start monitoring
requestAnimationFrame(checkPosition);