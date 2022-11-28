import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
    console.log("Obervable executed");
    subscriber.next("Alice");
    setTimeout(() => subscriber.next("Ben"), 2000);
    setTimeout(() => subscriber.next("Charlie"), 4000);
});

// const observer = {
//     next: (value: string) => {
//         console.log(value);
//     },
// };

// observable$.subscribe(observer);

console.log("subscription 1 starts");

observable$.subscribe((value) => console.log("subscription 1", value));

setTimeout(() => {
    console.log("subscription 2 starts");
    observable$.subscribe((value) => console.log("subscription 2", value));
}, 1000);

// setTimeout(() => {
//     console.log("unsubscribed");
//     subscription.unsubscribe();
// }, 3000);
