import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public set(item: any, itemName: string): void{
    localStorage.setItem(itemName, item);
  }

  public get(itemName: string){
    return localStorage.getItem(itemName);
  }

  public remove(itemName: string): void{
    localStorage.removeItem(itemName);
  }
}
