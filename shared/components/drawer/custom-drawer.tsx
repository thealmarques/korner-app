import React, { Component } from "react";
import { SafeAreaView } from 'react-navigation';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Text } from 'native-base';
import { Image, Animated } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { logout, getMyPosts, getMyNotifications } from '../../../shared/api/api';
import { connect } from "react-redux";
import { styles } from "./styles";
import { Business } from "../../interfaces/business";

interface Props {
    navigation: any;
    name?: string;
    photoUrl?: string;
}

class CustomDrawerComponent extends Component<Props> {
    state = {
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(0),
        photoOpacity: new Animated.Value(0)
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.isDrawerOpen) {
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 1500
            }).start();
            Animated.timing(this.state.translateY, {
                toValue: -50,
                duration: 1000
            }).start();
            Animated.timing(this.state.photoOpacity, {
                toValue: 1,
                duration: 1000
            }).start();
        } else {
            Animated.timing(this.state.translateY, {
                toValue: 0,
                duration: 2000
            }).start();
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 1000
            }).start();
            Animated.timing(this.state.photoOpacity, {
                toValue: 0,
                duration: 1000
            }).start();
        }
    }

    render() {
        return (
            <View style={styles.drawerContainer}>
                <SafeAreaView style={styles.topContainer}>
                    <ScrollView style={styles.scrollContainer}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.navigation.navigate("Home");
                                this.closeDrawer();
                            }}>
                            <Text style={styles.text}>Home</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <Text style={[styles.text, styles.marginTop]}>Settings</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            getMyNotifications().then((query) => {
                                this.props.navigation.navigate("MyNotifications", {
                                    posts: query.docs
                                });
                                this.closeDrawer();
                            });
                        }}>
                            <Text style={[styles.text, styles.marginTop]}>Notifications</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            getMyPosts().then((query) => {
                                let posts: Business[] = [];
                                query.docs.map((doc) => posts.push(doc.data() as Business));
                                this.props.navigation.navigate("MyPosts", {
                                    posts: posts
                                });
                                this.closeDrawer();
                            });
                        }}>
                            <Text style={[styles.text, styles.marginTop]}>My Posts</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => logout()}>
                            <Text style={[styles.text, styles.marginTop]}>Logout</Text>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                    <View style={styles.profileContainer}>{
                        this.renderProfilePicture()}
                        <Text style={{
                            marginTop: 5,
                            color: 'white',
                            fontSize: 11,
                            fontFamily: 'quicksand-bold'
                        }}>Hi, {this.props.name}</Text>
                    </View>
                </SafeAreaView>
                <Animated.View style={[styles.closeContainer, {
                    transform: [{ translateY: this.state.translateY }],
                    opacity: this.state.opacity
                }]}>
                    <TouchableWithoutFeedback
                        onPress={() => this.closeDrawer()}
                        style={styles.roundClose}>
                        <Image
                            style={styles.closeIcon}
                            source={require('../../assets/close-white.png')}></Image>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        );
    }

    closeDrawer() {
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    renderProfilePicture() {
        if (this.props.photoUrl.length > 0) {
            return (
                <Animated.Image
                    source={{
                        uri: this.props.photoUrl
                    }}
                    style={[styles.profileImage, {
                        opacity: this.state.opacity
                    }]}></Animated.Image>
            );
        } else {
            return (
                <Animated.Image
                    source={require("../../../shared/assets/empty_profile.png")}
                    style={[styles.emptyImage, {
                        opacity: this.state.opacity
                    }]}></Animated.Image>
            );
        }

    }
}

const mapStateToProps = (store) => ({
    name: store.user.name,
    photoUrl: store.user.photoUrl,
});

export default connect(mapStateToProps, null)(CustomDrawerComponent);