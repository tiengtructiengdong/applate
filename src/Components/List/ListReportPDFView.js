import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Header} from '../Header/Header.js';

import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffb500',
  },
});

export class ListReportPDFView extends React.Component {
  constructor() {
    super();
    this.state = {
      path: '',
    };
  }

  componentDidMount() {
    this.generatePDF()
      .then(() => {})
      .catch(err => {
        console.log('err', err);
      });
  }

  async generatePDF() {
    const page1 = PDFPage.create()
      .setMediaBox(200, 200)
      .drawText('You can add text and rectangles to the PDF!', {
        x: 5,
        y: 235,
        color: '#007386',
      })
      .drawRectangle({
        x: 25,
        y: 25,
        width: 150,
        height: 150,
        color: '#FF99CC',
      })
      .drawRectangle({
        x: 75,
        y: 75,
        width: 50,
        height: 50,
        color: '#99FFCC',
      });

    const docsDir = PDFLib.getDocumentsDirectory();
    const pdfPath = `${docsDir}/sample.pdf`;
    PDFDocument.create(pdfPath)
      .addPages(page1)
      .write()
      .then(path => {
        console.log('PDF created at: ' + path);
        this.setState({path: path});
      });
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header
          bgColor="#ffb500"
          title="Report"
          goBack={() => this.props.navigation.goBack()}
          goRight={this.share.bind(this)}
          iconRight="share-outline"
        />
        <ScrollView style={style.scrollView}></ScrollView>
      </SafeAreaView>
    );
  }

  share() {}
}
