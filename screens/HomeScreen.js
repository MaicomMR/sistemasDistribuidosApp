import React, { Component } from 'react';
import { TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, View, Text, Button, Image, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';


class HomeScreen extends Component {




  static navigationOptions = ({ navigation }) => {
    return {
      title: "Aeronaves a venda",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { textAlign: "center", flex: 1 }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }
  componentDidMount() {
    fetch("http://revendaaeronaves.herokuapp.com/api")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}



      />
    );
  }

  renderItem = (data) =>


  // MONTAGEM DO ÍTEM AVIÃO DA LISTAGEM
    <View>
      <TouchableOpacity style={styles.list}>
        <Text style={styles.lightText}>Modelo da Aeronave: {data.item.name}</Text>
        <Text style={styles.lightText} thousandSeparator={true}>Valor da Aeronave: {data.item.value} R$</Text>
        <View style={styles.preview}>
        <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: 'http://revendaaeronaves.herokuapp.com/images/covers/' + data.item.photo  }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>




  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }


    return (

      // EXIBIÇÃO DA VIEW DA HOME
      < View style={styles.container} >

        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
        />

      
        <Button
          title="ADICIONAR AERONAVE"
          onPress={() => this.props.navigation.navigate('AddAirplane')}
        />

      </View>

    )
  }
}

class AddAirplane extends Component {

  // Método disparado ao acionar o botão "ADICIONAR AERONAVE"
  // Vai criar um objeto a partir das entradas do formulário
  pressionarBotao() {
    let collection = {}
    collection.model = this.state.model,

      collection.name = this.state.model,
      collection.secondName = this.state.name,
      collection.flightTime = this.state.hours,
      collection.actualCity = "Added from app",
      collection.value = this.state.value,
      collection.year = this.state.year,
      collection.observation = "Added from app",
      collection.type = 1,
      collection.description = "Added from app",
      collection.manufacture_id = 1


    // "console log" para verificar se ta tudo ok
    // Somente para uso dos devs
    console.warn(collection)


    // URL da API definida em uma variável para caso tenha de ser alterada
    const url = 'https://revendaaeronaves.herokuapp.com/api/apiCreate';
    const data = { username: 'example' };

    // Disparo do método POST com o objeto montado em forma de arquivo JSON
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Success:', JSON.stringify(collection));

    this.props.navigation.navigate('AddAirplane')
    

  }




  // CONSTRUTOR COM AS VARIÁVEIS

  constructor() {
    super();
    this.state = {
      model: '',
      name: '',
      value: '',
      year: '',
      hours: ''
    }
  }




  // EDITOR DAS VARIÁVEIS DE ACORDO COM A DIGITAÇÃO NOS CAMPOS

  changeText(text, field) {
    if (field == 'model') {
      this.setState({ model: text, })
      // console.warn(text)
    } else if (field == 'name') {
      this.setState({ name: text, })
      // console.warn(text)
    } else if (field == 'value') {
      this.setState({ value: text, })
      // console.warn(text)
    } else if (field == 'year') {
      this.setState({ year: text, })
      // console.warn(text)
    } else if (field == 'hours') {
      this.setState({ hours: text, })
      // console.warn(text)
    }

  }




  // JANELA RESPONSÁVEL PELO FORM DE ADICIONAR AERONAVES

  render() {
    return (
      <View>
        <Text style={styles.formHeader}>ADICIONAR AERONAVE</Text>
        <Text style={styles.formTextHeader}>Preencha os campos a baixo para anunciar sua aeronave à venda</Text>


        <TextInput
          // placeholder="Modelo da Aeronave"
          placeholder="Modelo"
          style={styles.textInput}
          onChangeText={(text) => this.changeText(text, 'model')}
        />
        <TextInput
          placeholder="Nome"
          style={styles.textInput}
          onChangeText={(text) => this.changeText(text, 'name')}
        />
        <TextInput
          placeholder="Valor(R$):"
          style={styles.textInput}
          onChangeText={(text) => this.changeText(text, 'value')}
        />
        <TextInput
          placeholder="Ano"
          style={styles.textInput}
          onChangeText={(text) => this.changeText(text, 'year')}
        />
        <TextInput
          placeholder="Horas de voo"
          style={styles.textInput}
          onChangeText={(text) => this.changeText(text, 'hours')}
        />

        <TouchableHighlight style={styles.button}
          onPress={() => this.pressionarBotao()}
        >
          <Text style={styles.textButton}>PUBLICAR</Text>
        </TouchableHighlight>

      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    AddAirplane: {
      screen: AddAirplane
    }
  },
  {
    initialRouteName: 'Home'
  }

);

const AppContainer = createAppContainer(AppNavigator);



// ------------------------------------------------------------------------------------------------------------------------
// ----------------------------------       PARTE RESPONSÁVEL PELA ESTILIZAÇÃO DO APP      --------------------------------
// ------------------------------------------------------------------------------------------------------------------------


export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  airplaneListName: {
    textAlign: "center",
    padding: 3,
    fontSize: 14
  },
  formHeader: {
    textAlign: "center",
    backgroundColor: '#b6d9e0',
    padding: 12,
    fontSize: 16
  },
  formTextHeader: {
    textAlign: "center",
    padding: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    flexDirection: 'column',
  },
  lightText: {
    textAlign: "center",
    margin: 2
  },
  button: {
    backgroundColor: '#58a37f',
    margin: 12,
    padding: 12,
    fontSize: 14
  },
  textButton: {
    textAlign: "center",
    color: "white"
  },
  textInput: {
    height: 40,
    paddingLeft: 6,
    backgroundColor: '#f2f2f2',
    borderColor: '#d6d6d6',
    marginTop: 8,
    marginLeft: 12,
    marginRight: 12
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
  }
});