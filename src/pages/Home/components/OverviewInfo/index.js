import React, { useState, useEffect } from 'react';
import { Typography, Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import './style.scss';
import { formatNumber } from '../../../../Ultis/FormatNum';
const { Title, Text } = Typography;

function OverviewInfo({ totalInfo }) {
  const { cases, recovered, deaths } = totalInfo;
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (totalInfo) setIsLocalLoading(false);
  }, []);

  return (
    <div className="overview">
      <Title level={3} className="title">
        {t('overviewinfotitle')}
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
          {isLocalLoading ? <Spin /> : <p>{formatNumber(cases)}</p>}
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
          {isLocalLoading ? <Spin /> : <p>{formatNumber(recovered)}</p>}
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
          {isLocalLoading ? <Spin /> : <p>{formatNumber(deaths)}</p>}
        </Card>
      </div>
    </div>
  );
}

export default OverviewInfo;
