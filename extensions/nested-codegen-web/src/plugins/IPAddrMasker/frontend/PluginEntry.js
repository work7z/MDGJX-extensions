const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  GFormSwitch,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  observer,
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
  GFormInput,
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

let appName = "IPv4 Masker";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: appName,
  viewName: appName,
};
let appTitle = metaObj.viewName;

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    initialState() {
      return {
        config_json_flatten_type: "flatten_deeply",
        config_text_sort_order: "asc",
        ...fn_otherPages.form.textHelperState(),
        myvalue: 12345,
      };
    },
    menus: fn_otherPages.menu.getObjForNetworkIP({
      label: metaObj.viewName,
      icon: "flow-branch",
      icon: "application",
      pid: "ROOT_EXTENSION_ADDONS",
    }),
    render: fn_otherPages.form.jsonHelperRender({
      left_lang: "plaintext",
      right_lang: "plaintext",
      no_left_panel_btm: true,
      apiName: "transform",
      metaObj,
      gref,
      btn_type: "ipv4",
      PreRequisiteJson,
      exampleStr: `
      127.0.0.1
      192.168.2.1
      192.168.2.2
      192.168.2.3
      10.1.1.3
      192.168.1.1
      `,
      fn_beforeActionBtn: ({ fn_formatSelfTranslate }) => {
        return [
          {
            onClick: fn_formatSelfTranslate("ipv4"),
            label: t(`Mask for Ipv4`),
            intent: "primary",
          },
          {
            onClick: fn_formatSelfTranslate("long"),
            label: t(`Mask for Long`),
            intent: "primary",
          },
        ];
      },
      fn_configItem: ({ crtStoreName, PUtils }) => {
        return [
          // {
          //   label: t("Flatten Type"),
          //   children: [
          //     {
          //       tag: Html_select,
          //       value:
          //         gstore.common_app[crtStoreName].model
          //           .config_json_flatten_type,
          //       list: [
          //         {
          //           label: t(`Flatten Shadowly`),
          //           value: "flatten_shadowly",
          //         },
          //         {
          //           label: t(`Flatten Deeply`),
          //           value: "flatten_deeply",
          //         },
          //       ],
          //       onChange: (x) => {
          //         gstore.common_app[
          //           crtStoreName
          //         ].model.config_json_flatten_type = x.target.value;
          //       },
          //     },
          //   ],
          // },
        ];
      },
      default_select_tab: "scripts",
    }),
  };
};
