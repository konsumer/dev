import React from 'react'

import Markdown from '../Markdown'

export default class Keys extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      profile: props.profile
    }
  }

  componentWillReceiveProps(props){
    this.setState({profile: props.profile})
  }
  
  render(){
    if (!this.state.profile || !this.state.profile.keys || !this.state.profile.keys){
      return null
    }
    var out = `## Your Keys
These are your github ssh pubkeys. Send konsumer a request for dokku access with whichever one you like.
`
    this.state.profile.keys.forEach(k => {
      out += '* [' + k.title + '](mailto:konsumer@jetboystudio.com?subject=' + encodeURIComponent('dokku access') + '&body=' + encodeURIComponent('Please grant me dokku access. Here is my SSH pubkey:\n' + k.key) + ')\n\n'
    })
    return <Markdown text={out} />
  }
}