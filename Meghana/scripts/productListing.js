$(document).ready(function() {
    
    getProductData();

    /**
     * Get product data through api.
    */
    function getProductData() {
        $.getJSON("https://api.jsonbin.io/b/5cae9a54fb42337645ebcad3", function(data) {
            ListItems(data);
        });
    }

     
    /**
     * list items in columns.
     * @param {data} the data from api.
    */
    function ListItems(data) {
        for (i = 0; i < data.length;
            [i++]) {
            var productSize = setSize(i,data);
            $(".listing-container").append($(createElementHtml("", 'div', productSize)).append($(createElementHtml("", 'div', ["product-image"])).append('<img class="image" src="./assets/images/' + data[i].productImage + '"/>'), $(createElementHtml("", 'div', [data[i].isSale ? "sale-button" : data[i].isExclusive ? "exclusive-button" : "default-btn"])).text(data[i].isSale ? "Sale" : data[i].isExclusive ? "Exclusive" : ""),
                $(createElementHtml("", 'div', ["product-details"])).append($(createElementHtml("", 'div', ["product-name"])).text(data[i].productName), $(createElementHtml("", 'div', ["product-price"])).text(data[i].price))));

        }
    }

    /**
     * set indicator based on size.
     * @param {count} the ieration parameter.
    */
    function setSize(index,data) {
        var productSize = ["list", "col-md-4", "col-lg-3", "all"];
        data[index].size.indexOf('L') > -1 ? productSize.push("large") : "";
        data[index].size.indexOf('XL') > -1 ? productSize.push("extra-large") : "";
        data[index].size.indexOf("S") > -1 ? productSize.push("small-size") : "";
        data[index].size.indexOf("XS") > -1 ? productSize.push("extra-small") : "";
        data[index].size.indexOf("M") > -1 ? productSize.push("medium") : "";
        return productSize;
    }


    /**
     * filter change event.
    */
    $("select.size-filter").change(function() {
        $(".list").addClass("d-none");
        var selectedSize = $(this).children("option:selected").val();
        $("." + selectedSize).removeClass("d-none");
    });


    /**
     * A common function to create dynamic html
     * @param {id} the id attribute.
     * @param {tagname} the html tag name
     * @param {classname} the class name array
    */
    function createElementHtml(id, tagname, classname) {
        htmltag = document.createElement(tagname);
        htmltag.id = id;
        for (l = 0; l < classname.length; l++) {
            htmltag.classList.add(classname[l]);
        }
        return htmltag;
    }

});