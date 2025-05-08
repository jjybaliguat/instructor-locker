declare module 'leaflet.fullscreen' {
    import * as L from 'leaflet';
  
    module 'leaflet' {
      interface Map {
        fullscreenControl: L.Control;
      }
  
      namespace Control {
        class Fullscreen extends L.Control {
          constructor(options?: any);
        }
      }
    }
  
    const plugin: any;
    export = plugin;
  }
  