import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"


interface State {
  isFocused: boolean
  selectedText: string
}

class TextMouseWrapper extends StreamlitComponentBase<State> {
  public state = {
    isFocused: false,
    selectedText: "",
  }

  public componentDidMount(): void {
    document.addEventListener("mouseup", this.handleMouseUp)
  }

  public componentWillUnmount(): void {
    document.removeEventListener("mouseup", this.handleMouseUp)
  }

  public render = (): ReactNode => {
    const text = this.props.args["text"]
    const { theme } = this.props
    const style: React.CSSProperties = {}

    if (theme) {
      const borderStyling = `0.1px dotted color${
        this.state.isFocused ? theme.backgroundColor : "red"
      }`
      style.border = borderStyling
      style.outline = borderStyling
    }
    return (
      <div style={style}>
      <div contentEditable={true} style={
        { 
          minHeight: "100px", 
          backgroundColor: "#f0f2f6",
          borderRadius: "5px",
          padding: "10px",
          outline: this.state.isFocused ? "5px dotted red" : "5px dotted white",
        }}>
        {text}
      </div>
    </div>
    )
  }

  private handleMouseUp = (): void => {
    const selectedText = window.getSelection()?.toString() || ""
    this.setState({ selectedText }, () => Streamlit.setComponentValue(this.state.selectedText))
  }
}

export default withStreamlitConnection(TextMouseWrapper)
