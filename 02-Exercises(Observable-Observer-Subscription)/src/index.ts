import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
    subscriber.next("Alice");
    subscriber.next("Ben");
    setTimeout(() => {
        subscriber.next("Charlize");
        // subscriber.complete();
    }, 2000);
    setTimeout(() => {
        subscriber.error(new Error("Failure"));
    }, 4000);

    //prevent memory leaks
    return () => {
        console.log("Teardown");
    };
});

observable$.subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("Completed"),
    error: (err) => console.log(err.message),
});

const interval$ = new Observable<number>((subscriber) => {
    let counter = 1;
    const intervalId = setInterval(() => {
        subscriber.next(counter++);
    }, 2000);
    
    return () => {
        clearInterval(intervalId);
    };
});

const subscription = interval$.subscribe((value) => console.log(value));

setTimeout(() => {
    console.log("Unsubscribe");
    subscription.unsubscribe();
}, 7000);
