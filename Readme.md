Readme Morph Shopping Cart Transfer

Compile
1. Go to folder compile and read instruction in Readme.md

Unit Test
1. run index.html inside tests folder.
2. It will running tests and show the result.

Documentation JSdoc using YUIdoc
1. sudo npm install
2. sudo npm run widgetdocs
3. Generated document will be stored in /doc/widgetDoc folder. Just run index.html.
4. sudo npm run apidocs
5. Generated document will be stored in /doc/apiDoc folder. Just run index.html.

Coverage Unit Test using karma
1. to configure karma settings, locate shopping-cart-transfer/karmaconf.js and set the values as follows:
	- prepocessors{} contains list of files that will be set as coverage result
	- exclude[] contains list of files that will not be scanned
	- files[] conatins list of files that will be scanned and set as dependencies
2. sudo npm install -g karma-cli
3. sudo npm install
4. karma start karmaconf.js
5. after running karma, coverage result will be generated and placed in shopping-cart-transfer/coverage
6. locate shopping-cart-transfer/coverage/Chrome.../index.html and open the file in browser