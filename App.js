import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  Text,
  Button,
  ImageBackground,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Table, Row, Col } from "react-native-table-component";
import { Grid } from "react-native-easy-grid";
import styles from "./styleSheet";

export default class FilmsReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      filmname: "",
      filmrating: "",
      jwtToken: "",
      flag: false,
      row1: "",
      column1: "",
      column2: "",
    };
  }

  login = () => {
    var loginname = this.state.username;
    if (!loginname) {
      alert("please enter username!!");
    } else {
      alert(loginname + " logged in Successfully");
      try {
        fetch("http://10.165.1.52:8080/api/v1/login", {
          method: "POST",
          body: JSON.stringify({
            username: loginname,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            var jwtToken = data.token;
            this.setState({ jwtToken: jwtToken });
          });
      } catch (e) {
        console.log(e);
        console.log("..........................");
      }
      this.setState({ username: "" });
    }
    return false;
  };
  createFilm = () => {
    var filmname = this.state.filmname;
    var filmrating = this.state.filmrating;
    var input_pattern = /^[0-9]$/;
    if (!filmname && !filmrating) {
      alert("Please enter a Film name and rating.");
      return false;
    } else if (!filmname) {
      alert("Enter Film Name");
      return false;
    } else if (!filmrating) {
      alert("Enter Film Rating");
      return false;
    } else if (input_pattern.test(filmrating) == false) {
      alert("Enter Valid rating");
      return false;
    } else {
      try {
        fetch("http://10.165.1.52:8080/api/v1/films", {
          method: "POST",
          body: JSON.stringify({
            name: filmname,
            rating: filmrating,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.jwtToken,
          },
        }).then((resp) => {
          setTimeout(function () {
            if (resp.status == 200) {
              alert(
                "Film name " +
                  filmname +
                  " and " +
                  filmrating +
                  " added Successfully"
              );
            } else {
              alert(
                "Unable to add film name and rating " +
                  " Error:" +
                  resp.status +
                  resp.statusText
              );
            }
          }, 0);
        });
      } catch (e) {
        console.log(e);
        console.log(".........................");
      }
      this.setState({ filmname: "" });
      this.setState({ filmrating: "" });
    }
  };
  getFilms = () => {
    var row1 = ["Film Names", "Film Rating"];
    var column1 = [];
    var column2 = [];
    try {
      fetch("http://10.165.1.52:8080/api/v1/films", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((results) => {
          if (results.length > 0) {
            results.forEach((details) => {
              this.setState({ row1: row1 });
              column1.push(details.name);
              column2.push(details.rating);
            });
          } else {
            row1.length = 0;
            alert("Film Details are not available");
          }
          this.setState({ row1: row1 });
          this.setState({ column1: column1 });
          this.setState({ column2: column2 });
        });
    } catch (e) {
      console.log(e);
      console.log("............");
    }
    this.setState({ flag: true });
    this.setState({ filmname: "" });
    this.setState({ filmrating: "" });
  };
  updateFilms = () => {
    var filmname = this.state.filmname;
    var filmrating = this.state.filmrating;
    var input_pattern = /^[0-9]$/;
    if (!filmname && !filmrating) {
      alert("Please enter a Film name and rating.");
      return false;
    } else if (!filmname) {
      alert("Enter Film Name");
      return false;
    } else if (!filmrating) {
      alert("Enter Film Rating");
      return false;
    } else if (input_pattern.test(filmrating) == false) {
      alert("Enter Valid rating");
      return false;
    } else {
      try {
        fetch("http://10.165.1.52:8080/api/v1/films", {
          method: "PUT",
          body: JSON.stringify({
            name: filmname,
            rating: filmrating,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.jwtToken,
          },
        }).then((resp) => {
          setTimeout(function () {
            if (resp.status == 200) {
              alert(
                "Film name " +
                  filmname +
                  " and " +
                  filmrating +
                  " Updated Successfully"
              );
            } else {
              alert(
                "Unable to update film name and rating " +
                  " Error:" +
                  resp.status +
                  resp.statusText
              );
            }
          }, 0);
        });
      } catch (e) {
        console.log(e);
        console.log(".........................");
      }
    }
    this.setState({ filmname: "" });
    this.setState({ filmrating: "" });
    return false;
  };

  render() {
    return (
      <ImageBackground
        source={require("./assets/bg2.jpg")}
        style={styles.container}
      >
        <SafeAreaView style={styles.main}>
          <View style={styles.inputContainer}>
            <Text style={styles.headerText}> Films Review!! </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder={"Enter User Name"}
              placeholderTextColor={"rgba(283,255,255,0.9)"}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ username: text })}
              value={this.state.username}
            />
          </View>
          <TouchableOpacity style={styles.buttonLogin}>
            <Button title="LOGIN" onPress={this.login} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.detailsText}>
              Enter the Film Name & Rating below:
            </Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder={"Film Name"}
              placeholderTextColor={"rgba(283,255,255,0.9)"}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ filmname: text })}
              value={this.state.filmname}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder={"Film Rating"}
              placeholderTextColor={"rgba(283,255,255,0.9)"}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ filmrating: text })}
              value={this.state.filmrating}
            />
          </View>

          <TouchableOpacity style={styles.buttonLogin}>
            <Button title="ADD" onPress={this.createFilm} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLogin}>
            <Button title="DETAILS" onPress={this.getFilms} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLogin}>
            <Button title="UPDATE" onPress={this.updateFilms} />
          </TouchableOpacity>

          <ScrollView vertical={true}>
            {this.state.flag ? (
              <View>
                <Table
                  borderStyle={{
                    // borderWidth: 3,
                    borderColor: "#C1C0B9",
                  }}
                >
                  <Row
                    data={this.state.row1}
                    style={styles.header}
                    textStyle={styles.text}
                  />

                  <Grid>
                    <Col data={this.state.column1} textStyle={styles.coltext} />
                    <Col data={this.state.column2} textStyle={styles.coltext} />
                  </Grid>
                </Table>
              </View>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
