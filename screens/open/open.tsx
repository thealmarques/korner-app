import React from "react";
import { View, Text } from "native-base";
import {
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { styles } from "./styles";
import { SafeAreaView, Image, Animated, Dimensions, Alert } from "react-native";
import Header from "../../shared/components/header/header";
import { categories } from "../../shared/constants/categories";
import { saveMarker, storeImages, findNearesBusinessSuggestions } from "../../shared/api/api";
import * as ImagePicker from "expo-image-picker";
import { BackHandler } from "react-native";
import { convertUriToBlob, convertToBase64 } from "../../shared/Helper";
import HorizontalTimePiker from "../../shared/components/time-picker/time-picker";
import { Business } from "../../shared/interfaces/business";
import responsiveFactor from "../../shared/constants/responsive";

interface Props {
  navigation: any;
}

class OpenScreen extends React.Component<Props> {
  scrollViewRef = null;
  point = [];
  days = ["S", "M", "T", "W", "T", "F", "S"];
  deletedImages = 0;
  lastOpen = 15;
  lastClose = 30;
  state = {
    selectedCategory: "1",
    selectedSubCategory: "1",
    description: "",
    distance: 1000,
    blobImages: [],
    base64Images: [],
    showDelete: false,
    location: this.props.navigation.state.params.location,
    schedule: new Array(7).fill(null),
    selectedDay: -1,
  };

  create = {
    title: "Create",
    callback: () => {
      const business: Business = {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        category: this.state.selectedCategory,
        subcategory: this.state.selectedSubCategory,
        description: this.state.description,
        notifyUpvotes: null,
        notifyCreated: null,
        distance: this.state.distance,
        schedule: this.state.schedule,
        type: "open",
        downvotes: [],
        upvotes: []
      };
      saveMarker(business)
        .then((doc) => {
          storeImages(doc.id, this.state.blobImages);
          business.id = doc.id;
          findNearesBusinessSuggestions(business);
          this.props.navigation.navigate("Home", {
            event: "create",
          });
          this.resetState();
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  };

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.onBackHandler.bind(this)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.location) {
      this.setState({
        location: nextProps.navigation.state.params.location,
        selectedCategory: "1",
        selectedSubCategory: "1",
        description: "",
        distance: 1000,
        blobImages: [],
        base64Images: [],
        showDelete: false,
        schedule: new Array(7).fill(null),
        selectedDay: -1,
      });
    }
  }

  onBackHandler() {
    this.resetState();
  }

  resetState() {
    this.setState({
      selectedCategory: "1",
      selectedSubCategory: "1",
      description: "",
      distance: 1000,
      blobImages: [],
      base64Images: [],
      showDelete: false,
      location: this.props.navigation.state.params.location,
    });
  }

  showDeleteIcon() {
    if (this.state.showDelete) {
      return (
        <View
          style={{
            position: "absolute",
            marginTop: "15%",
            alignContent: "center",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            height: "10%",
            elevation: 3,
          }}
        >
          <Image
            style={[styles.deleteIcon]}
            source={require("../../shared/assets/close.png")}
          ></Image>
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {this.showDeleteIcon()}
        <ScrollView>
          <Header
            changeLocation={null}
            locationName=""
            navigation={this.props.navigation}
            command={this.create}
          ></Header>
          <Text style={styles.text}>Choose a category & subcategory</Text>
          <FlatList
            horizontal
            initialNumToRender={categories.length}
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item, index }) => this.renderCategories(item)}
            keyExtractor={(item, index) => index.toString()}
          ></FlatList>
          <ScrollView
            horizontal
            style={[styles.scrollView]}
            showsHorizontalScrollIndicator={false}
            ref={this.scrollViewRef}
          >
            <View style={styles.byColumn}>{this.renderSubCategories()}</View>
          </ScrollView>
          <Text style={[styles.marginTop, styles.text, styles.marginBottom]}>
            Description
          </Text>
          <View style={[styles.shadowTextInput, styles.shadowLight]}>
            <TextInput
              style={[styles.textInput]}
              value={this.state.description}
              onChangeText={(text) =>
                this.setState({
                  description: text,
                })
              }
              placeholder="What type of service you want ?"
            ></TextInput>
          </View>
          <Text style={[styles.marginTop, styles.text, styles.marginBottom]}>
            Schedule
          </Text>
          <View style={[styles.uploadContainer, styles.marginTop]}>
            {this.renderDays()}
          </View>
          <Text style={[styles.marginTop, styles.text, styles.marginBottom]}>
            Upload photos of your space
          </Text>
          <View style={[styles.uploadContainer, styles.marginTop]}>
            {this.getUploadedImages()}
            <TouchableWithoutFeedback
              onPress={() => this.imagePicker()}
              style={[styles.browseContainer, styles.shadow]}
            >
              <Image
                style={styles.browseImage}
                source={require("../../shared/assets/upload.png")}
              ></Image>
              <View style={styles.browseTextContainer}>
                <Text style={styles.browseText}>Browse</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
        {this.pickSchedule()}
      </SafeAreaView>
    );
  }

  renderDays() {
    return this.days.map((day, index) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.state.schedule[index] !== null) {
              this.state.schedule[index] = null;
              this.setState({
                schedule: this.state.schedule,
              });
            } else {
              this.setState({
                selectedDay: index,
              });
            }
          }}
          key={"day_" + index}
          style={[
            styles.dayContainer,
            this.state.schedule[index] !== null
              ? styles.daySelected
              : styles.dayNotSelected,
          ]}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableWithoutFeedback>
      );
    });
  }

  imagePicker() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    }).then(async (result: any) => {
      if (!result.cancelled) {
        const { height, width, type, uri } = result;
        const blob = await convertUriToBlob(uri);
        if (blob) {
          const base64 = await convertToBase64(blob);
          this.setState({
            blobImages: this.state.blobImages.concat([blob]),
            base64Images: this.state.base64Images.concat([base64]),
          });
        }
      }
    });
  }

  pickSchedule() {
    if (this.state.selectedDay >= 0) {
      return (
        <View style={[styles.schedulePickerContainer, styles.shadowSchedule]}>
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ selectedDay: -1 })}
            >
              <Image
                style={styles.leftArrow}
                source={require("../../shared/assets/left-arrow-grey.png")}
              ></Image>
            </TouchableWithoutFeedback>
            <Text style={[styles.smallText]}>Open from</Text>
            <HorizontalTimePiker
              selectedIndex={this.lastOpen}
              height={"70rem"}
              timeInterval={30}
              marginHorizontal={0}
              enabled={true}
              onChange={(val, index) => (this.lastOpen = index)}
              visibleElements={4}
              mainColor={"#5A646B"}
              secondaryColor={"#DDDDDD"}
              fontSize={"24rem"}
              fontFamily={"quicksand-bold"}
            ></HorizontalTimePiker>
            <Text style={[styles.smallText]}>Until</Text>
            <HorizontalTimePiker
              selectedIndex={this.lastClose}
              height={"70rem"}
              timeInterval={30}
              marginHorizontal={0}
              enabled={true}
              onChange={(val: string, index: number) =>
                (this.lastClose = index)
              }
              visibleElements={4}
              mainColor={"#5A646B"}
              secondaryColor={"#DDDDDD"}
              fontSize={"24rem"}
              fontFamily={"quicksand-bold"}
            ></HorizontalTimePiker>
            <TouchableWithoutFeedback
              onPress={() => {
                this.state.schedule[this.state.selectedDay] = {
                  open: this.lastOpen,
                  close: this.lastClose,
                };
                this.setState({
                  schedule: this.state.schedule,
                  selectedDay: -1,
                });
              }}
            >
              <Image
                style={styles.approve}
                source={require("../../shared/assets/approve.png")}
              ></Image>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
  }

  onHandlerStateChange({ nativeEvent }, index) {
    if (nativeEvent.state === State.END) {
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;
      const heightOffset = (height * 15) / 100;
      const imageWidth = 35 * (width / responsiveFactor);
      const imageHeight = 35 * (height / responsiveFactor);
      const middleWidth = width / 2;
      if (
        nativeEvent.absoluteY < heightOffset + imageHeight &&
        nativeEvent.absoluteY > heightOffset - imageHeight
      ) {
        if (
          nativeEvent.absoluteX < middleWidth + imageWidth &&
          nativeEvent.absoluteX > middleWidth - imageWidth
        ) {
          const auxBase64 = this.state.base64Images.filter((value, idx) => {
            if (idx !== index) {
              return value;
            }
          });
          this.deletedImages += 1;
          const auxBlob = this.state.blobImages.filter((value, idx) => {
            if (idx !== index) {
              return value;
            }
          });
          this.setState({
            base64Images: auxBase64,
            showDelete: false,
            blobImages: auxBlob,
          });
        } else {
          this.resetAnimationView(index);
        }
      } else {
        this.resetAnimationView(index);
      }
    } else {
      this.setState({
        showDelete: true,
      });
    }
  }

  resetAnimationView(index) {
    Animated.spring(this.point[index], {
      toValue: { x: 0, y: 0 },
      speed: 200
    }).start(() => {
      this.setState({
        showDelete: false
      })
    });
  }

  _onPanGestureEvent = (index) =>
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.point[index].x,
            translationY: this.point[index].y,
          },
        },
      ],
      { useNativeDriver: false }
    );

  getUploadedImages() {
    this.point = new Array();
    return this.state.base64Images.map((base64, index) => {
      this.point[index] = new Animated.ValueXY();
      return (
        <PanGestureHandler
          onGestureEvent={this._onPanGestureEvent(index)}
          onHandlerStateChange={({ nativeEvent }) =>
            this.onHandlerStateChange({ nativeEvent }, index)
          }
          key={'pan_' + index + 'd_' + this.deletedImages}
        >
          <Animated.View
            key={'animated_' + index + 'd_' + this.deletedImages}
            style={[
              { elevation: 2 },
              {
                transform: [
                  { translateY: this.point[index].y },
                  { translateX: this.point[index].x },
                ],
              },
            ]}
          >
            <Image
              key={"upload_" + index + 'd_' + this.deletedImages}
              style={[styles.uplodedImage]}
              source={{ uri: base64.toString() }}
            ></Image>
          </Animated.View>
        </PanGestureHandler>
      );
    });
  }

  renderCategories(category) {
    return (
      <View
        key={category.id}
        style={[
          styles.categoriesContainer,
          styles.shadow,
          this.state.selectedCategory === category.id ? styles.selected : "",
        ]}
      >
        <TouchableWithoutFeedback
          style={styles.touchableCategory}
          onPress={() => {
            this.setState({
              selectedCategory: category.id,
              selectedSubCategory: "1",
            });
            this.scrollViewRef.current.scrollTo({
              animated: false,
              x: 0,
              y: 0,
            });
          }}
        >
          <Image style={styles.image} source={category.image}></Image>
          <Text style={styles.subText}>{category.title}</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderSubCategories() {
    const subcategories =
      categories[parseInt(this.state.selectedCategory, 10) - 1].subcategories;
    return subcategories.map((subcategory) => {
      if (subcategory.id === "1") {
        return (
          <View
            key={subcategory.id}
            style={[
              styles.mainSubCategoryContainer,
              this.state.selectedSubCategory === subcategory.id
                ? styles.selected
                : "",
              styles.shadow,
            ]}
          >
            <TouchableWithoutFeedback
              style={styles.touchableSubCategory}
              onPress={() => {
                this.setState({
                  selectedSubCategory: subcategory.id,
                });
              }}
            >
              <Image style={styles.image} source={subcategory.image}></Image>
              <Text style={styles.subText}>{subcategory.title}</Text>
            </TouchableWithoutFeedback>
          </View>
        );
      }
      return (
        <View
          key={subcategory.id}
          style={[
            styles.miniSubCategoryContainer,
            styles.shadow,
            this.state.selectedSubCategory === subcategory.id
              ? styles.selected
              : "",
          ]}
        >
          <TouchableWithoutFeedback
            style={[styles.touchableMiniCategory, styles.row]}
            onPress={() => {
              this.setState({
                selectedSubCategory: subcategory.id,
              });
            }}
          >
            <Image style={styles.smallImage} source={subcategory.image}></Image>
            <Text style={styles.subText}>{subcategory.title}</Text>
          </TouchableWithoutFeedback>
        </View>
      );
    });
  }
}

export default OpenScreen;
