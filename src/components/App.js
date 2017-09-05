import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AllCategories from './AllCategories'
import Category from './Category'
import PostDetails from './PostDetails'
import CreateComponent from './CreateComponent'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={AllCategories}/>
        <Route path="/categories/:categoryPath" component={Category}/>
        <Route path="/posts/:postId" component={PostDetails}/>
        <Route path="/create" component={CreateComponent}/>
      </Switch>
    )
  }
}

export default App
