const cheerio = require('cheerio');

async function metaDataContent(htmlString) {
    const metaObj = {};
    const $ = cheerio.load(htmlString);
    const $title = $('head title').text();
    metaObj.title = $title ? $title : '';
    const $meta = $('meta');
    if ($meta && $meta.length) {
        for (let i = 0; i < $meta.length; i++) {
            const metaName = $($meta[i]).attr('property') || $($meta[i]).attr('name');
            if (metaName)
                metaObj[metaName] = $($meta[i]).attr('content');
        }
    }
    const $images = $('img');
    metaObj.images = [];
    if ($images && $images.length) {
        for (let i = 0; i < $images.length; i++) {
            metaObj.images.push($($images[i]).attr('src'));
        }
    }
    return metaObj;
}
module.exports = {
    metaDataContent
}
