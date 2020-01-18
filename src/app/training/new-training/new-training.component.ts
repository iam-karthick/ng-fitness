import { Component, OnInit, Output, EventEmitter,OnDestroy } from '@angular/core';
import { TrainingService } from "../training.service";
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable,Subscription } from "rxjs";
import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  // @Output() trainingStart =new EventEmitter<void>()
  exercises :Exercise[];
  exercisesSubscription:Subscription;
  // data: any=[];
  constructor(private trainingService:TrainingService,private firebase:AngularFirestore) { }

  ngOnInit() {
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(exercises =>
      this.exercises = exercises);
    this.trainingService.fatchAvailableExercise();
    // this.exercises = this.trainingService.availableExercise;
  }
  onStartTraining(form:NgForm){
    // this.trainingStart.emit();\
    this.trainingService.startExercise(form.value.exercise)
  }
  // ngOnDestroy(){
  //   this.exercisesSubscription.unsubscribe()
  // }
}
