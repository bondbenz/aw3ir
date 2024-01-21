import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  constructor() { }

  getMeteo(name: string): Promise<any> {
    console.log('from service', name);

    return fetch('https://api.openweathermap.org/data/2.5/weather/?q=' + name + '&units=metric&lang=fr&appid=c77aefb32e2146766d7d216c914fae63')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {

        // test du code retour
        // 200 = OK
        // 404 = city not found 
        if (json.cod == 200) {
          return Promise.resolve(json);
        } else {
          console.error('Météo introuvable pour ' + name + ' (' + json.message + ')');

          return Promise.reject('Météo introuvable pour ' + name + ' (' + json.message + ')');
        }

      });

  }

  getForecast(name: string): Promise<any> {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${name}&units=metric&lang=fr&appid=c77aefb32e2146766d7d216c914fae63`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === "200") {
          return Promise.resolve(json);
        } else {
          console.error('Prévision météo introuvable pour ' + name + ' (' + json.message + ')');
          return Promise.reject('Prévision météo introuvable pour ' + name + ' (' + json.message + ')');
        }
      });
  }
  
  
}
