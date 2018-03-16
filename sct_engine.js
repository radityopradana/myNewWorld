Clazz.brand = shoppingCartConfig.brand;
// data for analytics
var analyticConfig = {
    morphAnalyticUrl : shoppingCartConfig.analyticUrl,
    morphAnalyticClientId : shoppingCartConfig.analyticClientId,
    morphAnalyticsiteId : (shoppingCartConfig.analyticSiteId) ? shoppingCartConfig.analyticSiteId : Clazz.brand.charAt(0).toUpperCase() + Clazz.brand.slice(1)
}
var hostName = window.location.host;
var isAnalyticWhitelistURLNotEmpty = shoppingCartConfig.analyticWhitelistURL && shoppingCartConfig.analyticWhitelistURL.length > 0;
var isProduction = isAnalyticWhitelistURLNotEmpty && shoppingCartConfig.analyticWhitelistURL.indexOf(hostName) > -1;
if(!isProduction) {
    analyticConfig.morphAnalyticUrl = "https://labs.photon.in:8083/analytic/collect-data";
}
// Limit for retailer's cart
if(shoppingCartConfig.cartLimit){
    Clazz.cartLimit = shoppingCartConfig.cartLimit;
} else {
    Clazz.cartLimit = 12;
}

/* ------------------- Template/UI section ------------------- */
$(document).ready(function(){
    var uiConfig = shoppingCartConfig.ui;
    var apiConfig = shoppingCartConfig.api;
    var skuMapper = shoppingCartConfig.skuMapper;
    if(uiConfig) {
        var theme = uiConfig.theme;
        Clazz.theme = theme;
    }

    // replace theme configuration
    var pathNameURL = window.location.pathname;
    var optionalUIs = shoppingCartConfig.optionalUI;
    if(optionalUIs && optionalUIs.length) {
        for (var i = 0; i < optionalUIs.length; i++) {
            var optionalUI = optionalUIs[i];
            var urls = optionalUI.url;
            var uis = optionalUI.ui;
            if(urls && urls.length > 0 && urls.indexOf(pathNameURL) >= 0) {
                for(var key in uis) {
                    uiConfig[key] = uis[key];
                }
            }
        }
    }

    if (shoppingCartConfig.retailer) {
        var tempRetailer = [];
        for (var i = 0; i < shoppingCartConfig.retailer.length; i++) {
            var currentRetailer = shoppingCartConfig.retailer[i];
            if (tempRetailer.indexOf(currentRetailer) < 0) {
                tempRetailer.push(currentRetailer);
            }
        }
        shoppingCartConfig.retailer = tempRetailer;
    }
    /**
     * To configure whether web service is used or not
     */
    var useWebService = true;
    if(apiConfig.isUseWebService !== null && apiConfig.isUseWebService !== undefined) {
        useWebService = apiConfig.isUseWebService;
    }

    /**
     * For sample, the url is received from skuMapper in config
     * For deployment, change the url variable to 'var url = window.location.href;'
     */
    var url = null;
    if(skuMapper) {
        url = skuMapper[pathNameURL];
    }
    if(url === undefined || url === null || url === '') {
        url = window.location.href;
    }
    // Render and inject functions for LoadingIndicator class
    var loadingIndicator = new Clazz.com.morph.sct.widget.LoadingIndicator();
    loadingIndicator.render('body');
    // Render and inject functions for shoppingCartListener class
    var shoppingCartListener = new Clazz.com.morph.sct.listener.ShoppingCartListener();
    // Render and inject functions for shoppingCartAPI class
    var webService = apiConfig.webService;
    var pathHost = '';
    var sctURL = localStorage['morphSCTURL'] ? localStorage['morphSCTURL'] : false;
    if(sctURL && sctURL.length > 0) {
        pathHost = sctURL;
    }
    else if(webService) {
        pathHost = webService.port && webService.port !== 0 ? webService.host+":"+webService.port : webService.host;
    }
    var csvPath = '';
    var localService = apiConfig.localService;
    if(localService) {
        csvPath = localService.path;
    }
    var shoppingCartAPI = new Clazz.com.morph.sct.api.ShoppingCartAPI(pathHost);
    shoppingCartAPI.setProductBrand(Clazz.brand);
    shoppingCartAPI.setCSVPath(csvPath);
    shoppingCartAPI.setUseWebService(useWebService);
    shoppingCartAPI.setLoadingIndicator(loadingIndicator);
    shoppingCartListener.setShoppingCartAPI(shoppingCartAPI);

    /**
     * To configure whether web service is used or not
     */
    var disableServiceCheck = false;
    if(shoppingCartConfig.disableServiceCheck) {
        disableServiceCheck = shoppingCartConfig.disableServiceCheck;
    }

    shoppingCartAPI.getServiceStatus(function(){

        // Render and inject functions for successTransferCart class
        var successTransferCartConfig = {successTransferConfig : uiConfig.successTransferCart};
        var successTransferCart = new Clazz.com.morph.sct.widget.SuccessTransferCart(successTransferCartConfig);
        successTransferCart.setShoppingCartListener(shoppingCartListener);
        successTransferCart.render('body');
        shoppingCartListener.setSuccessTransferCart(successTransferCart);

        var totalBadge = shoppingCartAPI.getTotalCart();
        // Render and inject functions for cartButtonHeader class
        if (uiConfig && uiConfig.bagIcon && uiConfig.bagIcon.length > 0) {
            for (var j = 0; j < uiConfig.bagIcon.length; j++) {
                var cartButtonHeaderConfig = {cartIconConfig : uiConfig.bagIcon[j]};
                var cartButtonHeader = new Clazz.com.morph.sct.widget.CartButtonHeader(cartButtonHeaderConfig);
                cartButtonHeader.setShoppingCartListener(shoppingCartListener);
                cartButtonHeader.render(uiConfig.bagIcon[j].container, uiConfig.bagIcon[j].position);
                cartButtonHeader.setTotalBadge(totalBadge);
                shoppingCartListener.setCartButtonHeader(cartButtonHeader);
            };
        }
        // Render and inject functions for TermCondition class
        if (uiConfig && uiConfig.termCondition) {
            var termConditionConfig = {termConditionConfig : uiConfig.termCondition};
            var termCondition = new Clazz.com.morph.sct.widget.TermCondition(termConditionConfig);
            termCondition.render(uiConfig.termCondition.container, uiConfig.termCondition.position);
        }

        // Render and inject functions for overlaySuccessAddToCart class
        var overlaySuccessAddToCartConfig = {overlaySuccessConfig : uiConfig.overlayAddToCart};
        var overlaySuccessAddToCart = new Clazz.com.morph.sct.widget.OverlaySuccessAddToCart(overlaySuccessAddToCartConfig);
        overlaySuccessAddToCart.render('body');
        overlaySuccessAddToCart.setShoppingCartListener(shoppingCartListener);
        shoppingCartListener.setOverlaySuccessAddToCart(overlaySuccessAddToCart);

        var renderPDPComponent = function(productDetails) {
            shoppingCartListener.setProductDetails(productDetails);
            if (uiConfig && uiConfig.addToCart) {
                // Render and inject functions for addToCartButton class
                for (var i = 0; i < uiConfig.addToCart.length; i++) {
                    var addToCartButtonConfig = {addToCartConfig : uiConfig.addToCart[i], "productId": productDetails.id};
                    var addToCartButton = new Clazz.com.morph.sct.widget.AddToCartButton(addToCartButtonConfig);
                    addToCartButton.setShoppingCartListener(shoppingCartListener);
                    shoppingCartListener.setAddToCartButton(addToCartButton);
                    addToCartButton.render(uiConfig.addToCart[i].container, uiConfig.addToCart[i].position);
                }
            } 
            // Render and inject functions for informationProductDropDown class
            if (uiConfig && uiConfig.infoProduct && productDetails.options) {
                Clazz.isUseButton = false;
                for (var j = 0; j < uiConfig.infoProduct.length; j++) {
                    if(uiConfig.infoProduct[j].isUseButton){
                        if ($(uiConfig.infoProduct[j].container).length > 0) {
                           Clazz.isUseButton = true;
                        }
                        var informationProductButton = new Clazz.com.morph.sct.widget.InformationProductButton(uiConfig.infoProduct[j]);
                        informationProductButton.setShoppingCartListener(shoppingCartListener);
                        shoppingCartListener.setInformationProductButton(informationProductButton);
                        informationProductButton.render(uiConfig.infoProduct[j].container, uiConfig.infoProduct[j].position);
                    } else{
                        var informationProductDropDown = new Clazz.com.morph.sct.widget.InformationProductDropDown(uiConfig.infoProduct[j]);
                        informationProductDropDown.setShoppingCartListener(shoppingCartListener);
                        shoppingCartListener.setInformationProductDropDown(informationProductDropDown);
                        informationProductDropDown.render(uiConfig.infoProduct[j].container, uiConfig.infoProduct[j].position);
                    }
                }
            }
            // Render and inject functions for helpTip class
            if(uiConfig.helpTip){
                var helpTipConfig = {helpConfig : uiConfig.helpTip};
                var helpTip = new Clazz.com.morph.sct.widget.HelpTip(helpTipConfig);
                helpTip.render(uiConfig.helpTip.container, uiConfig.helpTip.position);
            }
        }

        var isPDP = function() {
            if (uiConfig && uiConfig.addToCart) {
                for (var i = 0; i < uiConfig.addToCart.length; i++) {
                    var container = $(uiConfig.addToCart[i].container);
                    if (container && container.length > 0) {
                        return true;
                    }
                }
            }
            return false;
        }

        if (isPDP()) {
            shoppingCartAPI.getProductDetails(url, Clazz.brand, function(response){
                if(response !== null && response !== undefined && !response.error){
                    renderPDPComponent(response);
                }
            });
        }

        /**
         * Render and inject functions for shoppingCartModal class
         */
         var shoppingCartModal = new Clazz.com.morph.sct.widget.ShoppingCartModal({ui:uiConfig, retailer:shoppingCartConfig.retailer});
         shoppingCartModal.setShoppingCartAPI(shoppingCartAPI);
         shoppingCartModal.setShoppingCartListener(shoppingCartListener);
         shoppingCartModal.render('body');
         shoppingCartListener.setShoppingCartModal(shoppingCartModal);
    }, function(){}, disableServiceCheck);
});