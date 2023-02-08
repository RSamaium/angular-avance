import { debounceTime, interval, map, switchMap, timer } from 'rxjs'

const simulateKeypress = interval(100)
const simulateHttp = timer(50)
    .pipe(
        map(() => Math.random())
    )

// Fonction  de validation
function checkEmail() {
    return timer(500)
        .pipe(
            switchMap(() => simulateHttp)
        )
        
}

// moteur Angular
let subscription
simulateKeypress.subscribe(() => {
    if (subscription) {
        subscription.unsubscribe()
    }
    subscription = checkEmail().subscribe((validatorReturn) => {
        console.log(validatorReturn)
    })
})