import { updateVisualization, sleep } from '../main.js';

let bubbleAnimationFrameId;

export function stopBubbleSort() {
  cancelAnimationFrame(bubbleAnimationFrameId);
  bubbleAnimationFrameId = null;
}

export async function animateBubbleSort(array) {
  const barsContainer = document.getElementById('visualization');
  let swapped;

  do {
    if (bubbleAnimationFrameId === null) {
      break;
    }

    swapped = false;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        updateVisualization(barsContainer, array);
        await sleep(100);
        swapped = true;
      }
    }

    if (!swapped) break;

    for (let i = array.length - 2; i >= 0; i--) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        updateVisualization(barsContainer, array);
        await sleep(100);
        swapped = true;
      }
    }
  } while (swapped && bubbleAnimationFrameId !== null);
}