import { Page } from "@playwright/test";

export class PageManager {
   private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}