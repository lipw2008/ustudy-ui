import { Injectable } from '@angular/core';
import { SharedService } from '../../shared.service';

@Injectable()
export class ProblemService {

  constructor(private _sharedService: SharedService) { }

}