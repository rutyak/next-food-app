
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import cartReducer from "@/slice/CartSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "cart",
    storage
} 

const rootReducer = combineReducers({
    cart: persistReducer(persistConfig, cartReducer)
})

const store = configureStore({
    reducer: rootReducer
})

const persistor = persistStore(store);

export {store, persistor};