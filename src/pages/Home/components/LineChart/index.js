import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

export default function LineChart(historyInfo) {
  const { t } = useTranslation();
  const options = {
    title: {
      text: t('Overview chart'),
    },
    xAxis: {
      categories: _.keys(historyInfo.historyInfo.cases),
    },
    yAxis: {
      title: {
        text: t('cases'),
      },
    },
    plotOptions: {
      series: {
        events: {
          legendItemClick: function () {
            if (this.visible) {
              var count = 0;
              for (var index in this.chart.series) {
                if (this.chart.series[index].visible) {
                  count = count + 1;
                  if (count > 1) break;
                }
              }
              if (count === 1) return false;
            }
          },
        },
      },
    },
    series: [
      {
        name: t('Cases'),
        color: 'orange',
        data: _.values(historyInfo.historyInfo.cases),
      },
      {
        name: t('recovered'),
        color: 'green',
        data: _.values(historyInfo.historyInfo.recovered),
      },
      {
        name: t('deaths'),
        color: 'red',
        data: _.values(historyInfo.historyInfo.deaths),
      },
    ],
  };

  return (
    <div className="linechart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />;
    </div>
  );
}
