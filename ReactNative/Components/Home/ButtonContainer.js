import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import SkillButton from '../Skills/SkillButton'

class ButtonContainer extends React.Component {

  render() {

    const buttons = Object.entries(this.props.skills)
      .filter(([name, skill]) => skill.hasButton)
      .map(([name, skill]) => <SkillButton key={name} name={name} skill={skill}/>)

    return (
      <View style={styles.container}>
       {buttons}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
