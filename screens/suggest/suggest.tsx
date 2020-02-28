import React from "react";
import { View, Text } from "native-base";
import {
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Switch
} from "react-native-gesture-handler";
import { styles } from "./styles";
import { SafeAreaView, Image } from "react-native";
import Header from "../../shared/components/header/header";
import { categories } from "../../shared/constants/categories";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Slider from "react-native-slider";

interface Props {
  navigation: any;
}

export default class SuggestScreen extends React.Component<Props> {
  scrollViewRef = null;
  state = {
    selectedCategory: "1",
    selectedSubCategory: "1",
    description: "",
    notifyUpvotes: true,
    notifyCreated: true,
    distance: 1000
  };

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <ScrollView>
          <Header locationName={""} navigation={this.props.navigation}></Header>
          <View style={styles.container}>
            <Text style={styles.text}>Choose a category & subcategory</Text>
            <View style={styles.scrollCategories}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: wp("1%") }}
              >
                {this.renderCategories()}
              </ScrollView>
            </View>
            <View style={styles.scrollSubCategories}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ padding: wp("1%") }}
                ref={this.scrollViewRef}
              >
                <View
                  style={{ flexWrap: "wrap", justifyContent: "space-between" }}
                >
                  {this.renderSubCategories()}
                </View>
              </ScrollView>
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginTop: hp("1%")
                }
              ]}
            >
              Description
            </Text>
            <View style={styles.shadowTextInput}>
              <TextInput
                style={[styles.textInput]}
                value={this.state.description}
                onChangeText={text =>
                  this.setState({
                    description: text
                  })
                }
                placeholder="What type of service you want ?"
              ></TextInput>
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginTop: hp("3%")
                }
              ]}
            >
              Setup Notifications
            </Text>
            <View
              style={{
                marginTop: hp("2%"),
                flex: 1
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: wp("4%")
                }}
              >
                <Text
                  style={{
                    color: "#B0B4B7",
                    fontFamily: "quicksand-regular",
                    fontSize: wp("4%")
                  }}
                >
                  Notify Upvotes
                </Text>
                <Switch
                  trackColor={{ true: "#69C38F", false: "#B0B4B7" }}
                  thumbColor={"#508B69"}
                  onValueChange={value => {
                    this.setState({
                      notifyUpvotes: value
                    });
                  }}
                  value={this.state.notifyUpvotes}
                ></Switch>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: wp("4%"),
                  marginTop: hp("2%")
                }}
              >
                <Text
                  style={{
                    color: "#B0B4B7",
                    fontFamily: "quicksand-regular",
                    fontSize: wp("4%"),
                    width: wp("75%"),
                    flexWrap: "wrap"
                  }}
                >
                  Notify if a new local business is created within range (
                  {Number(this.state.distance).toFixed(0)}m)
                </Text>
                <Switch
                  trackColor={{ true: "#69C38F", false: "#B0B4B7" }}
                  thumbColor={"#508B69"}
                  onValueChange={value => {
                    this.setState({
                      notifyCreated: value
                    });
                  }}
                  value={this.state.notifyCreated}
                ></Switch>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "stretch",
                justifyContent: "center",
                marginTop: hp("3.5%"),
                marginHorizontal: wp("4%")
              }}
            >
              <Slider
                minimumTrackTintColor="#508B69"
                thumbStyle={{
                  backgroundColor: "#508B69",
                  width: wp("3.5%"),
                  height: wp("3.5%")
                }}
                minimumValue={500}
                maximumValue={2000}
                value={this.state.distance}
                onValueChange={value => this.setState({ distance: value })}
              />
              <Text
                style={{
                  color: "#B0B4B7",
                  fontFamily: "quicksand-regular",
                  fontSize: wp("4%"),
                  flexWrap: "wrap"
                }}
              ></Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  renderCategories() {
    return categories.map(category => {
      return (
        <View
          key={category.id}
          style={
            this.state.selectedCategory !== category.id
              ? styles.categoriesContainer
              : styles.categoriesContainerSelected
          }
        >
          <TouchableWithoutFeedback
            style={{
              paddingHorizontal: wp("4%"),
              alignItems: "center",
              justifyContent: "center",
              height: wp("21%"),
              width: wp("23%")
            }}
            onPress={() => {
              this.setState({
                selectedCategory: category.id,
                selectedSubCategory: "1"
              });
              this.scrollViewRef.current.scrollTo({
                animated: false,
                x: 0,
                y: 0
              });
            }}
          >
            <Image style={styles.image} source={category.image}></Image>
            <Text style={styles.subText}>{category.title}</Text>
          </TouchableWithoutFeedback>
        </View>
      );
    });
  }

  renderSubCategories() {
    const subcategories =
      categories[parseInt(this.state.selectedCategory, 10) - 1].subcategories;
    return subcategories.map(sub => {
      if (sub.id === "1") {
        return (
          <View
            key={sub.id}
            style={
              this.state.selectedSubCategory !== sub.id
                ? styles.subCategoriesContainer
                : styles.subCategoriesContainerSelected
            }
          >
            <TouchableWithoutFeedback
              style={{
                paddingHorizontal: wp("4%"),
                alignItems: "center",
                justifyContent: "center",
                height: wp("23%"),
                width: wp("21%"),
              }}
              onPress={() => {
                this.setState({
                  selectedSubCategory: sub.id
                });
              }}
            >
              <Image style={styles.image} source={sub.image}></Image>
              <Text style={styles.subText}>{sub.title}</Text>
            </TouchableWithoutFeedback>
          </View>
        );
      }
      return (
        <View
          key={sub.id}
          style={[
            this.state.selectedSubCategory !== sub.id
              ? styles.miniSubCategoriesContainer
              : styles.miniSubCategoriesContainerSelected
          ]}
        >
          <TouchableWithoutFeedback
            style={{
              paddingHorizontal: wp("4%"),
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
              height: wp("8.5%"),
              width: wp("34%")
            }}
            onPress={() => {
              this.setState({
                selectedSubCategory: sub.id
              });
            }}
          >
            <Image style={styles.smallImage} source={sub.image}></Image>
            <Text style={styles.subText}>{sub.title}</Text>
          </TouchableWithoutFeedback>
        </View>
      );
    });
  }
}
