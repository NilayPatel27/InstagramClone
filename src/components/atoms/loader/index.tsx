import React, { useContext, useEffect } from "react";
import { AppContext } from "@instagram/context/index.tsx";


const Loader = ({ visible }: any) => {

    const { setLoader } = useContext(AppContext);

    useEffect(() => {
        if (visible === true) {
            setLoader(true);
        }
        else if (visible === false) {
            setLoader(false);
        }
    }, [visible]);


    return (<></>);
};
export default Loader;