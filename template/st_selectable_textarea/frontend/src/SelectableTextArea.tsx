import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
  RenderData,

} from "streamlit-component-lib"
import React, { useEffect, useRef, ReactNode } from "react"

interface State {
  isFocused: boolean
  selectedText: string
  inputText: string
  inputHeight: string
}

class SelectableTextArea extends StreamlitComponentBase<State> {
  public state = {
    isFocused: false,
    selectedText: "",
    inputText: this.props.args["value"] || "",
    inputHeight: this.props.args["height"]+"px" || "100px",
  }

  public componentDidUpdate: any = (
    prevProps: Readonly<any>
  ): void =>{
    if (prevProps.args["value"] !== this.props.args["value"]) {
      this.setState({ inputText: this.props.args["value"] || "" });
    }
    Streamlit.setFrameHeight()
  }

  public componentDidMount(): void {
    Streamlit.setFrameHeight()
  }

  public componentWillUnmount(): void {
    Streamlit.setFrameHeight()
  }

  public render = (): ReactNode => {
    // const height = this.props.args["height"];
    const { theme } = this.props;
    // const divRef = useRef<HTMLDivElement>(null)
    // const { width } = this.props.args["width"];

    return (
        <textarea
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onMouseUpCapture={this.handleMouseUp}
          value={this.state.inputText}
          cols={100}
          rows={3}
          style={{
            overflow: "visible",
            resize: "vertical",
            minWidth: "100%",
            // minHeight: height + "px",
            minHeight: this.props.args["height"] + "px",
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

    if (selectedText === "") {
      return;
    }

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
