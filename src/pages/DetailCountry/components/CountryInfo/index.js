import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography, Spin } from 'antd';

import './style.scss';
import { formatNumber } from '../../../../Ultis/FormatNum';
const { Text, Title } = Typography;

export default function CountryInfo({ detailCountry }) {
  const { t } = useTranslation();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const {
    cases,
    recovered,
    deaths,
    todayCases,
    todayRecovered,
    todayDeaths,
    country,
    countryInfo,
    population,
  } = detailCountry;
  useEffect(() => {
    if (detailCountry) setIsLocalLoading(false);
  }, []);
  return (
    <div className="detailcountry">
      <div className="detailcountry-title">
        <img src={countryInfo?.flag} alt="flag" />
        <Title level={3} className="title">
          {country + ' ' + t('detailcountrytitle')}
        </Title>
      </div>
      <Title level={4} className="population">
        {t('population')}:
        <Text keyboard italic>
          {' '}
          {formatNumber(population)}
        </Text>
      </Title>
      <div className="card-group">
        <Card
          size="small"
          title={
            <Text strong type="warning">
              {t('confirmed')}
            </Text>
          }
          className="confirmed-card"
        >
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <p>{formatNumber(cases)}</p>
              <p>
                +{formatNumber(todayCases)} {t('countrynewcases')}
              </p>
            </>
          )}
        </Card>
        <Card
          size="small"
          title={
            <Text strong type="success">
              {t('recovered')}
            </Text>
          }
          className="recovered-card"
        >
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <p>{formatNumber(recovered)}</p>
              <p>
                +{formatNumber(todayRecovered)} {t('countrynewcases')}
              </p>
            </>
          )}
        </Card>
        <Card
          size="small"
          title={
            <Text strong type="danger">
              {t('deaths')}
            </Text>
          }
          className="deaths-card"
        >
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <p>{formatNumber(deaths)}</p>
              <p>
                +{formatNumber(todayDeaths)} {t('countrynewcases')}
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
