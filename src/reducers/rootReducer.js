

const initState = {
    cart: []
}

const rootReducer = (state = initState, action) => {
switch (action.type) {
    case "add_to_cart":
        return state + action.payload;
    case "subtract_from_cart":
        return state - action.payload;
    default:
        return state;
}

}

export default rootReducer;