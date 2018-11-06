import React, { Component } from "react";
import AppBar from "../components/MainAppBar";
import { Provider, observer } from "mobx-react";
import styled from "styled-components";
import BBAMblocks from "BBAM_Blocks";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/github";
import "brace/snippets/python";
import "brace/ext/language_tools";
import Blocks from "../components/Blocks";
import classNames from "classnames/bind";
import style from "./SolvingPage.css";
import ChangeIcon from "../media/change.svg";
const cx = classNames.bind(style);
const Div = styled.div`
  flex-grow: 1;
  position: relative;
`;
const SubmitButton = styled.div`
  height: 25px;
  width: 51px;
  position: absolute;
  bottom: 20px;
  left: 1px;
  z-index: 40;
  border-radius: 15px;
  background-color: #519cfe;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 15px;
  color: white;
`;
const ChangeButton = styled.div`
  background-image: url(${ChangeIcon});
  height: 30px;
  width: 30px;
  position: absolute;
  bottom: 60px;
  left: 10px;
  z-index: 40;
`;
@observer
class SandBoxPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: false,
      value: ""
    };
  }
  setValue = text => {
    this.setState({ value: text });
  };
  onChange = newValue => {
    this.setState({ value: newValue });
  };
  getCode = () => {
    const { store } = this.props;
    if (this.state.isChange === true) {
      return this.state.value;
    }
    return BBAMblocks.Python.workspaceToCode(store.workspace);
  };
  inputPapa = (paCode, paInput = null) => {
    if (paInput === null) return paCode;
    let ret = paCode;
    let paInputArr = paInput.split(/\s/gm);
    for (let i = 0; i < paInputArr.length; i++)
      ret = ret.replace(/input\(\)/, paInputArr[i]);
    return ret;
  };
  callBrython = (cbCode, cbTimeout) => {
    window.isDone = false;

    let cc = cbCode;
    cc = cc.replace(
      /;[\s]*\n/g,
      ";\nif(performance.now() - SUPER_MEGA_TICK_TIMER > " +
        cbTimeout +
        ") return;\n"
    );
    cc = cc.replace(
      /{[\s]*\n/g,
      "{\nif(performance.now() - SUPER_MEGA_TICK_TIMER > " +
        cbTimeout +
        ") return;\n"
    );
    cc = "let SUPER_MEGA_TICK_TIMER = performance.now();" + cc;
    cc =
      "(function(){" +
      cc +
      "if(performance.now() - SUPER_MEGA_TICK_TIMER > " +
      cbTimeout +
      ") return; isDone=true;}());";
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = cc;

    document.body.appendChild(script);

    if (!window.isDone) return false;

    return true;
  };
  isChangeAction = () => {
    const { store } = this.props;
    this.setState({ isChange: !this.state.isChange });
    store.workspace.setVisible(this.state.isChange);
    this.state.isChange === false
      ? this.setValue(this.getCode())
      : this.fromCode();
  };
  fromCode = () => {
    const { store } = this.props;
    store.workspace.clear();
    console.log(this.state.value);
    if (this.state.value === "") return;
    const xml = BBAMblocks.Python.rebert(this.state.value);
    this.xmlToWorkspace(xml);
  };
  xmlToWorkspace = xml => {
    const { store } = this.props;
    BBAMblocks.Xml.domToWorkspace(
      BBAMblocks.Xml.textToDom(xml),
      store.workspace
    );
  };
  handleSubmit = () => {
    const { store } = this.props;
    BBAMblocks.WidgetDiv.hide(true);
    let code = this.getCode();
    code = this.inputPapa(code);
    const getCode = window.__BRYTHON__
      .py2js(code, "__main__", "__main__")
      .to_js();

    console.logs.length = 0;
    let result = "",
      time = 0;
    const startTime = new Date();
    if (this.callBrython(getCode, 2000)) {
      const endTime = new Date();
      time = endTime - startTime;
      result = Array.prototype.slice.call(console.logs).join("");
    } else {
      result = "시간초과!";
      time = 2000;
    }
    const xmlText = new XMLSerializer().serializeToString(
      BBAMblocks.Xml.workspaceToDom(store.workspace)
    );
  };
  render() {
    const { store } = this.props;
    return (
      <Div>
        <AppBar backArrow={true} link={`/mainpage`} />
        <Provider store={store}>
          <Blocks
            grow={1}
            nowChange={this.state.isChange}
            value={this.state.value}
            setValue={this.setValue}
            type="sandbox"
            height="100vh"
          />
        </Provider>
        <div
          className={cx({
            Text: !this.state.isChange
          })}
        >
          <Provider store={store}>
            <AceEditor
              mode="python"
              theme="github"
              value={this.state.value}
              onChange={this.onChange}
              name="UNIQUE_ID_OF_DIV"
              showPrintMargin={true}
              showGutter={false}
              highlightActiveLine={true}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
              height="calc(100vh - 56px)"
              width="100%"
              editorProps={{ $blockScrolling: true }}
            />
          </Provider>
        </div>
        <SubmitButton onClick={this.handleSubmit}>실행</SubmitButton>
        <ChangeButton onClick={this.isChangeAction} />
      </Div>
    );
  }
}
export default SandBoxPage;
