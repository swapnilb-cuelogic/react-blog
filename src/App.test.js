import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import App from './App';

// it('renders without crashing', () => {
//   // const div = document.createElement('div');
//   // ReactDOM.render(<App />, div);
//   // ReactDOM.unmountComponentAtNode(div);
// });

describe('APP', () => {
  let wrapper;
  
  it('renders without crashing', () => {
	  wrapper = shallow(<App />);
	  expect(wrapper.find('App').length).toBeGreaterThanOrEqual(0);
	});
});