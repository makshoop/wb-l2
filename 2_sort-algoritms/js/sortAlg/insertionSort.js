import { updateVisualization, sleep } from '../main.js';

let insertionAnimationFrameId;

export function stopInsertionSort() {
  cancelAnimationFrame(insertionAnimationFrameId);
  insertionAnimationFrameId = null;
}

export async function animateInsertionSort(array) {
  insertionAnimationFrameId = requestAnimationFrame(() => insertionSort(array));
}

async function insertionSort(array) {
  const barsContainer = document.getElementById('visualization');

  for (let i = 1; i < array.length && insertionAnimationFrameId !== null; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key && insertionAnimationFrameId !== null) {
      array[j + 1] = array[j];
      updateVisualization(barsContainer, array);
      await sleep(100);
      j--;
    }

    array[j + 1] = key;
    updateVisualization(barsContainer, array);
    await sleep(100);
  }
}