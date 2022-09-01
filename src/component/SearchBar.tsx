

export const SearchBar = (props:any) =>{

    const handleSearch = (e: any) => {
        let keySearch = e.target.value;
        let arr = props.arr;
        let fieldSearch = props.field;
        console.log(keySearch);
        console.log(keySearch.length);
        let data: any = [];
        if (keySearch.length >= 0) {
            data = arr.filter((item: any) => {
                return item.fieldSearch.toLowerCase().match(keySearch)
            })
           
        }
    }

    return(
        <></>
    )
}