import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

interface State {
  isFocused: boolean
  selectedText: string
  inputText: string
}

class SelectableTextArea extends StreamlitComponentBase<State> {
  public state = {
    isFocused: false,
    selectedText: "",
    inputText: this.props.args["value"] || "",
  }

  public componentDidUpdate: any = (
    prevProps: Readonly<any>
  ): void =>{
    // Check if the value of this.props.args["value"] has changed
    if (prevProps.args["value"] !== this.props.args["value"]) {
      this.setState({ inputText: this.props.args["value"] || "" });
    }
  }

  // ... (existing code)

  public render = (): ReactNode => {
    const { theme } = this.props;

    return (
        <textarea
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onMouseUp={this.handleMouseUp}
          value={this.state.inputText}
          cols={100}
          rows={3}
          style={{
            maxWidth: "100%",
            // minHeight: "95px",
            backgroundColor: "#f0f2f6",
            borderRadius: "5px",
            padding: "10px",
            outline: "none",
            border: `1px solid ${this.state.isFocused ? theme?.primaryColor : "#f0f2f6"}`,
            transition: "border-color 0.3s ease-in-out",
          }}
        ></textarea>
    );
  }

  private handleMouseUp = (): void => {  
    const selectedText = window.getSelection()?.toString() || "";
    this.setState({ selectedText }, () =>
      Streamlit.setComponentValue(this.state.selectedText)
    );
  }

  // Using arrow functions for event handlers automatically binds 'this'
  private _onFocus = (): void => {
    this.setState({ isFocused: true });
  }

  private _onBlur = (): void => {
    this.setState({ isFocused: false });
  }

  private _onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ inputText: event.target.value });
  }

}


export default withStreamlitConnection(SelectableTextArea)
