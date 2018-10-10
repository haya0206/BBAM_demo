import BBAMblocks from "BBAM_Blocks";
import React, { Component } from "react";
import BlocksComponent from "./asdfd/blocks";
import { observer, inject } from "mobx-react";
import withWidth from "@material-ui/core/withWidth";
import axios from "axios";
@inject("store")
@observer
class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logSeq: 0
    };
  }
  componentDidMount() {
    this.workspace = BBAMblocks.inject(this.blocks, {
      comments: true,
      disable: false,
      collapse: false,
      media: "../static/blocks-media/",
      readOnly: false,
      rtl: null,
      scrollbars: true,
      toolbox: null,
      toolboxPosition: "start",
      horizontalLayout: false,
      trashcan: false,
      sounds: false,
      zoom: {
        controls: false,
        wheel: true,
        startScale: 0.75,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
      },
      colours: {
        fieldShadow: "rgba(255, 255, 255, 0.3)",
        dragShadowOpacity: 0.6
      }
    });
    this.workspace.getFlyout().setRecyclingEnabled(false);
    var xml = BBAMblocks.Xml.workspaceToDom(this.workspace);
    BBAMblocks.ScratchMsgs.setLocale("ko");
    BBAMblocks.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
    this.workspace.getFlyout().setRecyclingEnabled(true);
    this.setToolboxRefreshEnabled = this.workspace.setToolboxRefreshEnabled.bind(
      this.workspace
    );
    this.workspace.setToolboxRefreshEnabled = () => {
      this.setToolboxRefreshEnabled(false);
    };
    this.props.store.workspace = this.workspace;
    this.workspace.addChangeListener(this.eventListener);
  }
  eventListener = event => {
    if (event.type === BBAMblocks.Events.BLOCK_DELETE) {
      this.post("delete");
    } else if (event.type === BBAMblocks.Events.BLOCK_CHANGE) {
      this.post("change");
    } else if (event.type === BBAMblocks.Events.BLOCK_MOVE) {
      this.post("move");
    } else if (event.type === BBAMblocks.Events.VAR_CREATE) {
      this.post("varCreate");
    } else if (event.type === BBAMblocks.Events.VAR_DELETE) {
      this.post("varDelete");
    } else if (event.type === BBAMblocks.Events.VAR_RENAME) {
      this.post("varRename");
    }

    //console.log(this.workspace.getBlockById(event.blockId)) ;
  };
  post = type => {
    const url = "http://13.125.181.57:5000/log";
    const code = BBAMblocks.Python.workspaceToCode(this.props.store.workspace);
    axios
      .post(url, {
        ETP: type,
        PID: 1,
        UID: "PSB",
        attribute: "code",
        code: code,
        SEQ: this.state.logSeq
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState(prevState => ({
      logSeq: prevState.logSeq + 1
    }));
  };
  setBlocks(blocks) {
    this.blocks = blocks;
  }
  render() {
    const {
      anyModalVisible,
      customProceduresVisible,
      extensionLibraryVisible,
      options,
      stageSize,
      vm,
      isVisible,
      onActivateColorPicker,
      updateToolboxState,
      onActivateCustomProcedures,
      onRequestCloseExtensionLibrary,
      onRequestCloseCustomProcedures,
      toolboxXML,
      width,
      store,
      nowChange,
      value,
      setValue,
      ...props
    } = this.props;
    return (
      <div>
        <BlocksComponent
          componentRef={blocks => this.setBlocks(blocks)}
          height={
            this.props.nowChange === true
              ? ""
              : this.props.width === "xs"
                ? "calc(85vh - 56px)"
                : "calc(85vh - 64px)"
          }
          {...props}
        />
      </div>
    );
  }
}
Blocks.defaultProps = {
  isVisible: true,
  options: Blocks.defaultOptions
};
export default withWidth()(Blocks);
