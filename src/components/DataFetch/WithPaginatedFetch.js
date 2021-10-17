import React, { useContext, useState } from 'react';

import { useWindowDimensions } from 'react-native';

import { useQuery } from 'react-query';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import Placeholders from 'src/components/Placeholders';

import FetchFailed from './FetchFailed';

export default function WithPaginatedFetch(
  WrappedComponent,
  fetchUrl,
  placeholderProp,
  userPostData,
  origin,
) {
  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [activePage, setPage] = useState('default');

  // get placeholder max height based on received props
  const getMaxHeight = () => {
    if (placeholderProp.maxHeight <= 1) {
      return height * placeholderProp.maxHeight;
    }
    return placeholderProp.maxHeight;
  };

  // prettier-ignore
  const {
    isLoading, isError, data, refetch,
  } = useQuery(
    ['defaultVideos', activePage],
    async () => {
      const promise = await Api.getVideos(fetchUrl, activePage);
      promise.cancel = () => Api.cancelRequest('Request aborted');
      return promise;
    },
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 1,
    },
  );

  if (isLoading) {
    return (
      <Placeholders
        mediaLeft={placeholderProp.mediaLeft}
        row
        count={placeholderProp.count || 4}
        numColumns={placeholderProp.numColumns || 2}
        maxHeight={getMaxHeight()}
        maxWidth={width}
      />
    );
  }
  if (isError) {
    return (
      <FetchFailed
        onPress={refetch}
        info={t('networkError')}
        retry={t('retry')}
      />
    );
  }
  if (!isLoading && !isError && data.pageData.data.length > 0) {
    return (
      <>
        <WrappedComponent
          info={data.pageData.data}
          allEntries={userPostData}
          origin={origin}
        />
      </>
    );
  }
  return (
    <FetchFailed onPress={refetch} info={t('noVideos')} retry={t('refresh')} />
  );
}
