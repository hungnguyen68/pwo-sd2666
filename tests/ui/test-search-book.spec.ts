import { BASE_URL } from '../../constant/url';
import { BrowserUtils } from '../../core/browser/browser-utils';
import { BookData } from '../../data-object/ui/book-data';
import { test } from '../../fixture/page-fixture';

const searchKeywords: string[] = ['Design', 'design'];

for (const searchKeyword of searchKeywords) {
    test(`@seachBook Verify search book with keyword: ${searchKeyword}`, async ({ bookPage }) => {
        await BrowserUtils.navigateTo(`${BASE_URL}/books`);
        await bookPage.fillSearchKeyword(searchKeyword);
        await bookPage.searchBook();
        const listBook: BookData[] = await bookPage.getAllBooks();
        await bookPage.verifySearchResultsContain(searchKeyword, listBook);
    });
}
