const shortid = require("shortid");
const validator = require('validator')
const urlModel = require("../models/urlShortDbSchema");

async function handleUrlId(req, res) {
  const reqBody = req.body;
  if (!reqBody.url ) {
    return res.status(400).json({success:false, error: "Please provide URL!" });
  }if(!validator.isURL(reqBody.url,{require_protocol:true})){
    return res.status(400).json({success:false, error: `Please provide valid URL, eg: https:example.com` });
  }
  const shortId = shortid.generate();
  try {
    await urlModel.create({
      shortId: shortId,
      redirectUrl: reqBody.url,
      visitHistory: [],
    });

    return res.status(201).json({success:true,"ShortId": `${process.env.HOST_URL}/`+shortId });
  } catch (error) {
    return res.status(500).json({success:false, error: "Failed to create shortid"});
  }
}



async function handleShortUrl(req, res) {
    try {
      const shortId = req.params.shortId;
  
      const entry = await urlModel.findOneAndUpdate(
        { shortId },
        {
          $push: {
            visitHistory: {
              timeStamp: Date.now()
            }
          }
        },
        { new: true }
      );
      if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
      }
  
      res.redirect(entry.redirectUrl);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  
  
  
  async function handleAnalytics(req, res){
    try {
      const shortId = req.params.shortId
      const result = await urlModel.findOne({shortId})
      if(!result){
        return res.status(404).json({success:false,error:"ShortId not found"})
      }
      res.status(200).json({"Total clicks":result.visitHistory.length,"Analytics":result.visitHistory})
    } catch (error) {
      return res.status(500).json({success:false,error:error.message})
    }
  }



module.exports = {handleUrlId, handleShortUrl,handleAnalytics};
