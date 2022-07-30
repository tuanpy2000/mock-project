import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { GlobalActions } from '../../redux/rootAction';
import OverviewInfo from './components/OverviewInfo';
import TableInfo from './components/TableInfo';
import LineChart from './components/LineChart';
import MapChart from './components/MapChart';
import SearchCountry from '../../components/SearchCountry';
import './style.scss';

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [historyInfo, setHistoryInfo] = useState({});
  const countries = useSelector((state) => state.GlobalReducer.countries);
  const [totalInfo, setTotalInfo] = useState({});
  const theme = useSelector((state) => state.GlobalReducer.theme);
  useEffect(() => {
    getCountries();
    getTotalInfo();
    getHistoryInfo();
  }, []);

  const getHistoryInfo = () => {
    axios('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then((res) => {
        setHistoryInfo(res.data);
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(GlobalActions.setIsLoading(false));
        notification.error({
          message: t('error'),
          style: {
            marginTop: '10vh',
          },
        });
      });
  };

  const getCountries = () => {
    axios('https://disease.sh/v3/covid-19/countries')
      .then((res) => {
        dispatch(GlobalActions.setCountries(res.data));
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(GlobalActions.setIsLoading(false));
        notification.error({
          message: t('error'),
          style: {
            marginTop: '10vh',
          },
        });
      });
  };
  const getTotalInfo = () => {
    axios('https://disease.sh/v3/covid-19/all')
      .then((res) => {
        setTotalInfo(res.data);
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(GlobalActions.setIsLoading(false));
        notification.error({
          message: t('error'),
          style: {
            marginTop: '10vh',
          },
        });
      });
  };
  return (
    <div className={theme ? 'home-container' : 'dark-home-container'}>
      <SearchCountry countries={countries} />
      <OverviewInfo totalInfo={totalInfo} />
      <TableInfo countries={countries} />
      <LineChart historyInfo={historyInfo} />
      <MapChart countries={countries} />
    </div>
  );
}
