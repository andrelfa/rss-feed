import * as convert from 'xml-js' ;
import moment from 'moment' ;
moment.locale('pt-BR');

class RSSFeedService {
    proxyurl = "https://sheltered-reef-69308.herokuapp.com/";

    getBBCFeed = () => {
        const url = "http://feeds.bbci.co.uk/news/world/rss.xml"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                feedName: 'BBCUK',
                description: item.description._cdata,
                title: `BBC UK - ${item.title._cdata}`,
                link: item.link._text,
                publishDate: moment(item.pubDate._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    getKotakuFeed = () => {
        const url = "http://kotaku.com/vip.xml"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                feedName: 'Kotaku',
                description: item.description._cdata,
                title: `Kotaku - ${item.title._text}`,
                link: item.link._text,
                publishDate: moment(item.pubDate._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .then(response => response.filter(item => item.link.indexOf('kotaku') > -1))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    getB9Feed = () => {
        const url = "http://www.b9.com.br/feed/"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                feedName: 'B9',
                description: item.description._cdata,
                title: `B9 - ${item.title._text}`,
                link: item.link._text,
                publishDate: moment(item.pubDate._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    getVoxFeed = () => {
        const url = "http://www.vox.com/rss/index.xml"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).feed.entry)
        .then(response => response.map((item) => {
            return {
                feedName: 'Vox',
                description: item.content._text.length > 600 ? `${item.content._text.substring(0, 600).trim()}...` : item.content._text,
                title: `Vox - ${item.title._text}`,
                link: item.link._attributes.href,
                publishDate: moment(item.published._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }  
    
    getNYTimesFeed = () => {
        const url = "https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                feedName: 'NY Times',
                description: item.description._text,
                title: `NY Times - ${item.title._text}`,
                link: item.link._text,
                publishDate: moment(item.pubDate._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    } 
    
    getG1Feed = () => {
        const url = "https://g1.globo.com/rss/g1/"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                feedName: 'G1',
                description: item.description._text && item.description._text.length > 600 ? `${item.description._text.substring(0, 600).trim()}...` : item.description._text,
                title: `G1 - ${item.title._text}`,
                link: item.link._text,
                publishDate: moment(item.pubDate._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }  

    getWiredFeed = () => {
        const url = "https://www.wired.com/feed/rss"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                feedName: 'Wired',
                description: item.description._text,
                title: `Wired - ${item.title._text}`,
                link: item.link._text,
                publishDate: moment(item.pubDate._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }  
    
    getTecMundoFeed = () => {
        const url = "https://rss.tecmundo.com.br/feed"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                feedName: 'TecMundo',
                description: item.description._cdata,
                title: `TecMundo - ${item.title._text}`,
                link: item.link._text,
                publishDate: moment(item.pubDate._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }   
    
    getPolygonFeed = () => {
        const url = "https://www.polygon.com/rss/stream/3550099"; // site that doesn’t send Access-Control-*
        return fetch(this.proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).feed.entry)
        .then(response => response.map((item) => {
            return {
                feedName: 'Polygon',
                description: item.content._text,
                title: `Polygon - ${item.title._text}`,
                link: item.id._text,
                publishDate: moment(item.published._text).format('YYYY-MM-DD HH:mm'),
                active: true
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }       
}

export default new RSSFeedService();