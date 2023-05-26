import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

import styles from './tabs.style';

const TabButton = ({ name, activeTab, onHandleSearchType }) => {
  return (
      <TouchableOpacity style={styles.btn(name, activeTab)} onPress={() => onHandleSearchType(name)}>
        <Text style={styles.btnText(name, activeTab)}>{name}</Text>
      </TouchableOpacity>
  );
};

export default TabButton;

const pageStyles = StyleSheet.create({});
