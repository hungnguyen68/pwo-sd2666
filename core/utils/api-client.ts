import { BrowserManagement } from '../browser/browser-management';
import { BASE_URL } from '../../constant/url';

export class DemoQAApi {
    static async generateToken(username: string, password: string): Promise<string> {
        const response = await BrowserManagement.getCurrentRequest().post(`${BASE_URL}/Account/v1/GenerateToken`, {
            data: { userName: username, password: password }
        });
        const body = await response.json();
        return body.token;
    }

    static async addBookToUser(userId: string, isbn: string, token: string): Promise<void> {
        await BrowserManagement.getCurrentRequest().post(`${BASE_URL}/BookStore/v1/Books`, {
            data: { userId: userId, collectionOfIsbns: [{ isbn: isbn }] },
            headers: { Authorization: `Bearer ${token}` }
        });
    }
}
