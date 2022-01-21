import React, { Fragment } from 'react';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import { Login } from './Login'
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { Profile } from './Profile';
import { SpaceComponent } from './spaces/SpaceComponent'
import { Spaces } from './spaces/Spaces';
import { DataService } from '../services/DataService';
import { threadId } from 'worker_threads';


interface AppState {
  user: User | undefined
}

export class App extends React.Component<{}, AppState> {

  //Passes to Login.tsx
  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  constructor(props: any) {
    super(props)
    this.state = {
      user: undefined
    }
    this.setUser = this.setUser.bind(this);
  }

  //must be binded or undefined. Is binded in constructor
  private setUser(user: User) {
    this.setState({
      user: user
    })
    console.log('Setting user: ' + user);
  }

  render() {
    return (
      <div className='wrapper'>
        <BrowserRouter>
          <Fragment>
            <Navbar user={this.state.user} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element= {<Login authService={this.authService} setUser={this.setUser} />} >
              </Route>
              <Route path='/profile' element={<Profile authService={this.authService} user={this.state.user}/>} />
              <Route path = '/charity' element = {<Spaces dataService={this.dataService}/>} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      </div>
    )
  }

}
