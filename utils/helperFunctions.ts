export default function shouldSync(ttl: number, lastSync?: number, ): boolean {
    if(lastSync == undefined)
        return true;

    return Date.now() - lastSync > ttl;
}