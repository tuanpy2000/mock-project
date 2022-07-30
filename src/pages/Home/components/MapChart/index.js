import React from 'react';
import Highcharts from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';

export default function MapChart({ countries }) {
  const { t } = useTranslation();
  const dataCountryIso2 = countries
    .map((country) => country.countryInfo.iso2)
    .filter((item) => item !== null)
    .map((item) => item.toLowerCase());
  const dataCountryCase = countries
    .filter((country) => country.countryInfo.iso2 !== null)
    .map((country) => country.cases);
  const dataResult = dataCountryIso2.map((el, i) => [el, dataCountryCase[i]]);
  const options = {
    title: {
      text: t('World Map'),
    },
    chart: {
      map: worldMap,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox',
      },
    },
    colorAxis: {
      min: 0,
    },
    series: [
      {
        name: t('Confirmed Cases'),
        states: {
          hover: {
            color: '#BADA55',
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
        allAreas: false,
        data: dataResult,
      },
    ],
  };

  return (
    <div className="map-container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={options}
      />
    </div>
  );
}
