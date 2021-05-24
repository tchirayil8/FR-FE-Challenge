import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../containers/App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('initial render of the title is correct', () => {
  const wrapper = mount(
    <App />
  );
  const title = wrapper.find('.app-title');
  expect(title).toHaveLength(1);
  expect(wrapper.find('.app-title').text().includes('Parts List Page 1')).toBe(true);
})