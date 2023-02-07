import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs'

const ob$ = new BehaviorSubject()

ob$.next('A')
ob$.next('B')
ob$.next('C')

const subscription = ob$.subscribe(console.log)

ob$.next('D')

subscription.unsubscribe()

ob$.next('E')

