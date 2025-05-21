import { Page } from "@playwright/test";
import { ProductPage } from "./ProductPage";
import { BasketPage } from "./BasketPage";
import { SearchResultPage } from "./SearchResultPage";
import { LogonPage } from "./LogonPage";

export class PageManager {
   public readonly basketPage:  BasketPage ;
   public readonly productPage: ProductPage;
   public readonly searchResultPage: SearchResultPage;
   public readonly logonPage: LogonPage;
    constructor(page: Page) {
        this.basketPage = new BasketPage(page);
        this.productPage = new ProductPage(page);
        this.searchResultPage = new SearchResultPage(page);
        this.logonPage = new LogonPage(page);
    }
};