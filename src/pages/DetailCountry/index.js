import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { GlobalActions } from '../../redux/rootAction';
import CountryInfo from './components/CountryInfo';
import CountryLineChart from './components/CountryLineChart';
import RateStatistics from './components/RateStatistics';
import SearchCountry from '../../components/SearchCountry';
import './style.scss';

export default function DetailCountry() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { countrycode } = useParams();
  const [detailHistory, setDetailHistory] = useState({});
  const countries = useSelector((state) => state.GlobalReducer.countries);
  const [detailCountry, setDetailCountry] = useState({});
  const theme = useSelector((state) => state.GlobalReducer.theme);

  useEffect(() => {
    getCountries();
    getDetailCountry();
    getDetailHistory();
  }, [countrycode]);

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
  const getDetailCountry = () => {
    axios(`https://disease.sh/v3/covid-19/countries/${countrycode}`)
      .then((res) => {
        setDetailCountry(res.data);
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
  const getDetailHistory = () => {
    axios(
      `https://disease.sh/v3/covid-19/historical/${countrycode}?lastdays=all`,
    )
      .then((res) => {
        setDetailHistory(res.data.timeline);
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
    <div className={theme ? 'detail-container' : 'dark-detail-container'}>
      <div className="detail">
        <SearchCountry countries={countries} />
        <CountryInfo detailCountry={detailCountry} />
        <RateStatistics detailCountry={detailCountry} />
        <CountryLineChart detailHistory={detailHistory} />
      </div>
    </div>
  );
}
