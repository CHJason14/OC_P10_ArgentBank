import { configureStore, createSlice } from "@reduxjs/toolkit"


const infoUserSlice = createSlice ({
    name: "infoUser",
    initialState : {connected: false, content: " Sign In", firstName: "", lastName:"", userName:""},
    reducers: {
        changeStatus: (state, action) => {
            // { type : "infoUser/changeStatus", payload: true }
            state.connected = action.payload; 
            state.content = action.payload ? " Logout" : " Sign In";
        },
        changeName: (state, action) => {
            // { type : "infoUser/changeName", payload: {firstName: "Tony", lastName: "Jarvis", userName: "Iron"} }
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName;
        }
    }
});

const editUserNameForm = createSlice ({
    name: "editUserNameForm",
    initialState : {open : false},
    reducers: {
        changeForm: (state, action) => {
            // { type : "editUserNameForm/changeForm", payload: true }
            state.open = action.payload; 
        },
    }
});

export const store = configureStore({
    reducer: {
        infoUser: infoUserSlice.reducer,
        editUserNameForm: editUserNameForm.reducer,
    },
});
