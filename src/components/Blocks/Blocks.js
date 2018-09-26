import BBAMblocks from "BBAM_Blocks";
import React, { Component } from "react";
import BlocksComponent from "../asdfd/blocks";
import { observer, inject } from "mobx-react";
import withWidth from "@material-ui/core/withWidth";
import parser from "fast-xml-parser";
import axios from "axios";
@inject("store")
@observer
class Blocks extends Component {
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
      trashcan: true,
      sounds: false,
      zoom: {
        controls: true,
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
    if (event.type === BBAMblocks.Events.BLOCK_CREATE) {
      this.post("create");
    } else if (event.type === BBAMblocks.Events.BLOCK_DELETE) {
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
    const url = "http://192.168.43.240:5000/asdf";
    const xml = BBAMblocks.Xml.workspaceToDom(this.props.store.workspace);
    axios
      .post(url, {
        type: type,
        attribute: "xml",
        block: BBAMblocks.Xml.domToPrettyText(xml)
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
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
                ? "calc(100vh - 56px)"
                : "calc(100vh - 64px)"
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
