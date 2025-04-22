const express = require("express");
const app = express();
const Web3 = require('web3');
require('dotenv').config()

const PORT = process.env.PORT || 3050;

const { contractABI, contractAddress } = require("./utils/constants");
const address = process.env.ADDRESS;

const provider = new Web3.providers.HttpProvider(process.env.ETHEREUM_NODE_URL);
const web3 = new Web3(provider);
const smartContract = new web3.eth.Contract(contractABI, contractAddress);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { address, self_url: process.env.SELF_URL });
});

app.get("/callback", (req, res) => {
  if (req.query.status === '200')
  {
    let name, isOver18;
    smartContract.methods.showUserInfoByOrg(req.query.user).call({ from: address }).then(data => {
      name = data.name;
      smartContract.methods.showUserInfoBoolsByOrg(req.query.user).call({ from: address }).then(data => {
        isOver18 = data.isOver18;
        
        if (isOver18 == 1)
          res.render("home", { name });
        else
          res.render("not_allowed");
      });
    });
  }
  else
  {
    res.render("not_allowed");
  }
});

// app.get('/callback', async (req, res) => {
//   try {
//     const { status, user } = req.query;
    
//     if (status !== "200" || !user) {
//       return res.render('not_allowed');
//     }
    
//     // Connect to the smart contract
//     const contract = new web3.eth.Contract(SmartContract.abi, contractAddress);
    
//     // Check if the user has granted access to this third-party
//     const hasAccess = await contract.methods.checkAccess(user, process.env.ADDRESS).call();
    
//     if (!hasAccess) {
//       return res.render('not_allowed');
//     }
    
//     // Get the user's attributes, specifically isOver18
//     const userData = await contract.methods.getSharedData(user, process.env.ADDRESS).call();
    
//     // Check if isOver18 is true
//     if (userData.isOver18 !== 1) {
//       return res.render('not_allowed');
//     }
    
//     // If all checks pass, render the home page
//     const name = userData.name || "User";
//     res.render('home', { name });
    
//   } catch (error) {
//     console.error(error);
//     res.render('not_allowed');
//   }
// });

app.listen(PORT, () => {
  console.log(`[SERVER:EXT] STARTED`);
});
