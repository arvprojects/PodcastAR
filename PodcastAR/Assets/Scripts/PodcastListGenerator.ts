/**
 * This class is responsible for creating and positioning grid content items based on a specified prefab and item count. It instantiates the items and arranges them vertically with a specified offset.
 */
import { PinchButton } from 'SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton';
import {SpectaclesBackendClient} from 'Scripts/SpectaclesBackendClient'
import { ContainerFrame } from '../SpectaclesInteractionKit/Components/UI/ContainerFrame/ContainerFrame';
import NativeLogger from "SpectaclesInteractionKit/Utils/NativeLogger";

const log = new NativeLogger("MyNativeLogger");

//hardcod podcast list, using api made the scroll view not work
let podcasts = new Map<string, string>([
    ["Short History of Chichen Itza", "0c36ba29-4da2-475a-ad0b-e88f04cba59e"],
    ["The Weekly Show with Jon Stewart - Reflecting on 2024 with Mark Cuban", "1ef68c47-a575-47cb-84ce-ef51a10e0030"],
    ["Morning Brew Daily Jan 7th", "45ed0d09-ab9f-471d-8772-cae422f9151c"],
    ["99% Invisible - Meet me at Riis", "a0fef1fc-8f2d-4590-826b-e60f54d52b8b"],
    ["Morning Brew Daily Jan 29th", "c6f40c75-4bb5-4b8e-a995-a0734c29e4bf"],
    ["Morning Brew Daily Jan 31st", "f0cde348-6184-4d11-91b7-2a343aada57c"]
]);


@component
export class GridContentCreator extends BaseScriptComponent {
  @input
  itemPrefab!: ObjectPrefab 
    

  @input
  containerFrame:ScriptComponent;

  @input 
  spotifyMenu:ScriptComponent;
    
  @input 
   scr:SceneObject
   
    private spectaclesBackendClient: SpectaclesBackendClient
    private specs;
    private spotifyMenuContainer;

 
      async onAwake():   Promise<void> {
        
     //   this.spectaclesBackendClient = new SpectaclesBackendClient()
        this.specs = this.scr.getComponent(
      SpectaclesBackendClient.getTypeName()
    );

    this.spotifyMenuContainer = this.spotifyMenu.sceneObject.getComponent(ContainerFrame.getTypeName());

//    let podcastList = await this.specs.getPodcasts()

//    podcastList.forEach(podcast => {

//      podcasts.set(podcast['name'], podcast['id']);
//    });
  

    const yStart = -7
    const yOffset = -6.4
      
    let i =0;
    for (const podcast of podcasts.keys()) {
      const item = this.itemPrefab.instantiate(this.getSceneObject())
      let text=item.getChild(0).getComponent('Text')
      text.horizontalOverflow = HorizontalOverflow.Wrap
      text.text=podcast

      let button = item.getChild(2).getComponent(PinchButton.getTypeName())
      
      button.onButtonPinched.add(() => this.onStateChangedCallback(podcast));
      const screenTransform = item.getComponent("Component.ScreenTransform")
      screenTransform.offsets.setCenter(new vec2(10, yStart + yOffset * i))
      item.enabled = true
      i++;
    }

    
  }

  setUpGrid(sceneObject) {
    
   
  }

    
  

    onStateChangedCallback = (podcast) => {
        let user = globalThis.snapUsername;

      this.containerFrame.sceneObject.enabled=false;

   this.specs.initializeWebSocketConnection(user,podcasts.get(podcast));
  this.specs.triggerListeningToPodcast(true);    

   this.spotifyMenuContainer.sceneObject.enabled = true;


  };
}



