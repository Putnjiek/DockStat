import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Container } from '../interfaces/container';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  url = "api/containers";

  allContainers$ = new BehaviorSubject<Container[]>([]);

  constructor(private api: ApiService) { }

  async getAll(): Promise<Container[]> {
    const containers = await this.api.get<Container[]>(this.url);

    this.allContainers$.next(containers);

    return containers;
  }
}
