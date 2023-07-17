export const TableHead = ({ response }) => {
    return (
        <tr>
            {
                (() => {
                    let row = []
                    Object.keys(response.variables[0]).map(function(key, index) {
                        row.push(<th key={ response.variables[0][key] } >{ response.variables[0][key] }</th>)
                    })
                    return row;
                })()
            }
        </tr>
    );
}
