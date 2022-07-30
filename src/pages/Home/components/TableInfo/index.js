import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Table } from 'antd';

import './style.scss';
const { Title } = Typography;

export default function TableInfo({ countries }) {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('country'),
      dataIndex: 'country',
      render: ({ imgUrl, countryName }) => (
        <>
          <img src={imgUrl} alt="img" style={{ width: 20, marginRight: 5 }} />
          {countryName}
        </>
      ),
    },
    {
      title: t('confirmed'),
      dataIndex: 'confirmed',
      sorter: {
        compare: (a, b) => a.confirmed - b.confirmed,
        multiple: 3,
      },
    },
    {
      title: t('recovered'),
      dataIndex: 'recovered',
      sorter: {
        compare: (a, b) => a.recovered - b.recovered,
        multiple: 2,
      },
    },
    {
      title: t('deaths'),
      dataIndex: 'deaths',
      sorter: {
        compare: (a, b) => a.deaths - b.deaths,
        multiple: 1,
      },
    },
  ];
  let data = countries.map((country, index) => {
    return {
      key: index + 1,
      country: {
        imgUrl: country.countryInfo.flag,
        countryName: country.country,
      },
      confirmed: country.cases,
      recovered: country.recovered,
      deaths: country.deaths,
    };
  });

  return (
    <div className="table-container">
      <Title level={3} className="title">
        {t('tabletitle')}
      </Title>
      <Table
        columns={columns}
        dataSource={data}
        className="table"
        tableLayout="fixed"
      />
    </div>
  );
}
