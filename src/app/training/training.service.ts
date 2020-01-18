import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class  TrainingService{
    constructor(private firebase:AngularFirestore){}

    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    fineshedExercisesChanged =new Subject<Exercise[]>();
    private availableExercise:Exercise[]=[];
    private runningExercise:Exercise;
    private finishedexercise:Exercise[]=[];

    fatchAvailableExercise(){
        this.firebase
        .collection('availableExercise')
        .snapshotChanges()
        .map(docArray =>{
          return docArray.map(doc =>{
            return{
              id:doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
        .subscribe((exercise:Exercise[]) => {
            this.availableExercise = exercise;
            this.exercisesChanged.next([...this.availableExercise]);
        })    
    }
    startExercise(selectedId:string){
        this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }
    completeExercise(){
        this.addDataToDatabase({
            ...this.runningExercise,
            date:new Date(),
            state:'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancelExercise(progress:number){
        this.addDataToDatabase({
            ...this.runningExercise,
            duration:this.runningExercise.duration * (progress / 100),
            calories:this.runningExercise.calories * (progress /100),
            date:new Date(),
            state:'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    getRunningExercise(){
        return {...this.runningExercise}
    }
    fetchCompletedOrCancelledExercise(){
        this.firebase.collection('fineshedExercies')
        .valueChanges()
        .subscribe((exercise:Exercise[])=>{
            this.finishedexercise = exercise;
            this.fineshedExercisesChanged.next(exercise);
        })
    }
    private addDataToDatabase(exercise:Exercise){
        this.firebase.collection('fineshedExercies').add(exercise);
    }
}