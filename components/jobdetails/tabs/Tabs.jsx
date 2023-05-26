import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import styles from './tabs.style';
import { SIZES } from '../../../constants';
import TabButton from './TabButton';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  const onHandleSearchType = useCallback((item) => {
    setActiveTab(() => item);
  }, []);
  
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton name={item} activeTab={activeTab} onHandleSearchType={onHandleSearchType} />
        )}
        keyExtractor={(item) => item}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Tabs;
