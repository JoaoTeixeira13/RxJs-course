import { filter, Observable } from "rxjs";

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
