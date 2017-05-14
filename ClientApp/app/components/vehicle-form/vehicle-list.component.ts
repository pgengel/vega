import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: 'vehicle-list',
    templateUrl: './vehicle-list.component.html'
})

export class VehicleListComponent implements OnInit {
    vehicles : Vehicle[];
    makes : KeyValuePair[];
    // allVehicles: Vehicle[];
    filter: any ={};
    constructor(private vehicleService : VehicleService) { 

    }

    ngOnInit() { 
        this.vehicleService.getMakes()
            .subscribe(makes => this.makes = makes);

        this.populateVehicles();

        //client-side filtering
        // this.vehicleService.getVehicles(this.filter)
        //     .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);
    }

    onFilterChange(){
        // var vehicles = this.allVehicles;

        // if(this.filter.makeId)
        //     vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

        // if(this.filter.modelId)
        //     vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);

        // this.vehicles = vehicles;
        this.populateVehicles();
    }

    populateVehicles(){
        this.vehicleService.getVehicles(this.filter)
            .subscribe(vehicles => this.vehicles = vehicles);   
    }

    resetFilter(){
        this.filter = {};
        this.onFilterChange();
    }
}