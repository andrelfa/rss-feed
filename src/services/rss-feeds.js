import * as convert from 'xml-js' ;
import moment from 'moment' ;
moment.locale('pt-BR');

class RSSFeedService {
    getBBCFeed = () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://feeds.bbci.co.uk/news/world/rss.xml"; // site that doesn’t send Access-Control-*
        return fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                description: item.description._cdata,
                title: `BBC UK - ${item.title._cdata}`,
                link: item.link._text,
                publishDate: item.pubDate._text
            }
        }))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    getIGNFeed = () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://kotaku.com/vip.xml"; // site that doesn’t send Access-Control-*
        return fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(response => convert.xml2js(response, { compact: true, spaces: 4 }).rss.channel.item)
        .then(response => response.map((item) => {
            return {
                description: item.description._cdata,
                title: `IGN - ${item.title._text}`,
                link: item.link._text,
                publishDate: item.pubDate._text
            }
        }))
        .then(response => response.filter(item => item.link.indexOf('kotaku') > -1))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }
}

export default new RSSFeedService();