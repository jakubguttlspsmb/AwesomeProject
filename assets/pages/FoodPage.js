import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";

export default function FoodPage() {
  const [data, setData] = useState("");
  const [dataPerServing, setDataPerServing] = useState("");
  const [food, setFood] = useState("");
  const fetchData = async () => {
    try {
      searchInput = food;
      const response = await fetch(
        `http://api.edamam.com/api/food-database/v2/parser?app_id=181e5eb4&app_key=0633a8e3dc27c8ba43caf5b67709cd32&ingr=${searchInput}&nutrition-type=cooking&181e5eb4=0633a8e3dc27c8ba43caf5b67709cd32`
      );
      const jsonData = await response.json();
      setDataPerServing(jsonData);
      setData(jsonData.parsed[0].food);
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    input: {
      borderWidth: 1,
      borderRadius: 20,
      padding: 8,
      margin: 10,
      backgroundColor: "white",
      width: 200,
    },
    Text: {
      color: "black",
    },
    image: {
      width: 20,
      height: 20,
    },
  });
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="search food"
          onChangeText={(food) => setFood(food)}
        />
        <Button onPress={fetchData} title="search"></Button>
        <Text style={styles.Text}>
          food your searched for {dataPerServing.text}
        </Text>
        <Image source={{ uri: data.image }} style={styles.image} />
        {data && data.nutrients && (
          <View>
            <Text style={styles.Text}>Nutrients:</Text>
            <Text style={styles.Text}>
              ENERC_KCAL: {data.nutrients.ENERC_KCAL}
            </Text>
            <Text style={styles.Text}>PROCNT: {data.nutrients.PROCNT}</Text>
            <Text style={styles.Text}>FAT: {data.nutrients.FAT}</Text>
            <Text style={styles.Text}>CHOCDF: {data.nutrients.CHOCDF}</Text>
            <Text style={styles.Text}>FIBTG: {data.nutrients.FIBTG}</Text>
          </View>
        )}
      </View>
    </>
  );
}
