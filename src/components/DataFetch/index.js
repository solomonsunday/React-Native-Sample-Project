import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

import { useWindowDimensions } from 'react-native';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import Placeholders from 'src/components/Placeholders';

import FetchFailed from './FetchFailed';

export default function WithDefaultFetch(
  WrappedComponent,
  fetchUrl,
  placeholderProp,
) {
  const isMounted = useRef(false);

  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  const [isLoading, setIsLoading] = useState(true);

  const [isError, setIsError] = useState(false);

  const [posts, setPosts] = useState(null);

  const [challengeData, setChallengeData] = useState({});

  const [exploreData, setExploreData] = useState({});

  // console.log('challenge data from with paginated -> ', challengeData);

  const getMaxHeight = () => {
    if (placeholderProp.maxHeight <= 1) {
      return height * placeholderProp.maxHeight;
    }
    return placeholderProp.maxHeight;
  };

  const getChallenges = async () => {
    const res = await Api.getChallenges();
    // console.log(res);
    const { pageData } = res;
    // console.log(pageData.data);
    setChallengeData(pageData);
  };

  const getExploreData = async () => {
    const res = await Api.getExplore();
    // console.log(res);
    const { pageData } = res;
    // console.log(pageData.data);
    setExploreData(pageData);
  };

  useEffect(() => {
    getChallenges();
    getExploreData();
  }, []);

  // console.log('from datafetched => ', challengeData);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const res = await Api.getStories(fetchUrl);

      const { pageData } = await res;

      const { data } = await pageData;

      if (isMounted.current) {
        setPosts(data);
      }
    } catch (e) {
      if (isMounted.current) {
        setIsError(true);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [fetchUrl, isMounted]);

  useEffect(() => {
    isMounted.current = true;
    fetchPosts();

    return () => {
      // Api.cancelRequest('Request aborted');
      isMounted.current = false;
    };
  }, [fetchPosts]);

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
        onPress={fetchPosts}
        info={t('networkError')}
        retry={t('retry')}
      />
    );
  }
  if (posts && posts.length > 0) {
    return (
      <>
        <WrappedComponent
          info={posts}
          chaData={challengeData}
          exploreData={exploreData}
        />
      </>
    );
  }
  return (
    <FetchFailed
      onPress={fetchPosts}
      info={t('noVideos')}
      retry={t('refresh')}
    />
  );
}
