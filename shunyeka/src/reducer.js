export const inititalState = {
    users: [],
    totalUsers: ""
}

const reducer = (state, action) =>
{
    console.log(action)
    switch (action.type)
    {
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            };

        case "SET_TOTAL_USERS":
            return {
                ...state,
                totalUsers: action.totalUsers
            };
        default:
            return state;
    }
}

export default reducer;