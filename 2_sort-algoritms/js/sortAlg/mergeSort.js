import { updateVisualization, sleep } from '../main.js';

let mergeAnimationFrameId;

export function stopMergeSort() {
  cancelAnimationFrame(mergeAnimationFrameId);
  mergeAnimationFrameId = null;
}

export async function animateMergeSort(array) {
  mergeAnimationFrameId = requestAnimationFrame(() => mergeSort(array, 0, array.length - 1));
}

async function mergeSort(array, left, right) {
  if (left < right && mergeAnimationFrameId !== null) {
    const middle = Math.floor((left + right) / 2);
    await mergeSort(array, left, middle);
    await mergeSort(array, middle + 1, right);
    await merge(array, left, middle, right);
  }
}

async function merge(array, left, middle, right) {
  const barsContainer = document.getElementById('visualization');
  const n1 = middle - left + 1;
  const n2 = right - middle;
  const leftArray = array.slice(left, left + n1);
  const rightArray = array.slice(middle + 1, middle + 1 + n2);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2 && mergeAnimationFrameId !== null) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }

    updateVisualization(barsContainer, array);
    await sleep(100);
    k++;
  }

  while (i < n1 && mergeAnimationFrameId !== null) {
    array[k] = leftArray[i];
    i++;
    k++;
    updateVisualization(barsContainer, array);
    await sleep(100);
  }

  while (j < n2 && mergeAnimationFrameId !== null) {
    array[k] = rightArray[j];
    j++;
    k++;
    updateVisualization(barsContainer, array);
    await sleep(100);
  }
}