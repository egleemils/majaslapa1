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
    xhttp.open("GET", "WeatherData-DigitalTransformationII.csv", true);
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
    type: 'pie',
    data: {
    labels: ['Paula', 'Nils', 'Emīls'],
    datasets: [{
    data: [1, 3, 4],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
    },
    options: {
    responsive: true,
    plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Komandas Dalībnieku Pieredze' }
    }
    }
    });
    }
    
    window.onload = function() {
    fetchCSVData();
    createExperienceChart();
    };