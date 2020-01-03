import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer'
import * as UI from '../shared/ui.actions'
import * as Training from './training.actions'

@Injectable()
export class TrainingService {
    
    private fbSubs: Subscription[] = []

    constructor(private db: AngularFirestore,
                private uiService: UIService,
                private store : Store<{ui: fromTraining.State}>) {}

    fetchAvailableExercises(){
        this.store.dispatch(new UI.StartLoading())
        this.fbSubs.push(this.db.collection('availableExercises')
                .snapshotChanges()
                .pipe(map(docArray => {
                    return docArray.map(doc => {
                        const id = doc.payload.doc.id
                        const data = doc.payload.doc.data() as Exercise
                        return { id, ...data };
                    })
                })).subscribe((exercises:Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading())
                    this.store.dispatch(new Training.SetAvailableTrainings(exercises))
                }, error => {
                    this.store.dispatch(new UI.StopLoading())
                    this.uiService.showSnackbar('Fetching exercises fail, please try again later', null, 5000)
                }))
    }

    startExercise(selectedId: string){
        this.store.dispatch(new Training.StartTraining(selectedId))
    }

    completeExercise(){
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({...ex,
                    date: new Date(),
                    state: 'completed'})
            this.store.dispatch(new Training.StopTraining())
        })
    }
    
    cancelExercise(progress: number){
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({...ex,
                                    date: new Date(),
                                    state: 'cancelled',
                                    duration: ex.duration * (progress/100),
                                    calories: ex.calories * (progress/100)})
            this.store.dispatch(new Training.StopTraining())
        })
    }

    fetchCompletedOrCancelledExercises(){
        this.fbSubs.push(this.db.collection('finishedExercises')
               .valueChanges()
               .subscribe((exercises : Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedTrainings(exercises))
               }))
    }

    cancelSubscription() {
        this.fbSubs.forEach(sub => sub.unsubscribe())
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises')
               .add(exercise)
               .then()
               .catch()
    }
}