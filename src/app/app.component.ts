import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fv-highcharts';

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions1: Options = {
    chart: {
      height: 200
    },

    title: {
      text: 'First Chart'
    },

    credits: {
      enabled: false
    },

    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },

    series: [
      {
        type: 'line',
        data: [
          29.9,
          71.5,
          106.4,
          129.2,
          144.0,
          176.0,
          135.6,
          148.5,
          216.4,
          194.1,
          95.6,
          54.4
        ],
        showInLegend: false
      }
    ],

    exporting: {
      enabled: false // hide button
    }
  };

  chartOptions2: Options = {
    chart: {
      type: 'column',
      height: 200
    },

    title: {
      text: 'Second Chart'
    },

    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },

    series: [
      {
        type: 'column',
        data: [
          176.0,
          135.6,
          148.5,
          216.4,
          194.1,
          95.6,
          54.4,
          29.9,
          71.5,
          106.4,
          129.2,
          144.0
        ],
        colorByPoint: true,
        showInLegend: false
      }
    ],

    exporting: {
      enabled: true, // hide button
      chartOptions: {
        chart: {
          borderWidth: 2,
          borderColor: 'red'
        }
      }
    }
  };

  export2Png() {
    (Highcharts as any).exportCharts([Highcharts.charts[0], Highcharts.charts[1]]);
  }

  export2Pdf() {
    (Highcharts as any).exportCharts([Highcharts.charts[0], Highcharts.charts[1]], {
      type: 'application/pdf'
    });
  }
}

HC_more(Highcharts);
HC_exporting(Highcharts);

(function (Highcharts: any) {
  /**
   * Create a global getSVG method that takes an array of charts as an
   * argument
   */

  Highcharts.getSVG = function(charts) {
    var svgArr = [], top = 0, width = 0;

    Highcharts.each(charts, function(chart) {
      var svg = chart.getSVG(),
        // Get width/height of SVG for export
        svgWidth = +svg.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1],
        svgHeight = +svg.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1];

      svg = svg.replace(
        '<svg',
        '<g transform="translate(' + width + ', 0 ) rotate(270 300 300)" '
      );
      svg = svg.replace('</svg>', '</g>');

      width += svgHeight;
      top = Math.max(top, svgWidth);

      svgArr.push(svg);
    });

    return (
      '<svg height="' +
      top +
      '" width="' +
      width +
      '" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
      svgArr.join('') +
      '</svg>'
    );
  };

  /**
   * Create a global exportCharts method that takes an array of charts as an
   * argument, and exporting options as the second argument
   */
  Highcharts.exportCharts = function(charts, options) {
    charts.forEach(function(chart) {
      chart.update({
        chart: {
          borderColor: 'green',
          borderWidth: 2
        }
      });
    });

    // Merge the options
    options = Highcharts.merge(Highcharts.getOptions().exporting, options);

    // Post to export server
    Highcharts.post(options.url, {
      filename: options.filename || 'chart',
      type: options.type,
      width: options.width,
      svg: Highcharts.getSVG(charts)
    });

    charts.forEach(function(chart) {
      chart.update({
        chart: {
          borderWidth: 0
        }
      });
    });
  };
})(Highcharts);