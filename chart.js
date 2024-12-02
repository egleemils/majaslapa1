function fetchWeatherData() {
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
    xhttp.open("GET", "WeatherData.csv", true);
    xhttp.send();
}

function fetchSalaryData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var rows = data.split('\n');
            var dates = [];
            var wages = [];

            for (var i = 2; i < rows.length; i++) {
                var cols = rows[i].split(',');
                if (cols.length >= 2) {
                    dates.push(cols[0]);
                    wages.push(parseFloat(cols[1]));
                }
            }

            makeSalaryChart(dates, wages);
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

function makeSalaryChart(dates, wages) {
    var ctx2 = document.getElementById('chart2').getContext('2d');
    var chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Minimālās Mēnešalgas Pieaugums (€)',
                data: wages,
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Minimālās Mēnešalgas Pieaugums' }
            },
            scales: {
                x: { title: { display: true, text: 'Gads' } },
                y: { title: { display: true, text: 'Alga (€)' } }
            }
        }
    });
}

window.onload = function() {
    fetchWeatherData();
    fetchSalaryData();
};
