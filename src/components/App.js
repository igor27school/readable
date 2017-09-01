import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AllCategories from './AllCategories'
import Category from './Category'
import PostDetails from './PostDetails'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={AllCategories}/>
        <Route path="/category/:category_path" component={Category}/>
        <Route path="/post/:post_id" component={PostDetails}/>
      </Switch>
    )
  }
}

export default App
