import { StyleSheet, Dimensions } from "react-native";
const { width: WIDTH } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    height: 40,
    // backgroundColor: "teal",
  },
  text: {
    color: "mediumvioletred",
    position: "absolute",
    marginTop: 10,
    right: 25,
    fontSize: 25,
    fontStyle: "italic",
    alignItems: "center",
    textAlign: "center",
  },
  coltext: {
    textAlign: "center",
    flex: 1,
    fontWeight: "500",
    fontSize: 20,
  },
  headerText: {
    left: 40,
    color: "mediumvioletred",
    fontSize: 40,

    fontStyle: "italic",
    fontWeight: "500",

    alignItems: "center",
    justifyContent: "center",
    opacity: 1.0,
  },
  detailsText: {
    color: "mediumvioletred",
    fontStyle: "italic",
    fontSize: 20,
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    opacity: 1.0,
  },
  input: {
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
    height: 35,
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0, 0.35)",
    color: "rgba(450,280,300,1.5)",
    fontStyle: "italic",
  },
  inputContainer: {
    marginTop: 25,
  },
  buttonLogin: {
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH - 270,
    left: 130,
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "yellow",
    marginTop: 10,
    marginBottom: 10,
  },
});
