import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Header} from '../Header/Header.js';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffb500',
  },
  cell: {
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderBottomColor: '#d0d0d0',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    height: 50,
    overflow: 'hidden',
  },
  cellLabel: {
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 25,
    position: 'absolute',
  },
  cellText: {
    fontWeight: '400',
    fontSize: 17,
    marginLeft: 120,
    marginRight: 16,
    textAlign: 'right',
    //backgroundColor: '#ff505050',
  },
  scrollView: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  bold: {
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 10,
  },
  regular: {
    fontSize: 17,
    fontWeight: '400',
    paddingBottom: 8,
  },
});

export class ListReport extends React.Component {
  constructor() {
    super();
    this.state = {
      plateId: '',
      owner: '',
      id: 0,
      deviceOwner: '',
    };
  }

  componentDidMount() {
    this.setState({
      plateId: this.props.plateId,
    });
  }

  getOwner(owner) {
    this.setState({owner: owner});
  }
  getId(id) {
    this.setState({id: id});
  }
  generatePDF() {}

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header
          bgColor="#ffb500"
          title="Report ticket loss"
          goBack={() => this.props.navigation.goBack()}
          goRight={this.proceed.bind(this)}
          iconRight="albums-outline"
        />
        <ScrollView style={style.scrollView}>
          <View style={style.cell}>
            <Text style={style.cellLabel}>Vehicle</Text>
            <Text style={style.cellText}>{this.state.plateId}</Text>
          </View>

          <View style={style.cell}>
            <Text style={style.cellLabel}>Vehicle owner</Text>

            <TextInput
              style={style.cellText}
              placeholder="Name"
              returnKeyType="done"
              multiline={true}
              onChangeText={this.getOwner.bind(this)}
              blurOnSubmit={true}>
              {this.state.owner}
            </TextInput>
          </View>

          <View style={style.cell}>
            <Text style={style.cellLabel}>ID number</Text>

            <TextInput
              style={style.cellText}
              placeholder="ID number"
              returnKeyType="done"
              multiline={true}
              onChangeText={this.getId.bind(this)}
              keyboardType="numeric"
              blurOnSubmit={true}>
              {this.state.price}
            </TextInput>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  proceed() {
    this.props.navigation.navigate('ListReportPDFView', {
      plateId: this.state.plateId,
      owner: this.state.owner,
      id: this.state.id,
      deviceOwner: this.state.deviceOwner,
    });
  }
}
