import { CircularProgress } from "@material-ui/core";
import * as React from "react";

export const Loading: React.FunctionComponent = () => {
    return (
        <CircularProgress
            // tslint:disable-next-line: jsx-no-multiline-js
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -40,
                marginLeft: -40,
            }}
            color="secondary"
            size={80}
        />
    );
};
