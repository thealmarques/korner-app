import React, { Component } from "react";
import { SafeAreaView } from 'react-navigation';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Text } from 'native-base';
import { Image, Animated } from "react-native";
import { DrawerActions } from "react-navigation-drawer";

interface Props {
    navigation: any;
}

export default class CustomDrawerComponent extends Component<Props> {
    state = {
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(0)
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
        } else {
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 2000
            }).start();
            Animated.timing(this.state.translateY, {
                toValue: 50,
                duration: 1500
            }).start();
        }
    }

    render() {

        return (
            <View style={{
                flex: 1
            }}>
                <SafeAreaView style={{
                    backgroundColor: "#69717E",
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
                        <Text style={{
                            fontFamily: 'quicksand-bold',
                            fontSize: 14,
                            color: 'white',
                        }}>
                            Home
                    </Text>
                        <Text style={{
                            fontFamily: 'quicksand-bold',
                            fontSize: 14,
                            color: 'white',
                            marginTop: 30
                        }}>
                            Settings
                        </Text>
                        <Text style={{
                            fontFamily: 'quicksand-bold',
                            fontSize: 14,
                            color: 'white',
                            marginTop: 30
                        }}>
                            Notifications
                        </Text>
                        <Text style={{
                            fontFamily: 'quicksand-bold',
                            fontSize: 14,
                            color: 'white',
                            marginTop: 30
                        }}>
                            My Posts
                        </Text>
                        <Text style={{
                            fontFamily: 'quicksand-bold',
                            fontSize: 14,
                            color: 'white',
                            marginTop: 30
                        }}>
                            Logout
                        </Text>
                    </ScrollView>
                    <View style={{
                        flex: 0.5
                    }}>
                        <Image
                            source={require("../../../shared/assets/round_profile.png")}
                            style={{
                                width: 70,
                                height: 70
                            }}></Image>
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
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.closeDrawer())
                        }}
                        style={{
                            height: 50,
                            width: 50,
                            backgroundColor: '#69717E',
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
}