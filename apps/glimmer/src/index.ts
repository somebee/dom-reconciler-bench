import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import App from './main';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

app.renderComponent('Glimmer', containerElement, null);

app.boot();

setTimeout(()=>{
  if (typeof API !== 'undefined') {
    API.render = function(){ 
      if (window.appComponent) {
        window.appComponent.setState(API.store);
      }
    };
    API.READY = true;
    API.reset(6);
  }
}, 10);
