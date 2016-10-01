var request = require('request');
var priceTotal = 0;
start(0);

function start(page) {
    var url = 'http://shopicruit.myshopify.com/products.json?page=' + page;
    console.log('page... ' + page);
    request({
        url: url,
        json: true
    }, function(err, res, body) {
        if (body.products.length > 0) {
            for (var i = 0; i < body.products.length; i++) {
              var prodType = body.products[i].product_type.toLowerCase();
              console.log('Type of product.. ' + prodType);

              if (prodType == 'clock' || prodType == 'watch'){
                for (var j = 0; j < body.products[i].variants.length; j++) {
                    priceTotal += Number(body.products[i].variants[j].price);
                    console.log('adding to priceTotal variants ' + j + " total " + priceTotal);
                }
              }
            }
            page++;
            start(page);
        } else {
            showTotal();
        }
    });
}

function showTotal() {
    console.log(priceTotal.toFixed(2));
}
