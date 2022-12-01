import {
    Observable,
    of,
    from,
    fromEvent,
    timer,
    interval,
    forkJoin,
} from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";

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

//timer

console.log("timer section started");

const timerSubscription = timer(2000).subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("timer completed"),
});

setTimeout(() => {
    timerSubscription.unsubscribe();
}, 1000);

const timer$ = new Observable<number>((subscriber) => {
    const timeoutId = setTimeout(() => {
        console.log("Timeout.");
        subscriber.next(0);
        subscriber.complete();
    }, 2000);

    return () => {
        clearTimeout(timeoutId);
    };
});

const timer$Subscription = timer$.subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("timer$ completed"),
});

setTimeout(() => {
    timer$Subscription.unsubscribe();
    console.log("unsubscribe from timer$Subscription");
}, 1000);

//interval

const intervalSubscription = interval(1000).subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("timer$ completed"),
});

setTimeout(() => {
    intervalSubscription.unsubscribe();
    console.log("unsubscribe from timer$Subscription");
}, 5000);

const interval$ = new Observable<number>((subscriber) => {
    let counter = 0;
    const intervalId = setInterval(() => {
        console.log("Timeout.");
        subscriber.next(counter++);
    }, 1000);

    return () => {
        clearInterval(intervalId);
    };
});

const interval$Subscription = interval$.subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("interval$Subscription  completed"),
});

setTimeout(() => {
    interval$Subscription.unsubscribe();
    console.log("unsubscribe from interval$Subscription");
}, 5000);

//forkJoin

const randomName$ = ajax("https://random-data-api.com/api/name/random_name");

const randomNation$ = ajax(
    "https://random-data-api.com/api/nation/random_nation"
);

const randomFood$ = ajax("https://random-data-api.com/api/food/random_food");

randomName$.subscribe((ajaxResponse: AjaxResponse<any>) =>
    console.log(ajaxResponse.response.first_name)
);
randomNation$.subscribe((ajaxResponse: AjaxResponse<any>) =>
    console.log(ajaxResponse.response.capital)
);
randomFood$.subscribe((ajaxResponse: AjaxResponse<any>) =>
    console.log(ajaxResponse.response.dish)
);

forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
    ([nameAjax, nationAjax, foodAjax]: AjaxResponse<any>[]) => {
        console.log(
            `${nameAjax.response.first_name} is from ${nationAjax.response.capital} and loves to eat ${foodAjax.response.dish}.`
        );
    }
);

const a$ = new Observable((subscriber) => {
    setTimeout(() => {
        subscriber.next("Aranthea");
        subscriber.complete();
    }, 3000);
});

const b$ = new Observable((subscriber) => {
    setTimeout(() => {
        subscriber.error("She crashed.");
    }, 3000);
});

forkJoin([a$, b$]).subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log("Error", err),
});
