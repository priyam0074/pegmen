import * as actions from "../actions/items";
 
describe('actions', () => {
  it('should create an action -Items has errored', () => {
    const hasErrored = false;
    const expectedAction = {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored
    }
    expect(actions.itemsHasErrored(false)).toEqual(expectedAction)
  })
  it('should create an action to load items', () => {
    const isLoading= false;
    const expectedAction = {
      type: 'ITEMS_IS_LOADING',
      isLoading
    }
    expect(actions.itemsIsLoading(false)).toEqual(expectedAction)
  });
  it('should create an action to fetch itemz', () => {
    const items={};
    const expectedAction = {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
      items
    }
    expect(actions.itemsFetchDataSuccess({})).toEqual(expectedAction)
  });
  it('should create an action to open Modal', () => {
    const open=false;
    const expectedAction = {
      type: 'OPEN_MODAL',
      open
    }
    expect(actions.openModal(false)).toEqual(expectedAction)
  });
  it('should create an action to open Dialogue', () => {
    const openD=false;;
    const expectedAction = {
      type: 'OPEN_DIALOGUE',
      openD
    }
    expect(actions.openDialogue(false)).toEqual(expectedAction)
  });
  it('should create an action to fetch stocks', () => {
    const stocks={};
    const expectedAction = {
      type: 'STOCK_FETCH_DATA_SUCCESS',
      stocks
    }
    expect(actions.stockFetchDataSuccess({})).toEqual(expectedAction)
  });
   it('should create an action to notify users', () => {
    const notificationMsg={};
    const expectedAction = {
      type: 'NOTIFY_USER',
      notificationMsg
    }
    expect(actions.notify({})).toEqual(expectedAction)
  });
  
});


