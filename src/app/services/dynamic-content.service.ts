import { Injectable, ComponentFactoryResolver } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DynamicContentService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(component, ref, data?) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );

    const viewContainerRef = ref;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    if (data) {
      componentRef.instance.data = data;
    }
  }
}
