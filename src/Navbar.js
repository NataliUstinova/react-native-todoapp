import React from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';

const Navbar = ({ title, user }) => {
  const isIOS = Platform.OS === 'ios';
  const navbarHeight = isIOS ? 120 : 100; // different heights for iOS and Android

  return (
    <View style={[styles.navbar, { height: navbarHeight }]}>
      <View style={styles.userBlock}>
        <Image style={styles.userAvatar} source={{ uri: user.avatar }} />
        <View>
          <Text style={styles.userTitle}>{user.name}</Text>
          <Text style={styles.userSubtitle}>{user.email}</Text>
        </View>
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#3949ab',
    paddingBottom: 15,
    paddingHorizontal: 20,
    gap: 15,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userBlock: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
    justifyContent: 'start',
  },
  userTitle: {
    color: 'white',
  },
  userSubtitle: {
    color: 'white',
    opacity: 0.7,
  },
  userAvatar: {
    width: 40,
    height: 40,
    marginBottom: -3,
    borderRadius: 99
  },
});

export default Navbar;
