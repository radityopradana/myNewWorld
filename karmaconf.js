// Karma configuration
// Generated on Sat Apr 22 2017 18:55:15 GMT+0700 (WIB)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],


    // list of files / patterns to load in the browser
    files: [
        'engine/Class.js',
        'engine/Base.js',
        'engine/Widget.js',
        'engine/jquery.xdomainajax.js',
        'engine/jquery.csv.js',
        'engine/api/CommonUtils.js',
        'engine/api/sha2.js',
        'engine/api/AmazonSignedUrl.js',
        'engine/api/ProductAvailabilityParser.js',
        'engine/api/WalmartProductAvailabilityParser.js',
        'engine/api/AmazonProductAvailabilityParser.js',
        'engine/api/CVSProductAvailabilityParser.js',
        'engine/api/RiteaidProductAvailabilityParser.js',
        'engine/api/WalgreensProductAvailabilityParser.js',
        'engine/api/JetProductAvailabilityParser.js',
        'engine/api/RetailerProductAvailability.js',
        'engine/api/ProductAvailabilityAPI.js',
        'engine/api/CSVToJSONConverter.js',
        'engine/WidgetShoppingCart.js',
        'engine/HelpTip.js',
        'engine/LoadingIndicator.js',
        'engine/ShoppingCartListener.js',
        'engine/ShoppingCartAPI.js',
        'engine/CartButtonHeader.js',
        'engine/AddToCartButton.js',
        'engine/OverlaySuccessAddToCart.js',
        'engine/SuccessTransferCart.js',
        'engine/InformationProductDropDown.js',
        'engine/TermCondition.js',
        'tests/*.js',
        'engine/slick.js',
        'engine/ShoppingCartModal.js',
        'engine/sct_config.js',
        'engine/sct_engine.js'
    ],


    // list of files to exclude
    exclude: [
        'tests/qunit-2.1.1.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'tests/AddToCartButtonTest.js': ['coverage'],
        'tests/CartButtonHeaderTest.js': ['coverage'],
        'tests/HelpTipTest.js': ['coverage'],
        'tests/InformationProductDropDownTest.js': ['coverage'],
        'tests/LoadingIndicatorTest.js': ['coverage'],
        'tests/OverlaySuccessAddToCartTest.js': ['coverage'],
        'tests/ShopingCartModalTest.js': ['coverage'],
        'tests/ShoppingCartListenerTest.js': ['coverage'],
        'tests/SuccessTransferCartTest.js': ['coverage'],
        'tests/TermConditionTest.js': ['coverage'],
        'tests/WidgetShoppingCartTest.js': ['coverage'],

        'engine/AddToCartButton.js': ['coverage'],
        'engine/CartButtonHeader.js': ['coverage'],
        'engine/HelpTip.js': ['coverage'],
        'engine/InformationProductDropDown.js': ['coverage'],
        'engine/LoadingIndicator.js': ['coverage'],
        'engine/OverlaySuccessAddToCart.js': ['coverage'],
        'engine/ShoppingCartModal.js': ['coverage'],
        'engine/ShoppingCartListener.js': ['coverage'],
        'engine/SuccessTransferCart.js': ['coverage'],
        'engine/TermCondition.js': ['coverage'],
        'engine/WidgetShoppingCart.js': ['coverage']
    },

    coverageReporter: {
        file: 'coverage.txt'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
