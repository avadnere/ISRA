const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
let hbs = exphbs.create({

  helpers: {
    select: function (value, option) {
      if (option === value) {
        return ' selected';
    } else {
        return ''
    }},
    selected:function( value, options ){
      var $el = $('<select />').html( options.fn(this) );
      $el.find('[value="' + value + '"]').attr({'selected':'selected'});
      return $el.html();
   },
   inc:function(value, options)
   {
       return parseInt(value) + 1;
   },

  }, defaultLayout: "main"
});
app.engine("handlebars",hbs.engine);
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3001");
  if (process && process.send) process.send({
    done: true
  });
});
