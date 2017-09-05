import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateComment from './CreateComment'
import CreatePost from './CreatePost'

class CreateComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/create" component={CreatePost}/>
          <Route path="/create/:parentId" component={CreateComment}/>
        </Switch>
      </div>
    )
  }
}

export default CreateComponent
