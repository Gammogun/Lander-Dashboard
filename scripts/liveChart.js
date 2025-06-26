//Custom theme for data chart.
class SmallContrastText extends am5.Theme {
    setupDefaultRules() {

        this.rule("Label").setAll({
            fontSize: 15,
            fill: am5.color(0x2bc52b)

        });

    }
}
var am5ChartObject = am5.Root.new("livechartdiv");

// Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    am5ChartObject.setThemes([
        am5themes_Animated.new(am5ChartObject),   //allows zoom and interaction
        am5themes_Dark.new(am5ChartObject),   //dark theme for readability
        am5themes_Kelly.new(am5ChartObject),  //high contrast
        SmallContrastText.new(am5ChartObject)

    ]);

    // value is weight data
    var value = 0;

    // Generate chart
    function generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setMinutes(firstDate.getMinutes() - 2000);
        firstDate.setHours(0, 0, 0, 0);

        //sets desired amount of columns
        for (var i = 0; i < 15; i++) {
            var newDate = new Date(firstDate);
            //value = Math.random() * (30-0)

            chartData.push({
                date: newDate.getTime(),
                value: value
            });
        }
        return chartData;
    }
    var data = generateChartData();

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = am5ChartObject.container.children.push(am5xy.XYChart.new(am5ChartObject, {
        focusable: false,
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX"
    }));
    //Easing when new data is added
    var easing = am5.ease.linear;


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(am5ChartObject, {
        maxDeviation: 0.5,
        baseInterval: {
            timeUnit: "minute",
            count: 1
        },

        renderer: am5xy.AxisRendererX.new(am5ChartObject, {
            minorGridEnabled: true,
            minGridDistance: 50
        }),
        tooltip: am5.Tooltip.new(am5ChartObject, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(am5ChartObject, {
        renderer: am5xy.AxisRendererY.new(am5ChartObject, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.StepLineSeries.new(am5ChartObject, {
        minBulletDistance: 10,
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(am5ChartObject, {
            pointerOrientation: "horizontal",
            labelText: "{valueY}"
        })
    }));
    //Fill styling for each datapoint
    series.fills.template.setAll({
        fillOpacity: 0.5,
        visible: true
    });
    series.data.setAll(data);

    series.bullets.push(function () {
        return am5.Bullet.new(am5ChartObject, {
            locationX: undefined,
            sprite: am5.Circle.new(am5ChartObject, {
                radius: 4,
                fill: series.get("fill")
            })
        })
    });


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(am5ChartObject, {
        xAxis: xAxis
    }));
    cursor.lineY.set("visible", false);


    // Update data every 2 seconds
    // change when actually showing data
    /*
    setInterval(function () {
        addData();
    }, 2000)*/

    //Adds new data
    function addData() {
        var lastDataItem = series.dataItems[series.dataItems.length - 1];
        var lastValue = lastDataItem.get("valueY");
        var newValue = weight
        var lastDate = new Date(lastDataItem.get("valueX"));
        var time = am5.time.add(new Date(lastDate), "minute", 1).getTime();
        series.data.removeIndex(0);
        series.data.push({
            date: time,
            value: newValue
        })
        //Below is pure animation smoothing
        var newDataItem = series.dataItems[series.dataItems.length - 1];
        newDataItem.animate({
            key: "valueYWorking",
            to: newValue,
            from: lastValue,
            duration: 600,
            easing: easing
        });

        var animation = newDataItem.animate({
            key: "locationX",
            to: 0.5,
            from: -0.5,
            duration: 100
        });
        if (animation) {
            var tooltip = xAxis.get("tooltip");
            if (tooltip && !tooltip.isHidden()) {
                animation.events.on("stopped", function () {
                    xAxis.updateTooltip();
                })
            }
        }
    }
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(2000, 100);