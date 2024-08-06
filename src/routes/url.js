const {handleUrlId, handleShortUrl, handleAnalytics} = require('../controls/url');
const router = require('express').Router();
const path = require('path')



router.post('/api/generateShortid', handleUrlId)
router.get('/:shortId', handleShortUrl)
router.get('/analytics/:shortId',handleAnalytics)





module.exports = router;