import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { CarouselComponent } from '../carousel/carousel';
import { Business } from '../../interfaces/business';
import { getBusinessImages } from '../../api/api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import HorizontalTimePiker from '../time-picker/time-picker';
import { categories } from '../../constants/categories';

interface Props {
    closeModal: any;
    data: Business;
}

export default class OpenModalComponent extends React.Component<Props> {
    days = ["S", "M", "T", "W", "T", "F", "S"];

    state = {
        imageUrls: null,
        selectedDay: -1
    }

    constructor(props) {
        super(props);
        getBusinessImages(this.props.data).then((urls) => {
            this.setState({
                imageUrls: urls
            });
        });
    }

    render() {
        if (this.state.imageUrls) {
            return (
                <View style={styles.container}>
                    <View style={styles.modal}>
                        <CarouselComponent urls={this.state.imageUrls} closeCallback={() => this.props.closeModal()}></CarouselComponent>
                        <View style={styles.innerModal}>
                            <Text style={styles.mainTitle}>{categories[parseInt(this.props.data.category, 10) - 1].title}</Text>
                            <Text style={styles.subTitle}>{categories[parseInt(this.props.data.category, 10) - 1].subcategories[parseInt(this.props.data.subcategory, 10) - 1].title}</Text>
                            <Text style={[styles.mainTitle, styles.marginBetween]}>Description</Text>
                            <View style={[styles.shadowTextInput, styles.shadowLight]}>
                                <Text style={styles.textInput}>{this.props.data.description}</Text>
                            </View>
                            <Text style={[styles.mainTitle, styles.marginBetween]}>Schedule</Text>
                            <View style={[styles.uploadContainer, styles.marginBetween]}>
                                {this.renderDays()}
                            </View>
                        </View>
                    </View>
                    {this.showSchedule()}
                </View>
            );
        }
        return null;
    }

    renderDays() {
        return this.days.map((day, index) => {
            return (
                <TouchableWithoutFeedback
                    key={"day_" + index}
                    onPress={() => {
                        if (this.props.data.schedule[index] !== null) {
                            this.setState({
                                selectedDay: index,
                            });
                        }
                    }}
                    style={[
                        styles.dayContainer,
                        this.props.data.schedule[index] !== null
                            ? styles.daySelected
                            : styles.dayNotSelected,
                    ]}
                >
                    <Text style={styles.dayText}>{day}</Text>
                </TouchableWithoutFeedback>);
        });
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
                            selectedIndex={(this.props.data.schedule[this.state.selectedDay] as any).open}
                            height={"70rem"}
                            timeInterval={30}
                            marginHorizontal={0}
                            enabled={true}
                            onChange={(val, index) => null}
                            visibleElements={4}
                            mainColor={"#5A646B"}
                            secondaryColor={"#DDDDDD"}
                            fontSize={"24rem"}
                            fontFamily={"quicksand-bold"}
                        ></HorizontalTimePiker>
                        <Text style={[styles.smallText]}>Until</Text>
                        <HorizontalTimePiker
                            selectedIndex={(this.props.data.schedule[this.state.selectedDay] as any).close}
                            height={"70rem"}
                            timeInterval={30}
                            marginHorizontal={0}
                            enabled={true}
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