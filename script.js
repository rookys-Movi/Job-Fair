// This function runs when the entire page, including all assets, is fully loaded.
window.addEventListener('load', function() {

  // Initialize AOS for animations
  try {
    AOS.init({
      duration: 800,
      offset: 100,
      once: false // Set to false to animate on scroll up and down
    });
  } catch(e) {
    console.error('AOS initialization failed:', e);
  }

  // Chart data is now hardcoded here for maximum reliability.
  const chartData = {
    japanese: { n1: 62, n2: 28, other: 10 },
    english: { business: 53, conversational: 37, other: 10 }
  };

  createCharts(chartData);
});

/**
 * Creates charts using the provided data object.
 * @param {object} data The hardcoded chart data.
 */
function createCharts(data) {
  // 1. Create Japanese Level Pie Chart
  try {
    const pieCtx = document.getElementById('japaneseLevelChart').getContext('2d');
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['N1 Level', 'N2 Level', 'Other'],
        datasets: [{
          label: '日本語能力',
          data: [data.japanese.n1, data.japanese.n2, data.japanese.other],
          backgroundColor: ['#003366', '#4A90E2', '#F5A623'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } }
      }
    });
  } catch(e) {
    console.error('Pie chart rendering failed:', e);
  }

  // 2. Create English Level Bar Chart
  try {
    const barCtx = document.getElementById('englishLevelChart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Business Level+', 'Conversational', 'Other'],
        datasets: [{
          label: 'Percentage of Students',
          data: [data.english.business, data.english.conversational, data.english.other],
          backgroundColor: ['#003366', '#4A90E2', '#F5A623']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function(value) { return value + '%' }
            }
          }
        }
      }
    });
  } catch(e) {
    console.error('Bar chart rendering failed:', e);
  }
}
