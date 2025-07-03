let readings = {};
let currentDate = new Date();
let dayOffset = 0;

async function loadReadings() {
  try {
    const response = await fetch('readings.json');
    readings = await response.json();
    updateReadingPlan();
  } catch (error) {
    console.error('Error loading readings:', error);
  }
}

function updateReadingPlan() {
  const today = new Date(currentDate);
  today.setDate(currentDate.getDate() + dayOffset);
  const monthDay = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  document.getElementById('date').innerText = monthDay;

  const readingPlan = readings[monthDay];
  if (readingPlan) {
    document.getElementById('reading-plan').innerHTML = `
      <p><strong>Ószövetség:</strong> <span class="igemutato" data-ref="${readingPlan["Old Testament"].ref}"><a href="https://regi.szentiras.hu/KG/${readingPlan["Old Testament"].ref.replace(/ /g, '')}" target="_blank">${readingPlan["Old Testament"].ref}</a></span></p>
      <p><strong>Újszövetség:</strong> <span class="igemutato" data-ref="${readingPlan["New Testament"].ref}"><a href="https://regi.szentiras.hu/KG/${readingPlan["New Testament"].ref.replace(/ /g, '')}" target="_blank">${readingPlan["New Testament"].ref}</a></span></p>
      <p><strong>Zsoltárok:</strong> <span class="igemutato" data-ref="${readingPlan["Psalms"].ref}"><a href="https://regi.szentiras.hu/KG/${readingPlan["Psalms"].ref.replace(/ /g, '')}" target="_blank">${readingPlan["Psalms"].ref}</a></span></p>
      <p><strong>Példabeszédek:</strong> <span class="igemutato" data-ref="${readingPlan["Proverbs"].ref}"><a href="https://regi.szentiras.hu/KG/${readingPlan["Proverbs"].ref.replace(/ /g, '')}" target="_blank">${readingPlan["Proverbs"].ref}</a></span></p>
    `;
    reloadIgemutatoScript();
  } else {
    document.getElementById('reading-plan').innerText = "No reading plan available for today.";
  }
  updateProgressBar();
}

function changeDay(offset) {
  dayOffset += offset;
  updateReadingPlan();
}

function updateProgressBar() {
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1); // January 1 of the current year
  const today = new Date(currentDate);
  today.setDate(currentDate.getDate() + dayOffset); // Adjusted for day offset

  // Check if the current date goes beyond the end of the year
  const nextYear = currentDate.getFullYear() + 1;
  const endOfYear = new Date(nextYear, 0, 1); // January 1 of the next year

  let dayOfYear, totalDays;

  if (today >= endOfYear) {
    // If the date is in the new year, reset to the beginning of the next year
    const newStartOfYear = new Date(nextYear, 0, 1); // January 1 of the next year
    dayOfYear = Math.floor((today - newStartOfYear) / (1000 * 60 * 60 * 24)) + 1;
    totalDays = 365 + (isLeapYear(nextYear) ? 1 : 0); // Account for leap years
  } else {
    // Normal progress within the current year
    dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
    totalDays = 365 + (isLeapYear(currentDate.getFullYear()) ? 1 : 0); // Account for leap years
  }

  const progressPercentage = (dayOfYear / totalDays) * 100;

  const progressBar = document.querySelector('.progress');
  progressBar.style.width = `${progressPercentage}%`;

  // Update percentage text
  let progressBarText = document.querySelector('.progress-bar-text');
  if (!progressBarText) {
    progressBarText = document.createElement('div');
    progressBarText.classList.add('progress-bar-text');
    document.querySelector('.progress-bar').appendChild(progressBarText);
  }
  progressBarText.textContent = `${progressPercentage.toFixed(1)}%`; // Show 1 decimal place
}

// Helper function to check for leap years
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function toggleMode() {
  document.body.classList.toggle('light-mode');
}

function reloadIgemutatoScript() {
  const oldScript = document.getElementById('igemutato-script');
  if (oldScript) oldScript.remove();

  const newScript = document.createElement('script');
  newScript.id = 'igemutato-script';
  newScript.src = 'https://molnarm.github.io/igemutato.min.js';
  document.body.appendChild(newScript);
}

window.onload = loadReadings;
