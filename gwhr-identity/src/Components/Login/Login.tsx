import { useState } from "react";

function Login() {

    //State hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (<>
        <div>
            <h1>GWHR Identity</h1>
            
            Login Component
        </div>
    </>);
}