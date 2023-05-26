import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hooks/useFetch';

const PopularJobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = useCallback((item) => {
    setSelectedJob(item.job_id);
    router.push(`/job-details/${item.job_id}`);
  }, []);

  const { data, error, isLoading } = useFetch('search', {
    query: 'React Native Developer',
    page: '1',
    num_pages: '1',
  });

  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={pageStyles.errorText}>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.medium, paddingBottom: '30px' }}
            // showsHorizontalScrollIndicator={false}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default PopularJobs;

const pageStyles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});
