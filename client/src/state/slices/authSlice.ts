import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "@/lib/constants";

interface IAuthSliceInitialState {
	token: string | null;
	isLoggedIn: boolean;
	user: User | null;
}

export const initialState: IAuthSliceInitialState = {
	token: null,
	isLoggedIn: false,
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSucceeded: (
			state,
			action: PayloadAction<{ token: string; user: User }>
		) => {
			state.token = action.payload.token;
			state.isLoggedIn = true;
			state.user = action.payload.user;
		},
		logout: (state) => {
			state.token = null;
			state.isLoggedIn = false;
			state.user = null;

			localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
		},
		fetchAuthFromStorage: (state) => {
			const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
			state.token = token;
			state.isLoggedIn = token !== null ? true : false;

			const firstName = localStorage.getItem(STORAGE_KEYS.FIRST_NAME);
			const email = localStorage.getItem(STORAGE_KEYS.EMAIL);

			if (firstName && email) {
				state.user = {
					firstName,
					email,
					lastName: "",
				};
			}
		},
	},
});

export const { loginSucceeded, logout, fetchAuthFromStorage } =
	authSlice.actions;

export default authSlice.reducer;
