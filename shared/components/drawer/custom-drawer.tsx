import React, { Component } from "react";
import { SafeAreaView } from 'react-navigation';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Text } from 'native-base';
import { Image, Animated } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { logout } from '../../../shared/api/api';
import { connect } from "react-redux";

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
            <View style={{
                flex: 1
            }}>
                <SafeAreaView style={{
                    backgroundColor: "#5A646B",
                    height: '75%',
                    width: '100%',
                    borderBottomRightRadius: 350,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                    paddingVertical: 30
                }}>
                    <ScrollView style={{
                        flex: 1,
                        paddingLeft: 60
                    }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.navigation.navigate("Home");
                                this.closeDrawer();
                            }}>
                            <Text style={{
                                fontFamily: 'quicksand-bold',
                                fontSize: 16,
                                letterSpacing: 2,
                                color: 'white',
                            }}>Home</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <Text style={{
                                fontFamily: 'quicksand-bold',
                                fontSize: 16,
                                letterSpacing: 2,
                                color: 'white',
                                marginTop: 30
                            }}>Settings</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <Text style={{
                                fontFamily: 'quicksand-bold',
                                fontSize: 16,
                                letterSpacing: 2,
                                color: 'white',
                                marginTop: 30
                            }}>Notifications</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <Text style={{
                                fontFamily: 'quicksand-bold',
                                fontSize: 16,
                                letterSpacing: 2,
                                color: 'white',
                                marginTop: 30
                            }}>My Posts</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => logout()}>
                            <Text style={{
                                fontFamily: 'quicksand-bold',
                                fontSize: 16,
                                letterSpacing: 2,
                                color: 'white',
                                marginTop: 30
                            }}>Logout</Text>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                    <View style={{
                        flex: 0.7,
                        flexDirection: 'column',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}>{
                    this.renderProfilePicture()}
                    <Text style={{
                        marginTop: 5,
                        color: 'white',
                        fontSize: 11,
                        fontFamily: 'quicksand-bold'
                    }}>Hi, {this.props.name}</Text>
                    </View>
                </SafeAreaView>
                <Animated.View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ translateY: this.state.translateY }],
                    opacity: this.state.opacity
                }}>
                    <TouchableWithoutFeedback
                        onPress={() => this.closeDrawer()}
                        style={{
                            height: 50,
                            width: 50,
                            backgroundColor: '#5A646B',
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image
                            style={{
                                width: 15,
                                height: 15
                            }}
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
                    style={{
                        width: 70,
                        height: 70,
                        opacity: this.state.opacity,
                        borderRadius: 50
                    }}></Animated.Image>
            );
        } else {
            return (
                <Animated.Image
                    source={require("../../../shared/assets/empty_profile.png")}
                    style={{
                        width: 55,
                        height: 55,
                        opacity: this.state.opacity
                    }}></Animated.Image>
            );
        }

    }
}

const mapStateToProps = (store) => ({
    name: store.user.name,
    photoUrl: store.user.photoUrl,
});

export default connect(mapStateToProps, null)(CustomDrawerComponent);