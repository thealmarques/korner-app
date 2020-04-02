import React from "react";
import { styles } from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { Text, View } from "native-base";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  InteractionManager,
  Dimensions
} from "react-native";

interface Props {}

export default class TimePikerComponent extends React.Component<Props> {
  state = {
    time: [],
    selected: 20,
    scrolling: false,
    display: []
  };
  flatListRef: any;

  componentWillMount() {
    const initial = "4:00";
    let aux = "4:30";
    let moment = "am";
    const time = [];
    let clock = 1;
    time.push(initial + moment);
    time.push(aux + moment);
    while (clock <= 24) {
      let split = aux.split(":");
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
      aux = hour + ":" + (minutes === 0 ? "00" : minutes) + moment;
      if (clock <= 24) {
        time.push(aux);
      }
    }
    this.setState({
      time: time,
      display: [...time.slice(0, 30)]
    });
  }

  getItemLayout = (data, index) => {
    const elementWidth = 90;
    const middle = (Dimensions.get("screen").width - 20 * 2) / 2;
    const offset = middle - elementWidth / 2;
    return {
      length: elementWidth,
      offset: index * elementWidth - offset,
      index
    };
  };

  waitToUpdateList(newLength: number, index: number) {
    if (this.state.display.length !== newLength) {
      setTimeout(this.waitToUpdateList.bind(this, newLength, index), 500);
    } else {
      InteractionManager.runAfterInteractions(() => {
        this.flatListRef.scrollToIndex({
          index: Math.round(index)
        });
      });
      this.setState({ selected: index, scrolling: false });
    }
  }

  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 20 }}>
        <FlatList
          contentContainerStyle={{ height: 65 }}
          initialScrollIndex={20}
          getItemLayout={this.getItemLayout.bind(this)}
          decelerationRate={0.5}
          horizontal
          initialNumToRender={this.state.display.length}
          showsHorizontalScrollIndicator={false}
          ref={ref => (this.flatListRef = ref)}
          data={this.state.display}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(item, index) => this.state.time.length + "_" + index}
          onMomentumScrollBegin={() => this.setState({ scrolling: true })}
          onMomentumScrollEnd={(
            event: NativeSyntheticEvent<NativeScrollEvent>
          ) => {
            const elementWidth = 90;
            const totalSize = elementWidth * this.state.time.length;
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
                ...this.state.time.slice(from, this.state.time.length)
              ];
              this.setState({
                display: newArray
              });
              this.waitToUpdateList(newArray.length, index);
            } else if (index - 3 <= 0) {
              const newArray = [
                ...this.state.time.slice(0, this.state.time.length),
                ...this.state.display
              ];
              this.setState({
                display: newArray
              });
              index = this.state.time.length + index;
              this.waitToUpdateList(newArray.length, index);
            } else {
              this.waitToUpdateList(this.state.display.length, index);
            }
          }}
        ></FlatList>
        <View
          style={{
            backgroundColor: "#707070",
            height: 0.3
          }}
        ></View>
      </View>
    );
  }

  renderItem(item: string, index: number) {
    const moment = item.substring(item.length - 2, item.length);
    const time = item.substring(0, item.length - 2);
    return (
      <View style={styles.container} key={index}>
        <Text
          style={
            this.state.selected === index ? styles.selectedText : styles.text
          }
        >
          {time}
        </Text>
        <Text
          style={
            this.state.selected === index
              ? styles.smallSelectedText
              : styles.smallText
          }
        >
          {moment}
        </Text>
      </View>
    );
  }
}
