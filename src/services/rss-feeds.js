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
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://kotaku.com/vip.xml"; // site that doesn’t send Access-Control-*
        return fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
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
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://www.b9.com.br/feed/"; // site that doesn’t send Access-Control-*
        return fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
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
}

export default new RSSFeedService();