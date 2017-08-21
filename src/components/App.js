import React, { Component } from 'react';
import * as PostsAPI from '../utils/PostsAPI';

class App extends Component {
  state = {
    categories: []
  }
  componentDidMount() {
    PostsAPI.getCategories().then((categories) => {
      this.setState({ categories })
    })
  }
  render() {
    return (
      <ul>
        {this.state.categories.map(category => (
          <li key={category.path}>{category.name}</li>
        ))}
      </ul>
    );
  }
}

export default App;
