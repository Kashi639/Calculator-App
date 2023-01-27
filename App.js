import React, { Component } from 'react'; //importing main react framework, components from react
import {                              
  StyleSheet,              //StyleSheet = apply css to the react native framework, Flexbox
  Text,                    //Text = component that renders text on app
  View,                    //View = container component/box, where all other components go in like text, image, etc.
  TextInput,
  TouchableNativeFeedback,
  Button,
  TouchableOpacity
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {

componentDidMount() {
  SplashScreen.hide()
}

componentDidUpdate() {
  SplashScreen.hide()
}
//JSX = to write html inside javascript, 
//Props/properties = style
constructor() {
   super();
   this.state = {
    resultText: "",
    calculationText: ""
   }
   this.operations = ['DEL','+', '-', '*', '/']
}

calculateResult(){
  const text = this.state.resultText
  console.log(text, eval(text))
  this.setState({
    calculationText: eval(text)
  })
  //BODMAS
  //eval(text)           //used to evaluate a string as a javastring code
                   // never use of user inputs
      // do something...

  // Brackest -> of -> Division -> Multiplication -> Addition -> Subtraction
  // now parse this text ex- 3+3*6^5/2+7
}

validate() {
  const text = this.state.resultText
  switch(text.slice(-1)) {
    case '+':
    case '-':
    case '*':
    case '/':
      return false
    }
    return true
}

buttonPressed(text) {
   console.log(text)

   if(text == '='){
     return this.validate() && this.calculateResult()
   }

   this.setState({
    resultText: this.state.resultText+text
   })
}
operate(operation) {
   switch(operation) {
    case 'DEL':
      console.log(this.state.resultText)
      let text = this.state.resultText.split('')
      text.pop()
      text.join('')
      this.setState({
        resultText: text.join('')
      })
      break
    case '+':
    case '-':
    case '*':
    case '/':
      const lastChar = this.state.resultText.split('').pop()

      if(this.operations.indexOf(lastChar) >0 ) return

      if(this.state.text == "") return
      this.setState({
        resultText: this.state.resultText + operation
      })
   } 
}
 render() {
  let rows = []
  let nums = [[1,2,3], [4,5,6], [7,8,9], ['.',0,'=']]
   for(let i=0; i<4; i++) {
     let row= []
     for(let j=0; j<3; j++) {
      row.push(
      <TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
        <Text style={styles.txt}>{nums[i][j]}</Text>
      </TouchableOpacity>)
     }
     rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

   let ops = []
    for(let i=0; i<5; i++) {
     ops.push(
     <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress ={() => this.operate(this.operations[i])}>
      <Text style={styles.txt}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }

   return (
      <View style={styles.Container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculations}>
          <Text style={styles.txt}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
              {rows}
          </View>
          <View style={styles.operations}>
              {ops}
          </View>
        </View>
      </View>
    );
  }
}
// Styles
const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  opstext: {
    fontsize: 30,
    color: 'white'
  },
  txt: {
    fontSize: 30,
    color: 'black'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  resultText: {
    fontSize: 40,
    color: 'white'
  },
  calculationText: {
    fontSize: 20,
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculations: {
    flex: 1,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#ffffff',
  },
  operations: {
    flex: 1,
    backgroundColor: '#ffa500',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  }
});


