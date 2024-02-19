import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit{
  episode$ = this.dataSvc.episode$;

  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    // Implement any initialization logic if needed
  }
}
