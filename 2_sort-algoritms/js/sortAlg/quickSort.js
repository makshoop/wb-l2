import { updateVisualization, sleep } from '../main.js';

let quickAnimationFrameId;

export function stopQuickSort() {
  cancelAnimationFrame(quickAnimationFrameId);
  quickAnimationFrameId = null;
}

export async function animateQuickSort(array, low, high) {
  quickAnimationFrameId = requestAnimationFrame(() => quickSort(array, low, high));
}

async function quickSort(array, low, high) {
  if (low < high && quickAnimationFrameId !== null) {
    const partitionIndex = await partition(array, low, high);
    await animateQuickSort(array, low, partitionIndex - 1);
    await animateQuickSort(array, partitionIndex + 1, high);
  }
}

async function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot && quickAnimationFrameId !== null) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      updateVisualization(document.getElementById('visualization'), array);
      await sleep(100);
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  updateVisualization(document.getElementById('visualization'), array);
  await sleep(100);

  return i + 1;
}