import { Injectable  } from '@angular/core';

@Injectable()

export class StorageService {
  constructor() {
  };

  write(key:string, value:any) {
    if (value) {
      value = JSON.stringify(value);//将value对象转换成字符串
    }
    localStorage.setItem(key, value);
  }

  read(key:string) {
    let value = localStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);//如果有值则返回value对象
    }
    return null;//没有值则返回空
  }
}
