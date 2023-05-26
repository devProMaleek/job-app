import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hooks/useFetch';

const NearbyJobs = () => {
  const router = useRouter();
  const { data, error, isLoading } = useFetch('search', {
    query: 'React Native Developer',
    page: '1',
    num_pages: '1',
  });

  const handleNavigate = useCallback(
    (job) => {
      router.push(`/job-details/${job.job_id}`);
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard key={`nearby-job-${job?.job_id}`} job={job} handleNavigate={handleNavigate} />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;

const pageStyles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});
