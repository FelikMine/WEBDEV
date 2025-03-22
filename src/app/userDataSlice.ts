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
            state.password = action.payload.password;
            state.email = action.payload.email;

        },
    }
})

export const {setUserData} = userDataSlice.actions;
export default userDataSlice.reducer;