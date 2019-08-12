export class CameraUtil {

  static readonly MINWIDTH = 1;
  static readonly MAXWIDTH = 3840;

  public static setCameraWidth(camera : Phaser.Cameras.Scene2D.Camera, pixels :number) : void {
    pixels = Phaser.Math.Clamp(pixels,this.MINWIDTH,this.MAXWIDTH);
    camera.setZoom(camera.width/pixels);
  }

};