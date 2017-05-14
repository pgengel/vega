import { SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  constructor(private http: Http) { }

  getMakes(){
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  getFeatures(){
    return this.http.get('/api/features')
      .map(res => res.json());
  }

  create(vehicle){
    return this.http.post("/api/vehicle", vehicle)
      .map(res => res.json());
  }

  getVehicle(id){
    return this.http.get("/api/vehicle/" + id)
      .map(res => res.json());
  }

  getVehicles(){
    return this.http.get("/api/vehicle")
      .map(res => res.json());
  }

  updateVehicle(vehicle: SaveVehicle){
    return this.http.put('/api/vehicle/' + vehicle.id, vehicle)
      .map(res => res.json());
  }

  deleteVehicle(id){
    return this.http.delete('/api/vehicle' + id)
      .map(res => res.json());
  }

}
