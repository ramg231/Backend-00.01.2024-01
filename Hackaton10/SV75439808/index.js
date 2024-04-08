let MongoClient = require("mongodb").MongoClient;
let url =
  "mongodb+srv://u18310128:Is5FsYXeClIUqJwV@cluster0.l8ehbli.mongodb.net/SV75439808";
MongoClient.connect(url, function (err, deb) {
  console.log("Connected");
  db.close();
});
