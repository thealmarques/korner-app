import React from "react";
import { View, Text } from "native-base";
import {
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  PanGestureHandler,
  State
} from "react-native-gesture-handler";
import { styles } from "./styles";
import {
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent
} from "react-native";
import Header from "../../shared/components/header/header";
import { categories } from "../../shared/constants/categories";
import { saveMarker, storeImages } from "../../shared/api/api";
import * as ImagePicker from "expo-image-picker";

interface Props {
  navigation: any;
}

export default class OpenScreen extends React.Component<Props> {
  scrollViewRef = null;
  point = [];
  state = {
    selectedCategory: "1",
    selectedSubCategory: "1",
    description: "",
    distance: 1000,
    location: this.props.navigation.state.params.location,
    blobImages: [],
    base64Images: [],
    showDelete: false
  };

  create = {
    title: "Create",
    callback: () => {
      saveMarker(
        this.state.location.latitude,
        this.state.location.longitude,
        this.state.selectedCategory,
        this.state.selectedSubCategory,
        this.state.description,
        null,
        null,
        this.state.distance,
        "open"
      )
        .then(doc => {
          storeImages(doc.id, this.state.blobImages);
          this.props.navigation.navigate("Home", {
            event: "create"
          });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  };

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.location) {
      this.setState({
        location: nextProps.navigation.state.params.location
      });
    }
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
            elevation: 3
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
              onChangeText={text =>
                this.setState({
                  description: text
                })
              }
              placeholder="What type of service you want ?"
            ></TextInput>
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
      </SafeAreaView>
    );
  }

  imagePicker() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    }).then(async (result: any) => {
      if (!result.cancelled) {
        const { height, width, type, uri } = result;
        const blob = await this.convertUriToBlob(uri);
        if (blob) {
          const base64 = await this.convertToBase64(blob);
          this.setState({
            blobImages: this.state.blobImages.concat([blob]),
            base64Images: this.state.base64Images.concat([base64])
          });
        }
      }
    });
  }

  convertUriToBlob(uri: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        reject(new Error("Blob generator failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);

      xhr.send(null);
    });
  }

  onHandlerStateChange({ nativeEvent }, index) {
    if (nativeEvent.state === State.END) {
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;
      const heightOffset = (height * 15) / 100;
      const imageWidth = 35 * (width / 380);
      const imageHeight = 35 * (height / 380);
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
          const auxBlob = this.state.blobImages.filter((value, idx) => {
            if (idx !== index) {
              return value;
            }
          });
          this.setState({
            base64Images: auxBase64,
            showDelete: false,
            blobImages: auxBlob
          });
        }
      } else {
        Animated.spring(this.point[index], { toValue: { x: 0, y: 0 } }).start();
        this.setState({
          showDelete: false
        });
      }
    } else {
      this.setState({
        showDelete: true
      });
    }
  }

  _onPanGestureEvent = index =>
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.point[index].x,
            translationY: this.point[index].y
          }
        }
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
          key={index}
        >
          <Animated.View
            key={index}
            style={[
              { elevation: 2 },
              {
                transform: [
                  { translateY: this.point[index].y },
                  { translateX: this.point[index].x }
                ]
              }
            ]}
          >
            <Image
              key={"upload-" + index}
              style={[styles.uplodedImage]}
              source={{ uri: base64.toString() }}
            ></Image>
          </Animated.View>
        </PanGestureHandler>
      );
    });
  }

  convertToBase64(blob) {
    return new Promise((resolve, reject) => {
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(blob);
      fileReaderInstance.onload = () => {
        const base64data = fileReaderInstance.result;
        resolve(base64data);
      };
    });
  }

  renderCategories(category) {
    return (
      <View
        key={category.id}
        style={[
          styles.categoriesContainer,
          styles.shadow,
          this.state.selectedCategory === category.id ? styles.selected : ""
        ]}
      >
        <TouchableWithoutFeedback
          style={styles.touchableCategory}
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
  }

  renderSubCategories() {
    const subcategories =
      categories[parseInt(this.state.selectedCategory, 10) - 1].subcategories;
    return subcategories.map(subcategory => {
      if (subcategory.id === "1") {
        return (
          <View
            key={subcategory.id}
            style={[
              styles.mainSubCategoryContainer,
              this.state.selectedSubCategory === subcategory.id
                ? styles.selected
                : "",
              styles.shadow
            ]}
          >
            <TouchableWithoutFeedback
              style={styles.touchableSubCategory}
              onPress={() => {
                this.setState({
                  selectedSubCategory: subcategory.id
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
              : ""
          ]}
        >
          <TouchableWithoutFeedback
            style={[styles.touchableMiniCategory, styles.row]}
            onPress={() => {
              this.setState({
                selectedSubCategory: subcategory.id
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
