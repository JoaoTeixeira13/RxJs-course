import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
    subscriber.next("Alice");
    subscriber.next("Ben");
    setTimeout(() => {
        subscriber.next("Charlize");
        subscriber.complete();
    }, 2000);

    //prevent memory leaks
    return () => {
        console.log("Teardown");
    };
});

observable$.subscribe({
    next: (value) => console.log(value),
    complete: () => console.log("Completed"),
});
