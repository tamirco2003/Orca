import React from 'react'
import { CircularProgress } from '@material-ui/core';

const loadingContainer = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

function LoadingAnim() {
    return (
        <div style={loadingContainer}>
            <CircularProgress />
        </div>
    )
}

export default LoadingAnim;