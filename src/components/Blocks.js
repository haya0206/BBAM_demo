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
      logSeq: 1,
      preSeq: 0,
      stopTime: 0
    };
  }
  componentDidMount() {
    const xmltoolbox = this.getXml();
    this.workspace = BBAMblocks.inject(this.blocks, {
      comments: true,
      disable: false,
      collapse: false,
      media: "../static/blocks-media/",
      readOnly: false,
      rtl: null,
      scrollbars: true,
      toolbox: xmltoolbox,
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
    BBAMblocks.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
    this.workspace.getFlyout().setRecyclingEnabled(true);
    this.setToolboxRefreshEnabled = this.workspace.setToolboxRefreshEnabled.bind(
      this.workspace
    );
    this.workspace.setToolboxRefreshEnabled = () => {
      this.setToolboxRefreshEnabled(false);
    };
    this.props.store.workspace = this.workspace;
    this.props.store.stop = 0;
    this.props.store.much = 0;
    if (this.props.type !== "battle" && this.props.type !== "sandbox") {
      this.workspace.addChangeListener(this.eventListener);
      this.interval = setInterval(() => {
        console.log(this.state.preSeq, this.state.logSeq);
        if (this.state.preSeq === this.state.logSeq) {
          if (this.state.stopTime === 2) {
            this.props.store.stop = 1;
          }
          this.setState(state => ({ stopTime: state.stopTime + 1 }));
        }
        if (this.state.logSeq - this.state.preSeq > 15) {
          this.props.store.much = 1;
          this.props.store.muchModalOpen = true;
        }
        this.setState(state => ({ preSeq: state.logSeq }));
      }, 5000);
      if (this.props.preXml !== null) {
        BBAMblocks.Xml.domToWorkspace(
          BBAMblocks.Xml.textToDom(this.props.preXml),
          this.workspace
        );
      }
    }
  }
  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.interval);
  }
  getXml = () => {
    return this.props.xml;
  };
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
    const url = "https://bbam.study/log";
    const code = BBAMblocks.Python.workspaceToCode(this.props.store.workspace);
    axios
      .post(url, {
        ETP: type,
        PID: this.props.id,
        UID: this.props.name,
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
      height,
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
                ? `calc(${height} - 56px)`
                : `calc(${height} - 64px)`
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
