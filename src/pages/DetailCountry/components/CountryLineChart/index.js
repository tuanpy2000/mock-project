import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

export default function CountryLineChart(detailHistory) {
  const { t } = useTranslation();
  const options = {
    title: {
      text: t('Country chart'),
    },
    xAxis: {
      categories: _.keys(detailHistory.detailHistory.cases),
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
        data: _.values(detailHistory.detailHistory.cases),
      },
      {
        name: t('recovered'),
        color: 'green',
        data: _.values(detailHistory.detailHistory.recovered),
      },
      {
        name: t('deaths'),
        color: 'red',
        data: _.values(detailHistory.detailHistory.deaths),
      },
    ],
  };
  return (
    <div className="country-line-chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
