import React from 'react'
import { shallow } from 'enzyme'
import {NotificationComponent} from '../components/Trader/Utilities/NotificationComponent'



describe('components', () => {
  describe('notificationComponent', () => {
    it('should render self and subcomponents', () => {

        const enzymeWrapper = shallow(<NotificationComponent/>)
      

      expect(enzymeWrapper.find('div').hasClass('hi')).toBe(true)

    
      
    })

    
    })
  })
