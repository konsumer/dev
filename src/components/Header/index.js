import React from 'react'

import pipe from '../../pipe'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      lock: props.lock
    }

    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
  }

  componentWillReceiveProps (props) {
    this.setState({profile: props.profile, lock: props.lock})
  }

  logout () {
    localStorage.removeItem('userToken')
    pipe.emit('logout')
  }

  login () {
    this.props.lock.showSignin()
  }

  render () {
    return (
    <div className="Header">
      <h1>{document.title}</h1>
      <div className="user">
        {this.state.profile ? (<div>
                                 <button onClick={this.logout} className="pure-button">
                                   Logout
                                 </button>
                                 <img src={this.state.profile.picture} alt={this.state.profile.nickname} title={`logged in as ${this.state.profile.nickname}`} />
                               </div>) : (<div>
                                            <button onClick={this.login} className="pure-button">
                                              Login
                                            </button>
                                          </div>)}
      </div>
    </div>
    )
  }
}
