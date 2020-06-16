import React, { Component } from "react";
import { View, Text } from 'native-base';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Image } from "react-native";
import { Business } from "../../shared/interfaces/business";
import { categories } from '../../shared/constants/categories';
import { userLocation } from "../../shared/store/actions";
import { connect } from "react-redux";

interface Props {
    navigation: any;
    locationName: string;
    userLocation: any;
}

class MyNotifications extends Component<Props> {
    render() {
        const { goBack } = this.props.navigation;

        return (
            <View style={styles.screenContainer}>
                <View style={styles.header}>
                    <View style={styles.goBackContainer}>
                        <TouchableWithoutFeedback
                            onPress={() => goBack()}>
                            <Image style={styles.goBackImage} source={require('../../shared/assets/go-back.png')}></Image>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={styles.headerTitle}>My Notifications</Text>
                </View>
                <ScrollView style={{
                    width: '100%',
                    overflow: 'visible'
                }}>
                    {this.renderPosts()}
                </ScrollView>
            </View>
        );
    }

    renderPosts() {
        const posts = this.props.navigation.state.params.posts;

        return posts.map((doc, index) => {
            const post = doc.data();
            return (
                <TouchableWithoutFeedback key={index} style={[styles.row]} onPress={() => this.showPost(post)}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '75%'
                    }}>
                        <Text style={styles.type}>{post.message}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignContent: 'flex-end',
                        justifyContent: 'space-between',
                        width: '25%'
                    }}>
                        <Image style={styles.viewImage} source={require("../../shared/assets/view.png")}></Image>
                        <Text style={styles.date}>{post.creationDate}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }

    showPost(post: any) {
        const { goBack } = this.props.navigation;
        this.props.userLocation(post.coordinates, this.props.locationName);
        goBack();
    }
}

const mapStateToProps = (store) => ({
    coordinates: store.userLocation.coordinates,
    locationName: store.userLocation.name,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    userLocation: (coordinates, name) =>
      dispatch(userLocation(coordinates, name)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(MyNotifications);