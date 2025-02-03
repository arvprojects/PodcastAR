import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

require("LensStudio:TextInputModule");

@component
export class GetUsername extends BaseScriptComponent {
  pinchButton: PinchButton;

  private keyboardIsActive: boolean = false;
    
      @input
    podcastListContainer:ScriptComponent;
    
    @input
    thiscontainer: ScriptComponent;

  onAwake() {
    this.pinchButton = this.sceneObject.getComponent(PinchButton.getTypeName());

    let options = new TextInputSystem.KeyboardOptions();
    options.keyboardType = TextInputSystem.KeyboardType.Text;
    options.returnKeyType = TextInputSystem.ReturnKeyType.Done;
    options.enablePreview = true;

    options.onReturnKeyPressed = () => {
      this.keyboardIsActive = false;
    };
    options.onTextChanged = (text, range) => {
      print(text);
      globalThis.snapUsername = text
    };

    this.pinchButton.onButtonPinched.add(() => {
      this.podcastListContainer.sceneObject.enabled=true
      this.thiscontainer.sceneObject.enabled=false

      if (this.keyboardIsActive) {
        return;
      }
      this.keyboardIsActive = true;
      global.textInputSystem.requestKeyboard(options);
    });
  }
}