var dist = {};
var UIElement = {};
var hasRequiredUIElement;
function requireUIElement() {
  if (hasRequiredUIElement) return UIElement;
  hasRequiredUIElement = 1;
  Object.defineProperty(UIElement, "__esModule", { value: true });
  UIElement.UIElement = void 0;
  var UIElement$1 = (
    /** @class */
    function() {
      function UIElement2() {
      }
      UIElement2.prototype.onDestroy = function() {
      };
      UIElement2.prototype.getValue = function() {
      };
      UIElement2.prototype.setValue = function(value) {
      };
      UIElement2.prototype.onAttributeUpdated = function(name, value) {
      };
      return UIElement2;
    }()
  );
  UIElement.UIElement = UIElement$1;
  return UIElement;
}
var UIControl = {};
var hasRequiredUIControl;
function requireUIControl() {
  if (hasRequiredUIControl) return UIControl;
  hasRequiredUIControl = 1;
  Object.defineProperty(UIControl, "__esModule", { value: true });
  UIControl.UIControl = void 0;
  var UIControl$1 = (
    /** @class */
    function() {
      function UIControl2() {
      }
      UIControl2.prototype.onRender = function() {
      };
      UIControl2.prototype.onDestroy = function() {
      };
      return UIControl2;
    }()
  );
  UIControl.UIControl = UIControl$1;
  return UIControl;
}
var SettingsPanelRegistry = {};
var hasRequiredSettingsPanelRegistry;
function requireSettingsPanelRegistry() {
  if (hasRequiredSettingsPanelRegistry) return SettingsPanelRegistry;
  hasRequiredSettingsPanelRegistry = 1;
  Object.defineProperty(SettingsPanelRegistry, "__esModule", { value: true });
  SettingsPanelRegistry.SettingsPanelRegistry = void 0;
  var SettingsPanelRegistry$1 = (
    /** @class */
    /* @__PURE__ */ function() {
      function SettingsPanelRegistry2() {
      }
      return SettingsPanelRegistry2;
    }()
  );
  SettingsPanelRegistry.SettingsPanelRegistry = SettingsPanelRegistry$1;
  return SettingsPanelRegistry;
}
var ContextAction = {};
var hasRequiredContextAction;
function requireContextAction() {
  if (hasRequiredContextAction) return ContextAction;
  hasRequiredContextAction = 1;
  Object.defineProperty(ContextAction, "__esModule", { value: true });
  ContextAction.ContextAction = void 0;
  var ContextAction$1 = (
    /** @class */
    /* @__PURE__ */ function() {
      function ContextAction2() {
      }
      return ContextAction2;
    }()
  );
  ContextAction.ContextAction = ContextAction$1;
  return ContextAction;
}
var BlockRenderer = {};
var hasRequiredBlockRenderer;
function requireBlockRenderer() {
  if (hasRequiredBlockRenderer) return BlockRenderer;
  hasRequiredBlockRenderer = 1;
  Object.defineProperty(BlockRenderer, "__esModule", { value: true });
  BlockRenderer.BlockRenderer = void 0;
  var BlockRenderer$1 = (
    /** @class */
    /* @__PURE__ */ function() {
      function BlockRenderer2() {
      }
      return BlockRenderer2;
    }()
  );
  BlockRenderer.BlockRenderer = BlockRenderer$1;
  return BlockRenderer;
}
var Block = {};
var BlockType = {};
var hasRequiredBlockType;
function requireBlockType() {
  if (hasRequiredBlockType) return BlockType;
  hasRequiredBlockType = 1;
  Object.defineProperty(BlockType, "__esModule", { value: true });
  BlockType.BlockType = void 0;
  var BlockType$1;
  (function(BlockType2) {
    BlockType2["BLOCK"] = "BLOCK";
    BlockType2["STRUCTURE"] = "STRUCTURE";
  })(BlockType$1 || (BlockType.BlockType = BlockType$1 = {}));
  return BlockType;
}
var hasRequiredBlock;
function requireBlock() {
  if (hasRequiredBlock) return Block;
  hasRequiredBlock = 1;
  Object.defineProperty(Block, "__esModule", { value: true });
  Block.Block = void 0;
  var BlockType_1 = requireBlockType();
  var Block$1 = (
    /** @class */
    function() {
      function Block2() {
      }
      Block2.prototype.isEnabled = function() {
        return true;
      };
      Block2.prototype.canBeSavedAsModule = function() {
        return false;
      };
      Block2.prototype.getContextActionsIds = function() {
        return void 0;
      };
      Block2.prototype.getCustomRenderer = function() {
        return void 0;
      };
      Block2.prototype.getUniqueBlockClassname = function() {
        return "esd-".concat(this.getId());
      };
      Block2.prototype.onDocumentInit = function() {
        return void 0;
      };
      Block2.prototype.onSelect = function(node) {
        return void 0;
      };
      Block2.prototype.onCopy = function(targetNode, sourceNode) {
        return void 0;
      };
      Block2.prototype.onDelete = function(node) {
        return void 0;
      };
      Block2.prototype.onCreated = function(node) {
      };
      Block2.prototype.onDocumentChanged = function() {
      };
      Block2.prototype.getBlockType = function() {
        return BlockType_1.BlockType.BLOCK;
      };
      Block2.prototype.shouldDisplayQuickAddIcon = function() {
        return false;
      };
      return Block2;
    }()
  );
  Block.Block = Block$1;
  return Block;
}
var ExtensionBuilder = {};
var Extension = {};
var hasRequiredExtension;
function requireExtension() {
  if (hasRequiredExtension) return Extension;
  hasRequiredExtension = 1;
  Object.defineProperty(Extension, "__esModule", { value: true });
  Extension.Extension = void 0;
  var Extension$1 = (
    /** @class */
    function() {
      function Extension2(i18n, styles2, uiElements, uiElementTagRegistry, controls, settingsPanelRegistry, contextActions, blocks, externalSmartElementsLibrary) {
        if (uiElements === void 0) {
          uiElements = [];
        }
        if (controls === void 0) {
          controls = [];
        }
        if (contextActions === void 0) {
          contextActions = [];
        }
        if (blocks === void 0) {
          blocks = [];
        }
        this.uiElements = [];
        this.controls = [];
        this.contextActions = [];
        this.blocks = [];
        this.i18n = i18n;
        this.styles = styles2;
        this.uiElements = uiElements;
        this.uiElementTagRegistry = uiElementTagRegistry;
        this.controls = controls;
        this.settingsPanelRegistry = settingsPanelRegistry;
        this.contextActions = contextActions;
        this.blocks = blocks;
        this.externalSmartElementsLibrary = externalSmartElementsLibrary;
        this.id = Math.random().toString(36).substring(2);
      }
      Extension2.prototype.getI18n = function() {
        return this.i18n;
      };
      Extension2.prototype.getStyles = function() {
        return this.styles;
      };
      Extension2.prototype.getUiElements = function() {
        return this.uiElements;
      };
      Extension2.prototype.getUiElementTagRegistry = function() {
        return this.uiElementTagRegistry;
      };
      Extension2.prototype.getControls = function() {
        return this.controls;
      };
      Extension2.prototype.getSettingsPanelRegistry = function() {
        return this.settingsPanelRegistry;
      };
      Extension2.prototype.getContextActions = function() {
        return this.contextActions;
      };
      Extension2.prototype.getBlocks = function() {
        return this.blocks;
      };
      Extension2.prototype.getId = function() {
        return this.id;
      };
      Extension2.prototype.getExternalSmartElementsLibrary = function() {
        return this.externalSmartElementsLibrary;
      };
      return Extension2;
    }()
  );
  Extension.Extension = Extension$1;
  return Extension;
}
var hasRequiredExtensionBuilder;
function requireExtensionBuilder() {
  if (hasRequiredExtensionBuilder) return ExtensionBuilder;
  hasRequiredExtensionBuilder = 1;
  Object.defineProperty(ExtensionBuilder, "__esModule", { value: true });
  ExtensionBuilder.ExtensionBuilder = void 0;
  var Extension_1 = requireExtension();
  var ExtensionBuilder$1 = (
    /** @class */
    function() {
      function ExtensionBuilder2() {
        this.uiElements = [];
        this.controls = [];
        this.contextActions = [];
        this.blocks = [];
      }
      ExtensionBuilder2.prototype.withLocalization = function(i18n) {
        this.i18n = i18n;
        return this;
      };
      ExtensionBuilder2.prototype.withStyles = function(styles2) {
        this.styles = styles2;
        return this;
      };
      ExtensionBuilder2.prototype.addContextAction = function(contextAction) {
        this.contextActions.push(contextAction);
        return this;
      };
      ExtensionBuilder2.prototype.addUiElement = function(uiElement) {
        this.uiElements.push(uiElement);
        return this;
      };
      ExtensionBuilder2.prototype.withUiElementTagRegistry = function(uiElementTagRegistry) {
        this.uiElementTagRegistry = uiElementTagRegistry;
        return this;
      };
      ExtensionBuilder2.prototype.addControl = function(control) {
        this.controls.push(control);
        return this;
      };
      ExtensionBuilder2.prototype.withSettingsPanelRegistry = function(settingsPanelRegistry) {
        this.settingsPanelRegistry = settingsPanelRegistry;
        return this;
      };
      ExtensionBuilder2.prototype.withExternalSmartElementsLibrary = function(externalSmartElementsLibrary) {
        this.externalSmartElementsLibrary = externalSmartElementsLibrary;
        return this;
      };
      ExtensionBuilder2.prototype.addBlock = function(block) {
        this.blocks.push(block);
        return this;
      };
      ExtensionBuilder2.prototype.build = function() {
        return new Extension_1.Extension(this.i18n, this.styles, this.uiElements, this.uiElementTagRegistry, this.controls, this.settingsPanelRegistry, this.contextActions, this.blocks, this.externalSmartElementsLibrary);
      };
      return ExtensionBuilder2;
    }()
  );
  ExtensionBuilder.ExtensionBuilder = ExtensionBuilder$1;
  return ExtensionBuilder;
}
var UIElementTagRegistry = {};
var hasRequiredUIElementTagRegistry;
function requireUIElementTagRegistry() {
  if (hasRequiredUIElementTagRegistry) return UIElementTagRegistry;
  hasRequiredUIElementTagRegistry = 1;
  Object.defineProperty(UIElementTagRegistry, "__esModule", { value: true });
  UIElementTagRegistry.UIElementTagRegistry = void 0;
  var UIElementTagRegistry$1 = (
    /** @class */
    /* @__PURE__ */ function() {
      function UIElementTagRegistry2() {
      }
      return UIElementTagRegistry2;
    }()
  );
  UIElementTagRegistry.UIElementTagRegistry = UIElementTagRegistry$1;
  return UIElementTagRegistry;
}
var ModificationDescription = {};
var hasRequiredModificationDescription;
function requireModificationDescription() {
  if (hasRequiredModificationDescription) return ModificationDescription;
  hasRequiredModificationDescription = 1;
  Object.defineProperty(ModificationDescription, "__esModule", { value: true });
  ModificationDescription.ModificationDescription = void 0;
  var ModificationDescription$1 = (
    /** @class */
    function() {
      function ModificationDescription2(key) {
        this.key = key;
      }
      ModificationDescription2.prototype.withParams = function(params) {
        this.params = params;
        return this;
      };
      ModificationDescription2.prototype.getValue = function() {
        return {
          key: this.key,
          params: this.params
        };
      };
      return ModificationDescription2;
    }()
  );
  ModificationDescription.ModificationDescription = ModificationDescription$1;
  return ModificationDescription;
}
var SettingsPanelTab = {};
var hasRequiredSettingsPanelTab;
function requireSettingsPanelTab() {
  if (hasRequiredSettingsPanelTab) return SettingsPanelTab;
  hasRequiredSettingsPanelTab = 1;
  Object.defineProperty(SettingsPanelTab, "__esModule", { value: true });
  SettingsPanelTab.SettingsPanelTab = void 0;
  var SettingsPanelTab$1 = (
    /** @class */
    function() {
      function SettingsPanelTab2(tabId, controlsIds) {
        this.tabId = tabId;
        this.controlsIds = controlsIds;
      }
      SettingsPanelTab2.prototype.getTabId = function() {
        return this.tabId;
      };
      SettingsPanelTab2.prototype.getLabel = function() {
        return this.label;
      };
      SettingsPanelTab2.prototype.getControlsIds = function() {
        return this.controlsIds;
      };
      SettingsPanelTab2.prototype.withLabel = function(label) {
        this.label = label;
        return this;
      };
      SettingsPanelTab2.prototype.addControl = function(controlId, position) {
        if (position < 0) {
          this.controlsIds.unshift(controlId);
        } else if (position > this.controlsIds.length) {
          this.controlsIds.push(controlId);
        } else {
          this.controlsIds.splice(position, 0, controlId);
        }
        return this;
      };
      SettingsPanelTab2.prototype.deleteControl = function(controlId) {
        var index = this.controlsIds.indexOf(controlId);
        if (index !== -1) {
          this.controlsIds.splice(index, 1);
        }
      };
      return SettingsPanelTab2;
    }()
  );
  SettingsPanelTab.SettingsPanelTab = SettingsPanelTab$1;
  return SettingsPanelTab;
}
var UETag = {};
var hasRequiredUETag;
function requireUETag() {
  if (hasRequiredUETag) return UETag;
  hasRequiredUETag = 1;
  Object.defineProperty(UETag, "__esModule", { value: true });
  UETag.UETag = void 0;
  var UETag$1;
  (function(UETag2) {
    UETag2["BUTTON"] = "UE-BUTTON";
    UETag2["CHECKBOX"] = "UE-CHECKBOX";
    UETag2["CHECK_BUTTONS"] = "UE-CHECK-BUTTONS";
    UETag2["COLOR"] = "UE-COLOR";
    UETag2["COUNTER"] = "UE-COUNTER";
    UETag2["DATEPICKER"] = "UE-DATEPICKER";
    UETag2["LABEL"] = "UE-LABEL";
    UETag2["MESSAGE"] = "UE-MESSAGE";
    UETag2["RADIO_BUTTONS"] = "UE-RADIO-BUTTONS";
    UETag2["SELECTPICKER"] = "UE-SELECT";
    UETag2["SWITCHER"] = "UE-SWITCHER";
    UETag2["TEXT"] = "UE-TEXT";
    UETag2["TEXTAREA"] = "UE-TEXTAREA";
    UETag2["CHECK_ITEM"] = "UE-CHECK-ITEM";
    UETag2["RADIO_ITEM"] = "UE-RADIO-ITEM";
    UETag2["SELECT_ITEM"] = "UE-SELECT-ITEM";
  })(UETag$1 || (UETag.UETag = UETag$1 = {}));
  return UETag;
}
var UEControls = {};
var UEBlock = {};
var hasRequiredUEBlock;
function requireUEBlock() {
  if (hasRequiredUEBlock) return UEBlock;
  hasRequiredUEBlock = 1;
  Object.defineProperty(UEBlock, "__esModule", { value: true });
  UEBlock.UEBlock = void 0;
  var UEBlock$1;
  (function(UEBlock2) {
    UEBlock2["BLOCK_IMAGE"] = "BLOCK_IMAGE";
    UEBlock2["BLOCK_TEXT"] = "BLOCK_TEXT";
    UEBlock2["BLOCK_BUTTON"] = "BLOCK_BUTTON";
    UEBlock2["BLOCK_SPACER"] = "BLOCK_SPACER";
    UEBlock2["BLOCK_VIDEO"] = "BLOCK_VIDEO";
    UEBlock2["BLOCK_SOCIAL"] = "BLOCK_SOCIAL";
    UEBlock2["BLOCK_BANNER"] = "BLOCK_BANNER";
    UEBlock2["BLOCK_TIMER"] = "BLOCK_TIMER";
    UEBlock2["BLOCK_MENU"] = "BLOCK_MENU";
    UEBlock2["BLOCK_MENU_ITEM"] = "BLOCK_MENU_ITEM";
    UEBlock2["BLOCK_HTML"] = "BLOCK_HTML";
    UEBlock2["BLOCK_AMP_CAROUSEL"] = "BLOCK_AMP_CAROUSEL";
    UEBlock2["BLOCK_AMP_ACCORDION"] = "BLOCK_AMP_ACCORDION";
    UEBlock2["BLOCK_AMP_FORM"] = "BLOCK_AMP_FORM";
    UEBlock2["CONTAINER"] = "CONTAINER";
    UEBlock2["FORM_CONTAINER"] = "FORM_CONTAINER";
    UEBlock2["STRUCTURE"] = "STRUCTURE";
    UEBlock2["STRIPE"] = "STRIPE";
    UEBlock2["EMPTY_CONTAINER"] = "EMPTY_CONTAINER";
    UEBlock2["CUSTOM_BLOCK_LINK"] = "CUSTOM_BLOCK_LINK";
    UEBlock2["CUSTOM_BLOCK_IMAGE"] = "CUSTOM_BLOCK_IMAGE";
    UEBlock2["CUSTOM_BLOCK_TEXT"] = "CUSTOM_BLOCK_TEXT";
  })(UEBlock$1 || (UEBlock.UEBlock = UEBlock$1 = {}));
  return UEBlock;
}
var hasRequiredUEControls;
function requireUEControls() {
  if (hasRequiredUEControls) return UEControls;
  hasRequiredUEControls = 1;
  var _a;
  Object.defineProperty(UEControls, "__esModule", { value: true });
  UEControls.UEControls = UEControls.GeneralStylesControls = UEControls.MessageSettingsControls = UEControls.ContainerControls = UEControls.StructureControls = UEControls.StripeControls = UEControls.CarouselControls = UEControls.AccordionControls = UEControls.MenuControls = UEControls.SocialControls = UEControls.CustomTextControls = UEControls.CustomImageControls = UEControls.CustomLinkControls = UEControls.HTMLControls = UEControls.ImageControls = UEControls.SpacerControls = UEControls.TimerControls = UEControls.VideoControls = UEControls.TextControls = UEControls.ButtonControls = UEControls.BannerChildControls = UEControls.BannerControls = UEControls.GeneralControls = void 0;
  var UEBlock_1 = requireUEBlock();
  var GeneralControls;
  (function(GeneralControls2) {
    GeneralControls2["ANCHOR_LINK_CONTAINER"] = "anchorLinkFormContainer";
    GeneralControls2["APPLY_CONDITION"] = "applyCondition";
    GeneralControls2["APPLY_CONDITION_SWITCHER"] = "applyConditionSwitcher";
    GeneralControls2["BACKGROUND_COLOR"] = "backgroundColor";
    GeneralControls2["FIXED_HEIGHT_SWITCHER"] = "fixedHeightSwitcherForm";
    GeneralControls2["HIDDEN_NODE"] = "hiddenNode";
    GeneralControls2["SMART_BLOCK"] = "smartBlock";
    GeneralControls2["SYNCHRONIZED_MODULE"] = "synchronizedModuleForm";
  })(GeneralControls || (UEControls.GeneralControls = GeneralControls = {}));
  var BannerControls;
  (function(BannerControls2) {
    BannerControls2["ALIGNMENT"] = "bannerAlignment";
    BannerControls2["ALT_TEXT"] = "bannerAltText";
    BannerControls2["ANCHOR_LINK_CONTAINER"] = "bannerAnchorLinkContainerForm";
    BannerControls2["ASPECT_RATIO"] = "bannerAspectRatioForm";
    BannerControls2["BACKGROUND_COLOR"] = "bannerBackgroundColor";
    BannerControls2["BACKGROUND_IMAGE_CONTAINER"] = "bannerBackgroundImageContainer";
    BannerControls2["SIZE"] = "bannerBlockBannerSize";
    BannerControls2["BLOCK_LINK"] = "bannerBlockLink";
    BannerControls2["CHILD_ROTATION"] = "bannerChildRotationForm";
    BannerControls2["CROP"] = "bannerCropForm";
    BannerControls2["FILTER"] = "bannerFilter";
    BannerControls2["MARGIN"] = "bannerMarginForm";
    BannerControls2["MIME_TYPE"] = "bannerMimeTypeForm";
    BannerControls2["RESPONSIVE_IMAGE"] = "bannerResponsiveImageForm";
  })(BannerControls || (UEControls.BannerControls = BannerControls = {}));
  var BannerChildControls;
  (function(BannerChildControls2) {
    BannerChildControls2["ADDITIONAL_IMAGE"] = "bannerAdditionalImageForm";
    BannerChildControls2["ADDITIONAL_IMAGE_ASPECT_RATIO"] = "bannerAdditionalImageAspectRatioForm";
    BannerChildControls2["CHILD_COLOR"] = "bannerChildColorForm";
    BannerChildControls2["CHILD_FLIP"] = "bannerChildFlipForm";
    BannerChildControls2["CHILD_OPACITY"] = "bannerChildOpacityForm";
    BannerChildControls2["TEXT_ALIGNMENT"] = "bannerTextAlignmentForm";
    BannerChildControls2["TEXT_FONT"] = "bannerTextFontContainer";
    BannerChildControls2["TEXT_LETTER_CASE"] = "bannerTextLetterCaseForm";
    BannerChildControls2["TEXT_STYLE"] = "bannerTextStyleForm";
  })(BannerChildControls || (UEControls.BannerChildControls = BannerChildControls = {}));
  var ButtonControls;
  (function(ButtonControls2) {
    ButtonControls2["ADJUST_TO_WIDTH"] = "adjustToWidth";
    ButtonControls2["ALIGNMENT"] = "buttonAlignment";
    ButtonControls2["BORDER"] = "buttonBorder";
    ButtonControls2["BORDER_RADIUS"] = "buttonBorderRadius";
    ButtonControls2["COLOR"] = "buttonColor";
    ButtonControls2["EXTERNAL_INDENT"] = "buttonExternalIndent";
    ButtonControls2["FIXED_HEIGHT_CONTAINER"] = "buttonFixedHeightContainerForm";
    ButtonControls2["FONT_FAMILY"] = "buttonFontFamily";
    ButtonControls2["FONT_SIZE"] = "buttonFontSize";
    ButtonControls2["ICON"] = "buttonIconContainer";
    ButtonControls2["ICON_ALIGN"] = "buttonIconAlign";
    ButtonControls2["ICON_INDENT"] = "buttonIconIndent";
    ButtonControls2["ICON_WIDTH"] = "buttonIconWidth";
    ButtonControls2["IMAGE"] = "buttonImageForm";
    ButtonControls2["INTERNAL_INDENT"] = "buttonInternalIndent";
    ButtonControls2["LINK"] = "buttonLink";
    ButtonControls2["MIME_TYPE"] = "buttonMimeTypeForm";
    ButtonControls2["SWITCHER_HOVERED_STYLES"] = "buttonSwitcherHoveredStylesForm";
    ButtonControls2["TEXT"] = "buttonText";
    ButtonControls2["TEXT_STYLE_AND_COLOR"] = "buttonTextStyleAndColorForm";
    ButtonControls2["HOVERED_BORDER_COLOR"] = "hoveredStyleBorderButtonForm";
    ButtonControls2["HOVERED_COLOR"] = "hoveredButtonColorForm";
    ButtonControls2["HOVERED_TEXT_COLOR"] = "hoveredButtonTextColorForm";
  })(ButtonControls || (UEControls.ButtonControls = ButtonControls = {}));
  var TextControls;
  (function(TextControls2) {
    TextControls2["HIDDEN_NODE"] = "hiddenNodeText";
    TextControls2["PARAGRAPH_STYLE"] = "paragraphStyleForm";
    TextControls2["ALIGN"] = "textAlignmentForm";
    TextControls2["ANCHOR_CONTAINER"] = "textAnchorForm";
    TextControls2["FONT_BACKGROUND_COLOR"] = "textBlockFontBackgroundColor";
    TextControls2["FONT_COLOR"] = "textBlockFontColor";
    TextControls2["FONT_FAMILY"] = "textBlockFontFamily";
    TextControls2["FONT_SIZE"] = "textBlockFontSize";
    TextControls2["DIRECTION"] = "textBlockDirectionForm";
    TextControls2["INSERT_FORM"] = "textBlockInsertForm";
    TextControls2["LINK_DATA"] = "textBlockLinkDataForm";
    TextControls2["FORMAT"] = "textBlockTextFormatForm";
    TextControls2["FIXED_HEIGHT_CONTAINER"] = "textFixedHeightContainerForm";
    TextControls2["INTERNAL_INDENTS"] = "textInternalIndents";
    TextControls2["LINE_HEIGHT"] = "textLineHeightForm";
    TextControls2["LINKS_COLOR"] = "textLinksFontColorForm";
    TextControls2["MIME_TYPE"] = "textMimeTypeForm";
    TextControls2["NO_LINE_WRAPS"] = "textNoLineWrapsForm";
  })(TextControls || (UEControls.TextControls = TextControls = {}));
  var VideoControls;
  (function(VideoControls2) {
    VideoControls2["CUSTOM_THUMBNAIL_CONTAINER"] = "customThumbnailContainerForm";
    VideoControls2["METADATA_LINK"] = "metadataLink";
    VideoControls2["PLAY_BUTTON"] = "playButton";
    VideoControls2["ALIGNMENT"] = "videoAlignment";
    VideoControls2["ALT_TEXT"] = "videoAltText";
    VideoControls2["EXTERNAL_INDENTS"] = "videoExternalIndents";
    VideoControls2["MIME_TYPE"] = "videoMimeTypeForm";
    VideoControls2["RESPONSIVE"] = "videoResponsive";
    VideoControls2["SIZE"] = "videoSizeContainer";
  })(VideoControls || (UEControls.VideoControls = VideoControls = {}));
  var TimerControls;
  (function(TimerControls2) {
    TimerControls2["ALIGNMENT"] = "timerAlignment";
    TimerControls2["ALT_TEXT"] = "timerAltText";
    TimerControls2["BACKGROUND_COLOR"] = "timerBackgroundColor";
    TimerControls2["DATE_TIME"] = "timeDateTime";
    TimerControls2["DIGITAL_LABELS"] = "timerDigitalLabels";
    TimerControls2["DIGITS_FONT_COLOR_CONTAINER"] = "timerDigitsFontColorContainer";
    TimerControls2["DIGITS_FONT_CONTAINER"] = "timerDigitsFontContainer";
    TimerControls2["DISPLAY_DAYS_SWITCHER"] = "timerDisplayDaysSwitcher";
    TimerControls2["EXPIRATION_IMAGE"] = "timerExpirationImage";
    TimerControls2["EXPIRATION_IMAGE_SWITCHER"] = "timerExpirationSwitcher";
    TimerControls2["EXTERNAL_INDENT"] = "timerExternalIndex";
    TimerControls2["LABELS_CASE"] = "timerLabelsCase";
    TimerControls2["LABELS_FONT_COLOR_CONTAINER"] = "timerLabelsFontColorContainer";
    TimerControls2["LABELS_FONT_CONTAINER"] = "timerLabelsFontContainer";
    TimerControls2["LABEL_LANGUAGE"] = "timerLabelsLanguage";
    TimerControls2["LINK"] = "timerLink";
    TimerControls2["MIME_TYPE"] = "timerMimeTypeForm";
    TimerControls2["RESPONSIVE"] = "timerResponsive";
    TimerControls2["RETINA_DISPLAY_SUPPORT"] = "timerRetinaDisplaySupport";
    TimerControls2["SEPARATOR"] = "timerSeparator";
    TimerControls2["SEPARATOR_FONT_COLOR"] = "timerSeparatorFontColor";
    TimerControls2["SEPARATOR_FONT_CONTAINER"] = "timerSeparatorFontContainer";
    TimerControls2["SIZE"] = "timerSize";
    TimerControls2["TIME_ZONE"] = "timerTimeZone";
  })(TimerControls || (UEControls.TimerControls = TimerControls = {}));
  var SpacerControls;
  (function(SpacerControls2) {
    SpacerControls2["ALIGNMENT"] = "spacerAlignment";
    SpacerControls2["BORDER"] = "spacerBorder";
    SpacerControls2["EXTERNAL_INDENT"] = "spacerExternalIndent";
    SpacerControls2["MIME_TYPE"] = "spacerMimeTypeForm";
    SpacerControls2["MODE"] = "spacerMode";
    SpacerControls2["SIZE"] = "spacerSize";
  })(SpacerControls || (UEControls.SpacerControls = SpacerControls = {}));
  var ImageControls;
  (function(ImageControls2) {
    ImageControls2["ALT_TEXT"] = "altText";
    ImageControls2["LINK"] = "blockLink";
    ImageControls2["ALIGNMENT"] = "imageAlignment";
    ImageControls2["ANCHOR_LINK_CONTAINER"] = "imageAnchorLinkContainerForm";
    ImageControls2["BORDER_RADIUS"] = "imageBorderRadiusForm";
    ImageControls2["IMAGE"] = "imageImageForm";
    ImageControls2["MARGIN"] = "imageMargin";
    ImageControls2["MIME_TYPE"] = "imageMimeTypeForm";
    ImageControls2["RESPONSIVE"] = "imageResponsive";
    ImageControls2["ROLLOVER_IMAGE"] = "imageRolloverImageForm";
    ImageControls2["ROLLOVER_SWITCHER"] = "imageRolloverSwitcherForm";
    ImageControls2["SIZE"] = "imageSizeContainer";
  })(ImageControls || (UEControls.ImageControls = ImageControls = {}));
  var HTMLControls;
  (function(HTMLControls2) {
    HTMLControls2["EXTERNAL_INDENT"] = "htmlExternalIndent";
    HTMLControls2["MIME_TYPE"] = "htmlMimeTypeForm";
  })(HTMLControls || (UEControls.HTMLControls = HTMLControls = {}));
  var CustomLinkControls;
  (function(CustomLinkControls2) {
    CustomLinkControls2["IMAGE"] = "customBlockImageForm";
    CustomLinkControls2["COLOR_FORM"] = "customLinkColorForm";
    CustomLinkControls2["HREF_FORM"] = "customLinkHrefForm";
    CustomLinkControls2["TEXT_FORM"] = "customLinkTextForm";
    CustomLinkControls2["UNDERLINE_FORM"] = "customLinkUnderlineForm";
    CustomLinkControls2["WORD_BREAK_FORM"] = "customLinkWordBreakForm";
  })(CustomLinkControls || (UEControls.CustomLinkControls = CustomLinkControls = {}));
  var CustomImageControls;
  (function(CustomImageControls2) {
    CustomImageControls2["ALT_TEXT_FORM"] = "customBlockImageAltTextForm";
    CustomImageControls2["WITHOUT_LINK_FORM"] = "customBlockImageWithOutLinkForm";
  })(CustomImageControls || (UEControls.CustomImageControls = CustomImageControls = {}));
  var CustomTextControls;
  (function(CustomTextControls2) {
    CustomTextControls2["ALIGN"] = "customTextBlockTextAlign";
    CustomTextControls2["FONT_SIZE"] = "customTextFontSizeController";
  })(CustomTextControls || (UEControls.CustomTextControls = CustomTextControls = {}));
  var SocialControls;
  (function(SocialControls2) {
    SocialControls2["ICON_SIZE"] = "iconSize";
    SocialControls2["EXTERNAL_INDENT"] = "socialExternalIndent";
    SocialControls2["ICON_SPACER"] = "socialIconsSpacer";
    SocialControls2["ICON_TYPE"] = "socialIconTypeForm";
    SocialControls2["ITEM"] = "socialItemForm";
    SocialControls2["ITEM_TEXT_CUSTOMIZATION"] = "socialItemTextCustomizationForm";
    SocialControls2["MIME_TYPE"] = "socialMimeTypeForm";
    SocialControls2["NETWORK_ALIGNMENT"] = "socialNetworkAlignment";
  })(SocialControls || (UEControls.SocialControls = SocialControls = {}));
  var MenuControls;
  (function(MenuControls2) {
    MenuControls2["EXTERNAL_INDENT"] = "externalIndent";
    MenuControls2["ALIGNMENT"] = "menuAlignment";
    MenuControls2["FIT_TO_CONTAINER"] = "menuFitToContainer";
    MenuControls2["FONT_FAMILY"] = "menuFontFamily";
    MenuControls2["FONT_SIZE"] = "menuFontSize";
    MenuControls2["HIDDEN"] = "menuHidden";
    MenuControls2["ICONS_CONFIGURATION"] = "menuIconsConfiguration";
    MenuControls2["ITEMS"] = "menuItemsForm";
    MenuControls2["ITEMS_COUNT"] = "menuItemsCount";
    MenuControls2["ITEM_INTERNAL_INDENTS"] = "menuItemInternalIndents";
    MenuControls2["MIME_TYPE"] = "menuMimeTypeForm";
    MenuControls2["SEPARATE_ITEMS"] = "menuSeparateItems";
    MenuControls2["SEPARATE_ITEMS_COLOR_SWITCHER"] = "menuSeparateItemsColorSwitcher";
    MenuControls2["SEPARATOR"] = "menuSeparatorForm";
    MenuControls2["STYLES"] = "menuStylesForm";
    MenuControls2["TEXT_STYLE_AND_COLOR"] = "menuTextStyleAndColor";
    MenuControls2["TYPE_CONTAINER"] = "menuTypeContainerForm";
  })(MenuControls || (UEControls.MenuControls = MenuControls = {}));
  var AccordionControls;
  (function(AccordionControls2) {
    AccordionControls2["MIME_TYPE"] = "ampAccordionMimeTypeForm";
    AccordionControls2["ANIMATED_OPENING"] = "ampAccordionAnimatedOpeningForm";
    AccordionControls2["AUTO_COLLAPSING"] = "ampAccordionAutoCollapsingForm";
    AccordionControls2["BORDER_FORM"] = "ampAccordionBorderForm";
    AccordionControls2["FONT_FAMILY"] = "ampAccordionFontFamily";
    AccordionControls2["ICON_SIZE"] = "ampAccordionIconSizeForm";
    AccordionControls2["SECTIONS_GAP_FORM"] = "ampAccordionSectionsGapForm";
    AccordionControls2["SECTIONS_MAIN_FORM"] = "ampAccordionSectionsMainForm";
    AccordionControls2["TITLES_BACKGROUND_COLOR"] = "ampAccordionTitlesBackgroundColor";
    AccordionControls2["TITLE_ALIGNMENT_FORM"] = "ampAccordionTitleAlignmentForm";
    AccordionControls2["TITLE_FONT_SIZE"] = "AmpAccordionTitleFontSizeController";
    AccordionControls2["TITLE_ICON_IMAGE"] = "ampAccordionTitleIconImageForm";
    AccordionControls2["TITLE_ICON_SWITCHER"] = "ampAccordionTitleIconSwitcherForm";
    AccordionControls2["TITLE_TEXT_STYLE_AND_COLOR"] = "AmpAccordionTitleTextStyleAndColorController";
  })(AccordionControls || (UEControls.AccordionControls = AccordionControls = {}));
  var CarouselControls;
  (function(CarouselControls2) {
    CarouselControls2["MIME_TYPE"] = "ampCarouselMimeTypeForm";
    CarouselControls2["AUTOPLAY"] = "ampCarouselAutoplayForm";
    CarouselControls2["AUTOPLAY_DELAY"] = "ampCarouselDelayForm";
    CarouselControls2["LOOP"] = "ampCarouselLoopForm";
    CarouselControls2["SLIDES"] = "ampSlidesForm";
    CarouselControls2["SLIDE_ALT_TEXT"] = "ampSlideAltTextForm";
    CarouselControls2["SLIDE_IMAGE"] = "ampSlideImageForm";
    CarouselControls2["SLIDE_IMAGE_FIT"] = "ampCarouselSlideImageFitForm";
    CarouselControls2["SLIDE_LINK"] = "ampSlideLinkForm";
    CarouselControls2["SLIDE_RADIUS"] = "ampCarouselSlideRadiusForm";
    CarouselControls2["SLIDE_THUMBNAIL_SWITCHER"] = "ampCarouselSlideThumbnailSwitcherForm";
    CarouselControls2["THUMBNAIL_BORDER_STYLE"] = "ampCarouselThumbnailBorderStyleForm";
    CarouselControls2["THUMBNAIL_CONTAINER"] = "ampCarouselThumbnailContainerForm";
    CarouselControls2["THUMBNAIL_CUSTOM_REVIEW"] = "ampCarouselThumbnailCustomPreviewImageForm";
    CarouselControls2["THUMBNAIL_RADIUS"] = "ampCarouselThumbnailRadiusForm";
    CarouselControls2["AMP_GENERAL_LINK"] = "AMP_GENERAL_LINK_CONTROLLER";
    CarouselControls2["AMP_GENERAL_LINK_SWITCHER"] = "AMP_GENERAL_LINK_SWITCHER";
  })(CarouselControls || (UEControls.CarouselControls = CarouselControls = {}));
  var StripeControls;
  (function(StripeControls2) {
    StripeControls2["BORDER_FORM"] = "stripeBorderForm";
    StripeControls2["COLOR"] = "stripeColorForm";
    StripeControls2["CONTENT_COLOR"] = "stripeContentColor";
    StripeControls2["IMAGE_CONTAINER"] = "stripeImageContainerForm";
    StripeControls2["INTERNAL_INDENTS"] = "stripeInternalIndents";
    StripeControls2["MESSAGE_AREA"] = "stripeMessageAreaForm";
    StripeControls2["MIME_TYPE"] = "stripeMimeTypeForm";
  })(StripeControls || (UEControls.StripeControls = StripeControls = {}));
  var StructureControls;
  (function(StructureControls2) {
    StructureControls2["RESPONSIVE_STRUCTURE"] = "responsiveStructure";
    StructureControls2["BG_COLOR"] = "structureBgColorForm";
    StructureControls2["BORDER_RADIUS"] = "structureBorderRadiusForm";
    StructureControls2["CONTAINER_GAP"] = "structureContainerGap";
    StructureControls2["CONTAINER_INVERSION"] = "structureContainerInversion";
    StructureControls2["DYNAMIC_CONTAINERS"] = "structureDynamicContainers";
    StructureControls2["EXTERNAL_INDENTS"] = "structureExternalIndents";
    StructureControls2["IMAGE_CONTAINER"] = "structureImageContainerForm";
    StructureControls2["INTERNAL_INDENTS"] = "structureInternalIndents";
    StructureControls2["ITEM"] = "structureItem";
    StructureControls2["MIME_TYPE"] = "structureMimeType";
  })(StructureControls || (UEControls.StructureControls = StructureControls = {}));
  var ContainerControls;
  (function(ContainerControls2) {
    ContainerControls2["BACKGROUND_COLOR"] = "containerBackgroundColorForm";
    ContainerControls2["BORDER_FORM"] = "containerBorderForm";
    ContainerControls2["BORDER_RADIUS"] = "containerBorderRadiusForm";
    ContainerControls2["EXTERNAL_INDENTS"] = "containerExternalIndentsForm";
    ContainerControls2["IMAGE_CONTAINER"] = "containerImageContainerForm";
    ContainerControls2["MIME_TYPE"] = "containerMimeTypeForm";
    ContainerControls2["DISPLAY_CONDITIONS"] = "displayConditions";
  })(ContainerControls || (UEControls.ContainerControls = ContainerControls = {}));
  var MessageSettingsControls;
  (function(MessageSettingsControls2) {
    MessageSettingsControls2["DISPLAY_OFFER_BADGE"] = "displayOfferBadgeForm";
    MessageSettingsControls2["DISPLAY_PROMO_CODE_BADGE"] = "displayPromoCodeBadgeForm";
    MessageSettingsControls2["END_DISCOUNT_OFFER"] = "endDiscountOfferForm";
    MessageSettingsControls2["GMAIL_PROMOTIONS_TAB"] = "gmailPromotionsTabForm";
    MessageSettingsControls2["HIDDEN_PRE_HEADER"] = "hiddenPreHeaderForm";
    MessageSettingsControls2["INCLUDE_PROMO_IMAGE"] = "includePromoImageForm";
    MessageSettingsControls2["INCLUDE_SENDER_LOGO"] = "includeSenderLogoForm";
    MessageSettingsControls2["SUBJECT_TITLE"] = "subjectTitleForm";
    MessageSettingsControls2["UTM_PARAMETERS"] = "utmParametersForm";
    MessageSettingsControls2["UTM_PARAMETERS_CAMPAIGN"] = "utmParameterCampaignForm";
    MessageSettingsControls2["UTM_PARAMETERS_CUSTOM"] = "utmParametersCustomForm";
    MessageSettingsControls2["UTM_PARAMETERS_CUSTOM_ITEM"] = "utmParametersCustomItemForm";
  })(MessageSettingsControls || (UEControls.MessageSettingsControls = MessageSettingsControls = {}));
  var GeneralStylesControls;
  (function(GeneralStylesControls2) {
    GeneralStylesControls2["BUTTONS_ADJUST_TO_WIDTH_CONTAINER"] = "buttonsAdjustToWidthFormContainer";
    GeneralStylesControls2["BUTTONS_BORDER"] = "buttonsBorder";
    GeneralStylesControls2["BUTTONS_BORDER_RADIUS_CONTAINER"] = "buttonsBorderRadiusContainer";
    GeneralStylesControls2["BUTTONS_COLOR_CONTAINER"] = "buttonsColorContainer";
    GeneralStylesControls2["BUTTONS_FONT_FAMILY_CONTAINER"] = "buttonsFontFamilyContainer";
    GeneralStylesControls2["BUTTONS_FONT_SIZE_CONTAINER"] = "buttonsFontSizeFormContainer";
    GeneralStylesControls2["BUTTONS_HOVERED_BUTTON_STYLE"] = "buttonsHoveredButtonStyleForm";
    GeneralStylesControls2["BUTTONS_INTERNAL_INDENTS_CONTAINER"] = "buttonsInternalIndentsContainer";
    GeneralStylesControls2["BUTTONS_LETTER_SPACING_CONTAINER"] = "buttonsLetterSpacingContainer";
    GeneralStylesControls2["BUTTONS_OUTLOOK_SUPPORT_CONTAINER"] = "buttonsOutlookSupportContainer";
    GeneralStylesControls2["BUTTONS_TEXT_STYLE_AND_COLOR_CONTAINER"] = "buttonsTextStyleAndColorFormContainer";
    GeneralStylesControls2["DEFAULT_STRUCTURE_INTERNAL_INDENTS"] = "defaultStructureInternalIndents";
    GeneralStylesControls2["GENERAL_BACKGROUND_COLOR_CONTAINER"] = "generalBackgroundColorContainer";
    GeneralStylesControls2["GENERAL_IMAGE_CONTAINER"] = "generalImageContainer";
    GeneralStylesControls2["HEADINGS_FONT_FAMILY_CONTAINER"] = "headingsFontFamilyContainer";
    GeneralStylesControls2["HEADINGS_H1_CONTROLS_CONTAINER"] = "headingH1controlsContainer";
    GeneralStylesControls2["HEADINGS_H2_CONTROLS_CONTAINER"] = "headingH2controlsContainer";
    GeneralStylesControls2["HEADINGS_H3_CONTROLS_CONTAINER"] = "headingH3controlsContainer";
    GeneralStylesControls2["HEADINGS_H4_CONTROLS_CONTAINER"] = "headingH4controlsContainer";
    GeneralStylesControls2["HEADINGS_H5_CONTROLS_CONTAINER"] = "headingH5controlsContainer";
    GeneralStylesControls2["HEADINGS_H6_CONTROLS_CONTAINER"] = "headingH6controlsContainer";
    GeneralStylesControls2["HEADINGS_LETTER_SPACING_CONTAINER"] = "headingsLetterSpacingFormContainer";
    GeneralStylesControls2["HEADINGS_PARAGRAPH_BOTTOM_MARGIN"] = "headingsParagraphBottomMarginForm";
    GeneralStylesControls2["HEADINGS_TYPES_BUTTON_BAR"] = "headingsTypesButtonBarForm";
    GeneralStylesControls2["LISTS_STYLES"] = "listsStyles";
    GeneralStylesControls2["MARGIN_AROUND_MESSAGE"] = "marginAroundMessage";
    GeneralStylesControls2["MESSAGE_ALIGNMENT"] = "messageAlignment";
    GeneralStylesControls2["MESSAGE_CONTENT_WIDTH"] = "messageContentWidth";
    GeneralStylesControls2["RESPONSIVE_DESIGN"] = "responsiveDesign";
    GeneralStylesControls2["RIGHT_TO_LEFT_CONTAINER"] = "rightToLeftContainer";
    GeneralStylesControls2["STRIPES_CONTENT_CONTROLS_CONTAINER"] = "stripesContentControlsContainer";
    GeneralStylesControls2["STRIPES_FONT_FAMILY_CONTAINER"] = "stripesFontFamilyFormContainer";
    GeneralStylesControls2["STRIPES_FOOTER_CONTROLS_CONTAINER"] = "stripesFooterControlsContainer";
    GeneralStylesControls2["STRIPES_HEADER_CONTROLS_CONTAINER"] = "stripesHeaderControlsContainer";
    GeneralStylesControls2["STRIPES_INFO_AREA_CONTROLS_CONTAINER"] = "stripesInfoAreaControlsContainer";
    GeneralStylesControls2["STRIPES_LETTER_SPACING_CONTAINER"] = "stripesLetterSpacingFormContainer";
    GeneralStylesControls2["STRIPES_LINE_HEIGHT_CONTAINER"] = "stripesLineHeightFormContainer";
    GeneralStylesControls2["STRIPE_TYPES_BUTTON_BAR"] = "stripeTypesButtonBarForm";
    GeneralStylesControls2["UNDERLINE_LINKS_CONTAINER"] = "underlineLinksContainer";
  })(GeneralStylesControls || (UEControls.GeneralStylesControls = GeneralStylesControls = {}));
  UEControls.UEControls = (_a = {}, _a[UEBlock_1.UEBlock.BLOCK_BANNER] = BannerControls, _a[UEBlock_1.UEBlock.BLOCK_BUTTON] = ButtonControls, _a[UEBlock_1.UEBlock.BLOCK_TEXT] = TextControls, _a[UEBlock_1.UEBlock.BLOCK_VIDEO] = VideoControls, _a[UEBlock_1.UEBlock.BLOCK_TIMER] = TimerControls, _a[UEBlock_1.UEBlock.BLOCK_SPACER] = SpacerControls, _a[UEBlock_1.UEBlock.BLOCK_IMAGE] = ImageControls, _a[UEBlock_1.UEBlock.BLOCK_HTML] = HTMLControls, _a[UEBlock_1.UEBlock.BLOCK_SOCIAL] = SocialControls, _a[UEBlock_1.UEBlock.BLOCK_MENU] = MenuControls, _a[UEBlock_1.UEBlock.BLOCK_AMP_ACCORDION] = AccordionControls, _a[UEBlock_1.UEBlock.BLOCK_AMP_CAROUSEL] = CarouselControls, _a[UEBlock_1.UEBlock.STRIPE] = StripeControls, _a[UEBlock_1.UEBlock.STRUCTURE] = StructureControls, _a[UEBlock_1.UEBlock.CONTAINER] = ContainerControls, _a[UEBlock_1.UEBlock.CUSTOM_BLOCK_LINK] = CustomLinkControls, _a[UEBlock_1.UEBlock.CUSTOM_BLOCK_IMAGE] = CustomImageControls, _a[UEBlock_1.UEBlock.CUSTOM_BLOCK_TEXT] = CustomTextControls, _a.BANNER_CHILD = BannerChildControls, _a.MESSAGE_SETTINGS = MessageSettingsControls, _a.GENERAL_STYLES = GeneralStylesControls, _a.GENERAL = GeneralControls, _a);
  return UEControls;
}
var SettingsTab = {};
var hasRequiredSettingsTab;
function requireSettingsTab() {
  if (hasRequiredSettingsTab) return SettingsTab;
  hasRequiredSettingsTab = 1;
  Object.defineProperty(SettingsTab, "__esModule", { value: true });
  SettingsTab.SettingsTab = void 0;
  var SettingsTab$1;
  (function(SettingsTab2) {
    SettingsTab2["SETTINGS"] = "settings";
    SettingsTab2["STYLES"] = "styles";
    SettingsTab2["DATA"] = "data";
  })(SettingsTab$1 || (SettingsTab.SettingsTab = SettingsTab$1 = {}));
  return SettingsTab;
}
var UIElementsAttributes = {};
var hasRequiredUIElementsAttributes;
function requireUIElementsAttributes() {
  if (hasRequiredUIElementsAttributes) return UIElementsAttributes;
  hasRequiredUIElementsAttributes = 1;
  var __assign = UIElementsAttributes && UIElementsAttributes.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  Object.defineProperty(UIElementsAttributes, "__esModule", { value: true });
  UIElementsAttributes.UEAttr = void 0;
  var UIElementAttributes = {
    name: "name",
    disabled: "disabled"
  };
  var buttonAttributes = __assign(__assign({}, UIElementAttributes), { caption: "caption" });
  var checkBoxAttributes = __assign(__assign({}, UIElementAttributes), { caption: "caption" });
  var counterAttributes = __assign(__assign({}, UIElementAttributes), { minValue: "min-value", maxValue: "max-value", step: "step" });
  var datePickerAttributes = __assign(__assign({}, UIElementAttributes), { placeholder: "placeholder", minDate: "min-date" });
  var labelAttributes = __assign(__assign({}, UIElementAttributes), { text: "text", hint: "hint" });
  var messageAttributes = __assign(__assign({}, UIElementAttributes), { type: "type" });
  var radioButtonsAttributes = __assign(__assign({}, UIElementAttributes), { buttons: "buttons" });
  var selectAttributes = __assign(__assign({}, UIElementAttributes), { searchable: "searchable", multiSelect: "multi-select", placeholder: "placeholder", items: "items" });
  var selectItemAttributes = __assign(__assign({}, UIElementAttributes), { text: "text", value: "value" });
  var checkItemAttributes = __assign(__assign({}, UIElementAttributes), { text: "text", hint: "hint", icon: "icon", value: "value" });
  var checkButtonsAttributes = __assign(__assign({}, UIElementAttributes), { buttons: "buttons" });
  var radioItemAttributes = __assign(__assign({}, UIElementAttributes), { text: "text", hint: "hint", icon: "icon", value: "value" });
  var textAttributes = __assign(__assign({}, UIElementAttributes), { placeholder: "placeholder" });
  var textAreaAttributes = __assign(__assign({}, UIElementAttributes), { resizable: "resizable", placeholder: "placeholder" });
  UIElementsAttributes.UEAttr = {
    DEFAULT: UIElementAttributes,
    BUTTON: buttonAttributes,
    CHECKBOX: checkBoxAttributes,
    CHECK_BUTTONS: checkButtonsAttributes,
    COLOR: UIElementAttributes,
    COUNTER: counterAttributes,
    DATEPICKER: datePickerAttributes,
    LABEL: labelAttributes,
    MESSAGE: messageAttributes,
    RADIO_BUTTONS: radioButtonsAttributes,
    SELECTPICKER: selectAttributes,
    SWITCHER: UIElementAttributes,
    TEXT: textAttributes,
    TEXTAREA: textAreaAttributes,
    CHECK_ITEM: checkItemAttributes,
    SELECT_ITEM: selectItemAttributes,
    RADIO_ITEM: radioItemAttributes
  };
  return UIElementsAttributes;
}
var ContextActionType = {};
var hasRequiredContextActionType;
function requireContextActionType() {
  if (hasRequiredContextActionType) return ContextActionType;
  hasRequiredContextActionType = 1;
  Object.defineProperty(ContextActionType, "__esModule", { value: true });
  ContextActionType.ContextActionType = void 0;
  var ContextActionType$1;
  (function(ContextActionType2) {
    ContextActionType2["SAVE_AS_MODULE"] = "saveAsModule";
    ContextActionType2["UPDATE_MODULE"] = "updateModule";
    ContextActionType2["IMPROVE_WITH_AI"] = "improveWithAI";
    ContextActionType2["MOVE"] = "move";
    ContextActionType2["COPY"] = "copy";
    ContextActionType2["REMOVE"] = "remove";
  })(ContextActionType$1 || (ContextActionType.ContextActionType = ContextActionType$1 = {}));
  return ContextActionType;
}
var UEBlockAttributes = {};
var hasRequiredUEBlockAttributes;
function requireUEBlockAttributes() {
  if (hasRequiredUEBlockAttributes) return UEBlockAttributes;
  hasRequiredUEBlockAttributes = 1;
  Object.defineProperty(UEBlockAttributes, "__esModule", { value: true });
  UEBlockAttributes.UEBlockAttr = void 0;
  var emptyContainerAttributes = {
    blocks: "blocks"
  };
  UEBlockAttributes.UEBlockAttr = {
    EMPTY_CONTAINER: emptyContainerAttributes
  };
  return UEBlockAttributes;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UEBlockAttr = exports.BlockType = exports.GeneralControls = exports.GeneralStylesControls = exports.MessageSettingsControls = exports.ContainerControls = exports.StructureControls = exports.StripeControls = exports.CarouselControls = exports.AccordionControls = exports.MenuControls = exports.SocialControls = exports.CustomTextControls = exports.CustomImageControls = exports.CustomLinkControls = exports.HTMLControls = exports.ImageControls = exports.SpacerControls = exports.TimerControls = exports.VideoControls = exports.TextControls = exports.ButtonControls = exports.BannerChildControls = exports.BannerControls = exports.UEBlock = exports.SettingsTab = exports.UEControls = exports.ContextActionType = exports.UEAttr = exports.UETag = exports.ModificationDescription = exports.Extension = exports.ExtensionBuilder = exports.SettingsPanelTab = exports.Block = exports.BlockRenderer = exports.ContextAction = exports.SettingsPanelRegistry = exports.UIControl = exports.UIElementTagRegistry = exports.UIElement = void 0;
    var UIElement_1 = requireUIElement();
    Object.defineProperty(exports, "UIElement", { enumerable: true, get: function() {
      return UIElement_1.UIElement;
    } });
    var UIControl_1 = requireUIControl();
    Object.defineProperty(exports, "UIControl", { enumerable: true, get: function() {
      return UIControl_1.UIControl;
    } });
    var SettingsPanelRegistry_1 = requireSettingsPanelRegistry();
    Object.defineProperty(exports, "SettingsPanelRegistry", { enumerable: true, get: function() {
      return SettingsPanelRegistry_1.SettingsPanelRegistry;
    } });
    var ContextAction_1 = requireContextAction();
    Object.defineProperty(exports, "ContextAction", { enumerable: true, get: function() {
      return ContextAction_1.ContextAction;
    } });
    var BlockRenderer_1 = requireBlockRenderer();
    Object.defineProperty(exports, "BlockRenderer", { enumerable: true, get: function() {
      return BlockRenderer_1.BlockRenderer;
    } });
    var Block_1 = requireBlock();
    Object.defineProperty(exports, "Block", { enumerable: true, get: function() {
      return Block_1.Block;
    } });
    var ExtensionBuilder_1 = requireExtensionBuilder();
    Object.defineProperty(exports, "ExtensionBuilder", { enumerable: true, get: function() {
      return ExtensionBuilder_1.ExtensionBuilder;
    } });
    var Extension_1 = requireExtension();
    Object.defineProperty(exports, "Extension", { enumerable: true, get: function() {
      return Extension_1.Extension;
    } });
    var UIElementTagRegistry_1 = requireUIElementTagRegistry();
    Object.defineProperty(exports, "UIElementTagRegistry", { enumerable: true, get: function() {
      return UIElementTagRegistry_1.UIElementTagRegistry;
    } });
    var ModificationDescription_1 = requireModificationDescription();
    Object.defineProperty(exports, "ModificationDescription", { enumerable: true, get: function() {
      return ModificationDescription_1.ModificationDescription;
    } });
    var SettingsPanelTab_1 = requireSettingsPanelTab();
    Object.defineProperty(exports, "SettingsPanelTab", { enumerable: true, get: function() {
      return SettingsPanelTab_1.SettingsPanelTab;
    } });
    var UETag_1 = requireUETag();
    Object.defineProperty(exports, "UETag", { enumerable: true, get: function() {
      return UETag_1.UETag;
    } });
    var UEControls_1 = requireUEControls();
    Object.defineProperty(exports, "UEControls", { enumerable: true, get: function() {
      return UEControls_1.UEControls;
    } });
    Object.defineProperty(exports, "BannerControls", { enumerable: true, get: function() {
      return UEControls_1.BannerControls;
    } });
    Object.defineProperty(exports, "BannerChildControls", { enumerable: true, get: function() {
      return UEControls_1.BannerChildControls;
    } });
    Object.defineProperty(exports, "ButtonControls", { enumerable: true, get: function() {
      return UEControls_1.ButtonControls;
    } });
    Object.defineProperty(exports, "TextControls", { enumerable: true, get: function() {
      return UEControls_1.TextControls;
    } });
    Object.defineProperty(exports, "VideoControls", { enumerable: true, get: function() {
      return UEControls_1.VideoControls;
    } });
    Object.defineProperty(exports, "TimerControls", { enumerable: true, get: function() {
      return UEControls_1.TimerControls;
    } });
    Object.defineProperty(exports, "SpacerControls", { enumerable: true, get: function() {
      return UEControls_1.SpacerControls;
    } });
    Object.defineProperty(exports, "ImageControls", { enumerable: true, get: function() {
      return UEControls_1.ImageControls;
    } });
    Object.defineProperty(exports, "HTMLControls", { enumerable: true, get: function() {
      return UEControls_1.HTMLControls;
    } });
    Object.defineProperty(exports, "CustomLinkControls", { enumerable: true, get: function() {
      return UEControls_1.CustomLinkControls;
    } });
    Object.defineProperty(exports, "CustomImageControls", { enumerable: true, get: function() {
      return UEControls_1.CustomImageControls;
    } });
    Object.defineProperty(exports, "CustomTextControls", { enumerable: true, get: function() {
      return UEControls_1.CustomTextControls;
    } });
    Object.defineProperty(exports, "SocialControls", { enumerable: true, get: function() {
      return UEControls_1.SocialControls;
    } });
    Object.defineProperty(exports, "MenuControls", { enumerable: true, get: function() {
      return UEControls_1.MenuControls;
    } });
    Object.defineProperty(exports, "AccordionControls", { enumerable: true, get: function() {
      return UEControls_1.AccordionControls;
    } });
    Object.defineProperty(exports, "CarouselControls", { enumerable: true, get: function() {
      return UEControls_1.CarouselControls;
    } });
    Object.defineProperty(exports, "StripeControls", { enumerable: true, get: function() {
      return UEControls_1.StripeControls;
    } });
    Object.defineProperty(exports, "StructureControls", { enumerable: true, get: function() {
      return UEControls_1.StructureControls;
    } });
    Object.defineProperty(exports, "ContainerControls", { enumerable: true, get: function() {
      return UEControls_1.ContainerControls;
    } });
    Object.defineProperty(exports, "MessageSettingsControls", { enumerable: true, get: function() {
      return UEControls_1.MessageSettingsControls;
    } });
    Object.defineProperty(exports, "GeneralStylesControls", { enumerable: true, get: function() {
      return UEControls_1.GeneralStylesControls;
    } });
    Object.defineProperty(exports, "GeneralControls", { enumerable: true, get: function() {
      return UEControls_1.GeneralControls;
    } });
    var SettingsTab_1 = requireSettingsTab();
    Object.defineProperty(exports, "SettingsTab", { enumerable: true, get: function() {
      return SettingsTab_1.SettingsTab;
    } });
    var UIElementsAttributes_1 = requireUIElementsAttributes();
    Object.defineProperty(exports, "UEAttr", { enumerable: true, get: function() {
      return UIElementsAttributes_1.UEAttr;
    } });
    var UEBlock_1 = requireUEBlock();
    Object.defineProperty(exports, "UEBlock", { enumerable: true, get: function() {
      return UEBlock_1.UEBlock;
    } });
    var ContextActionType_1 = requireContextActionType();
    Object.defineProperty(exports, "ContextActionType", { enumerable: true, get: function() {
      return ContextActionType_1.ContextActionType;
    } });
    var BlockType_1 = requireBlockType();
    Object.defineProperty(exports, "BlockType", { enumerable: true, get: function() {
      return BlockType_1.BlockType;
    } });
    var UEBlockAttributes_1 = requireUEBlockAttributes();
    Object.defineProperty(exports, "UEBlockAttr", { enumerable: true, get: function() {
      return UEBlockAttributes_1.UEBlockAttr;
    } });
  })(dist);
  return dist;
}
var distExports = requireDist();
class HelloWorldBlockRenderer extends distExports.BlockRenderer {
  /**
   * Generates a preview HTML string for the block.
   * It replaces the dynamic merge tag `#{NAME}` with the static default value 'World'
   * to provide a representative preview in the editor UI.
   * @param {ImmutableHtmlNode} node The immutable HTML node representing the block.
   * @returns {string} The modified HTML string for preview.
   */
  getPreviewHtml(node) {
    return node.getOuterHTML().replace(`#{NAME}`, "World");
  }
}
const CONTEXT_ACTION_MAGIC_BUTTON_ID = "hello-world-magic-button";
class HelloWorldBlockContextAction extends distExports.ContextAction {
  /**
   * Returns the unique identifier for this context action.
   * @returns {string} The unique ID.
   */
  getId() {
    return CONTEXT_ACTION_MAGIC_BUTTON_ID;
  }
  /**
   * Returns the CSS class name for the icon of this context action.
   * @returns {string} The icon class name.
   */
  getIconClass() {
    return "plus";
  }
  /**
   * Returns the display label for this context action.
   * Uses the translation API to support internationalization.
   * @returns {string} The translated label.
   */
  getLabel() {
    return this.api.translate("Magic button");
  }
  /**
   * Handles the click event when the context action is selected.
   * Shows an alert with the outer HTML of the clicked block node.
   * @param {ImmutableHtmlNode} node The HTML node the action is being performed on.
   */
  onClick(node) {
    alert(`Magic button clicked. Block content: ${node.getOuterHTML()}`);
  }
}
const BLOCK_HELLO_WORLD_ID = "hello-world-block";
class HelloWorldBlock extends distExports.Block {
  /**
   * Returns the unique identifier for the block.
   * @returns {string} The unique identifier for this block.
   */
  getId() {
    return BLOCK_HELLO_WORLD_ID;
  }
  /**
   * Determines if the block is enabled in the current editor context.
   * @returns {boolean}
   */
  isEnabled() {
    return true;
  }
  /**
   * Returns the icon representation for the block in the blocks panel.
   * @returns {string} The icon class name.
   */
  getIcon() {
    return "new-window";
  }
  /**
   * Returns the display name of the block shown in the blocks panel.
   * @returns {string} The translated display name.
   */
  getName() {
    return this.api.translate("Hello world block");
  }
  /**
   * Returns the descriptive text for the block shown in the blocks panel.
   * @returns {string} The translated description.
   */
  getDescription() {
    return this.api.translate("Hello world block description");
  }
  /**
   * Returns an array of context action IDs that apply to this block.
   * Removes the standard "copy" action and adds a custom magic button action to the context menu.
   * @returns {string[]} An array of context action IDs.
   */
  getContextActionsIds() {
    return [
      distExports.ContextActionType.MOVE,
      distExports.ContextActionType.REMOVE,
      CONTEXT_ACTION_MAGIC_BUTTON_ID
    ];
  }
  /**
   * Returns a custom renderer class for the block, if needed.
   * @returns {Class<HelloWorldBlockRenderer>} The custom renderer class.
   */
  getCustomRenderer() {
    return HelloWorldBlockRenderer;
  }
  /**
   * Returns an HTML string template that defines the structure of the block.
   * @returns {string} The HTML template string.
   */
  getTemplate() {
    return `
            <td align="left">
                <p>
                    Hello, #{NAME}
                </p>
            </td>
        `;
  }
  /**
   * Lifecycle hook called when the document is initialized.
   * This example removes any duplicate instances of this block from the document on init.
   * @returns {TemplateModifier | undefined} A modifier instance if changes were made, otherwise undefined.
   */
  onDocumentInit() {
    const blocks = this.api.getDocumentRoot().querySelectorAll(`.${this.getUniqueBlockClassname()}`);
    this.api.setViewOnly(!!blocks.length);
    let modifier = void 0;
    if (blocks.length > 1) {
      modifier = this.api.getDocumentModifier();
      for (let i = 1; i < blocks.length; i++) {
        modifier = modifier.modifyHtml(blocks[i]).delete();
      }
      modifier.apply(new distExports.ModificationDescription("Removed extra hello world blocks on init"));
    }
    return modifier;
  }
  /**
   * Lifecycle hook called when the block is dropped into the editor.
   * This example allows only one instance of this block per template by setting it to view-only.
   * @param {ImmutableHtmlNode} node - The node that was dropped.
   * @returns {TemplateModifier | undefined} Always returns undefined in this example.
   */
  onDrop(node) {
    this.api.setViewOnly(true);
    return void 0;
  }
  /**
   * Lifecycle hook called when the block is deleted.
   * This example allows a new instance of the block to be added after deletion by setting view-only to false.
   * @param {ImmutableHtmlNode} node - The node that was deleted.
   * @returns {TemplateModifier | undefined} Always returns undefined in this example.
   */
  onDelete(node) {
    this.api.setViewOnly(false);
    return void 0;
  }
}
const en = {
  "Hello world block": "Hello world",
  "Hello world block description": "An example of block extension",
  "Hello world settings advanced": "Advanced",
  "Background color": "Background color",
  "Set background color to {color}": "Set background color to {color}",
  "Use brand color": "Use brand color"
};
const uk = {
  "Hello world block": "Привіт, світ",
  "Hello world block description": "Приклад власного блоку розширення",
  "Hello world settings advanced": "Просунуті",
  "Background color": "Колір фону",
  "Set background color to {color}": "Встановлено колір фону у {color}",
  "Use brand color": "Колір бренду"
};
const MessageStyle = {
  DANGER: "error",
  SUCCESS: "success",
  WARNING: "warn",
  INFO: "info"
};
const CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID = "ui-elements-demo";
const MESSAGE_ELEMENT = "message";
const TOGGLEABLE_CONTAINER = "toggleable";
const RADIO_BUTTONS_ELEMENT = "radioButtons";
const SELECT_ELEMENT = "select";
const CHECK_BUTTONS_ELEMENT = "checkButtons";
const CHECKBOX_ELEMENT = "checkbox";
const SWITCHER_ELEMENT = "switcher";
const BUTTON_ELEMENT = "button";
const COLOR_ELEMENT = "color";
const DATEPICKER_ELEMENT = "datepicker";
const COUNTER_ELEMENT = "counter";
const TEXT_ELEMENT = "text";
const TEXT_AREA_ELEMENT = "textArea";
class BuildInUIElementsDemoControl extends distExports.UIControl {
  /**
   * Returns the unique identifier for this control.
   * @returns {string} The control's unique ID.
   */
  getId() {
    return CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID;
  }
  /**
   * Generates the HTML template for a Label UI element.
   * @private
   * @param {string} text - The text content of the label.
   * @param {string} [name=Math.random()] - The name attribute for the label (defaults to a random string).
   * @returns {string} The HTML string for the label element.
   */
  _getLabel(text, name = `${Math.random()}`) {
    return `<${distExports.UETag.LABEL} ${distExports.UEAttr.LABEL.text}="${text}" ${distExports.UEAttr.LABEL.name}="${name}"></${distExports.UETag.LABEL}>`;
  }
  /**
   * Generates the HTML template for the Message UI element section.
   * @private
   * @returns {string} The HTML string for the message element.
   */
  _getMessage() {
    return `
        <b>Message element allows you to provide user with required information.</b>
        ${this._getLabel("User action:")}
        <${distExports.UETag.MESSAGE} ${distExports.UEAttr.MESSAGE.name}="${MESSAGE_ELEMENT}" ${distExports.UEAttr.MESSAGE.type}="${MessageStyle.INFO}"></${distExports.UETag.MESSAGE}>
    `;
  }
  /**
   * Generates the HTML template for a Radio Item UI element.
   * @private
   * @param {string} text - The text and hint for the radio item.
   * @param {string} value - The value associated with the radio item.
   * @returns {string} The HTML string for the radio item element.
   */
  _getRadioButton(text, value) {
    return `<${distExports.UETag.RADIO_ITEM} ${distExports.UEAttr.RADIO_ITEM.hint}="${text}" ${distExports.UEAttr.RADIO_ITEM.text}="${text}" ${distExports.UEAttr.RADIO_ITEM.value}="${value}"></${distExports.UETag.RADIO_ITEM}>`;
  }
  /**
   * Generates the HTML template for the Radio Buttons UI element section.
   * @private
   * @returns {string} The HTML string for the radio buttons element.
   */
  _getRadioButtons() {
    return `
      <b>Radio buttons allow you to choose one item from the list of options.</b>
      ${this._getLabel("Select message style:")}
      <${distExports.UETag.RADIO_BUTTONS} ${distExports.UEAttr.RADIO_BUTTONS.name}="${RADIO_BUTTONS_ELEMENT}">
          ${Object.keys(MessageStyle).map((key) => this._getRadioButton(key, MessageStyle[key])).join("")}
      </${distExports.UETag.RADIO_BUTTONS}>
    `;
  }
  /**
   * Generates the HTML template for a Select Item UI element.
   * @private
   * @param {string} text - The text displayed for the select item.
   * @param {string} value - The value associated with the select item.
   * @returns {string} The HTML string for the select item element.
   */
  _getSelectItem(text, value) {
    return `<${distExports.UETag.SELECT_ITEM} ${distExports.UEAttr.SELECT_ITEM.text}="${text}" ${distExports.UEAttr.SELECT_ITEM.value}="${value}"></${distExports.UETag.SELECT_ITEM}>`;
  }
  /**
   * Generates the HTML template for the Select UI element section.
   * Allows multi-selection.
   * @private
   * @returns {string} The HTML string for the select element.
   */
  _getSelect() {
    return `
      <b>Select element allows you to choose one or several items from the list of options.</b>
        ${this._getLabel("Select message style:")}
        <${distExports.UETag.SELECTPICKER} ${distExports.UEAttr.SELECTPICKER.name}="${SELECT_ELEMENT}" ${distExports.UEAttr.SELECTPICKER.multiSelect}="true">
            ${Object.keys(MessageStyle).map((key) => this._getSelectItem(key, MessageStyle[key])).join("")}
        </${distExports.UETag.SELECTPICKER}>
    `;
  }
  /**
   * Generates the HTML template for a Check Item UI element.
   * @param {string} name - The text and hint for the check item.
   * @param {string} value - The value associated with the check item.
   * @returns {string} The HTML string for the check item element.
   */
  getCheckItem(name, value) {
    return `<${distExports.UETag.CHECK_ITEM} ${distExports.UEAttr.CHECK_ITEM.hint}="${name}" ${distExports.UEAttr.CHECK_ITEM.text}="${name}" ${distExports.UEAttr.CHECK_ITEM.value}="${value}"></${distExports.UETag.CHECK_ITEM}>`;
  }
  /**
   * Generates the HTML template for the Check Buttons UI element section.
   * @private
   * @returns {string} The HTML string for the check buttons element.
   */
  _getCheckButtons() {
    return `
      <b>CheckButtons are similar to RadioButtons but also allow to select several items.</b>
        ${this._getLabel("Select some items:")}
        <${distExports.UETag.CHECK_BUTTONS} ${distExports.UEAttr.CHECK_BUTTONS.name}="${CHECK_BUTTONS_ELEMENT}">
            ${["one", "two", "three"].map((key) => this.getCheckItem(key, key)).join("")}
        </${distExports.UETag.CHECK_BUTTONS}>
    `;
  }
  /**
   * Generates the HTML template for the Checkbox UI element section.
   * @private
   * @returns {string} The HTML string for the checkbox element.
   */
  _getCheckbox() {
    return `
      <b>Checkbox allows you to switch boolean state.</b>
      <${distExports.UETag.CHECKBOX} ${distExports.UEAttr.CHECKBOX.caption}="Disable inputs above:" ${distExports.UEAttr.CHECKBOX.name}="${CHECKBOX_ELEMENT}"></${distExports.UETag.CHECKBOX}>
    `;
  }
  /**
   * Generates the HTML template for the Switcher UI element section.
   * @private
   * @returns {string} The HTML string for the switcher element.
   */
  _getSwitcher() {
    return `
      <b>Switcher allows you to switch boolean state too.</b>
      ${this._getLabel("Display inputs above:")}
      <${distExports.UETag.SWITCHER} ${distExports.UEAttr.SWITCHER.name}="${SWITCHER_ELEMENT}"></${distExports.UETag.SWITCHER}>
    `;
  }
  /**
   * Generates the HTML template for the Button UI element section.
   * @private
   * @returns {string} The HTML string for the button element.
   */
  _getButton() {
    return `
      <b>Button allows you to perform single action.</b>
      ${this._getLabel("Clear message area:")}
      <${distExports.UETag.BUTTON} ${distExports.UEAttr.BUTTON.name}="${BUTTON_ELEMENT}" ${distExports.UEAttr.BUTTON.caption}="DO IT"></${distExports.UETag.BUTTON}>
    `;
  }
  /**
   * Generates the HTML template for the Color Picker UI element section.
   * @private
   * @returns {string} The HTML string for the color picker element.
   */
  _getColor() {
    return `
      <b>Colorpicker allows you to select color from the default and custom palettes.</b>
      ${this._getLabel("Select color:")}
      <${distExports.UETag.COLOR} ${distExports.UEAttr.COLOR.name}="${COLOR_ELEMENT}"></${distExports.UETag.COLOR}>
    `;
  }
  /**
   * Generates the HTML template for the Date Picker UI element section.
   * @private
   * @returns {string} The HTML string for the date picker element.
   */
  _getDatepicker() {
    return `
      <b>Datepicker allows to select date.</b>
      ${this._getLabel("Select date:")}
      <${distExports.UETag.DATEPICKER} ${distExports.UEAttr.DATEPICKER.name}="${DATEPICKER_ELEMENT}"></${distExports.UETag.DATEPICKER}>
    `;
  }
  /**
   * Generates the HTML template for the Counter UI element section.
   * @private
   * @returns {string} The HTML string for the counter element.
   */
  _getCounter() {
    return `
      <b>Counter allows to input numeric value.</b>
      ${this._getLabel("Pick a number between 1 and 10:")}
      <${distExports.UETag.COUNTER} ${distExports.UEAttr.COUNTER.name}="${COUNTER_ELEMENT}" ${distExports.UEAttr.COUNTER.minValue}="1" ${distExports.UEAttr.COUNTER.maxValue}="10" ${distExports.UEAttr.COUNTER.step}="1"></${distExports.UETag.COUNTER}>
    `;
  }
  /**
   * Generates the HTML template for the Text Input UI element section.
   * @private
   * @returns {string} The HTML string for the text input element.
   */
  _getText() {
    return `
      <b>Text allows you to input string value.</b>
      ${this._getLabel("What is your name?")}
      <${distExports.UETag.TEXT} ${distExports.UEAttr.TEXT.name}="${TEXT_ELEMENT}" ${distExports.UEAttr.TEXT.placeholder}="Enter your name here."></${distExports.UETag.TEXT}>
    `;
  }
  /**
   * Generates the HTML template for the Text Area UI element section.
   * @private
   * @returns {string} The HTML string for the text area element.
   */
  _getTextArea() {
    return `
      <b>Text area allows you to input multi-line text.</b>
      ${this._getLabel("List top 1 of your favourite dinosaurs.", "dinoLabel")}
      <${distExports.UETag.TEXTAREA} ${distExports.UEAttr.TEXTAREA.name}="${TEXT_AREA_ELEMENT}" ${distExports.UEAttr.TEXTAREA.placeholder}="Dinosaurs go here."></${distExports.UETag.TEXTAREA}>
    `;
  }
  /**
   * Returns the HTML template string that defines the structure of this control.
   * It assembles the various UI element sections generated by helper methods.
   * @returns {string} The HTML template for the control.
   */
  getTemplate() {
    return `
    <div class="e2e-elements-container">
        ${this._getMessage()}    
        <hr>
        <div ${distExports.UEAttr.DEFAULT.name}="${TOGGLEABLE_CONTAINER}">
          ${this._getRadioButtons()}    
          <hr>
          ${this._getSelect()}        
          <hr>
          ${this._getCheckButtons()}
          <hr>    
          ${this._getButton()}        
          <hr>
          ${this._getCheckbox()}
          <hr>               
        </div>
        ${this._getSwitcher()}      
        <hr>    
        ${this._getColor()}      
        <hr>    
        ${this._getDatepicker()}      
        <hr>    
        ${this._getCounter()}      
        <hr>    
        ${this._getText()}      
        <hr>    
        ${this._getTextArea()}
    </div>
    `;
  }
  /**
   * Called after the control is rendered in the settings panel.
   * Initializes the form values and sets up listeners for value changes on the UI elements.
   */
  onRender() {
    this._setFormValues();
    this._listenToFormUpdates();
  }
  /**
   * Sets the initial values for the UI elements in the control.
   * @private
   */
  _setFormValues() {
    this.api.updateValues({
      [MESSAGE_ELEMENT]: "Interact with inputs to perform an action.",
      [RADIO_BUTTONS_ELEMENT]: MessageStyle.INFO,
      [SELECT_ELEMENT]: Object.values(MessageStyle),
      [CHECK_BUTTONS_ELEMENT]: { one: true },
      [CHECKBOX_ELEMENT]: false,
      [SWITCHER_ELEMENT]: true,
      [COLOR_ELEMENT]: "#008000",
      [DATEPICKER_ELEMENT]: /* @__PURE__ */ new Date(),
      [COUNTER_ELEMENT]: 1
    });
  }
  /**
   * Registers callback functions to be executed when the values of specific UI elements change.
   * @private
   */
  _listenToFormUpdates() {
    this.api.onValueChanged(RADIO_BUTTONS_ELEMENT, (value) => this._onRadioButtonsChange(value));
    this.api.onValueChanged(SELECT_ELEMENT, (value) => this._onSelectChange(value));
    this.api.onValueChanged(CHECK_BUTTONS_ELEMENT, (value) => this._onCheckButtonsChange(value));
    this.api.onValueChanged(BUTTON_ELEMENT, () => this._onButtonClick());
    this.api.onValueChanged(CHECKBOX_ELEMENT, (value) => this._onCheckboxChange(value));
    this.api.onValueChanged(SWITCHER_ELEMENT, (value) => this._onSwitcherChange(value));
    this.api.onValueChanged(COLOR_ELEMENT, (value) => this._onColorChange(value));
    this.api.onValueChanged(DATEPICKER_ELEMENT, (value) => this._onDateChange(value));
    this.api.onValueChanged(COUNTER_ELEMENT, (value) => this._onCounterChange(value));
    this.api.onValueChanged(TEXT_ELEMENT, (value) => this._onTextChange(value));
    this.api.onValueChanged(TEXT_AREA_ELEMENT, (value) => this._onTextAreaChange(value));
  }
  /**
   * Updates the content of the message UI element.
   * @private
   * @param {string} message - The new message content (HTML allowed).
   * @param {boolean} [overwrite=false] - If true, replaces the existing message; otherwise, appends.
   */
  _updateMessage(message, overwrite = false) {
    const previousMessages = overwrite ? "" : this.api.getValues()[MESSAGE_ELEMENT];
    this.api.updateValues({
      [MESSAGE_ELEMENT]: `${previousMessages ? `${previousMessages}<br>` : ""}${message}`
    });
  }
  /**
   * Handles changes to the Radio Buttons element.
   * Updates the message type and displays a confirmation message.
   * @private
   * @param {string} value - The selected radio button value.
   */
  _onRadioButtonsChange(value) {
    this.api.setUIEAttribute(MESSAGE_ELEMENT, distExports.UEAttr.MESSAGE.type, value);
    this._updateMessage(`<b>Radio item selected</b>: '${value}'`);
  }
  /**
   * Handles changes to the Select element.
   * Updates the available options in the Radio Buttons based on the selection
   * and displays a confirmation message.
   * @private
   * @param {string[]} value - An array of selected values.
   */
  _onSelectChange(value) {
    this.api.setUIEAttribute(
      RADIO_BUTTONS_ELEMENT,
      distExports.UEAttr.RADIO_BUTTONS.buttons,
      Object.keys(MessageStyle).filter((key) => value.includes(MessageStyle[key])).map((key) => ({
        [distExports.UEAttr.RADIO_ITEM.hint]: key,
        [distExports.UEAttr.RADIO_ITEM.text]: key,
        [distExports.UEAttr.RADIO_ITEM.value]: MessageStyle[key]
      }))
    );
    this._updateMessage(`<b>Select items selected</b>: '${value.join(", ")}'`);
  }
  /**
   * Handles changes to the Check Buttons element.
   * Displays a confirmation message showing the selected items.
   * @private
   * @param {Object<string, boolean>} value - An object where keys are item values and values are their checked state.
   */
  _onCheckButtonsChange(value) {
    this._updateMessage(`<b>Check buttons selected</b>: '${JSON.stringify(value).replace(/"/g, "")}'`);
  }
  /**
   * Handles changes to the Checkbox element.
   * Enables/disables other input elements based on the checkbox state and displays a confirmation message.
   * @private
   * @param {boolean} value - The checked state of the checkbox.
   */
  _onCheckboxChange(value) {
    this._updateMessage(`<b>Checkbox changed</b>: '${value}'`);
    this.api.setUIEAttribute(RADIO_BUTTONS_ELEMENT, distExports.UEAttr.RADIO_BUTTONS.disabled, value);
    this.api.setUIEAttribute(SELECT_ELEMENT, distExports.UEAttr.SELECTPICKER.disabled, value);
    this.api.setUIEAttribute(CHECK_BUTTONS_ELEMENT, distExports.UEAttr.CHECK_BUTTONS.disabled, value);
    this.api.setUIEAttribute(BUTTON_ELEMENT, distExports.UEAttr.BUTTON.disabled, value);
  }
  /**
   * Handles changes to the Switcher element.
   * Shows/hides a container based on the switcher state and displays a confirmation message.
   * @private
   * @param {boolean} value - The state of the switcher (true for on, false for off).
   */
  _onSwitcherChange(value) {
    this._updateMessage(`<b>Switcher changed</b>: '${value}'`);
    this.api.setVisibility(TOGGLEABLE_CONTAINER, value);
  }
  /**
   * Handles clicks on the Button element.
   * Clears the message area.
   * @private
   */
  _onButtonClick() {
    this._updateMessage(`All gone!`, true);
  }
  /**
   * Handles changes to the Color Picker element.
   * Displays the selected color value in a message.
   * @private
   * @param {string} value - The selected color value (e.g., '#RRGGBB').
   */
  _onColorChange(value) {
    this._updateMessage(`<b>Color selected</b>: '<span style="color: ${value}; background: #FFFFFF; font-weight: bold;">${value}</span>'`);
  }
  /**
   * Handles changes to the Date Picker element.
   * Displays the selected date in a message.
   * @private
   * @param {Date} value - The selected Date object.
   */
  _onDateChange(value) {
    this._updateMessage(`<b>Date selected</b>: '${value.toLocaleDateString()}'`);
  }
  /**
   * Handles changes to the Counter element.
   * Displays the selected number (with some easter eggs) and updates a related label.
   * @private
   * @param {number} value - The current value of the counter.
   */
  _onCounterChange(value) {
    let choice = value;
    if (value === 6) {
      choice = "😱";
    }
    if (value === 9) {
      choice = "";
    }
    this._updateMessage(`<b>You've chosen</b>: '${choice}'`);
    this.api.setUIEAttribute("dinoLabel", distExports.UEAttr.LABEL.text, `List top ${value} of your favourite dinosaurs.`);
  }
  /**
   * Handles changes to the Text Input element.
   * Displays a welcome message including the entered name.
   * @private
   * @param {string} value - The text entered in the input field.
   */
  _onTextChange(value) {
    this._updateMessage(`${value}'s come to see us!`);
  }
  /**
   * Handles changes to the Text Area element.
   * Validates the number of lines entered against the value from the counter
   * and displays appropriate messages.
   * @private
   * @param {string} [value=''] - The text entered in the text area.
   */
  _onTextAreaChange(value = "") {
    value = value.trim();
    const requiredNumber = this.api.getValues()[COUNTER_ELEMENT];
    const enteredNumber = value.split("\n").length;
    if (requiredNumber > enteredNumber) {
      this._updateMessage(`<b>Enter ${requiredNumber - enteredNumber} more dinosaurs!</b>`);
    } else if (requiredNumber < enteredNumber) {
      this._updateMessage(`<b>Hold your dinosaurs!</b>`);
    } else {
      this._updateMessage(`<b>Top ${requiredNumber} of dinosaurs:</b><hr>${value.replace(/\n/g, "<br>")}`);
    }
  }
  /**
   * Called when the associated template node is updated.
   * This method is part of the UIControl lifecycle but is not used in this demo control
   * as it doesn't directly manipulate a specific template node based on its state.
   * @param {ImmutableHtmlNode} node The immutable HTML node representing the element being controlled.
   */
  onTemplateNodeUpdated(node) {
  }
}
const COLOR_ELEMENT_NAME = "helloWorldBackgroundColor";
const CONTROL_HELLO_WORLD_BACKGROUND_COLOR_ID = "hello-world-background-color-control";
class HelloWorldBackgroundColorControl extends distExports.UIControl {
  /**
   * Returns a unique identifier for the control.
   * This ID must be unique within the editor.
   * @returns {string} The unique ID for this control.
   */
  getId() {
    return CONTROL_HELLO_WORLD_BACKGROUND_COLOR_ID;
  }
  /**
   * Returns an HTML string template that defines the structure of the control.
   * This template uses built-in UI elements like ue-label and a custom element 'brand-color-picker'.
   * @returns {string} The HTML template for the control.
   */
  getTemplate() {
    return `
            <div>
                <${distExports.UETag.LABEL} ${distExports.UEAttr.LABEL.text}="${this.api.translate("Background color")}:"></${distExports.UETag.LABEL}>
                <brand-color-picker name="${COLOR_ELEMENT_NAME}"></brand-color-picker>
            </div>`;
  }
  /**
   * Called after the control is rendered in the settings panel.
   * Sets up an event listener to react to changes in the 'brand-color-picker' value.
   * When the color changes, it modifies the 'bgcolor' attribute of the associated template node.
   */
  onRender() {
    this.api.onValueChanged(COLOR_ELEMENT_NAME, (newValue, oldValue) => {
      this.api.getDocumentModifier().modifyHtml(this.node).setAttribute("bgcolor", newValue).apply(new distExports.ModificationDescription("Set background color to {color}").withParams({ color: newValue }));
    });
  }
  /**
   * Called when the associated template node (e.g., the block being edited) is updated.
   * Extracts the current 'bgcolor' attribute from the node and updates the control's UI element value.
   * @param {ImmutableHtmlNode} node The immutable HTML node representing the element being controlled.
   */
  onTemplateNodeUpdated(node) {
    this.node = node;
    this.api.updateValues({
      [COLOR_ELEMENT_NAME]: node.getAttribute("bgcolor")
    });
  }
}
class HelloWorldBlockSettingsPanelRegistry extends distExports.SettingsPanelRegistry {
  /**
   * Registers controls for specific blocks within the settings panel.
   * This method modifies the provided map to define which controls appear
   * in which tabs for different blocks.
   *
   * @param {Object.<string, Array<SettingsPanelTab>>} controls - A map where keys are block IDs (e.g., BLOCK_HELLO_WORLD_ID, UEBlock.BLOCK_BUTTON)
   *                                                             and values are arrays of SettingsPanelTab instances defining the tabs and controls for that block.
   *                                                             This map is modified in place.
   */
  registerBlockControls(controls) {
    controls[BLOCK_HELLO_WORLD_ID] = [
      new distExports.SettingsPanelTab(
        "custom",
        [
          CONTROL_HELLO_WORLD_BACKGROUND_COLOR_ID
        ]
      ).withLabel(this.api.translate("Hello world settings advanced"))
    ];
    controls[distExports.UEBlock.BLOCK_BUTTON] = [
      new distExports.SettingsPanelTab(
        distExports.SettingsTab.SETTINGS,
        [
          CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID
        ]
      )
    ];
  }
}
const styles = "ue-ui-simple-panel {\n    background-color: darkgray;\n}\n\n.brand-color-button {\n    width: 200px;\n    height: 35px;\n    background-color: greenyellow;\n    border-radius: 10px;\n    cursor: pointer;\n}\n";
const BRAND_COLOR = "greenyellow";
class BrandColorPickerUIElement extends distExports.UIElement {
  /**
   * Returns the unique identifier for this UI element.
   * This ID is used to register and reference the element.
   * @returns {string} The unique identifier 'brand-color-picker'.
   */
  getId() {
    return "brand-color-picker";
  }
  /**
   * Returns the HTML template string for this UI element.
   * The template consists of a button displaying translated text.
   * @returns {string} The HTML template string.
   */
  getTemplate() {
    return `<button class="brand-color-button">${this.api.translate("Brand color")}</button>`;
  }
  /**
   * Called after the element's template is rendered in the DOM.
   * Initializes the button element and attaches the click event listener.
   * @param {HTMLElement} container - The container DOM element where the template was rendered.
   */
  onRender(container) {
    this.button = container.querySelector("button");
    this.button.addEventListener("click", this._onClick.bind(this));
  }
  /**
   * Called when the UI element is being destroyed.
   * Removes the click event listener to prevent memory leaks.
   */
  onDestroy() {
    this.button.removeEventListener("click", this._onClick.bind(this));
  }
  /**
   * Handles the click event on the button.
   * Notifies the editor that the value should be changed to the BRAND_COLOR.
   * @private
   */
  _onClick() {
    this.api.onValueChanged(BRAND_COLOR);
  }
}
const extension = new distExports.ExtensionBuilder().withLocalization({
  "en": en,
  "uk": uk
}).withStyles(styles).addBlock(HelloWorldBlock).addContextAction(HelloWorldBlockContextAction).addControl(HelloWorldBackgroundColorControl).addControl(BuildInUIElementsDemoControl).addUiElement(BrandColorPickerUIElement).withSettingsPanelRegistry(HelloWorldBlockSettingsPanelRegistry).build();
export {
  extension as default
};
