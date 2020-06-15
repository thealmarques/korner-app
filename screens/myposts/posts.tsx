import React, { Component } from "react";
import { View, Text } from 'native-base';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Image } from "react-native";
import { Business } from "../../shared/interfaces/business";
import { categories } from '../../shared/constants/categories';

interface Props {
    navigation: any;
}

export default class MyPosts extends Component<Props> {
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
                    <Text style={styles.headerTitle}>My Posts</Text>
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
        const posts = this.props.navigation.state.params.posts as Business[];

        return posts.map((post, index) => {
            return (
                <TouchableWithoutFeedback key={index} style={[styles.row]} onPress={() => alert('sacode')}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.type}>{post.type === 'open' ? 'Opened' : 'Suggested'}</Text>
                        <Text style={styles.category}>{categories[parseInt(post.category, 10) - 1].title}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Image style={styles.viewImage} source={require("../../shared/assets/view.png")}></Image>
                        <Text style={styles.date}>{post.creationDate}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }
}