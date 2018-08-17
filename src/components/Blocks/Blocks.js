import BBAMblocks from "BBAM_Blocks";
import React, { Component } from "react";
import BlocksComponent from "../asdfd/blocks";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import withWidth from "@material-ui/core/withWidth";
@observer
class Blocks extends Component {
  @observable
  blocks = null;
  @observable
  workspace = null;
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
    this.setToolboxRefreshEnabled = this.workspace.setToolboxRefreshEnabled.bind(
      this.workspace
    );
    this.workspace.setToolboxRefreshEnabled = () => {
      this.setToolboxRefreshEnabled(false);
    };
  }
  @action
  setBlocks(blocks) {
    console.log(blocks);
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
      ...props
    } = this.props;
    return (
      <div>
        <BlocksComponent
          componentRef={blocks => this.setBlocks(blocks)}
          height={
            this.props.width === "xs"
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
