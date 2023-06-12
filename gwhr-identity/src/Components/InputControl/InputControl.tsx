import React, { ChangeEvent, useEffect, useState, useRef, useMemo } from "react";
import "./InputControl.scss";

export enum InputType {
    Text,
    Number,
    Email,
    Phone
}

export interface IInputControlProps {
    label: string;
    placeholder: string;
    value: any;
    type: InputType;
    //delayInterval: number;
    onChange: (value: any) => void;
}

export function InputControl(props: IInputControlProps) {
    //state variables
    const [valueInternal, setValueInternal] = useState("");

    const _timeOutId: React.MutableRefObject<number> = useRef<number>(-1);
    const _delayInterval: React.MutableRefObject<number> = useRef(0);

    //#region Methods

    const type = useMemo(() => {
        switch (props.type) {
            case InputType.Number:
                return "number";
            case InputType.Email:
                return "email";
            case InputType.Phone:
                return "phone";
            default:
                return "text";
        }
    }, [props.type]);

    const setValue = (value: any) => {
        setValueInternal(value);
        raiseOnChangeEvent(value);
    };

    const raiseOnChangeEvent = (value: any): void => {
        console.log(valueInternal);

        //If a new value was set before the previous value was passed to the onchange event.  Cancel any previous timer
        clearTimeout(_timeOutId.current);
        console.log("current:", _timeOutId.current);

        //Start a new timer for the new value
        _timeOutId.current = setTimeout(() => {
            console.log("raiseEvent:", _timeOutId.current);
            props.onChange(value);
        }, 250);
        console.log(`new _timeOutId:${_timeOutId.current}`);
    };

    const clear = (): void => {
        setValue("");
    }

    //#endregion

    //#region Life-cycle methods

    //Mount
    useEffect(() => {
        //_delayInterval.current = props.delayInterval;
        setValue(props.value);
    }, []);

    //Unmount
    useEffect(() => {
        return () => {
            if (_timeOutId.current > -1) {
                clearTimeout(_timeOutId.current);
            }
        };
    }, []);

    // useEffect(() => {
    //     console.log("timeout current:", _timeOutId.current);
    //     if (_timeOutId.current === -1 || props.value == valueInternal) {
    //         return;
    //     }

    //     //If a new value was set before the previous value was passed to the onchange event.  Cancel any previous timer
    //     clearTimeout(_timeOutId.current);

    //     //Start a new timer for the new value
    //     _timeOutId.current = setTimeout(() => {
    //         console.log("raiseEvent:", _timeOutId.current);
    //         props.onChange(valueInternal);
    //     }, 1000);
    //     console.log(`new _timeOutId:${_timeOutId.current}`);

    // }, [valueInternal]);

    //#endregion

    //#region Render method

    return (<>
        <div className="input-control">
            <p>{props.label}</p>
            <div>
                <input placeholder="" value={valueInternal} type={type}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setValue(e.target.value);
                        //raiseOnChangeEvent();
                    }} />
                <button>X</button>
            </div>

        </div>
    </>);

    //#endregion

}