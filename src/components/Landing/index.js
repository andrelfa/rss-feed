import React, { useState, useEffect } from 'react';
import Styles from './index.module.css';
import Service from './service';
import RssItemCard from './components/RssItemCard';
import { sortByDateWithMoment } from '../../utils/utils';

const App = () => {
  const [feed, setFeed] = useState([]);
  const [showColumns, setShowColumns] = useState(true);
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWallpaper = async () => {
      const wallpaperUrl = await Service.getWallpaper();      
      console.log('wallpaper url', wallpaperUrl)
      setWallpaper(wallpaperUrl)
    };
    getWallpaper();

    Promise.all([
      Service.getBBCFeed(),
      Service.getKotakuFeed(),
      Service.getB9Feed(),
      Service.getVoxFeed(),
      Service.getNYTimesFeed(),
      Service.getG1Feed(),
      Service.getWiredFeed(),
      Service.getPolygonFeed(),
    ]).then(async (res) => {
      // Transformando cada array de noticia em apenas 01 array com todas as noticias sortidas por data de publicação;
      const news = sortByDateWithMoment([...res.flat(1)], 'publishDate');

      setFeed([...news]);
      setLoading(false);
    })
  }, []);

  const feedItems = () => {
    return feed.map((item) => {
      return item.active ? (<RssItemCard
        key={item.link}
        feedName={item.feedName}
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

  const loadingContent = (
    <div className={Styles.loadingContainer}>
      <img src={'../../img/spinner.svg'} alt="spinner" className={Styles.loadingContainerImage} />
    </div>
  )

  if (loading) return loadingContent;

  return (
    <div style={wallpaper ? {
        backgroundImage: `url(${wallpaper})`, 
        backgroundRepeat: "no-repeat", 
        backgroundAttachment: "fixed",
        backgroundPosition: "center center"
      } : null}>
      <div className={Styles.titleOuterContainer}>
        <div className={`container`}>
          <div className={Styles.titleContainer}>
            <label>
              Feed dos Amigo
            </label>
          </div>

          {/* <div className={Styles.filterContainer}>
            <label className={Styles.filterTitle}>
              Filtros:
            </label>

            <button className={Styles.toggleListButton} onClick={() => setShowColumns(!showColumns)} >
              Alternar visualização
            </button>

            <div className={Styles.filterButtonsContainer}>
              <div className={`${Styles.filterButton} ${Styles.teste}`} onClick={() => handleChangeFilter('Kotaku')}>
                Kotaku
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div>
        <div className="container">
          <div className={`${Styles.itemsContainer} ${showColumns ? `${Styles.columns}` : `${Styles.rows}`}`}>
            {feedItems()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;