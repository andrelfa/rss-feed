import React, { useState, useEffect } from 'react';
import './App.css';
import Service from './services/rss-feeds';
import RssItemCard from './components/RssItemCard';

const App = () => {

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    Promise.all([Service.getBBCFeed(), Service.getIGNFeed()])
    .then((res) => {
      if (!feed.length) {
        console.log('res', res[1]);
        const [bbcFeed, IGNFeed] = res;
        setFeed([...bbcFeed, ...IGNFeed]);
      }
    }) 
  }, [feed]);

  const feedItems = () => {
    return feed.map((item) => {
      return (<RssItemCard 
        key={item.link} 
        title={item.title} 
        description={item.description} 
        link={item.link}
        publishDate={item.publishDate}
      />)
    })
  }

  return (
    <div className="App">
      <div className="feed-container">
        {feed.length && feedItems()}
      </div>
    </div>
  );
}

export default App;
