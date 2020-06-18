import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import connect from 'react-redux/lib/connect/connect';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    paddingHorizontal: 6,
    marginRight: 4,
    marginBottom: 4,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

const Category = ({ id, categories }) => {
  const getCategoryNameById = () => {
    if (!categories) return null;
    return categories.find((category) => category.id === id).name;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getCategoryNameById()}</Text>
    </View>
  );
};

const mapStateToProps = ({ categories }) => ({
  categories,
});

export default connect(mapStateToProps)(Category);
