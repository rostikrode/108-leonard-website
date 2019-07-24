import React, {Component} from 'react';
import close_thin_blue from '../../assets/close_thin_blue.svg';

export default class PressArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.slugify(this.props.match ? this.props.match.params.article : ''),
      publication: this.slugify(this.props.match ? this.props.match.params.publication : ''),
      entry: {},
      overflow: '',
      title: this.props.metaTitle,
      desc: this.props.metaDescription
    }
  }
  componentWillMount() {
    if (window.location.origin === 'https://108leonard.com') {
      window.gtag('config', 'UA-113369414-1', {
        'page_title': this.state.title,
        'page_location': window.location.href,
        'page_path': window.location.pathname
      });
    }
  }

  componentDidUpdate() {
    if (window.location.origin === 'https://108leonard.com') {
      window.gtag('config', 'UA-113369414-1', {
        'page_title': this.state.title,
        'page_location': window.location.href,
        'page_path': window.location.pathname
      });
    }
    
  }

  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w-]+/g, '')       // Remove all non-word chars
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  closeBtnClick() {
    this.props.history.push('/press/');
  }

  render() {
    let article;
    if (this.props.pressArticles) {
      article = this.props.pressArticles.find(article => {
        var artslug = this.slugify(this.slugify(article.title));
        var pubslug = this.slugify(this.slugify(article.publisher));
        if ((artslug === this.state.article) && (pubslug === this.state.publication)) {
          return article
        }
      });

      document.title = article.title;
      if(document.getElementsByTagName('meta').description) {
        document.getElementsByTagName('meta').description.content = article.subtitle;
        document.querySelector("meta[property='og:description']").content = article.summary;
        document.querySelector("meta[property='og:title']").content = article.title;
      }
      if (document.querySelector("link[rel='canonical']")) {
        document.querySelector("link[rel='canonical']").href = window.location.href
        document.querySelector("meta[property='og:url']").content = window.location.href
      }
    }

    if (article) {
      let { publisher, title, date, summary, subtitle, pdf } = article;
      date = date.replace(/\//g,'.')

      return (
        <div className='press-article' ref={e => {this.article = e;}}>
          <button className="close-btn" onClick={this.closeBtnClick.bind(this)}><img src={close_thin_blue} alt="close btn" className="close-btn-img" width="25" height="25" /></button>
  
          <div className="press-item not-active">
            <h2 className="publication sans-light-bold upper">{publisher}</h2>
            <h5 className="title sans">{title}</h5>
            <h5 className="date sans">{date}</h5>
          </div>
          <div className="summary-wrapper" ref={e => {this.summary = e;}}>
            <h1 className="subtitle sans-bold">{subtitle}</h1>
            <p className="summary serif">{summary}</p>
            <a className="url serif-bold upper" href={pdf} target="_blank">DOWNLOAD FULL ARTICLE</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="press-article"></div>
      )
    }
  }
}