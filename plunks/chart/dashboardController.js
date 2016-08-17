function initChartConfig(data) {

    return{
        xAxis:
        {

            categories: data.microGrid.mm,
            title:{text:'mm'}
        },title: {
            text: null
        },            subtitle: {
            text: null
        },

        yAxis: { title: { text: 'hv/cut' },tickInterval: 10,min:0 },
        tooltip: { valueSuffix: ' ' },
        legend: { align: 'right', layout: 'vertical', verticalAlign: 'middle', borderWidth: 0 },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2

                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            },
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }

        },
        credits: {
            enabled: false
        },
        series: [
            {


                name: 'hv',
                type:'line',
                yaxis:1,
                data: data.microGrid.hv

            },
            {
                name: 'cut',
                yaxis:2,
                type:'line',
                data: data.microGrid.cut

            }]
    };
}