import React, {Component} from 'react';

export default class PressArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.slugify(this.props.match ? this.props.match.params.article: ''),
      publication: this.slugify(this.props.match ? this.props.match.params.publication: ''),
      entry: {},
      overflow: ''
    }
  }
  componentWillMount() {
    window.gtag('config', 'UA-113369414-1', {
      'page_title': this.props.metaTitle,
      'page_location': window.location.href,
      'page_path': window.location.pathname
    });
  }
  componentDidMount() {
    /** meta data for page */
    document.title = this.props.metaTitle;
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = this.props.metaDescription;
      document.querySelector("meta[property='og:description']").content = this.props.metaDescription;
      document.querySelector("meta[property='og:title']").content = this.props.metaTitle;
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
      document.querySelector("meta[property='og:url']").content = window.location.href
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }

    // getting the correct article by matching publisher and article title
    this.props.articles.forEach((value, index) => {
      var artslug = this.slugify(this.slugify(value.title));
      var pubslug = this.slugify(this.slugify(value.publisher));
      if ((artslug === this.state.article) && (pubslug === this.state.publication)) {
        this.setState({
          entry: value
        });
      }
    });
  }

  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w-]+/g, '')       // Remove all non-word chars
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  render() {
    return (
      <div className='press-article' ref={e => {this.article = e;}}>
        <div className="press-item not-active">
          <h2 className="publication sans-light-bold upper">{this.state.entry.publisher}</h2>
          <h5 className="title sans">{this.state.entry.title}</h5>
          <h5 className="date sans">{this.state.entry.date}</h5>
        </div>
        <div className="summary-wrapper" ref={e => {this.summary = e;}}>
          <h1 className="subtitle sans-bold">{this.state.entry.subtitle}</h1>
          <p className="summary serif">{this.state.entry.summary}</p>
          <a className="url serif-bold upper" href={this.state.entry.link} target="_blank">DOWNLOAD FULL ARTICLE</a>
        </div>
      </div>
    );
  }
}