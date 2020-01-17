import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
// DrawerActions is a specific type of navigation dispatcher
import { DrawerActions } from 'react-navigation-drawer';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

interface Props {
    navigation: any;
}

export default class DrawerTrigger extends React.Component<Props> {
    render() {
      return (
        <TouchableOpacity style={styles.trigger}
          onPress={() => {
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }}
        >
          <Icon name="menu" style={{ fontSize: widthPercentageToDP('8%'), color: 'white' }} />
        </TouchableOpacity>
      )
    }
  }
  
  const styles = StyleSheet.create({
    trigger: {
      marginLeft: widthPercentageToDP('4%'),
      borderRadius: 30,
      width: widthPercentageToDP('5.5%'),
      height: heightPercentageToDP('4%'),
      marginBottom: heightPercentageToDP('0.7%')
    }
  });