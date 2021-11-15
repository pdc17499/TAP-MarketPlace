import { AppButton, AppText, Header, ListProfile } from '@component';
import React from 'react';
import { View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';
import { logoutApp } from '@redux';
import { useSelector } from 'react-redux'


interface ProfileProp { }

interface screenNavigationProp {
    navigate: any;
}

const Profile = React.memo((props: ProfileProp) => {
    const USER = useSelector((state: any) => state.auth.user);
    console.log('INFO', USER)

    const dispath = useDispatch();
    const logOut = () => {
        dispath(logoutApp())
    }

    return (
        <View style={styles.container}>
            <Header back />
            <View style={styles.body}>

                <Image source={{ uri: 'https://www.thecellartrust.org/wp-content/uploads/2017/04/Trustees.jpg' }}
                    style={styles.avatar}>
                </Image>
                <View style={styles.infomation}>
                    <AppText style={styles.name}>{'Harry Potter'}</AppText>
                    <AppText style={styles.email}>{'harry99@gmail.com'}</AppText>
                    <AppText style={styles.email}>{'(074) 555-0127'}</AppText>
                </View>

                <View>
                    <ListProfile />
                </View>

            </View>
        </View>
    );
});

export { Profile };
