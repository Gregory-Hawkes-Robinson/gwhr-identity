import { Func1 } from "gwhr.bcl.shared/src/system/func";
import React from "react";
import { InputControlRenderer } from "./InputControlRenderer";

export interface IInputControlProps {
    label: string;
    isReadOnly: boolean;
    validator: Func1<string, boolean>;
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
    /*
    export class BrTermsViewPrivate extends React.Component<IBrTermsViewProps, IBrTermsViewState> {
    constructor(props: IBrTermsViewProps) {
        super(props);

        //#region Initial State
        this.state = {}
        //#endregion
    }

     */

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
        console.log("this:", this);
        console.log(this.props.label);
        console.log(this.state.value);
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
    }

    //#endregion
}