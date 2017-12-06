import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import * as _ from 'lodash';
/*
This shared service provides common utilitis and constants to the whole project.
*/
@Injectable()
export class SharedService {

  public userName: string = '';
  public userRole: string = '';

  private baseUrl: string = "http://ustudypaper.oss-cn-hangzhou.aliyuncs.com/";
  private getUrl: Promise<string>;

  constructor(private _http: Http) {
    this.getUrl = new Promise(function(resolve, reject) {
      const configXhr = new XMLHttpRequest();
      configXhr.open('GET', 'assets/config.json');
      configXhr.onload = () => {
        resolve(JSON.parse(configXhr.response).url);
      };
      configXhr.onerror = () => {
        console.log(`The request is rejected when getting configured URL. Status: ${configXhr.status} Text: ${configXhr.statusText}`);
        reject({
          status: configXhr.status,
          statusText: configXhr.statusText
        });
      };
      configXhr.send();
    })
  };

	getImgUrl(paperImg: string, region: any) : string {
    let url = "";
    if (region === "") {
      url = this.baseUrl + paperImg;
    } else {
      url = this.baseUrl + paperImg + "?x-oss-process=image/crop,";
  		url += "x_" + region.x + ",";
  		url += "y_" + region.y + ",";
  		url += "w_" + region.w + ",";
  		url += "h_" + region.h;
    }
		return url;
	}

  MD5(pw: string): any {
	  return Md5.hashStr(pw);
	}

  /* Do a http request
  method: http method
  endpoint:
      - "/info/..." will send to server side
      - "assets/..." is for test
  content:
      - string: request data. the default req&res contentType is JSON
      - JSON: {"data": "", "reqContentType": "", "resContentType": ""}
      or object
  */
  makeRequest(method: string, endpoint: string, content: any) {
    return new Promise((resolve, reject) => {
      // parse the content
      let data = (content.data === undefined ? content : content.data);
      let reqContentType = (content.reqContentType === undefined ? "application/json" : content.reqContentType);
      let resContentType = (content.resContentType === undefined ? "application/json" : content.resContentType);

      // get the configured URL
      this.getUrl.then((url) => {
        if (endpoint.substring(0, 6) === 'assets') {
          url = ''
        }
        const xhr = new XMLHttpRequest();
        let params = '';
        if (method.toLowerCase() === 'get' && _.isObject(content)) {
          params = '?' + _.map(content, (v, k) => `${k}=${v}`).join('&')
        }
        xhr.open(method, `${url}${endpoint}${params}`);
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.response));
            } catch (e) {
              resolve({});
            }
          } else {
            console.log('error happens: ' + url);
            reject({
              status: xhr.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = () => {
          console.log('error happens: ' + url);
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        };
        xhr.withCredentials = true;
        if (method === 'POST') {
          xhr.setRequestHeader('Content-type', reqContentType);
          xhr.send(data);
        } else {
          xhr.send();
        }
      });
    });
  }
}
