import { Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SharedService {

    constructor(private _http: Http) { 
		
    }

	makeRequest (method: string, endpoint: string, content: string) {
	  return new Promise(function (resolve, reject) {
	  	// get the configured URL
	  	var configXhr = new XMLHttpRequest();
	  	configXhr.open('GET', 'assets/config.json');
	  	configXhr.onload = () => {
	  		var url = JSON.parse(configXhr.response).url;
		    var xhr = new XMLHttpRequest();
		    xhr.open(method, "" + url + endpoint);
		    xhr.onload = () => {
		    	console.log("xhr status is: " + xhr.status);
		      if (xhr.status >= 200 && xhr.status < 300) {
		      	console.log("xhr response is: " + xhr.response);
		        resolve(JSON.parse(xhr.response));
		      } else {
		        reject({
		        status: xhr.status,
		        statusText: xhr.statusText
		      });
		      }
		    };
		    xhr.onerror = () => {
		      reject({
		        status: xhr.status,
		        statusText: xhr.statusText
		      });
		    };
		    if (method === 'POST')
		    	xhr.send(content);
		    else 
		    	xhr.send();
	  	}
	  	configXhr.onerror = () => {
	  		console.log("The request is rejected when getting configured URL. Status: " + configXhr.status + " Text: " + configXhr.statusText);
	  		reject({
		        status: configXhr.status,
		        statusText: configXhr.statusText
		      });
	  	}
	  	configXhr.send();
	  });
	}
}
