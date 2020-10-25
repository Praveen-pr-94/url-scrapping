const rp = require('request-promise');

const {metaDataContent} = require('../../modules/');

module.exports = async (req, res, next) => {
    try {
        const {url} = req.body;
        if (!url) {
            return res.json({status: 400, message: 'url field required!'});
        }
        const htmlString = await httpRequest(url);
        if (htmlString === "") {
            return res.json({
                status: 422,
                message: 'Invalid url',
            })
        }
        const dataContent = await metaDataContent(htmlString);
        return res.json({
            status:200,
            message: 'Success',
            data: dataContent
        })
    } catch (e) {
        console.log("Error catched",e)
        return res.json({
            status: 500,
            message: 'Internal server error',
        })
    }
};

async function httpRequest(uri) {
    const htmlString = await rp(encodeURI(uri));
    if (/<[a-z][\s\S]*>/i.test(htmlString))
        return htmlString;

    return null;
}
