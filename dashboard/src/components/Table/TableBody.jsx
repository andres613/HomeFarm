export const TableBody = ({ response }) => {
    return (
        <>
            {
                (() => {
                    let data = response.data;

                    return (Object.keys(data)).map(item => {
                        return (
                            <tr key={ item }>
                                {
                                    (() => {
                                        let row = []

                                        for(let i = 0; i < response.variables[0].length; i++) {
                                            row.push(<td data-label={response.variables[0][i]} key={ i }>{ (data[item])[Object.keys(data[item])[i]] }</td>);
                                        }
                                        
                                        return row;
                                    }
                                    )()
                                }
                            </tr>
                        )
                    })
                })()
            }       
        </>
    );
}
