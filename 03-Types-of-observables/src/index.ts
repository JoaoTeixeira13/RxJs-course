import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

//cold observable

const ajax$ = ajax<any>("https://random-data-api.com/api/name/random_name");

ajax$.subscribe((data) =>
    console.log("subscription 1:", data.response.first_name)
);

ajax$.subscribe((data) =>
    console.log("subscription 2:", data.response.first_name)
);

ajax$.subscribe((data) =>
    console.log("subscription 3:", data.response.first_name)
);

// hot observable

const helloButton = document.querySelector("button#hello");

const helloClick$ = new Observable<MouseEvent>((subscriber) => {
    helloButton.addEventListener("click", (event: MouseEvent) => {
        subscriber.next(event);
    });
});

helloClick$.subscribe((event) =>
    console.log("subscription 1", event.type, event.x, event.y)
);

setTimeout(() => {
    console.log("subscription 2 starts");
    helloClick$.subscribe((event) =>
        console.log("subscription 2", event.type, event.x, event.y)
    );
}, 5000);
