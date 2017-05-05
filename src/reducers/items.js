import moment from 'moment';

export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}


export function openModal(state = false, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return action.open;

        default:
            return state;
    }
}
export function openDialogue(state = false, action) {
    console.log(state,'openDialog')
    switch (action.type) {
        case 'OPEN_DIALOGUE':
            return action.openD;

        default:
            return state;
    }
}
export function loadHeader(state = false, action) {
    switch (action.type) {
        case 'LOAD':
            return true;
        case 'NOT_LOAD' :
            return false;

        default:
            return state;
    }
}

export function notifications(state = [], action = {}) {
  switch(action.type) {
    case "RNS_SHOW_NOTIFICATION":
      const { type, ...rest } = action;
      return [
        ...state,
        { ...rest, uid: action.uid}
      ];
    case "RNS_HIDE_NOTIFICATION":
      return state.filter(notification => {
        return notification.uid !== action.uid;
      });
  }
  return state;
}


export function items(state = [], action) {
    let newOrder;
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            action.items.map((item, index) => {
                const date = item.creationTime;
                const formattedDate = moment(date).format('DD-MM-YY');
                item.creationTime = formattedDate;
            })
            return action.items;
        case 'DELETE_ORDER_SUCCESS':
            return [];
        case 'placementCreatedEvent':
            newOrder = [];
            for (let i = 0; i < action.orders.length; i++) {
                if (action.orders[i].id == action.newOrder.id) {
                    newOrder.push(action.newOrder)
                } else {
                    newOrder.push(action.orders[i]);
                }
            }
            return [...newOrder];
        case 'orderCreatedEvent':
            return [...action.orders, action.newOrder];
        case 'executionCreatedEvent':
            newOrder = [];
            for (let i = 0; i < action.orders.length; i++) {
                if (action.orders[i].id == action.newOrder.id) {
                    newOrder.push(action.newOrder);
                } else {
                    newOrder.push(action.orders[i]);
                }
            }
            return [...newOrder];
        case 'allOrdersDeletedEvent':
            return [];
        default:
            return state;
    }
}

export function stocks(state = [], action) {
    switch (action.type) {
        case 'STOCK_FETCH_DATA_SUCCESS':
            return action.stocks;
        default:
            return state;
    }
}


export function searchResults(state = [], actions) {
    let newOrder = [];
    switch (actions.type) {
        case 'UPDATE_SEARCH_DATA':
            actions.searchResults.map((item, index) => {
                if (item.id == actions.newOrder.id)
                    newOrder.push(actions.newOrder);
                else
                    newOrder.push(item);
            });
            return newOrder;
        case 'SEARCH_DATA_ID':
            console.log(actions)
            actions.items.map((item, index) => {
                if (item.id.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item);
                }
            })
            return newOrder;
        case 'SEARCH_DATA_SIDE':
            actions.items.map((item, index) => {
                if (item.side.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_SYMBOL':
            actions.items.map((item, index) => {
                if (item.symbol.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_QUANTITY':
            actions.items.map((item, index) => {
                if (item.quantity.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_PLACED':
            actions.items.map((item, index) => {
                if (item.quantityPlaced.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_EXECUTED':
            actions.items.map((item, index) => {
                if (item.quantityExecuted.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_LIMIT_PRICE':
            actions.items.map((item, index) => {
                if (item.limitPrice.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_PRIORITY':
            actions.items.map((item, index) => {
                if (item.priority.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_STATUS':
            actions.items.map((item, index) => {
                if (item.status.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_TRADER':
            actions.items.map((item, index) => {
                if (item.traderId.toString().indexOf(actions.key) != -1) {
                    newOrder.push(item)
                }
            })
            return newOrder;
        case 'SEARCH_DATA_':
            return actions.items;
        default:
            return state;
    }
}

export function orders(state = [], action) {
    let newOrder;
    switch (action.type) {
        case 'ORDER_PLACE_DATA_SUCCESS':
            newOrder = [];
            for (let i = 0; i < action.orders.length; i++) {
                newOrder.push(action.orders[i]);
            }
            return newOrder;
        default:
            return state;
    }
}

export function notificationMsg(state = [], action) {
    switch (action.type) {
        case "NOTIFY_USER":
            let newNotifications = [];
            if(action.notifications.length > 15)
                newNotifications = [action.notificationMsg];
            else
                newNotifications = [
                ...action.notifications,
                action.notificationMsg
            ];
            return newNotifications;
        default:
            return state;
    }
}