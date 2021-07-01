import {useContext} from "react"
import AuthContext from "../context/AuthContext"

const context = () => useContext(AuthContext);

export default context;

//export dafault() => useContext(AuthContext);