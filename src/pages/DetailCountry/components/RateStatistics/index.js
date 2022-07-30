import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography, Spin } from 'antd';

import { formatNumber } from '../../../../Ultis/FormatNum';
import './style.scss';
const { Title } = Typography;

export default function RateStatistics({ detailCountry }) {
  const { t } = useTranslation();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const { casesPerOneMillion, deathsPerOneMillion, recoveredPerOneMillion } =
    detailCountry;
  useEffect(() => {
    if (detailCountry) setIsLocalLoading(false);
  }, []);
  return (
    <div className="detail-rate">
      <div className="card-group">
        <Card size="small" className="casesrate-card">
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <Title level={4}>{t('casesrate')}</Title>
              <p>{formatNumber(casesPerOneMillion)}</p>

              <p>{t('ratetext')}</p>
            </>
          )}
        </Card>
        <Card size="small" className="recovered-card">
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <Title level={4}>{t('recoveredrate')}</Title>
              <p>{formatNumber(recoveredPerOneMillion)}</p>
              <p>{t('ratetext')}</p>
            </>
          )}
        </Card>
        <Card size="small" className="deathsrate-card">
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <Title level={4}>{t('deathsrate')}</Title>
              <p>{formatNumber(deathsPerOneMillion)}</p>
              <p>{t('ratetext')}</p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
