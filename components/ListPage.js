import React from 'react'
import Post from './Post'
import SideScrcon from './SideScrCon'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  View,
  TouchableHighlight,
  ListView,
  Modal,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native'
import CreatePage from './CreatePage'

const allPostsQuery = gql`
  query {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }`
  const allStoriesQuery = gql`
    query{
      allStories(orderBy: createdAt_Desc){
        id
        name
        text
      }
    }`


class ListPage extends React.Component {

  constructor(props) {
    super(props)
    // react native에 속해있는 기본 틀.
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([]),
      modalVisible: false,
      user: undefined,
    }

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.allPostsQuery.loading && !nextProps.allPostsQuery.error) {
      const {dataSource} = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.allPostsQuery.allPosts),
      })
    }
  }

  render () {
    if (this.props.allPostsQuery.loading) {
      return (<Text>Loading</Text>)
    }

    return (
      <View style={styles.container}>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
        >
          <CreatePage
            onComplete={() => {
              this.props.allPostsQuery.refetch()
              this.setState({modalVisible: false})
          }}/>
        </Modal>

      {/* In renderRow, 함수의 매개변수로 변수를 지정한것이다. ex) rowData(기본), post, ... 관련이름이 좋겠지?*/}


          <View style={styles.upperad}>
          <Text></Text>
          </View>
           <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(post) => (
              <Post
                description={post.description}
                imageUrl={post.imageUrl}
              />
            )}
          />
          <SideScrcon />
          <TouchableHighlight
            style={styles.createPostButtonContainer}
            onPress={this._createPost}
          >
            <Text style={styles.createPostButton}>Create Post</Text>
          </TouchableHighlight>

      </View>
    )
  }

  _createPost = () => {
    // this.props.router.push('/create');
    this.setState({modalVisible: true})

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  upperad : {
    flex:1,
    backgroundColor:'#9e9e9e'
  },
  lowerad : {
    flex:2
  },
  createPostButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostButton: {
    backgroundColor: 'rgba(39,174,96,1)',
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    height: 60,
    width: 480,
    paddingTop: 18,
  }
})

export default graphql(allPostsQuery, {name: 'allPostsQuery'})(ListPage);
// export default graphql(allStoriesQuery, {name: 'allStoriesQuery'})(ListPage);

