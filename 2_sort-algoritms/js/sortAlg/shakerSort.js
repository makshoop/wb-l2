import { updateVisualization, sleep } from '../main.js';

let shakerAnimationFrameId;

export function stopShakerSort() {
  cancelAnimationFrame(shakerAnimationFrameId);
  shakerAnimationFrameId = null;
}

export async function animateShakerSort(array) {
  shakerAnimationFrameId = requestAnimationFrame(() => shakerSort(array));
}

async function shakerSort(array) {
  const barsContainer = document.getElementById('visualization');
  let swapped;

  async function swap(i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    await sleep(100);
    updateVisualization(barsContainer, array);
  }

  async function forwardPass() {
    for (let i = 0; i < array.length - 1 && shakerAnimationFrameId !== null; i++) {
      if (array[i] > array[i + 1]) {
        await swap(i, i + 1);
        swapped = true;
      }
    }
  }

  async function backwardPass() {
    for (let i = array.length - 2; i >= 0 && shakerAnimationFrameId !== null; i--) {
      if (array[i] > array[i + 1]) {
        await swap(i, i + 1);
        swapped = true;
      }
    }
  }

  do {
    swapped = false;
    await forwardPass();

    if (!swapped) {
      break;
    }

    await backwardPass();
  } while (swapped && shakerAnimationFrameId !== null);
}

async function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  const barsContainer = document.getElementById('visualization');
  await sleep(100);
  updateVisualization(barsContainer, array);
}