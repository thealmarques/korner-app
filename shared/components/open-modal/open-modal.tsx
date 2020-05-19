import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { CarouselComponent } from '../carousel/carousel';
import { Business } from '../../interfaces/business';
import { getBusinessImages, getOpenBusinessData, updateBusinessData } from '../../api/api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import HorizontalTimePiker from '../time-picker/time-picker';
import { categories } from '../../constants/categories';
import * as firebase from "firebase";

interface Props {
    closeModal: any;
    location: Coordinates;
}

interface State {
    imageUrls: string[],
    selectedDay: number,
    data: Business,
    upvote: boolean,
    downvote: boolean
}

export default class OpenModalComponent extends React.Component<Props> {
    days = ["S", "M", "T", "W", "T", "F", "S"];
    initialVotes = 0;
    state: State = {
        imageUrls: null,
        selectedDay: -1,
        data: null,
        upvote: false,
        downvote: false
    }

    constructor(props) {
        super(props);
        getOpenBusinessData(this.props.location.latitude, this.props.location.longitude).then((query) => {
            query.forEach((doc) => {
                const data = doc.data() as Business;
                data.id = doc.id;
                
                this.initialVotes = data.upvotes.length - data.downvotes.length;
                if (data.upvotes.indexOf(firebase.auth().currentUser.uid) > -1) {
                    this.state.upvote = true;
                } else if (data.downvotes.indexOf(firebase.auth().currentUser.uid) > -1) {
                    this.state.downvote = true;
                }

                getBusinessImages(data).then((urls) => {
                    if (urls.length === 0) {
                        urls.push('https://d8st7idcnjoas.cloudfront.net/galfull/8666.jpg');
                    }
                    this.setState({
                        imageUrls: urls
                    });
                });
                this.setState({
                    data: data
                });
            });
        });
    }

    render() {
        if (this.state.imageUrls && this.state.data) {
            return (
                <View style={styles.container}>
                    <View style={styles.modal}>
                        <CarouselComponent urls={this.state.imageUrls} closeCallback={() => {
                            if (this.state.data.upvotes.length - this.state.data.downvotes.length !== this.initialVotes) {
                                // update entry
                                updateBusinessData(this.state.data);
                            }
                            this.props.closeModal();
                        }}></CarouselComponent>
                        <View style={styles.innerModal}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between'
                            }}>
                                <View>
                                    <Text style={styles.mainTitle}>{categories[parseInt(this.state.data.category, 10) - 1].title}</Text>
                                    <Text style={styles.subTitle}>{categories[parseInt(this.state.data.category, 10) - 1].subcategories[parseInt(this.state.data.subcategory, 10) - 1].title}</Text>
                                </View>
                                <View style={styles.votesContainer}>
                                    <TouchableWithoutFeedback onPress={() => {
                                        if (!this.state.upvote) {
                                            this.state.data.upvotes.push(firebase.auth().currentUser.uid);
                                        } else {
                                            this.state.data.upvotes = this.state.data.upvotes.filter((item: string) => firebase.auth().currentUser.uid !== item);
                                        }

                                        if (this.state.downvote) {
                                            this.state.data.downvotes = this.state.data.downvotes.filter((item: string) => firebase.auth().currentUser.uid !== item);
                                        }

                                        this.setState({
                                            upvote: !this.state.upvote,
                                            downvote: false,
                                        });
                                    }}>
                                        <Image style={[styles.arrow, styles.arrowMargin]} source={this.state.upvote ? require('../../assets/upvote-green.png') : require('../../assets/upvote-grey.png')}></Image>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => {
                                        if (!this.state.downvote) {
                                            this.state.data.downvotes.push(firebase.auth().currentUser.uid);
                                        } else {
                                            this.state.data.downvotes = this.state.data.downvotes.filter((item: string) => firebase.auth().currentUser.uid !== item);
                                        }

                                        if (this.state.upvote) {
                                            this.state.data.upvotes = this.state.data.upvotes.filter((item: string) => firebase.auth().currentUser.uid !== item);
                                        }

                                        this.setState({
                                            upvote: false,
                                            downvote: !this.state.downvote,
                                        });
                                    }}>
                                        <Image style={[styles.arrow, styles.arrowMargin]} source={this.state.downvote ? require('../../assets/downvote-red.png') : require('../../assets/downvote-grey.png')}></Image>
                                    </TouchableWithoutFeedback>
                                    <Text style={[styles.voteText, styles.greyColor, this.state.upvote && !this.state.downvote ? styles.greenColor : null,
                                    this.state.downvote && !this.state.upvote ? styles.redColor : null]}>{`${this.state.data.upvotes.length - this.state.data.downvotes.length} votes`}</Text>
                                </View>
                            </View>
                            <Text style={[styles.mainTitle, styles.marginBetween]}>Description</Text>
                            <View style={[styles.shadowTextInput, styles.shadowLight]}>
                                <Text style={styles.textInput}>{this.state.data.description}</Text>
                            </View>
                            {this.renderDays()}
                        </View>
                    </View>
                    {this.showSchedule()}
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="#C92C41" />
                    </View>
                </View>
            </View>
        );
    }

    renderDays() {
        if (this.state.data.type === 'open') {
            return (
                <View>
                    <Text style={[styles.mainTitle, styles.marginBetween]}>Schedule</Text>
                    <View style={[styles.uploadContainer, styles.marginBetween]}>
                        {
                            this.days.map((day, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={"day_" + index}
                                        onPress={() => {
                                            if (this.state.data.schedule[index] !== null) {
                                                this.setState({
                                                    selectedDay: index,
                                                });
                                            }
                                        }}
                                        style={[
                                            styles.dayContainer,
                                            this.state.data.schedule[index] !== null
                                                ? styles.daySelected
                                                : styles.dayNotSelected,
                                        ]}
                                    >
                                        <Text style={styles.dayText}>{day}</Text>
                                    </TouchableWithoutFeedback>);
                            })
                        }
                    </View>
                </View>
            );
        }
    }

    showSchedule() {
        if (this.state.selectedDay > -1) {
            return (
                <View style={[styles.schedulePickerContainer, styles.shadowSchedule]}>
                    <View style={{ flex: 1 }}>
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ selectedDay: -1 })}
                        >
                            <Image
                                style={styles.leftArrow}
                                source={require('../../assets/left-arrow-grey.png')}
                            ></Image>
                        </TouchableWithoutFeedback>
                        <Text style={[styles.smallText]}>Open from</Text>
                        <HorizontalTimePiker
                            selectedIndex={(this.state.data.schedule[this.state.selectedDay] as any).open}
                            height={"70rem"}
                            timeInterval={30}
                            marginHorizontal={0}
                            enabled={false}
                            onChange={(val, index) => null}
                            visibleElements={4}
                            mainColor={"#5A646B"}
                            secondaryColor={"#DDDDDD"}
                            fontSize={"24rem"}
                            fontFamily={"quicksand-bold"}
                        ></HorizontalTimePiker>
                        <Text style={[styles.smallText]}>Until</Text>
                        <HorizontalTimePiker
                            selectedIndex={(this.state.data.schedule[this.state.selectedDay] as any).close}
                            height={"70rem"}
                            timeInterval={30}
                            marginHorizontal={0}
                            enabled={false}
                            onChange={(val: string, index: number) => null}
                            visibleElements={4}
                            mainColor={"#5A646B"}
                            secondaryColor={"#DDDDDD"}
                            fontSize={"24rem"}
                            fontFamily={"quicksand-bold"}
                        ></HorizontalTimePiker>
                    </View>
                </View>
            );
        }
    }
}