import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subject, from } from 'rxjs';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';

  ngOnInit(){
const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.error('failed');
      subscriber.next(4);
      subscriber.complete();
     
    });

    console.log('just before subscribe');
    observable.subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      }
    });
    console.log('just after subscribe');

    console.log('end of Observable.. Start of  Subject');



    const subject = new Subject<number>();
    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });

    const sObservable = from([1, 2, 3]); // producer of a stream of values

    sObservable.subscribe(subject); // You can subscribe providing a Subject


    console.log('end of Subject.. Start of Behavioral Subject');
    const bSubject = new BehaviorSubject(0); // 0 is the initial value

    bSubject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });

    bSubject.next(1);
    bSubject.next(2);

    bSubject.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });

    bSubject.next(3);

    bSubject.asObservable().subscribe((data) => {
      console.log('Last subscriber got data >>>>> ' + data);
    });

    bSubject.next(4);

  }
  
}
