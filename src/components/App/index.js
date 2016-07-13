import React from 'react'

import pipe from '../../pipe'
import style from './index.scss'
import Markdown from '../Markdown'
import Header from '../Header'
import Keys from '../Keys'
import text_home from './home.md'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      idToken: undefined,
      profile: undefined
    }
    this.getIdToken = this.getIdToken.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout () {
    this.setState({profile: undefined})
  }

  removeHash () {
    var scrollV, scrollH, loc = window.location
    if ('replaceState' in history) {
      history.replaceState('', document.title, loc.pathname + loc.search)
    }else {
      // Prevent scrolling by storing the page's current scroll offset
      scrollV = document.body.scrollTop
      scrollH = document.body.scrollLeft

      loc.hash = ''

      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scrollV
      document.body.scrollLeft = scrollH
    }
  }

  getIdToken () {
    var idToken = localStorage.getItem('userToken')
    var authHash = this.lock.parseHash(window.location.hash)
    if (!idToken && authHash) {
      this.removeHash()
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token)
      }
      if (authHash.error) {
        localStorage.removeItem('userToken')
        console.error('Error signing in', authHash)
        return null
      }
    }
    return idToken
  }

  componentWillMount () {
    this.lock = new Auth0Lock('RANv1xLe0ckZNGV11uJGjn8D9B8KdSyj', 'jetboystudio.auth0.com')
    this.setState({idToken: this.getIdToken()})
    pipe.on('logout', this.onLogout)
  }

  componentWillUnmount () {
    pipe.off('logout', this.onLogout)
  }

  componentDidMount () {
    this.lock.getProfile(this.state.idToken, (err, profile) => {
      if (err) {
        pipe.emit('error', err)
      }else {
        profile.identities.forEach(id => {
          fetch(`https://api.github.com/user/keys?access_token=${id.access_token}`)
            .then(r => r.json())
            .then(d => {
              profile.keys = (profile.keys || []).concat(d)
              this.setState({profile: profile})
            })
        })
      }
    })
  }

  render () {
    return (<div className="App">
              <Header profile={this.state.profile} lock={this.lock} />
              <div id="content">
                <Markdown text={text_home} />
                <Keys profile={this.state.profile} />
              </div>
            </div>)
  }
}
