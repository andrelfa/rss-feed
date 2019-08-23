import React from 'react';
import './RssItemCard.css';
import { formatDate } from '../utils/utils';

const RssItemCard = (props) => {

  return (
    <div className="rss-item-card">
      <a href={props.link}>
        <p className="title">
          {props.title}
          <span className="publish-date">
            {' '}- {formatDate(props.publishDate)}
          </span>
        </p>
        <div className="description-container">
          <p className="description" dangerouslySetInnerHTML={{ __html: props.description }} />
        </div>
      </a>
    </div>
  );
}

export default RssItemCard;
