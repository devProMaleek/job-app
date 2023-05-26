import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';

import { Stack, useRouter, useSearchParams } from 'expo-router';

import { Company, JobAbout, JobTabs, JobFooter, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hooks/useFetch';

// const tabs = ;

const JobDetailsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const tabs = useMemo(() => ['About', 'Qualifications', 'Responsibilities'], []);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const params = useSearchParams();
  const { id } = params;
  const router = useRouter();

  
  const { data, isLoading, error, refetch } = useFetch('job-details', { job_id: id });
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = useCallback(() => {
    switch (activeTab) {
      case 'Qualifications':
        return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A']} />;
      case 'About':
        return <JobAbout info={data[0]?.job_description ?? 'No description provided'} />;
      case 'Responsibilities':
        return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities ?? ['N/A']} />;

      default:
        break;
    }
  }, [activeTab, data]);

  return (
    <SafeAreaView style={pageStyles.safeArea}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />,
          headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension="100%" />,
          headerTitle: '',
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text style={pageStyles.errorText}>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={pageStyles.dataView}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;

const pageStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  dataView: {
    padding: SIZES.medium,
    paddingBottom: 100,
  },
});
