import React, { useEffect, useState } from 'react';
import { Button, List, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

import './style.scss';
import { GlobalActions } from '../../redux/rootAction';

export default function News() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const dataUrl = `https://corona--tracker.herokuapp.com/newslist?_page=${page}&_limit=12`;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.GlobalReducer.theme);

  useEffect(() => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(data.concat(res));
        setList(data.concat(res));
        setLoading(false);
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((error) => {
        dispatch(GlobalActions.setIsLoading(false));
        notification.error({
          message: t('error'),
          style: {
            marginTop: '10vh',
          },
        });
      });
  }, [page]);

  const onLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
    setList(
      data.concat(
        [...new Array(12)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          lineHeight: '32px',
          height: 44,
        }}
      >
        <Button onClick={onLoadMore} className="loadmore-button">
          Loading More
        </Button>
      </div>
    ) : null;
  return (
    <div className={theme ? 'news-container' : 'dark-news-container'}>
      <List
        size="large"
        className="loadmore-list"
        loading={initLoading}
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta title={<a href={item.url}>{item.title}</a>} />
              <img src={item.urlToImage} width={160} align="left" />
              <span className="news-des">{item.description}</span>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}
