// Flahcoin server
var express = require('express');
var app = express();
var compression = require('compression');
app.use(compression());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/qt_wallet_download'));
var port = 8080;

app.listen(port, function() {
  console.log('Flashcoin listening on port!', port);
});
