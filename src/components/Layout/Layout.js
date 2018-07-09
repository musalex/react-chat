import React from 'react';


const layout = ( props ) => {
    return (
        <React.Fragment>
            <main style = {{height: '100%'}}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default layout;
