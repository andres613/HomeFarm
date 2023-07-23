export const Message = ({ prop }) => {
    const messageStyle = {color : 'red'};

    return (
        <>
            {
                (() => {
                    let message = [];

                    for(let i = 0; i < prop.length; i++) {
                        message.push(<h6 key={i} style={messageStyle}>{ prop[i] }</h6>);
                    }

                    return message;
                })()
            }
        </>
    );
}
