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
        <Route exact path="/create" component={CreatePost}/>
        <Route path="/create/:category/:parent_id" component={CreateComment}/>
        <Route path="/edit/:category/:comment_id" component={EditComment}/>
        <Route path="/edit/:post_id" component={EditPost}/>
        <Route path="/:category/:post_id" component={PostDetails}/>
        <Route path="/:category" component={Category}/>
      </Switch>
    )
  }
}

export default App
