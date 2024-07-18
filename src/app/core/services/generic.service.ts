import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ServiceConfig {
  resourceEndpoint: string;
}
export const SERVICE_CONFIG = new InjectionToken<ServiceConfig>('ServiceConfig');

@Injectable({
  providedIn: 'root'
})

export class GenericService<TModel, TDto>{
protected readonly baseUrl?:string;
protected readonly resourceUrl?:string;

private http = inject(HttpClient)


constructor(@Inject(SERVICE_CONFIG) config: ServiceConfig){
  this.baseUrl = environment.apiUrl;
  this.resourceUrl = config.resourceEndpoint
  
}

getList() {
  console.log("prrimerooo");
  
  return this.http.get<TModel[]>(`${this.baseUrl}${this.resourceUrl}`,{params:{limit:10}});
}

getById(id: number) {
  return this.http.get<TModel>(`${this.baseUrl}${this.resourceUrl}/${id}`);
}

add(dto: TDto) {
  return this.http.post<TModel>(`${this.baseUrl}${this.resourceUrl}`, dto);
}

update(dto: TDto) {
  return this.http.put<TModel>(`${this.baseUrl}${this.resourceUrl}`, dto);
}

remove(id: number) {
  return this.http.delete<number>(`${this.baseUrl}${this.resourceUrl}/${id}`);
}

}
