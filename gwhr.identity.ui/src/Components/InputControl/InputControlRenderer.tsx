import { InputControl } from "./InputControl";

export class InputControlRenderer {
    public static render(ctx: InputControl): JSX.Element {
        return (<>
            <div>
                <span>{ctx.props.label}</span>
                <input type="text" value={ctx.state.value} onBlur={ctx.onBlur} onFocus={ctx.onFocus} onChange={ctx.onChange} />
            </div>
        </>);
    }
}