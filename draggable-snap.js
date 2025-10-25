const draggableId = 'now-that-all-that-worry2.jpg'; // Replace with your image's ID
const linkUrl = 'https://www.sugiproject.com';
const dropZone = document.getElementById('drop-zone');
const draggable = document.getElementById(draggableId);

if (draggable) {
  let snapped = false;

  function isOverlapping(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return !(aRect.right < bRect.left || aRect.left > bRect.right || aRect.bottom < bRect.top || aRect.top > bRect.bottom);
  }

  function checkPosition() {
    if (snapped) return;

    if (isOverlapping(draggable, dropZone)) {
      snapped = true;
      const zoneRect = dropZone.getBoundingClientRect();
      const imgRect = draggable.getBoundingClientRect();

      draggable.style.position = 'absolute';
      draggable.style.left = `${zoneRect.left + window.scrollX + (zoneRect.width - imgRect.width)/2}px`;
      draggable.style.top = `${zoneRect.top + window.scrollY + (zoneRect.height - imgRect.height)/2}px`;
      draggable.style.cursor = 'pointer';

      draggable.onclick = () => { window.location.href = linkUrl; };
      dropZone.style.borderColor = '#29e';
      dropZone.style.color = '#29e';
      dropZone.innerText = 'Click the image!';
    } else {
      requestAnimationFrame(checkPosition);
    }
  }

  requestAnimationFrame(checkPosition);
}
