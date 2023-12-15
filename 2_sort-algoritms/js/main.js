// main.js
import { animateBubbleSort, stopBubbleSort } from './sortAlg/bubbleSort.js';
import { animateQuickSort,stopQuickSort } from './sortAlg/quickSort.js';
import { animateShakerSort, stopShakerSort } from './sortAlg/shakerSort.js';
import { animateMergeSort, stopMergeSort } from './sortAlg/mergeSort.js';
import { animateInsertionSort, stopInsertionSort } from './sortAlg/insertionSort.js';

let animationFrameId;

export function startSorting() {
  const arraySize = document.getElementById('arraySize').value;
  const algorithm = document.getElementById('algorithm').value;
  const array = generateRandomArray(arraySize);

  switch (algorithm) {
    case 'bubble':
      animationFrameId = animateBubbleSort(array);
      break;
    case 'quick':
      animationFrameId = animateQuickSort(array, 0, array.length - 1);
      break;
    case 'shaker':
      animationFrameId = animateShakerSort(array);
      break;
    case 'merge':
      animationFrameId = animateMergeSort(array);
      break;
    case 'insertion':
      animationFrameId = animateInsertionSort(array);
      break;
  }
}

export function stopSorting() {
  stopBubbleSort()
  stopQuickSort()
  stopShakerSort()
  stopMergeSort()
  stopInsertionSort()
}


function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function updateVisualization(container, array) {
  container.innerHTML = ''; 

  for (const value of array) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value * 3}px`;
    container.appendChild(bar);
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startSorting);
  
    const stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', stopSorting);
  });