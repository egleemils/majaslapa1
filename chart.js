function fetchCSVData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var rows = data.split('\n');
            var months = [];
            var temperatures = [];
            for (var i = 1; i < rows.length; i++) {
                var cols = rows[i].split(',');
                if (cols.length >= 2) {
                    months.push(cols[0]);
                    temperatures.push(parseFloat(cols[1]));
                }
            }
            makeBarChart(months, temperatures);
        }
    };
    xhttp.open("GET", "DSM010_20241202-150923.csv", true);
    xhttp.send();
}

function makeBarChart(months, temperatures) {
    var ctx1 = document.getElementById('chart1').getContext('2d');
    var chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Vidējā Temperatūra (°C)',
                data: temperatures,
                backgroundColor: '#36A2EB'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Vidējā Temperatūra gada sākumā' }
            }
        }
    });
}

function createExperienceChart() {
    var ctx2 = document.getElementById('chart2').getContext('2d');
    var chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Minimālās Mēnešalgas Pieaugums (€)',
                data: [430, 500, 550, 620, 700],
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Minimālās Mēnešalgas Pieaugums (2020–2024)' }
            },
            scales: {
                x: { title: { display: true, text: 'Gads' } },
                y: { title: { display: true, text: 'Alga (€)' } }
            }
        }
    });
}

window.onload = function() {
    fetchCSVData();
    createExperienceChart();
};
