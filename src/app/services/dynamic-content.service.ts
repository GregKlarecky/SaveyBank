import { Injectable, ComponentFactoryResolver } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DynamicContentService {
  public defaultContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(component, ref?, data?) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );

    const viewContainerRef = ref ? ref : this.defaultContainerRef;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    if (data) {
      componentRef.instance.data = data;
    }
  }

  setModalContaineRef(ref) {
    this.defaultContainerRef = ref;
  }

  public clearContainer(ref?) {
    const ContainerRef = ref ? ref : this.defaultContainerRef;
    ContainerRef.clear();
  }
}
