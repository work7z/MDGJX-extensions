const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  GFormSwitch,
  ProgressBar,
  Dialog,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  observer,
  GFormInput,
  Position,
  Toaster,
  Checkbox,
  ContextMenu,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Tree,
  Icon,
  Card,
  Elevation,
  Button,
  PanelStack2,
  Spinner,
  Callout,
  PanelStack,
  gstore,
  AnchorButton,
  Tooltip,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  Menu,
  MenuItem,
  MenuDivider,
  BluePrintTable,
  autorun,
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
  BluePrintDocs,
  BluePrintCpt,
  observable,
  gutils,
  ReactDOM,
  
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
  useAsObservableSource,
  useLocalStore,
  useObserver,
  Provider,
  Router,
  inject,
  Html_select,
  BeautifyCodeCommon,
  prettier,
  xmlutils,
  createHistory,
  withRouter,
  Switch,
  Route,
  Link,
  useHistory,
} = window.CodeGenDefinition;
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import PreRequisiteJson from "../pre-requisite.json";
import qrcode_kit from "./kit";

let appTitle = "QRCode Encoder";
let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appTitle,
  viewName: appTitle,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        ...qrcode_kit.render_state(),
      };
    },
    menus: [
      {
        pid: "color",
        children: [
          {
            ...fn_otherPages.get_qrcode_list(),
            children: [
              {
                label: metaObj.appName,
                icon: "application",
                pid: "ROOT_EXTENSION_ADDONS",
              },
            ],
          },
        ],
      },
    ],
    render: qrcode_kit.render({
      apiName: "encode",
      metaObj,
      gref,
      btn_type: "encode",
      PreRequisiteJson,
      exampleStr: fn_otherPages.form.websiteExampleStr,
    }),
  };
};
