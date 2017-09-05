import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AllCategories from './AllCategories'
import Category from './Category'
import PostDetails from './PostDetails'
import CreateComment from './CreateComment'
import CreatePost from './CreatePost'
import EditComment from './EditComment'
import EditPost from './EditPost'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={AllCategories}/>
        <Route path="/categories/:categoryPath" component={Category}/>
        <Route path="/posts/:postId" component={PostDetails}/>
        <Route exact path="/create" component={CreatePost}/>
        <Route path="/create/:parentId" component={CreateComment}/>
        <Route path="/edit/posts/:postId" component={EditPost}/>
        <Route path="/edit/comments/:commentId" component={EditComment}/>
      </Switch>
    )
  }
}

export default App
