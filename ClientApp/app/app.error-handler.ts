import * as Raven  from 'raven-js';
import { ToastyService } from 'ng2-toasty';
import {NgZone, ErrorHandler,  Inject, isDevMode} from '@angular/core';
export class AppErrorHandler implements ErrorHandler{
    
    constructor(@Inject(ToastyService) private toastyService: ToastyService, private NgZone: NgZone){

    }
    handleError(error: any): void {
        if(!isDevMode)
            Raven.captureException(error.originalError || error);
        else
            throw error;
            
        this.NgZone.run(()=>{
            this.toastyService.error({
                title: 'Error',
                msg: 'Unexpected error happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });
    }
}