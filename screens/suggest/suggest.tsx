import React from "react";
import { View, Text, Switch } from "native-base";
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
          <Header locationName="" navigation={this.props.navigation} command="Create"></Header>
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
          <Text style={[styles.marginTop, styles.text, styles.marginBottom]}>Description</Text>
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
          <Text style={[styles.text, styles.marginTop, styles.marginBottom]}>
            Setup Notifications
          </Text>
          <View style={styles.setupContainer}>
            <View style={styles.innerSetupView}>
              <Text style={[styles.innerSetupText, styles.marginTop, styles.marginBottom]}>Notify Upvotes</Text>
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
            <View style={[styles.innerSetupView, styles.marginTop]}>
              <Text style={[styles.innerSetupText, styles.marginTop]}>
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
              style={[styles.sliderView, styles.marginTop]}
            >
              <Slider
                minimumTrackTintColor="#508B69"
                thumbStyle={styles.slider}
                minimumValue={500}
                maximumValue={2000}
                value={this.state.distance}
                onValueChange={value => this.setState({ distance: value })}
              />
              <Text
                style={styles.sliderText}
              ></Text>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
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
