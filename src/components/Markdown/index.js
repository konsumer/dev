import React from 'react'
import marked from 'marked'
import hljs from 'highlight.js'

hljs.configure({
  tabReplace: '  '
})

export default class Markdown extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      text: props.text 
    }

    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code, language) => `<pre><code class="hljs ${language}">${hljs.highlight(language, code).value}</code></pre>`
    })
  }

  componentWillReceiveProps(props){
    this.setState({text:props.text})
  }

  render () {
    const html = marked(this.state.text || '')

    return (
      <div className='Markdown' dangerouslySetInnerHTML={{__html: html}} />
    )
  }
}

Markdown.propTypes = {
  text: React.PropTypes.string.isRequired
}

Markdown.defaultProps = {
  text: ''
}
