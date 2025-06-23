import SearchFilter from "@/app/component/serch_filter";

export default function components() {
    const handleSearch = (query: string) => {
        console.log('Search:', query);
        // filter your data here
    };

    const handleFilter = (value: string) => {
        console.log('Filter:', value);
        // filter your data here
    };

    return (
        <div className="p-6">
            <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
            {/* Your filtered content below */}
        </div>
    );
}
