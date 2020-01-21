import React from 'react';
import 'test/enzyme-init';
import { shallow, mount } from 'enzyme';
import RatingFilterItem from 'ui/digital-exchange/RatingFilterItem';
import StarIcon from 'ui/digital-exchange/common/StarIcon';
import { mockRenderWithIntl } from 'test/testUtils';

jest.unmock('react-redux');

describe('RatingFilterItem', () => {
  let component;
  let onSelect;
  beforeEach(() => {
    onSelect = jest.fn();
  });

  it('should render without crashing', () => {
    component = shallow(mockRenderWithIntl(<RatingFilterItem
      onSelect={onSelect}
      maxRating={0}
      rating={0}
    />));
    expect(component.exists()).toEqual(true);
  });

  it('should not be selected by default', () => {
    component = shallow(mockRenderWithIntl(<RatingFilterItem
      onSelect={onSelect}
      maxRating={0}
      rating={0}
    />));
    expect(component.hasClass('RatingFilterItem--selected')).toEqual(false);
  });

  it('should render selected UI state', () => {
    component = shallow(mockRenderWithIntl(<RatingFilterItem
      onSelect={onSelect}
      maxRating={0}
      rating={0}
      selected
    />));
    expect(component.hasClass('RatingFilterItem--selected'));
  });

  it('should render star icons according to rating and maxRating', () => {
    component = mount(mockRenderWithIntl(<RatingFilterItem
      onSelect={onSelect}
      maxRating={5}
      rating={2}
    />));
    expect(component.find(StarIcon)).toHaveLength(5);
    expect(component.find(StarIcon).find('[filled=true]')).toHaveLength(2);
  });

  it('should call onSelect if clicked', () => {
    component = mount(mockRenderWithIntl(<RatingFilterItem
      onSelect={onSelect}
      maxRating={5}
      rating={1}
    />));
    component.find('div').simulate('click');
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('should call onSelect if selected from keyboard', () => {
    const enterKey = 'Enter';
    component = mount(mockRenderWithIntl(<RatingFilterItem
      onSelect={onSelect}
      maxRating={5}
      rating={1}
    />));
    component.find('div').simulate('keyDown', { key: enterKey });
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
