import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';

const PopularJobs = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item }) => <PopularJobCard item={item} />}
            keyExtractor={item => item}
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
    color: 'red'
  }
});
