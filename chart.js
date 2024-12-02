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
    xhttp.open("GET", "weatherData.csv", true);
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
    
function fetchCSVData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            var rows = data.split('\n');
            var dates = [];
            var wages = [];
            for (var i = 3; i < rows.length; i++) {
                var cols = rows[i].split(',');
                if (cols.length >= 2) {
                    var date = cols[0];
                    var wage = parseFloat(cols[1]);
                    if (!isNaN(wage)) {
                        dates.push(date);
                        wages.push(wage);
                    }
                }
            }
            makeLineChart(dates, wages);
        }
    };
    xhttp.open("GET", "DSM010_20241202-150923.csv", true);
    xhttp.send();
}

function makeLineChart(dates, wages) {
    var ctx = document.getElementById('chart2').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Minimālā mēneša alga (eiro)',
                data: wages,
                borderColor: '#36A2EB',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Minimālās mēneša algas izmaiņas' }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Izmaiņu datums' }
                },
                y: {
                    title: { display: true, text: 'Alga (eiro)' }
                }
            }
        }
    });
}
