import Reducer from "@instagram/context/appContext/reducer/index.tsx";
import * as Actions from "@instagram/context/appContext/action/index.tsx";
import createDataContext from "@instagram/context/appContext/createDataContext/index.tsx";

export const { Context, Provider } = createDataContext(Reducer, Actions, {});