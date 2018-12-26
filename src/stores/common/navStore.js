/* eslint-disable no-unused-vars, navItems, prefer-const */
import { toJS, observable, action, computed } from 'mobx';
import _ from 'lodash';
import { PRIVATE_NAV } from '../../constants/NavigationMeta';

export class NavStore {
  @observable NAV_ITEMS = { ...PRIVATE_NAV };

  @computed get myNavItems() {
    return this.NAV_ITEMS;
  }
}

export default new NavStore();
