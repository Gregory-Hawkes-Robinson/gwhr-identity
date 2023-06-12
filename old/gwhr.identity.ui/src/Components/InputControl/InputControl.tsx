import classNames from "classnames";
import { Action1, Action } from "gwhr.bcl.shared/src/system/action";
import { Func, Func1, Func3 } from "gwhr.bcl.shared/src/system/func";
import { Nullable } from "gwhr.bcl.shared/src/system/nullable";
import { observer } from "mobx-react";
import React, { ReactNode, useState } from "react";
import "./InputControl.scss";

export interface IGhInputContentContext<T extends HTMLElement> {
    onFocus: Action1<React.FocusEvent<T>>;
    onBlur: Action1<React.FocusEvent<T>>;
    onChange: Action1<React.ChangeEvent<T>>;
}

export interface IGhTextInputControlProps {
    label: JSX.Element | string;
    error: string;
    isReadOnly: boolean;
    validator: Func1<string, boolean>;
    onChange: Action1<string>;
    value: string;
}

export const GhTextInputControl = observer((props: IGhTextInputControlProps): JSX.Element => {

    const [value, setValue]: [any, React.Dispatch<any>] = useState<any>("");
    const [isInitialized, setIsInitialized]: [any, React.Dispatch<boolean>] = useState<boolean>(false);

    // const [isFocused, setIsFocused]: [any, React.Dispatch<any>] = useState<boolean>(false);

    //#region Functions

    const isEmpty = (): boolean => {
        return value.length == 0;
    }

    const isValid = (): boolean => {
        if (isInitialized) {
            return props.validator(value);
        }
        return true;
    }

    const onFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
        //
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        setIsInitialized(true);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
        props.onChange(e.target.value);
    }

    //#endregion

    //#region Markup

    return (
        <div className={classNames({
            'GhTextInputControl': true,
            'not-empty': !isEmpty()
        })}>
            <div className="input-container">
                <div className={"label"}>{props.label}</div>
                <input className={classNames({ 'invalid': !isValid() })}
                    type="text"
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange} />
            </div>
            <div className={classNames({
                'error-label': true,
                'visible': !isValid()
            })}>{props.error}</div>
        </div>
    );

    //#endregion
});