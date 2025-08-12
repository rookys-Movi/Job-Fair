window.addEventListener('load', function() {
  try {
    AOS.init({
      duration: 800,
      offset: 100,
      once: false 
    });
  } catch(e) {
    console.error('AOS initialization failed:', e);
  }

  const chartData = {
    japanese: { n1: 62, n2: 28, other: 10 },
    english: { business: 53, conversational: 37, other: 10 }
  };
  createCharts(chartData);
});

function createCharts(data) {
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
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }
    });
  } catch(e) { console.error('Pie chart rendering failed:', e); }

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
        responsive: true, maintainAspectRatio: false, indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, ticks: { callback: function(value) { return value + '%' } } } }
      }
    });
  } catch(e) { console.error('Bar chart rendering failed:', e); }
}
