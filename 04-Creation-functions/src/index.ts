import { Observable, of, from, fromEvent } from "rxjs";

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

//fromEvent

const triggerButton = document.querySelector("button#trigger");

const subscription = fromEvent<MouseEvent>(triggerButton, "click").subscribe(
    (event) => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
    console.log("Unsubscribe");
    subscription.unsubscribe();
}, 5000);

const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
    const clickHandlerFn = (event: MouseEvent) => {
        console.log("Event callback executed");
        subscriber.next(event);
    };
    triggerButton.addEventListener("click", clickHandlerFn);

    
    // teardown logic, prevent memory leaks (without this the event call back keeps executing)

    return () => {
        triggerButton.removeEventListener("click", clickHandlerFn);
    };
});

const subscription2 = triggerClick$.subscribe((event) =>
    console.log("from triggerClick$ observable", event.type, event.x, event.y)
);

setTimeout(() => {
    console.log("Unsubscribe");
    subscription2.unsubscribe();
}, 5000);
