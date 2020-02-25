import React from "react";
import { View, Text } from "native-base";
import {
  ScrollView,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import { styles } from "./styles";
import { SafeAreaView, Image } from "react-native";
import Header from "../../shared/components/header/header";
import { categories } from "../../shared/constants/categories";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

interface Props {
  navigation: any;
}

export default class SuggestScreen extends React.Component<Props> {
  state = {
    selectedCategory: '1',
    selectedSubCategory: '1'
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Header locationName={""} navigation={this.props.navigation}></Header>
        <View style={styles.container}>
          <Text style={styles.text}>Choose a category & subcategory</Text>
          <View style={styles.scrollCategories}>
            <ScrollView
            style={{}}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: wp("4%") }}
            >
              {this.renderCategories()}
            </ScrollView>
          </View>
          <View style={styles.scrollSubCategories}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: wp("4%") }}
            >
              <View style={{flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {this.renderSubCategories()}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  renderCategories() {
    return categories.map((category) => {
      return (
        <View key={category.id} style={this.state.selectedCategory !== category.id ?
                    styles.categoriesContainer : styles.categoriesContainerSelected}>
          <TouchableWithoutFeedback
            style={{
              paddingHorizontal: wp("4%"),
              alignItems: "center",
              justifyContent: "center",
              height: wp("21%"),
              width: wp("23%"),
            }}
            onPress={() => {
              this.setState({
                selectedCategory: category.id
              })
            }}
          >
            <Image
              style={styles.image}
              source={category.image}
            ></Image>
            <Text style={styles.subText}>{category.title}</Text>
          </TouchableWithoutFeedback>
        </View>
      );
    });
  }

  renderSubCategories() {
    const subcategories = categories[parseInt(this.state.selectedCategory,10)-1].subcategories;
    return subcategories.map((sub) => {
      if (sub.id === '1') {
        return (
          <View key={sub.id} style={this.state.selectedSubCategory !== sub.id ?
                      styles.subCategoriesContainer : styles.subCategoriesContainerSelected}>
            <TouchableWithoutFeedback
              style={{
                paddingHorizontal: wp("4%"),
                alignItems: "center",
                justifyContent: "center",
                height: wp("24%"),
                width: wp("23%"),
              }}
              onPress={() => {
                this.setState({
                  selectedSubCategory: sub.id
                })
              }}
            >
              <Image
                style={styles.image}
                source={sub.image}
              ></Image>
              <Text style={styles.subText}>{sub.title}</Text>
            </TouchableWithoutFeedback>
          </View>
        );
      }
      return (
        <View key={sub.id} style={[this.state.selectedSubCategory !== sub.id ?
                    styles.miniSubCategoriesContainer : styles.miniSubCategoriesContainerSelected
                ]}>
          <TouchableWithoutFeedback
            style={{
              paddingHorizontal: wp("4%"),
              alignItems: "center",
              justifyContent: "space-evenly",
              height: wp("11%"),
              width: wp("23%"),
              flexDirection: 'row'
            }}
            onPress={() => {
              this.setState({
                selectedSubCategory: sub.id
              })
            }}
          >
            <Image
              style={styles.smallImage}
              source={sub.image}
            ></Image>
            <Text style={styles.subText}>{sub.title}</Text>
          </TouchableWithoutFeedback>
        </View>
      );
    });
  }
}
