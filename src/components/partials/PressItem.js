import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

export default class PressItem extends Component {
  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w-]+/g, '')       // Remove all non-word chars
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  render() {
    var slug = this.slugify(this.props.title);
    var pubslug = this.slugify(this.props.publisher);
    return (
      <button className="press-item">
        <NavLink strict exact to={`/press/${pubslug}/${slug}/`}>
          <h2 className="publication sans-light-bold upper">{this.props.publisher}</h2>
          <h5 className="title sans">{this.props.title}</h5>
          <h5 className="date sans">{this.props.date}</h5>
        </NavLink>
      </button>
    );
  }
}