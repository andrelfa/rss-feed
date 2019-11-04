import React from 'react';
import './RssItemCard.css';
import { formatDate } from '../../../utils/utils';

const RssItemCard = (props) => {

  return (
    <div className="rss-item-card">
      <a className="card" href={props.link} target="blank">
        <div className="card-title-container">
          <span className="title-label">
            {props.feedName}
          </span>
          
          <label className="title">
            {props.title}
          </label>

          <span className="publish-date">
            {formatDate(props.publishDate)}
          </span>
        </div>

        <div className="description-container">
          <div className="description" dangerouslySetInnerHTML={{ __html: props.description }} />
        </div>
      </a>
    </div>
  );
}

export default RssItemCard;