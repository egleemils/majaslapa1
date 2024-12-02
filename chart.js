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
                    months.push(cols[0]); // Pieņemot, ka pirmā kolonna ir mēneši
                    temperatures.push(parseFloat(cols[1])); // Pieņemot, ka otrā kolonna ir temperatūras
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
            var years = [];
            var salaries = [];

            for (var i = 1; i < rows.length; i++) {
                var cols = rows[i].split(',');
                if (cols.length >= 2) {
                    years.push(cols[0]); // Pieņemot, ka pirmā kolonna ir gadi
                    salaries.push(parseFloat(cols[1])); // Pieņemot, ka otrā kolonna ir algas
                }
            }

            makeSalaryChart(years, salaries);
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

function makeSalaryChart(years, salaries) {
    var ctx2 = document.getElementById('chart2').getContext('2d');
    var chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Minimālās Mēnešalgas Pieaugums (€)',
                data: salaries,
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
                y: {
