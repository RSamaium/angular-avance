import { AsyncSubject, BehaviorSubject, combineLatest, combineLatestWith, forkJoin, interval, map, merge, mergeMap, of, ReplaySubject, Subject, switchMap, timer, zip } from 'rxjs'

const ob1$ = of(1, 2, 3)
const ob2$ = of('A', 'B', 'C')


const ob3$ = forkJoin([ ob1$, ob2$ ])

ob3$.subscribe(console.log)