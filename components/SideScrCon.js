import React,{Component} from 'react';
import { View, ScrollView, Text } from 'react-native';


// export default class SideScrCon extends Component{
    // render(){
    //     return 
    // }
// }

export default function SideScrCon(prop){
    return(
        <ScrollView horizontal={ true }>
           <Text>Child 1</Text>
           <Text>Child 2</Text>
           <Text>Child 3</Text>
           <Text>Child 4</Text>
           <Text>Child 5</Text>
           <Text>Child 6</Text>
           <Text>Child 7</Text>
           <Text>Child 8</Text>
           <Text>Child 9</Text>
           <Text>Child 10</Text>
           <Text>Child 11</Text>
           <Text>Child 12</Text>
        </ScrollView>
    )
}