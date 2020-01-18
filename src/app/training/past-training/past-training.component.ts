import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatSort,MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {
  @ViewChild(MatSort ,{static:true}) sort:MatSort;
  @ViewChild(MatPaginator ,{static:true}) paginator:MatPaginator;

  displayedColumns=['date','name','calories','duration','state'];
  dataSource =new MatTableDataSource<Exercise>();
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.trainingService.fineshedExercisesChanged.subscribe((exercises:Exercise[])=>{
      this.dataSource.data = exercises;
      console.log(this.dataSource.data)
    })
    this.trainingService.fetchCompletedOrCancelledExercise();
    // this.dataSource.data = this.trainingService.getCompletedOrCancelledExercise();
    this.dataSource.paginator = this.paginator;
    // console.log(JSON.stringify(this.dataSource.data))
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
