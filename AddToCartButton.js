Clazz.createPackage("com.morph.sct.widget");

/**
 * Creates a Add To Cart Button component
 * @class AddToCartButton
 * @extends WidgetShoppingCart
 * @param {Object} config
 * @example
 * var config = {
 *  addToCartConfig: {
 *      container: ".container",
 *      optionalContainer: "<div></div>",
 *      position: "append"
 *  }, 
 *  productId: "prodId1"
 * }
 * var addToCartButton = new Clazz.com.morph.sct.widget.AddToCartButton(config);
 */
Clazz.com.morph.sct.widget.AddToCartButton = Clazz.extend(Clazz.WidgetShoppingCart, {

    defaultContainer : null,
    optionalContainer : null,
    shoppingCartListener : null,
    productId : null,
    objOptContainer : null,
    addToCartText:null,
    ADAAddToCartSentence : null,
    bagIcon : '.morph-sct-cart-badge-indicator',

    morphSctButtonCartEvent : '.morph-sct-button-cart-event',

    /**
     * @inheritdoc
     */
    initialize : function(config){
        this.defaultContainer = config.addToCartConfig.container;
        this.optionalContainer = config.addToCartConfig.optionalContainer;
        this.productId = config.productId;
        this.addToCartText = config.addToCartConfig.text;
        this.ADAAddToCartSentence = config.addToCartConfig.voiceAddToCart;
        if(!this.ADAAddToCartSentence || this.ADAAddToCartSentence.length === 0)
            this.ADAAddToCartSentence = this.addToCart;
    },

    /**
     * Set the listener for shopping cart
     * @method setShoppingCartListener
     * @param {ShoppingCartListener} shoppingCartListener
     */
    setShoppingCartListener : function(shoppingCartListener){
        this.shoppingCartListener = shoppingCartListener;
    },

    /**
     * Function that every subclass needs to override to provide
     * a fragment that render will call
     * @inheritdoc
     */
    renderUI : function() {
        var addToCart = "<div class='morph-sct-button-cart-help-tip'>"+
                            "<div class='morph-sct-button-cart morph-sct-button-cart-event custom-yellowbtn'>"+
                                "<button title='Click to add the product to your shopping cart.' class='morph-sct-button-content-cart morph-sct-button-content-cart-event btn btn-primary' test-event='add_to_cart_error' test-event-type='KPI'>"+
                                "</button>"+
                            "</div>"+
                        "</div>";
        if (this.optionalContainer) {
            var optionalContainerTag = $.parseHTML(this.optionalContainer);
            this.objOptContainer = $(optionalContainerTag);
            this.objOptContainer.append(addToCart);
            return optionalContainerTag;
        }
        return addToCart;
    },

    /**
     * Bind the UI elements with appropriate events
     * @inheritdoc
     */
    bindUI : function(){
        var self = this;
        var cartButtonContent;
        if(this.objOptContainer !== null && this.objOptContainer !== undefined && this.objOptContainer !== "") {
            cartButtonContent = this.objOptContainer.find('.morph-sct-button-content-cart-event');
        }
        else {
            cartButtonContent = $(this.defaultContainer).parent().find('.morph-sct-button-content-cart-event');
        }
        if(this.addToCartText){
            cartButtonContent.text(this.addToCartText);
            cartButtonContent.attr('aria-label', this.ADAAddToCartSentence);
        }

        this.insertTestAssertButton(cartButtonContent);
        this.setTestAssertIconBagde();

        /* istanbul ignore next */
        cartButtonContent.click(function() {
            if(navigator.onLine){
                if(!$(self.morphSctButtonCartEvent).hasClass('disabled'))
                    self.shoppingCartListener.onClickAddToCartButtonListener(self.productId);
            } else {
                self.shoppingCartListener.onErrorResponse();
            }
        });
    },

    insertTestAssertButton : function(element) {
        var currentAssert = $(element).attr("test-event");
        if (currentAssert) {
            var arrayOfAssert = currentAssert.split(",");
            arrayOfAssert.push("add_to_cart_success{"+this.productId+"}");
            $(element).attr("test-event", arrayOfAssert.join(","));
        }
    },

    setTestAssertIconBagde : function() {
        var testAssert = $(this.bagIcon).attr("test-assert");
        if (testAssert) {
            var arrayOfAssert = testAssert.split(",");
            if (arrayOfAssert && !this.isAlreadyInArray(arrayOfAssert, this.productId)) {
                arrayOfAssert.push("add_to_cart_success{"+this.productId+"}");
                $('.morph-sct-cart-badge-indicator').attr("test-assert", arrayOfAssert.join(","));
            }
        }
    },

    isAlreadyInArray : function(arrayOfAssert, productId) {
        var newAssert = "add_to_cart_success{"+productId+"}"
        for (var i = 0; i < arrayOfAssert.length; i++) {
            var currentAssert = arrayOfAssert[i];
            if (newAssert === currentAssert) {
                return true;
            }
        }
        return false;
    }
});