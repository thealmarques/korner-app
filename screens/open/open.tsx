import React from "react";
import { View, Text } from "native-base";
import {
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  FlatList
} from "react-native-gesture-handler";
import { styles } from "./styles";
import { SafeAreaView, Image } from "react-native";
import Header from "../../shared/components/header/header";
import { categories } from "../../shared/constants/categories";
import { saveMarker } from "../../shared/api/api";
import * as ImagePicker from "expo-image-picker";

interface Props {
  navigation: any;
}

export default class OpenScreen extends React.Component<Props> {
  scrollViewRef = null;
  state = {
    selectedCategory: "1",
    selectedSubCategory: "1",
    description: "",
    distance: 1000,
    location: this.props.navigation.state.params.location,
    blobImages: [],
    uriImages: []
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
        .then(value => {
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

  render() {
    return (
      <SafeAreaView style={styles.screen}>
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
        console.log(uri);
        const blob = await this.convertUriToBlob(uri);
        if (blob) {
            this.setState({
                blobImages: this.state.blobImages.concat([blob]),
                uriImages: this.state.uriImages.concat([uri])
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
