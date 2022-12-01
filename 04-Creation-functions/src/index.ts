import { Observable, of, from } from "rxjs";

//of

of("Alyssa", "Ben", "Charlize").subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("completed"),
});

const names$ = new Observable<string>((subscriber) => {
    subscriber.next("Alyssa");
    subscriber.next("Ben");
    subscriber.next("Charlize");
    subscriber.complete();
});

names$.subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("completed"),
});

//manual implementation of RxJS's built-in "of" function

function ownOf(...args: string[]): Observable<string> {
    return new Observable<string>((subscriber) => {
        for (let i = 0; i < args.length; i++) {
            subscriber.next(args[i]);
        }
        subscriber.complete();
    });
}

ownOf("Alyssa", "Ben", "Charlize").subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("completed"),
});

//from

from(["Ashanti", "Baal", "Cole"]).subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("Completed"),
});

const somePromise = new Promise((resolve, reject) => {
    // resolve("Resolved.");
    reject("Rejected");
});

const obervableFromPromise$ = from(somePromise);

obervableFromPromise$.subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log("Error: ", err),
    complete: () => console.log("Promise completed"),
});
