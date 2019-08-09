const router = require("express").Router();
const request = require("request");
const verify = require('../../verifyToken');


// api GET /api/git/repos
// goal git taha's repos
// private
router.get("/repos",verify, (req, res) => {
  const options = {
    url: `https://api.github.com/users/TahaAlamiIdrissi/repos?state=closed&access_token=974a7c04c7ccf6b9b9ff808e29d1b1300a828364`,
    headers: {
      "User-Agent": "TahaAlamiIdrissi"
    }
  };
  request.get(options, (error, response, body) => {
    const parsedData = JSON.parse(response.body);
    if(error) return res.status(500).send(error);
    
    if (parsedData.hasOwnProperty("message"))
       return res.status(404).send({error: "Page Not Found | CREDENTIALS"});

      return res.status(200).send(parsedData.map(element => {
       return  obj = {
          _id: element.id,
          name: element.name,
          description: element.description,
          clone_url: element.clone_url,
          forks: element.forks,
          created_at: element.created_at,
          updated_at: element.updated_at,
          pushed_at: element.pushed_at
        }
     }));
  });
});
// api GET /api/git/repos/:param
// goal get a person's repos
// private
router.get("/repos/:Username",(req, res) => {
  const username = req.params.Username;

  const options = {
    url: `https://api.github.com/users/${username}/repos?state=closed&access_token=974a7c04c7ccf6b9b9ff808e29d1b1300a828364`,
    headers: {
      "User-Agent": "TahaAlamiIdrissi"
    }
  };
  request.get(options, (error, response, body) => {
    const parsedData = JSON.parse(response.body);
    if(error) return res.status(500).send(error);
    
    if (parsedData.hasOwnProperty("message"))
       return res.status(404).send({error: "Page Not Found | CREDENTIALS"});

      return res.status(200).send(parsedData.map(element => {
       return  obj = {
          _id: element.id,
          name: element.name,
          description: element.description,
          clone_url: element.clone_url,
          forks: element.forks,
          created_at: element.created_at,
          updated_at: element.updated_at,
          pushed_at: element.pushed_at
        }
     }));
  });
});
module.exports = router;
