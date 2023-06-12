import React from "react";

export interface ILoginViewProps {
    //
}

export interface ILoginViewState {
    email: string;
    password: string;
}

export class LoginView extends React.Component {

    public override render(): JSX.Element {
        return (<></>);
    }

    public override async componentDidMount(): Promise<void> {
        //
    }

    public override async componentWillUnmount(): Promise<void> {
        //
    }

}