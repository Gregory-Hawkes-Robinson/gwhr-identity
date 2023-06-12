import { useState } from "react";
import { InputControl, InputType } from "../../Components/InputControl/InputControl";

export function UserDetails() {

    const [firstName, setFirstName] = useState("FN");

    return (<>
        <div>User Details</div>
        <InputControl label="First name" placeholder="first name" value={firstName} type={InputType.Text} onChange={(e: any): void => {
            console.log("onChange: ", e);
        }} />
        <InputControl label="First name" placeholder="first name" value={firstName} type={InputType.Text} onChange={(e: any): void => {
            console.log("onChange: ", e);
        }} />
    </>);
}