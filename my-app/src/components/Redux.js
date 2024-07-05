import { configureStore, createSlice } from "@reduxjs/toolkit"


const infoUserSlice = createSlice ({
    name: "infoUser",
    initialState : {connected: false, content: " Sign In", firstName: "", lastName:""},
    reducers: {
        changeStatus: (state, action) => {
            // { type : "infoUser/changeStatus", payload: true }
            state.connected = action.payload; 
            state.content = action.payload ? " Logout" : " Sign In";
        },
        changeName: (state, action) => {
            // { type : "infoUser/changeName", payload: {firstName: "Tony", lastName: "Jarvis"} }
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        }
    }
});

export const store = configureStore({
    reducer: {
        infoUser: infoUserSlice.reducer,
    },
});
