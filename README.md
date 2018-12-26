This project is build to try out various solutions for React, GraphQL, which can be later consumed in actual project

## Todos

- [x] Base architecture with apollo mobx
- [ ] CRUD Implemention
- [ ] Search functionality on report
- [ ] Sorting functionality on report
- [ ] Pagination- load more on scroll down
- [ ] Subscribers
- [ ] Export queries/schema which can be easily imported to React application
- [ ] Authentication

## Testing

- https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
- https://medium.com/@TuckerConnelly/good-practices-for-testing-react-apps-3a64154fa3b1
- http://softwaretestingfundamentals.com/integration-testing/
- https://dev-blog.apollodata.com/designing-graphql-mutations-e09de826ed97
- https://github.com/AlexGilleran/jsx-control-statements
- https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
- https://medium.com/android-testing-daily/the-3-tiers-of-the-android-test-pyramid-c1211b359acd [pyramid]
- https://codeutopia.net/blog/2015/04/11/what-are-unit-testing-integration-testing-and-functional-testing/

Pyramid
=====================

UI test: (Functional Testing/E2E testing, or browser testing): 
--------------------
babel-jest babel-preset-stage-0 enzyme jest-cli react-addons-test-utils react-test-renderer redux-mock-store sinon

npm i isomorphic-fetch mobx-apollo graphql-tag apollo-client-preset apollo-utilities apollo-link subscriptions-transport-ws apollo-link-ws -S

import { observable, action } from 'mobx';

export class AccountStore {
  accountTypes = {
    0: 'individual',
    1: 'entity',
    2: 'ira',
  }

  @observable accountType = this.accountTypes[0];

  @action
  setAccountType(type) {
    this.accountType = this.accountTypes[type];
    console.log(this.accountType);
  }
}

export default new AccountStore();


GraphQL introduction

user
 - status: account setup > personal_information, email_address, nextseed account

PersonalInformation

NextseedAccount

