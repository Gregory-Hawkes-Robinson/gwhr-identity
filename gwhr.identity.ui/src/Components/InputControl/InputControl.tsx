import { Action1 } from "gwhr.bcl.shared/src/system/action";
import { Func1 } from "gwhr.bcl.shared/src/system/func";
import React from "react";
import { InputControlRenderer } from "./InputControlRenderer";

export interface IInputControlProps {
    label: string;
    isReadOnly: boolean;
    validator: Func1<string, boolean>;
    onChange: Action1<string>;
    value: string;
}

export interface IInputControlState {
    value: string;
    isFocused: boolean;
}

export class InputControl extends React.Component<IInputControlProps, IInputControlState> {

    public constructor(props: IInputControlProps) {
        super(props);
        this.state = { value: props.value, isFocused: false };
    }

    //#region Properties

    public get isEmpty(): boolean {
        return this.state.value.length == 0;
    }

    public get isValid(): boolean {
        return this.props.validator(this.state.value);
    }

    public get isFocused(): boolean {
        return this.state.isFocused;
    }

    //#endregion

    // #region Methods

    public override render(): JSX.Element {
        return InputControlRenderer.render(this);
    }

    public onFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
        this.setState({ isFocused: true });
    }

    public onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        this.setState({ isFocused: false });
    }

    public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            value: e.target.value,
        });

        this.props.onChange(e.target.value);
    }

    //#endregion
}