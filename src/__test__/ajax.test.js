import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from "../actions/items";
import * as types from '../actions/items'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    nock('http://localhost:8080/')
      .get('/orders')
      .reply(200, { items: { orders: ['do something'] }})

    const expectedActions = [
      { type: 'ITEMS_IS_LOADING',isLoading:true},
       { type: 'ITEMS_HAS_ERRORED',hasErrored:true }
      
    ]
    const store = mockStore({ orders: [] })
    return store.dispatch(actions.itemsFetchData())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})