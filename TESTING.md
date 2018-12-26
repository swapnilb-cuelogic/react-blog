Goal of this document is to define scope for Testing of ns-client which will fullfil testing pyramid.
Which includes *Unit tests, Integration tests, UI/e2e tests* 

### The tools with important dependencies
- [Jest](https://facebook.github.io/jest)
- [Enzyme](https://github.com/airbnb/enzyme)
- [selenium-standalone](https://www.npmjs.com/package/selenium-standalone)
- [nightwatch](https://www.npmjs.com/package/nightwatch)

Additional dependencies: [Jasmine](http://jasmine.github.io), [jest/jest-cli](https://www.npmjs.com/package/jest-cli), [sinon](https://www.npmjs.com/package/sinon), [babel-jest/babel-preset-stage-0](https://www.npmjs.com/package/babel-preset-stage-0), [react-addons-test-utils/enzyme](https://www.npmjs.com/package/react-addons-test-utils), [react-test-renderer](https://www.npmjs.com/package/react-test-renderer)   

### Installations and Configuration

* Install dependency packages

	```
	npm i babel-jest babel-preset-stage-0 enzyme jest-cli react-addons-test-utils react-test-renderer redux-mock-store sinon selenium-standalone nightwatch -D
	```

* Unit, Integration testing needs .babelrc with following configurations othwerwise it would break the execution

	```
	{
	  "plugins": [
	    "transform-decorators-legacy",
	    "transform-class-properties",
	    "transform-object-rest-spread"],
	  "presets": [
	    "react",
	    "es2015"
	  ]
	}
	``` 

* End-to-end testing

	We have already installed dependency pacakges i.e. selenium-standalone and nightwatch, Let's create the nightwatch.json ([reference](http://nightwatchjs.org/gettingstarted#settings-file)) in the project's root folder and add this inside:

	```
	{
	  "src_folders" : ["e2eTests"],
	  "output_folder" : "reports",
	  "selenium" : {
	    "start_process" : false,
	    "server_path" : "",
	    "log_path" : "",
	    "host" : "127.0.0.1",
	    "port" : 4444,
	    "cli_args" : {
	      "webdriver.chrome.driver" : "",
	      "webdriver.ie.driver" : ""
	    }
	  },
	  "test_settings" : {
	    "default" : {
	      "launch_url" : "http://localhost:3000",
	      "selenium_port" : 4444,
	      "selenium_host" : "localhost",
	      "silent": true,
	      "screenshots" : {
	        "enabled" : false,
	        "path" : ""
	      },
	      "desiredCapabilities": {
	        "browserName": "chrome",
	        "javascriptEnabled": true,
	        "acceptSslCerts": true
	      }
	    },
	    "chrome" : {
	      "desiredCapabilities": {
	        "browserName": "chrome",
	        "javascriptEnabled": true,
	        "acceptSslCerts": true
	      }
	    }
	  }
	}
	```

### Organize test cases and configuration files

* Unit and Integration test cases should be kept next to source or in a __tests__ directory of respective modules.

	```
	ns-client
	│   README.md
	│   nighwatch.json
	│   .babelrc   
	│   ...
	│
	└───src
	│   │
	│   └───modules
	│       │   
	│       └───users
	│           │
	│           │   Users.js   
	│           │   Users-test.js   
	│   
	│   ...
	│
	└───e2eTests
	│   │  ...tests..
	│   │
	    
	```

### Execution

* Execute Unit tests and Integration tests
	```
	npm test
	```

* Execute Unit tests and Integration tests
	```
	selenium-standalone start
	nightwatch -c nightwatch.js (TBD.. need to configure it to run via npm command)
	```

### Reports
	- Reports will be collected into /reports directory

### References
	- https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
	- https://medium.com/@TuckerConnelly/good-practices-for-testing-react-apps-3a64154fa3b1
	- http://softwaretestingfundamentals.com/integration-testing/
	- https://dev-blog.apollodata.com/designing-graphql-mutations-e09de826ed97
	- https://github.com/AlexGilleran/jsx-control-statements
	- https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
	- https://medium.com/android-testing-daily/the-3-tiers-of-the-android-test-pyramid-c1211b359acd [pyramid]
	- https://codeutopia.net/blog/2015/04/11/what-are-unit-testing-integration-testing-and-functional-testing/
	- https://npmcompare.com/compare/nightwatch,testcafe,webdriverio

	- https://medium.com/@ferdingler/testing-apollo-react-components-a7618d8a9e7a
	- https://medium.com/entria/testing-a-graphql-server-using-jest-4e00d0e4980e
	- https://semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest


	https://stackoverflow.com/questions/9239588/toc-or-sidebar-in-github-wiki

	https://github.com/mcMMO-Dev/mcMMO/wiki
	https://github.com/guard/guard/wiki/Add-Readline-support-to-Ruby-on-Mac-OS-X
	https://github.com/jekyll/jekyll/wiki
	https://github.com/Netflix/Hystrix/wiki#principles
	https://github.com/h5bp/html5-boilerplate/wiki


	https://medium.com/react-native-training/building-chatty-a-whatsapp-clone-with-react-native-and-apollo-part-1-setup-68a02f7e11
	https://medium.com/@simontucker/writing-about-testing-with-react-and-graphql-is-on-my-todo-list-for-sure-fe6d2a13ebab
	https://medium.com/@shalkam/testing-a-graphql-server-using-jest-and-graphql-tester-a95ef25aecd8