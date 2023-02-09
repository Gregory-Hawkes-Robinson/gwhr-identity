import { InputControl } from "./InputControl";
import classNames from "classnames";

import "./InputControl.scss";

export class InputControlRenderer {
    public static render(ctx: InputControl): JSX.Element {
        return (
            <div className={classNames({
                'GwInputControl': true,
                'not-empty': !ctx.isEmpty
            })}>
                <span className={"label"}>{ctx.props.label}</span>
                <input type="text" value={ctx.state.value} onBlur={ctx.onBlur} onFocus={ctx.onFocus} onChange={ctx.onChange} />
            </div>
        );
    }
}