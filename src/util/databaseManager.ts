import { CollaborativeCanvas } from './enums';
import { get, set, clear, del}  from 'idb-keyval';
import { CollabCanvas } from '../app';

export class DatabaseManager {
  private scene : Phaser.Scene;
  private imageData : ImageData;
  private imageReady: boolean = false;

  constructor(scene : Phaser.Scene) {

    this.scene = scene;

    if (!window.indexedDB) {
      alert("IndexedDB not supported");
      this.scene.events.emit(CollaborativeCanvas.Events.DBUNSUPPORTED);
    }
    else {
      this.scene.events.emit(CollaborativeCanvas.Events.DBREADY);
      this.scene.events.on(CollaborativeCanvas.Events.SAVEREQUEST, this.saveImageData, this);
    }

  }

  public saveImageData(imageData : ImageData, saveSlot: number){
    let prom = set(saveSlot, imageData);
    prom.then(() => {
      this.scene.events.emit(CollaborativeCanvas.Events.SAVECOMPLETE);
    });
    prom.catch(() => {
      this.scene.events.emit(CollaborativeCanvas.Events.SAVEFAIL)
    });
  }

  public getImageData() : ImageData {
    return this.imageData;
  }

  public deleteImageData(saveSlot: number) {
    let prom = del(saveSlot);
    prom.then(() =>  this.scene.events.emit(CollaborativeCanvas.Events.DELETECOMPLETE));
    prom.catch(() =>  this.scene.events.emit(CollaborativeCanvas.Events.DELETEFAIL));
  }

  public loadImageData(saveSlot: number) {
    let prom = get(saveSlot);
    prom.then(val => {
      if (val == null) {
        this.scene.events.emit(CollaborativeCanvas.Events.LOADFAIL);
      }
      else if(val instanceof ImageData ) {
        this.scene.events.emit(CollaborativeCanvas.Events.LOADREADY, val as ImageData);
        this.imageReady = true;
      }
    });
    prom.catch(() => this.scene.events.emit(CollaborativeCanvas.Events.LOADFAIL));
  }

  public isImageReady() : boolean {
    return this.imageReady;
  }
}