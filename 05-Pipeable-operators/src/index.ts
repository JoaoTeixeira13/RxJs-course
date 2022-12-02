import {
    forkJoin,
    filter,
    Observable,
    map,
    of,
    tap,
    fromEvent,
    debounceTime,
    catchError,
    EMPTY,
    concatMap,
} from "rxjs";
import { ajax } from "rxjs/ajax";

//filter

interface NewsItem {
    category: "Business" | "Sports";
    content: string;
}

const newsFeed$ = new Observable<NewsItem>((subscriber) => {
    setTimeout(() => {
        subscriber.next({ category: "Business", content: "A" });
    }, 1000);
    setTimeout(() => {
        subscriber.next({ category: "Sports", content: "B" });
    }, 2000);
    setTimeout(() => {
        subscriber.next({ category: "Business", content: "C" });
    }, 3000);
    setTimeout(() => {
        subscriber.next({ category: "Sports", content: "D" });
    }, 4000);
    setTimeout(() => {
        subscriber.next({ category: "Business", content: "E" });
    }, 5000);
});

const sportsNewsFeed$ = newsFeed$.pipe(
    filter((item: NewsItem) => item.category === "Sports")
);

sportsNewsFeed$.subscribe((item) => console.log(item));

//map

const randomFirstName$ = ajax<any>(
    "https://random-data-api.com/api/name/random_name"
).pipe(map((ajaxResponse) => ajaxResponse.response.first_name));

const randomCapital$ = ajax<any>(
    "https://random-data-api.com/api/nation/random_nation"
).pipe(map((ajaxResponse) => ajaxResponse.response.capital));

const randomDish$ = ajax<any>(
    "https://random-data-api.com/api/food/random_food"
).pipe(map((ajaxResponse) => ajaxResponse.response.dish));

forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
    ([firstName, capital, dish]) =>
        console.log(`${firstName} is from ${capital} and likes to eat ${dish}.`)
);

//tap ( logs information inside the Observable)

of(1, 7, 4, 8, 9, 2)
    .pipe(
        filter((value: number) => value > 5),
        tap((value: number) => console.log("Spy:", value)),
        map((value: number) => value * 2)
    )
    .subscribe((value: number) => console.log("Output:", value));

//debounceTime

const sliderInput = document.querySelector("input#slider");

fromEvent(sliderInput, "input")
    .pipe(
        debounceTime(2000),
        map((event: any) => event.target["value"])
    )
    .subscribe((value) => console.log(value));

//catchError

const failingHttpRequest$ = new Observable((subscriber) => {
    setTimeout(() => {
        subscriber.error(new Error("Timeout"));
    }, 3000);
});

failingHttpRequest$
    .pipe(catchError((error) => EMPTY))
    .subscribe((value) => console.log(value));

//------------------Flattening Operators------------------

//static

const source$ = new Observable((subscriber) => {
    setTimeout(() => subscriber.next("source$: A"), 2000);
    setTimeout(() => subscriber.next("source$: B"), 5000);
});

source$
    .pipe(concatMap((value) => of(1, 2)))
    .subscribe((value) => console.log(value));

// dynamic

const endpointInput: HTMLInputElement =
    document.querySelector("input#endpoint");
const fetchButton = document.querySelector("button#fetch");

fromEvent(fetchButton, "click")
    .pipe(
        map(() => endpointInput.value),
        concatMap((value) =>
            ajax(
                `https://random-data-api.com/api/${value}/random_${value}`
            ).pipe(catchError((err) => of(`Could not fetch data: ${err}`)))
        )
    )
    .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log("Error:", err),
        complete: () => console.log("Completed"),
    });
