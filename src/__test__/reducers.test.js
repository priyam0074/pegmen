

import * as actions from "../actions/items";
import {notifications} from "../reducers/items";

describe('notifications', () => {
  it('should return the initial state', () => {
    expect(
      notifications(undefined, {type:'unexpected'})
    ).toEqual([])
  })

  it('should handle show notifications', () => {
    expect(
      notifications([], {
        type: 'RNS_SHOW_NOTIFICATION'
        
      })
    ).toEqual([{}])
  })

it('should handle hide notifications', () => {
    expect(
      notifications([],
        {
          type:'RNS_HIDE_NOTIFICATION'
        }
      )
    ).toEqual([])
  })
})

