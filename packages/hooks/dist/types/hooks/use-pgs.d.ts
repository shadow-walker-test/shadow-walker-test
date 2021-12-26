import { PaginatedResponseModel, PaginatedSearchRequestModel } from '@shadow-walker-test/core';
declare type FetcherType = (x: PaginatedSearchRequestModel | any) => Promise<PaginatedResponseModel<any>>;
interface Config {
    fetcher: FetcherType;
    fetchOnMount: boolean;
    minText: number;
    extraArgs?: any;
}
declare const usePgs: (initialConfig: Config) => {
    options: any;
    loading: any;
    isFull: any;
    selectTemplate: {
        brokenMessage: any;
        options: any;
        loading: any;
        onScrollBottom: () => void;
        onSearch: (text: any) => void;
        serverSideSearch: boolean;
        minSearchText: any;
        onTryAgain: () => void;
    };
    store: any;
};
export default usePgs;
//# sourceMappingURL=use-pgs.d.ts.map