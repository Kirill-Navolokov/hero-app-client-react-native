import appColors from '@/assets/colors';
import * as WebBrowser from 'expo-web-browser';

export default function shouldSync(ttl: number, lastSync?: number, ): boolean {
    if(lastSync == undefined)
        return true;

    return Date.now() - lastSync > ttl;
}

export function openUrlModally(link: string): Promise<WebBrowser.WebBrowserResult> {
    return WebBrowser.openBrowserAsync(
        link,
        {
            presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
            toolbarColor: appColors.backgroundPrimary,
            controlsColor:appColors.textPrimary
        });
}