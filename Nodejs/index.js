const express = require("express");
const app = express();
const cors=require("cors")
const { shorten } = require("./server");
app.use(express.json())
app.use(cors())

function isValidUrl(url) {
  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 
  return urlPattern.test(url);
}

app.post("/", async (req, res) => {
  try{
    const {url}=req.body;
     console.log(url)
     if (!isValidUrl(url)) {
      return res.status(400).send({ error: 'Invalid URL' });
     }
     let shortUrl = await shorten(url);
     res.status(200).send({ shortUrl });
  }
  catch(error){
    res.status(500).send({ error});
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
