import React from "react";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  InteractionManager,
  Dimensions,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Styles } from "./styles";

interface Props {
  onChange: any;
  selectedIndex: number;
  timeInterval: number;
  enabled: boolean;
  height: string;
  marginHorizontal: number;
  visibleElements: number;
  mainColor: string;
  secondaryColor: string;
  fontSize: string;
  fontFamily: string;
}

export default class HorizontalTimePiker extends React.Component<Props> {
  state = {
    time: [],
    selected: this.props.selectedIndex,
    scrolling: false,
    display: [],
  };
  flatListRef: any;
  elementWidth: number = 0;
  styles: Styles;

  constructor(props) {
    super(props);
    this.styles = new Styles(this.props);
  }

  componentDidMount() {
    let start = "4:00";
    let moment = "am";
    let time = [];
    let clock = 1;
    time.push(start + moment);
    while (clock <= 24) {
      let split = start.split(":");
      let hour = parseInt(split[0], 10);
      let minutes = parseInt(split[1], 10) + 30;
      if (minutes >= 60) {
        minutes = 0;
        hour = hour === 12 ? 1 : hour + 1;
        if (hour >= 12) {
          moment === "am" ? (moment = "pm") : (moment = "am");
        }
        clock += 1;
      }
      start = hour + ":" + (minutes === 0 ? "00" : minutes) + moment;
      if (clock <= 24) {
        time.push(start);
      }
    }
    if (time.length - this.props.selectedIndex < 4 
      || this.props.selectedIndex < 4) {
      time = [...time, ...time];
    }
    this.setState({
      time: time,
      display: [...time]
    });
    this.elementWidth =
      Dimensions.get("screen").width / this.props.visibleElements;
  }

  getInitialSelectedIndex(array: string[]) {
    let index = -1;
    if (array.length - this.props.selectedIndex < 4 ||
      this.props.selectedIndex < 4) {
      index = this.props.selectedIndex + array.length;
    } else {
      index = this.props.selectedIndex;
    }
    return index;
  }

  getItemLayout = (data: any, index: any) => {
    const middle =
      (Dimensions.get("screen").width - this.props.marginHorizontal * 2) / 2;
    const offset = middle - this.elementWidth / 2;
    return {
      length: this.elementWidth,
      offset: index * this.elementWidth - offset,
      index,
    };
  };

  waitToUpdateList(newLength: number, index: number) {
    if (this.state.display.length !== newLength) {
      setTimeout(this.waitToUpdateList.bind(this, newLength, index), 500);
    } else {
      InteractionManager.runAfterInteractions(() => {
        this.flatListRef.scrollToIndex({
          index: Math.round(index),
        });
      });
      this.setState({ selected: index, scrolling: false });
      this.props.onChange(this.state.display[index], index);
    }
  }

  render() {
    return (
      <View style={this.styles.stylesheet.container}>
        <FlatList
          directionalLockEnabled={true}
          initialScrollIndex={this.getInitialSelectedIndex(this.state.display)}
          getItemLayout={this.getItemLayout.bind(this)}
          decelerationRate={"fast"}
          scrollEnabled={this.props.enabled}
          horizontal
          initialNumToRender={this.state.display.length}
          showsHorizontalScrollIndicator={false}
          ref={(ref) => (this.flatListRef = ref)}
          data={this.state.display}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(item, index) => this.state.time.length + "_" + index}
          onMomentumScrollBegin={() => this.setState({ scrolling: true })}
          onMomentumScrollEnd={(
            event: NativeSyntheticEvent<NativeScrollEvent>
          ) => {
            const totalSize = this.elementWidth * this.state.time.length;
            let index = Math.round(
              (this.state.time.length * event.nativeEvent.contentOffset.x) /
                totalSize +
                1.5
            );
            if (index + 3 >= this.state.display.length) {
              const from =
                this.state.display.length >= this.state.time.length
                  ? 0
                  : this.state.display.length;
              const newArray = [
                ...this.state.display,
                ...this.state.time.slice(from, this.state.time.length),
              ];
              this.setState({
                display: newArray,
              });
              this.waitToUpdateList(newArray.length, index);
            } else if (index - 3 <= 0) {
              const newArray = [
                ...this.state.time.slice(0, this.state.time.length),
                ...this.state.display,
              ];
              this.setState({
                display: newArray,
              });
              index = this.state.time.length + index;
              this.waitToUpdateList(newArray.length, index);
            } else {
              this.waitToUpdateList(this.state.display.length, index);
            }
          }}
        ></FlatList>
      </View>
    );
  }

  renderItem(item: string, index: number) {
    const moment = item.substring(item.length - 2, item.length);
    const time = item.substring(0, item.length - 2);
    return (
      <View style={this.styles.stylesheet.item} key={index}>
        <Text
          style={
            this.state.selected === index
              ? this.styles.stylesheet.mainTextSelected
              : this.styles.stylesheet.mainTextNotSelected
          }
        >
          {time}
        </Text>
        <Text
          style={
            this.state.selected === index
              ? this.styles.stylesheet.smallTextSelected
              : this.styles.stylesheet.smallTextNotSelected
          }
        >
          {moment}
        </Text>
      </View>
    );
  }
}
