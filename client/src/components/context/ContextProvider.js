import React, { createContext, useState } from 'react'


export const adddata = createContext("");
export const updatedata = createContext("");
export const deldata = createContext("");
export const searchdata = createContext("");

const ContextProvider = ({ children }) => {

    const [udata, setUdata] = useState("");
    const [updata, setUPdata] = useState("");
    const [dltdata, setDLTdata] = useState("");
    const [searchData, setsearchData] = useState("");


    return (
        <adddata.Provider value={{ udata, setUdata }}>
            <updatedata.Provider value={{ updata, setUPdata }}>
                <deldata.Provider value={{ dltdata, setDLTdata }}>
                    <searchdata.Provider value={{searchData, setsearchData}}>
                        {children}
                    </searchdata.Provider>
                </deldata.Provider>
            </updatedata.Provider>
        </adddata.Provider>
    )
}

export default ContextProvider;












