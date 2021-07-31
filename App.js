import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ModalBase from './src/components/ModalBase';

const App = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalUser, setModalUser] = useState({});
  const [page, setPage] = useState(1);

  const fetchingUserDetails = async () => {
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${page}&delay=3`,
      );
      var userData = await response.json();

      setUsers(page === 1 ? userData.data : [...users, ...userData.data]);
      console.log('USERS', users);
    } catch (error) {
      console.error(error);
    }
  };

  const LoadMoreUserData = () => {
    setPage(page + 1);
    fetchingUserDetails();
  };

  useEffect(() => {
    fetchingUserDetails();
  }, []);

  const UserInfo = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setVisible(true);
          setModalUser(item);
        }}>
        <View key={item.id} style={styles.userContainer}>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>
              {item.first_name} {item.last_name}
            </Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalBase visible={visible}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#fffaf6',
            padding: 10,
            borderRadius: 10,
            elevation: 1,
          }}>
          <Image source={{uri: modalUser.avatar}} style={styles.mUserImg} />

          <Text style={styles.mName}>{modalUser.first_name}</Text>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fee9d6',
              padding: 20,
              borderRadius: 10,

              elevation: 1,
            }}>
            <Text style={styles.heading}>User Details</Text>

            <Text style={styles.fullName}>
              {modalUser.first_name} {modalUser.last_name}
            </Text>
            <Text style={styles.mEmail}>{modalUser.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalUser({});
              setVisible(false);
            }}>
            <Image
              source={require('./src/assets/cross.png')}
              style={{height: 35, width: 35, marginTop: 20}}
            />
          </TouchableOpacity>
        </View>
      </ModalBase>

      <FlatList
        data={users}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index, separators}) => <UserInfo item={item} />}
        onEndReachedThreshold={0}
        onEndReached={LoadMoreUserData}
        ListEmptyComponent={() => <Text>Loading...</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffaf6',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#fee9d6',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 1,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 6,
    shadowColor: '#000',
    borderColor: 'green',
    borderBottomWidth: 4,
  },

  textContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: 35,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    color: '#132742',
  },
  email: {textAlign: 'left', color: '#6d7475', fontFamily: 'Poppins-Regular'},

  mUserImg: {
    height: 160,
    width: 160,
    borderRadius: 160,
    marginTop: -50,
    shadowColor: '#000',
    borderColor: 'green',
    borderBottomWidth: 4,
  },

  fullName: {color: '#918f89', fontFamily: 'Poppins-Medium'},

  mName: {
    marginBottom: 10,
    marginTop: 5,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },

  mEmail: {
    textAlign: 'center',
    color: '#918f89',
    fontFamily: 'Poppins-Regular',
  },

  heading: {
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#f66336',
    fontWeight: '700',
  },
});

export default App;
