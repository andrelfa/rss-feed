import React, { useState, useEffect } from 'react';
import './App.css';
import Service from './services/rss-feeds';
import RssItemCard from './components/RssItemCard';
import { sortByDateWithMoment } from './utils/utils';

const App = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
      Promise.all([
        Service.getBBCFeed(),
        Service.getKotakuFeed(),
        Service.getB9Feed(),
        Service.getVoxFeed(),
        Service.getNYTimesFeed(),
        Service.getG1Feed(),
        Service.getWiredFeed(),
        Service.getPolygonFeed(),
      ]).then((res) => {
        const [bbc, kotaku, b9, vox, nytimes, g1, wired, polygon] = res;
        setFeed((old) => sortByDateWithMoment([
          ...old,
          ...sortByDateWithMoment(bbc, 'publishDate'),
          ...sortByDateWithMoment([...kotaku], 'publishDate'),
          ...sortByDateWithMoment([...b9], 'publishDate'),
          ...sortByDateWithMoment([...vox], 'publishDate'),
          ...sortByDateWithMoment([...nytimes], 'publishDate'),
          ...sortByDateWithMoment([...g1], 'publishDate'),
          ...sortByDateWithMoment([...wired], 'publishDate'),
          ...sortByDateWithMoment([...polygon], 'publishDate'),
        ], 'publishDate'))
      })
  }, []);

  const feedItems = () => {
    return feed.map((item) => {
      return item.active ? (<RssItemCard 
        key={item.link} 
        title={item.title} 
        description={item.description} 
        link={item.link}
        publishDate={item.publishDate}
      />) : null
    })
  }

  const handleChangeFilter = (name) => {
    const newFeed = [...feed].map((item) => {
      if (item.feedName === name) item.active = !item.active;
      return item;
    })
    setFeed([...newFeed]);
  }

  const loading = (
    <div className="loading-container">
      <label>Calma que tá carregando...</label>
      <img src={'./img/spinner.svg'} alt="spinner"/>
    </div>    
  )

  return (
    <div className="App container">
      <div className="title-container">
        <label>
          Feed dos Amigo
        </label>
      </div>

      <div className="filter-container">
        <label className="filter-title">
          Filtros:
        </label>

        <div className="filter-buttons-container">
          <div className={`filter-button ${feed.filter(item => item.feedName === 'Kotaku' && item.active === true).length > 0 ? 'checked' : ''}`} onClick={() => handleChangeFilter('Kotaku')}>
            Kotaku
          </div>
        </div>
      </div>

      <div className="loading-container">
        <label>Calma que tá carregando...</label>
        <img src={'./img/spinner.svg'} alt="Carregando..." />
      </div>
      
      <div className="items-container">
        {feed.length ? feedItems() : loading}
      </div>
    </div>
  );
}

export default App;
