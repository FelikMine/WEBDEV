import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface inputData {
    userName:string,
    password:string,
    email: string
}

const initialState:inputData ={
    userName: "default",
    password: "default",
    email: "default",
}

const userDataSlice = createSlice( {
    name: 'userData',
    initialState,
    reducers : {
        setUserData (state, action:PayloadAction<inputData>) {
            // console.log(state, "-состояние" , action, "-действие");

            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.password = action.payload.password;

        },
    }
})

export const {setUserData} = userDataSlice.actions;
export default userDataSlice.reducer;