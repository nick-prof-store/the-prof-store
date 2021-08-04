import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
const { useState, useEffect } = React;
import axios from 'axios';
const Images = ()=> {

  const upload = ()=> {
    axios.post('/api/images', { data })
  };
  const [images, setImages] = useState([]);
  const [el, setEl] = useState(null);
  const [data, setData] = useState('');
  useEffect(()=> {
    axios.get('/api/images')
      .then( response => setImages(response.data));
  }, []);

  useEffect(()=> {
    if(el){
      el.addEventListener('change', (e)=> {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', ()=> {
          setData(reader.result);
        });
        reader.readAsDataURL(file);
      });
    }
  }, [el]);
  return (
    <div>
      <h1>Images</h1>
        <input type='file' ref={ el => setEl(el)} />
        { data }
        <button disabled={ !data } onClick={ upload }>Upload</button>
      <ul>
        {
          images.map( image => {
            return (
              <li key={image.id}>
                <img src={ image.data } />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}; 

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/images" component={Images} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/images" component={Images} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
