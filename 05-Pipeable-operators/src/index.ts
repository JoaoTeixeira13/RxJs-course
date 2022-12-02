import { forkJoin, filter, Observable, map } from "rxjs";
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
