import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { setImageURL } from '../../../../utils';

import styles from './nearbyjobcard.style';

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleNavigate(job)}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: setImageURL(job.employer_logo),
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
