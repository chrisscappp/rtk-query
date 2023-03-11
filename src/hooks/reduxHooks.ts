import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";

export const useAppDispatch = () =>  useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> =  useSelector

// типизованный selector позволяет узнать, что мы передаем из reducer, что вытаскиваем...

