import React from "react";
import { styles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "native-base";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  InteractionManager
} from "react-native";

interface Props {}

export default class TimePikerComponent extends React.Component<Props> {
  state = {
    time: [],
    selected: 1
  };
  scrollViewRef: any;

  componentWillMount() {
    const initial = "7:00";
    let aux = "7:30";
    let moment = "am";
    const time = [];
    let clock = 1;
    time.push("");
    time.push("");
    time.push(initial + moment);
    time.push(aux + moment);
    while (clock < 25) {
      let split = aux.split(":");
      let hour = parseInt(split[0], 10);
      let minutes = parseInt(split[1], 10) + 30;
      if (minutes >= 60) {
        minutes = 0;
        hour = hour === 12 ? 1 : hour + 1;
        if (hour >= 12) {
          moment === 'am' ? moment = 'pm' : moment= 'am';
        }
        clock += 1;
      }
      aux = hour + ":" + (minutes === 0 ? "00" : minutes) + moment;
      if (clock <= 24) {
        time.push(aux);
      }
    }
    time.push("");
    time.push("");
    this.setState({ time: time });
  }

  render() {
    return (
      <ScrollView
      contentContainerStyle={{height: 100}}
        decelerationRate={0.25}
        horizontal
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        ref={ref => (this.scrollViewRef = ref)}
        onMomentumScrollEnd={(
          event: NativeSyntheticEvent<NativeScrollEvent>
        ) => {
          const totalSize = event.nativeEvent.contentSize.width;
          const index =
            (this.state.time.length * event.nativeEvent.contentOffset.x) /
              totalSize +
            1.5;
          const middle = event.nativeEvent.layoutMeasurement.width / 2;
          const elementWidth = 90;
          const offset = middle - elementWidth / 2;
          this.setState({ selected: Math.round(index) });
          InteractionManager.runAfterInteractions(() => {
            this.scrollViewRef.scrollTo({
              x: Math.round(index) * elementWidth - offset,
              y: 0,
              animated: false
            });
          });
        }}
      >
        {this.renderItem()}
      </ScrollView>
    );
  }

  renderItem() {
    return this.state.time.map((item, index) => {
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
    });
  }
}
